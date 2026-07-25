import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Award, Heart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import MicroButton from "@/components/MicroButton";
import clinicWaiting from "@/assets/clinic-waiting-room.jpg";
import clinicReception from "@/assets/dr-chris-office.jpg";
import dentistPatient from "@/assets/dr-chris-scan.jpg";

const values = [
  { icon: Heart, title: "Patient First", desc: "Every decision we make starts with what's best for our patients." },
  { icon: Award, title: "Clinical Excellence", desc: "We follow international best practices and continuously update our skills." },
  { icon: Users, title: "Community Focus", desc: "We're proud to serve the Surulere and greater Lagos community with accessible, affordable dental care." },
];

const About = () => {
  return (
    <Layout>
      <Seo
        title="About Us | Pulpcare Dental Clinic"
        description="Meet the Pulpcare Dental Clinic team in Surulere, Lagos — Dr. Chris and certified dental experts delivering compassionate, modern dental care."
        path="/about"
      />
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={clinicReception} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-narrow mx-auto px-4 md:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4 !text-primary-foreground">
            About Pulpcare Dental Clinic
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-lg opacity-90 max-w-2xl mx-auto">
            A modern dental practice built on trust, expertise, and genuine care for every patient in Surulere, Lagos, Nigeria.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Building Healthier Smiles in Lagos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pulpcare Dental Clinic was founded with a simple but powerful vision: to make quality dental care accessible, comfortable, and affordable for every Nigerian. Located at Aderibigbe Street, Kilo, Surulere, our clinic has grown into one of the area's most trusted dental practices.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We understand that visiting the dentist can be stressful. That's why we've built an environment where patients feel welcome, informed, and at ease. From the moment you walk in, our friendly team ensures you receive personalised attention and the highest standard of care.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our clinic is equipped with modern dental technology, and our team regularly undergoes training to stay current with the latest techniques and best practices in dentistry. We are especially known for our expertise in root canal treatments, crown and bridges, orthodontics, clear aligners, and other advanced dental treatments.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden shadow-xl">
                <img src={clinicWaiting} alt="Pulpcare Dental Clinic waiting room" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dr. Chris */}
      <section className="section-padding bg-pulpcare-light">
        <div className="container-narrow mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" className="order-2 md:order-1">
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden shadow-xl">
                <img src={dentistPatient} alt="Dentist with patient at Pulpcare" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 md:order-2">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Meet the Team</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Expert Dental Professionals</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our team consists of highly skilled and compassionate dental professionals with extensive experience in general and cosmetic dentistry. Each team member is trained to provide the highest standard of care with a warm, patient-first approach.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Known for our calm demeanour and thorough approach, we take the time to explain every procedure, answer your questions, and ensure you feel confident about your treatment plan. We believe that a well-informed patient is a happier patient.
              </p>
              <div className="space-y-3">
                {["Certified dental professionals", "Member, Nigerian Dental Association", "Specialists in Root Canal, Endodontics, Veneers, Orthodontics & Clear Aligners", "Over 5,000 successful procedures", "We accept HMO patients"].map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.06}>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-pulpcare-success shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto text-center">
          <ScrollReveal>
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">What Drives Us Every Day</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1} direction="scale">
                <div className="p-6">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <v.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container-narrow mx-auto px-4">
          <ScrollReveal direction="scale">
            <h2 className="text-3xl font-bold mb-4 !text-primary-foreground">Experience the Pulpcare Difference</h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">Book a visit today and see why patients across Surulere and Lagos trust us with their smiles.</p>
            <Link to="/book-appointment">
              <MicroButton>
                <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold">
                  Book Appointment <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </MicroButton>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
