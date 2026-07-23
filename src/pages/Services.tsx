import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Sparkles, Syringe, Smile, Baby, Heart, Award, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import MicroButton from "@/components/MicroButton";

const services = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Comprehensive check-ups, fillings, X-rays, and preventive care to maintain your oral health.", slug: "general-dentistry" },
  { icon: Sparkles, title: "Dental Cleaning", desc: "Professional scaling and polishing to remove plaque, tartar, and stains for a fresh, clean smile.", slug: "dental-cleaning" },
  { icon: Syringe, title: "Tooth Extraction", desc: "Safe, painless tooth removal using modern techniques, anaesthesia, and post-care guidance.", slug: "tooth-extraction" },
  { icon: Smile, title: "Teeth Whitening", desc: "Professional whitening treatments to brighten your smile safely and effectively.", slug: "teeth-whitening" },
  { icon: Baby, title: "Paediatric Dentistry", desc: "Gentle, child-friendly dental care designed to make kids feel comfortable and build healthy habits.", slug: "paediatric-dentistry" },
  { icon: Heart, title: "Root Canal Treatment", desc: "Pain-free root canal therapy to save damaged teeth and relieve infection discomfort.", slug: "root-canal" },
  { icon: Award, title: "Cosmetic Dentistry", desc: "Veneers, bonding, orthodontics, clear aligners, and complete smile makeovers.", slug: "cosmetic-dentistry" },
  { icon: Zap, title: "Emergency Dental Care", desc: "Urgent dental attention for injuries, severe pain, or sudden issues — walk-ins welcome.", slug: "emergency-dental-care" },
];

const Services = () => {
  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4 !text-primary-foreground">
            Our Dental Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-lg opacity-90 max-w-2xl mx-auto">
            From routine care to specialised treatments, we provide everything your smile needs under one roof.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 0.06}>
                <Link to={`/services/${s.slug}`}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="group h-full hover:shadow-xl transition-shadow duration-300 border-border/50">
                      <CardContent className="p-8">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                        >
                          <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                        <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container-narrow mx-auto px-4">
          <ScrollReveal direction="scale">
            <h2 className="text-3xl font-bold mb-4 !text-primary-foreground">Need a Service Not Listed?</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">Contact us to discuss your dental needs. We're happy to help with any oral health concern.</p>
            <Link to="/contact">
              <MicroButton>
                <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold">
                  Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </MicroButton>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
