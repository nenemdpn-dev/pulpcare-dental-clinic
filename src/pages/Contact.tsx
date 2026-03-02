import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
  };

  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8 text-center">
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" placeholder="Full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="+234..." required />
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
                <Button type="submit" size="lg" className="rounded-full px-8 font-semibold">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Our Address</h3>
                      <p className="text-muted-foreground text-sm">123 Medical Road, Ikeja, Lagos, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+2348012345678" className="text-muted-foreground text-sm hover:text-primary transition-colors">+234 801 234 5678</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@pulpcaredentalclinic.com.ng" className="text-muted-foreground text-sm hover:text-primary transition-colors">info@pulpcaredentalclinic.com.ng</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Working Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm font-medium">Monday – Friday</span>
                    <span className="text-sm text-muted-foreground">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm font-medium">Saturday</span>
                    <span className="text-sm text-muted-foreground">9:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm font-medium">Sunday</span>
                    <span className="text-sm text-muted-foreground">Closed</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden bg-muted min-h-[250px] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium text-sm">Google Maps embed placeholder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
