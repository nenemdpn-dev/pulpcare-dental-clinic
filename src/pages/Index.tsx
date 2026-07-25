import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Heart, Clock, Star, Award, Users, Stethoscope,
  Smile, Sparkles, Baby, Syringe, Zap, ArrowRight, CheckCircle2,
  MapPin, Phone, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import MicroButton from "@/components/MicroButton";
import clinicReception from "@/assets/dr-chris-office.jpg";
import clinicWaiting from "@/assets/clinic-waiting-room.jpg";
import patientSmile from "@/assets/veneers-result.jpg";
import clinicTreatment from "@/assets/clinic-treatment.jpg";

const services = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Comprehensive check-ups, fillings, and preventive care for your whole family.", path: "/services/general-dentistry" },
  { icon: Sparkles, title: "Dental Cleaning", desc: "Professional scaling and polishing to keep your teeth sparkling clean and healthy.", path: "/services/dental-cleaning" },
  { icon: Syringe, title: "Tooth Extraction", desc: "Safe, painless tooth removal using modern techniques and anaesthesia.", path: "/services/tooth-extraction" },
  { icon: Smile, title: "Teeth Whitening", desc: "Brighten your smile with our professional in-office whitening treatments.", path: "/services/teeth-whitening" },
  { icon: Baby, title: "Paediatric Dentistry", desc: "Gentle, child-friendly dental care designed to make kids feel comfortable.", path: "/services/paediatric-dentistry" },
  { icon: Heart, title: "Root Canal Treatment", desc: "Pain-free root canal therapy to save your natural teeth and relieve discomfort.", path: "/services/root-canal" },
  { icon: Award, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers for the confident smile you deserve.", path: "/services/cosmetic-dentistry" },
  { icon: Zap, title: "Emergency Dental Care", desc: "Urgent dental attention when you need it most — walk-ins welcome.", path: "/services/emergency-dental-care" },
];

const whyChooseUs = [
  { icon: Shield, title: "Experienced Professionals", desc: "Led by Dr. Chris and a team of certified dental experts with years of experience." },
  { icon: Heart, title: "Patient-Centred Care", desc: "We listen, explain, and ensure you're comfortable every step of the way." },
  { icon: Clock, title: "Modern Equipment", desc: "State-of-the-art tools and sterilisation standards for safe, effective treatments." },
  { icon: Star, title: "Affordable Pricing", desc: "Quality dental care at prices that work for Nigerian families. Flexible payment plans available." },
];

