import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import MicroButton from "@/components/MicroButton";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const Contact = () => {
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
  };

  return (
    <Layout>
      <Seo
        title="Contact Us | Pulpcare Dental Clinic Lagos"
        description="Contact Pulpcare Dental Clinic in Surulere, Lagos — call, WhatsApp or visit us at 1 Aderibigbe Street, Kilo. Open 7 days a week."
        path="/contact"
      />
      <section ref={heroRef} className="relative py-24 md:py-32 bg-foreground text-primary-foreground overflow-hidden">
        <motion.div className="absolute inset-0 opacity-20" style={{ y: heroY }}>
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/20" />
        </motion.div>
        <div className="relative container-narrow mx-auto px-4 md:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4 !text-primary-foreground">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-lg opacity-90 max-w-2xl mx-auto">
            Have a question or want to book an appointment? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" placeholder="Full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="0813..." required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} required />
                </div>
                <MicroButton>
                  <Button type="submit" size="lg" className="rounded-full px-8 font-semibold">Send Message</Button>
                </MicroButton>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <div className="space-y-5">
                    {[
                      { icon: MapPin, title: "Our Address", content: "1 Aderibigbe Street, by Ogosco Bus Stop, Kilo, Surulere, Lagos", href: "https://www.google.com/maps/place/PulpCare+Dental+Clinic" },
                      { icon: Phone, title: "Phone", content: "0813 999 4755", href: "tel:08139994755" },
                      { icon: Mail, title: "Email", content: "info@pulpcaredentalclinic.com.ng", href: "mailto:info@pulpcaredentalclinic.com.ng" },
                    ].map((item) => (
                      <motion.div key={item.title} className="flex items-start gap-4" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <a href={item.href} target={item.title === "Our Address" ? "_blank" : undefined} className="text-muted-foreground text-sm hover:text-primary transition-colors">{item.content}</a>
                        </div>
                      </motion.div>
                    ))}
                    <motion.div className="flex items-start gap-4" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                      <div className="w-12 h-12 rounded-xl bg-pulpcare-success/10 flex items-center justify-center shrink-0">
                        <img src={whatsappIcon} alt="" className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">WhatsApp</h3>
                        <a href="https://wa.me/2348139994755" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                          Chat with us on WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Working Hours</h3>
                  <div className="space-y-3">
                    {[
                      { day: "Monday – Friday", time: "8:00 AM – 7:00 PM" },
                      { day: "Saturday", time: "9:00 AM – 6:00 PM" },
                      { day: "Sunday", time: "12:00 PM – 4:00 PM" },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm font-medium">{h.day}</span>
                        <span className="text-sm text-muted-foreground">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden min-h-[250px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.3474245!3d6.5025192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dec987bf6a9%3A0xc9b95e8aca33ec0f!2sPulpCare%20Dental%20Clinic!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Pulpcare Dental Clinic Location"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
