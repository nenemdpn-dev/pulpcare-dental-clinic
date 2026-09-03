import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { whatsappUrlForBooking } from "@/lib/whatsapp";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const services = [
  "General Dentistry",
  "Dental Cleaning",
  "Tooth Extraction",
  "Teeth Whitening",
  "Paediatric Dentistry",
  "Root Canal Treatment",
  "Cosmetic Dentistry",
  "Emergency Dental Care",
];

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const bookingSchema = z.object({
  patient_name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name must be 100 characters or fewer."),
  patient_phone: z.string().trim().regex(/^[+()\d\s-]{7,20}$/, "Please enter a valid phone number."),
  patient_email: z.string().trim().email("Please enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  service: z.string().min(1, "Please select a service."),
  appointment_date: z.string().min(1, "Please choose a preferred date."),
  appointment_time: z.string().min(1, "Please select a preferred time."),
  message: z.string().trim().max(1000, "Message must be 1,000 characters or fewer."),
});

type BookingDetails = z.infer<typeof bookingSchema>;
type FormErrors = Partial<Record<keyof BookingDetails, string>>;

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  patientTemplateId: import.meta.env.VITE_EMAILJS_PATIENT_TEMPLATE_ID,
  clinicTemplateId: import.meta.env.VITE_EMAILJS_CLINIC_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const makeBookingReference = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `PULP-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
};

const BookAppointment = () => {
  const [date, setDate] = useState<Date>();
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [bookingDetails, setBookingDetails] = useState<BookingDetails & { booking_reference: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  const formStartedAt = useRef(Date.now());
  const lastSubmissionAt = useRef(0);
  const { toast } = useToast();

  const resetForm = () => {
    setDate(undefined);
    setService("");
    setTime("");
    setSubmitted(false);
    setBookingDetails(undefined);
    setSubmitError("");
    setFieldErrors({});
    formStartedAt.current = Date.now();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    const form = new FormData(e.currentTarget);
    const values = {
      patient_name: String(form.get("patient_name") ?? ""),
      patient_phone: String(form.get("patient_phone") ?? ""),
      patient_email: String(form.get("patient_email") ?? ""),
      service,
      appointment_date: date ? format(date, "yyyy-MM-dd") : "",
      appointment_time: time,
      message: String(form.get("message") ?? ""),
    };

    if (String(form.get("website") ?? "").trim()) return;

    const result = bookingSchema.safeParse(values);
    if (!result.success) {
      const errors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof BookingDetails;
        if (!errors[field]) errors[field] = issue.message;
      });
      setFieldErrors(errors);
      setSubmitError("Please check the highlighted fields and try again.");
      return;
    }

    if (Date.now() - formStartedAt.current < 1500 || Date.now() - lastSubmissionAt.current < 10_000) {
      setSubmitError("Please wait a moment before submitting your request.");
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setIsSending(true);

    const booking_reference = makeBookingReference();
    const submitted_at = new Date().toISOString();
    try {
      if (!emailJsConfig.serviceId || !emailJsConfig.patientTemplateId || !emailJsConfig.clinicTemplateId || !emailJsConfig.publicKey) {
        throw new Error("EmailJS is not configured");
      }

      const templateParams = {
        ...result.data,
        submitted_at,
        booking_reference,
        subject: "New Appointment Request — Pulpcare Dental Clinic",
        request_type: "APPOINTMENT REQUEST",
      };

      // 1) Clinic notification (required — must succeed before we claim success)
      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.clinicTemplateId, templateParams, { publicKey: emailJsConfig.publicKey });

      // 2) Patient acknowledgement (best-effort — clinic already received the request)
      let patientAckSent = true;
      try {
        await emailjs.send(emailJsConfig.serviceId, emailJsConfig.patientTemplateId, templateParams, { publicKey: emailJsConfig.publicKey });
      } catch {
        patientAckSent = false;
      }

      lastSubmissionAt.current = Date.now();
      formRef.current?.reset();
      setDate(undefined);
      setService("");
      setTime("");
      setBookingDetails({ ...result.data, booking_reference });
      setSubmitted(true);
      toast({
        title: "Appointment Request Sent!",
        description: patientAckSent
          ? "We've emailed you an acknowledgement and will contact you to confirm your appointment."
          : "Request received by the clinic. We'll contact you to confirm your appointment.",
      });
    } catch {
      setSubmitError("We couldn't send your appointment request right now. Please try again or contact Pulpcare Dental Clinic directly.");
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding bg-card min-h-[60vh] flex items-center">
          <div className="container-narrow mx-auto text-center max-w-lg">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <CheckCircle2 className="w-20 h-20 text-pulpcare-success mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
              <p className="text-muted-foreground mb-2">Appointment request sent successfully. Pulpcare Dental Clinic will contact you to confirm your appointment.</p>
              <p className="text-muted-foreground mb-8">Our team will contact you within 24 hours to confirm your appointment.</p>
              {bookingDetails && (
                <div className="mb-8 space-y-1 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Request reference:</span> {bookingDetails.booking_reference}</p>
                  <p><span className="font-medium text-foreground">Requested:</span> {bookingDetails.service} · {bookingDetails.appointment_date} · {bookingDetails.appointment_time}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {bookingDetails && (
                  <Button asChild className="rounded-full px-6">
                    <a href={whatsappUrlForBooking({
                      patientName: bookingDetails.patient_name,
                      service: bookingDetails.service,
                      appointmentDate: bookingDetails.appointment_date,
                      appointmentTime: bookingDetails.appointment_time,
                    })} target="_blank" rel="noopener noreferrer">
                      Continue on WhatsApp
                    </a>
                  </Button>
                )}
                <Button onClick={resetForm} variant="outline" className="rounded-full px-6">
                  Book Another Appointment
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo
        title="Book a Dental Appointment | Pulpcare Lagos"
        description="Book your dental appointment online at Pulpcare Dental Clinic in Surulere, Lagos. Choose your service, date and time in minutes."
        path="/book-appointment"
      />
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4 !text-primary-foreground">
            Book an Appointment
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-lg opacity-90 max-w-2xl mx-auto">
            Schedule your visit in just a few clicks. We'll confirm your appointment within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="patient_name" placeholder="e.g. Adaeze Okafor" required aria-invalid={Boolean(fieldErrors.patient_name)} />
                {fieldErrors.patient_name && <p className="text-sm text-destructive">{fieldErrors.patient_name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="patient_phone" type="tel" placeholder="+234 801 234 5678" required aria-invalid={Boolean(fieldErrors.patient_phone)} />
                {fieldErrors.patient_phone && <p className="text-sm text-destructive">{fieldErrors.patient_phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="patient_email" type="email" placeholder="you@email.com" required aria-invalid={Boolean(fieldErrors.patient_email)} />
              {fieldErrors.patient_email && <p className="text-sm text-destructive">{fieldErrors.patient_email}</p>}
            </div>

            <div className="space-y-2">
              <Label>Service Required *</Label>
              <Select value={service} onValueChange={setService} required>
                <SelectTrigger aria-invalid={Boolean(fieldErrors.service)}><SelectValue placeholder="Select a service" /></SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldErrors.service && <p className="text-sm text-destructive">{fieldErrors.service}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" aria-invalid={Boolean(fieldErrors.appointment_date)} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date() || d.getDay() === 0}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {fieldErrors.appointment_date && <p className="text-sm text-destructive">{fieldErrors.appointment_date}</p>}
              </div>
              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <Select value={time} onValueChange={setTime} required>
                  <SelectTrigger aria-invalid={Boolean(fieldErrors.appointment_time)}>
                    <SelectValue placeholder="Select time">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Select time</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.appointment_time && <p className="text-sm text-destructive">{fieldErrors.appointment_time}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea id="message" name="message" placeholder="Tell us about your dental concern or any special requirements..." rows={4} maxLength={1000} aria-invalid={Boolean(fieldErrors.message)} />
              {fieldErrors.message && <p className="text-sm text-destructive">{fieldErrors.message}</p>}
            </div>

            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
            <Button type="submit" size="lg" disabled={isSending} className="w-full rounded-full font-semibold h-12 text-base">
              {isSending ? "Sending appointment request..." : "Submit Appointment Request"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting this form, you agree to be contacted by Pulpcare Dental Clinic regarding your appointment.
            </p>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default BookAppointment;