const testimonials = [
  { name: "Adaeze O.", text: "I was terrified of dentists until I visited Pulpcare. Dr. Chris and his team made me feel so comfortable. My teeth have never looked better!", rating: 5 },
  { name: "Emeka N.", text: "Professional, clean, and efficient. I brought my children here and they actually enjoyed their visit. Highly recommend for families.", rating: 5 },
  { name: "Fatima A.", text: "I had a dental emergency on a Saturday and Pulpcare attended to me immediately. The service was exceptional. Thank you!", rating: 5 },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <Layout>
      <Seo
        title="Pulpcare Dental Clinic — Surulere, Lagos"
        description="Trusted dental care in Surulere, Lagos. General, cosmetic and emergency dentistry — veneers, orthodontics, clear aligners, root canal and family dental care."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pulpcare Dental Clinic",
          url: "https://pulpcaredentalclinic.lovable.app/",
        }}
      />
      {/* Hero Section — Parallax */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={clinicReception} alt="Pulpcare Dental Clinic reception in Surulere, Lagos" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/20" />
        <motion.div className="relative container-narrow mx-auto px-4 md:px-8" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-primary-foreground"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-secondary font-medium mb-3 text-sm tracking-widest uppercase"
            >
              Welcome to Pulpcare Dental Clinic
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 !text-primary-foreground"
            >
              Your Trusted Dental Care in Lagos, Nigeria
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed"
            >
              Experience world-class dental care in a warm, welcoming environment. From routine check-ups to advanced cosmetic treatments, we're here for your brightest smile.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/book-appointment">
                <MicroButton>
                  <Button size="lg" className="rounded-full px-8 text-base font-semibold h-12">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </MicroButton>
              </Link>
              <Link to="/services">
                <MicroButton>
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold h-12 bg-primary-foreground/15 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/25">
                    Our Services <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </MicroButton>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Welcome / About Section — Scrollytelling */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">About Our Clinic</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Compassionate Dental Care for the Whole Family</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Pulpcare Dental Clinic, located in the heart of Surulere, Lagos, we believe everyone deserves a healthy, beautiful smile. Our clinic brings together modern dental technology and a deeply caring approach to give you the best experience possible.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you need a routine cleaning, cosmetic enhancement, or emergency treatment, our experienced team is ready to help — with patience, professionalism, and a personal touch.
              </p>
              <div className="space-y-3 mb-8">
                {["Over 10 years of dental excellence", "Modern, sterilised equipment", "Family-friendly environment", "Affordable treatment plans", "We accept HMO patients"].map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.08} direction="left">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-pulpcare-success shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <Link to="/about">
                <MicroButton>
                  <Button variant="outline" className="rounded-full px-6">
                    Learn More About Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </MicroButton>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden shadow-xl">
                  <img src={clinicWaiting} alt="Pulpcare Dental Clinic waiting area" className="w-full h-full object-cover" />
                </div>
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                >
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-sm opacity-90">Years of Excellence</div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-pulpcare-light">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">What We Offer</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Dental Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From preventive care to advanced treatments, we offer a full range of dental services to keep your smile healthy and confident.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.06} direction="up">
                <Link to={service.path}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="group h-full hover:shadow-xl transition-shadow duration-300 border-border/50">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                        </motion.div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-10">
              <Link to="/services">
                <MicroButton>
                  <Button variant="outline" className="rounded-full px-6">
                    View All Services <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </MicroButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Why Pulpcare</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Patients Choose Us</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} direction="scale">
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-8 h-8 text-secondary" />
                  </motion.div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase — Parallax */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [-50, 50]) }}
        >
          <img src={patientSmile} alt="Happy patient at Pulpcare Dental Clinic" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center">
          <ScrollReveal direction="scale">
            <div className="text-center text-primary-foreground px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 !text-primary-foreground">Ready for a Brighter Smile?</h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
                Don't wait until it hurts. Book your appointment today and let our team take care of your dental health.
              </p>
              <Link to="/book-appointment">
                <MicroButton>
                  <Button size="lg" variant="secondary" className="rounded-full px-8 text-base font-semibold h-12">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Book Your Appointment Now
                  </Button>
                </MicroButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-pulpcare-gold">4.9</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-pulpcare-gold text-pulpcare-gold" />
                  ))}
                </div>
                <span>on Google Reviews</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-pulpcare-gold text-pulpcare-gold" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
                      <p className="font-semibold text-sm">{t.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours & Location */}
      <section className="section-padding bg-pulpcare-light">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Visit Us</p>
              <h2 className="text-3xl font-bold mb-6">Working Hours & Location</h2>
              <div className="space-y-4 mb-8">
                {[
                  { day: "Monday – Friday", time: "8:00 AM – 7:00 PM" },
                  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
                  { day: "Sunday", time: "12:00 PM – 4:00 PM" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium">{h.day}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>1 Aderibigbe Street, by Ogosco Bus Stop, Kilo, Surulere, Lagos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:08139994755" className="hover:text-primary transition-colors">0813 999 4755</a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden shadow-lg min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.3474245!3d6.5025192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dec987bf6a9%3A0xc9b95e8aca33ec0f!2sPulpCare%20Dental%20Clinic!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pulpcare Dental Clinic Location"
                  className="w-full h-full min-h-[300px]"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
