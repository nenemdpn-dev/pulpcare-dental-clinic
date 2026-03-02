import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Heart, Clock, Star, Award, Users, Stethoscope,
  Smile, Sparkles, Baby, Syringe, Zap, ArrowRight, CheckCircle2,
  MapPin, Phone, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-dental.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Comprehensive check-ups, fillings, and preventive care for your whole family.", path: "/services/general-dentistry" },
  { icon: Sparkles, title: "Dental Cleaning", desc: "Professional scaling and polishing to keep your teeth sparkling clean and healthy.", path: "/services/dental-cleaning" },
  { icon: Syringe, title: "Tooth Extraction", desc: "Safe, painless tooth removal using modern techniques and anaesthesia.", path: "/services/tooth-extraction" },
  { icon: Smile, title: "Teeth Whitening", desc: "Brighten your smile with our professional in-office whitening treatments.", path: "/services/teeth-whitening" },
  { icon: Baby, title: "Paediatric Dentistry", desc: "Gentle, child-friendly dental care designed to make kids feel comfortable.", path: "/services/paediatric-dentistry" },
  { icon: Heart, title: "Root Canal Treatment", desc: "Pain-free root canal therapy to save your natural teeth and relieve discomfort.", path: "/services/root-canal" },
  { icon: Award, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers to give you the confident smile you deserve.", path: "/services/cosmetic-dentistry" },
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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Modern dental clinic interior at Pulpcare Dental Clinic Lagos" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
        </div>
        <div className="relative container-narrow mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl text-primary-foreground"
          >
            <motion.p variants={fadeInUp} className="text-secondary font-medium mb-3 text-sm tracking-widest uppercase">
              Welcome to Pulpcare Dental Clinic
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 !text-primary-foreground">
              Your Trusted Dental Care in Lagos
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Experience world-class dental care in a warm, welcoming environment. From routine check-ups to advanced treatments, we're here for your brightest smile.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link to="/book-appointment">
                <Button size="lg" className="rounded-full px-8 text-base font-semibold h-12">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">About Our Clinic</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Compassionate Dental Care for the Whole Family</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Pulpcare Dental Clinic, we believe everyone deserves a healthy, beautiful smile. Founded by Dr. Chris, our clinic brings together modern dental technology and a deeply caring approach to give you the best experience possible.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you need a routine cleaning, cosmetic enhancement, or emergency treatment, our experienced team is ready to help — with patience, professionalism, and a personal touch.
              </p>
              <div className="space-y-3 mb-8">
                {["Over 10 years of dental excellence", "Modern, sterilised equipment", "Family-friendly environment", "Affordable treatment plans"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-pulpcare-success shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="outline" className="rounded-full px-6">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden shadow-xl">
                <img src={heroImage} alt="Pulpcare Dental Clinic facility" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-pulpcare-light">
        <div className="container-narrow mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-primary font-medium text-sm tracking-widest uppercase mb-3">What We Offer</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Dental Services</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
              From preventive care to advanced treatments, we offer a full range of dental services to keep your smile healthy and confident.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Link to={service.path}>
                  <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" className="rounded-full px-6">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <div className="text-center mb-12">
              <motion.p variants={fadeInUp} className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Why Pulpcare</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">Why Patients Choose Us</motion.h2>
            </div>

            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item) => (
                <motion.div key={item.title} variants={fadeInUp} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 !text-primary-foreground">
              Ready for a Brighter Smile?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg opacity-90 max-w-xl mx-auto mb-8">
              Don't wait until it hurts. Book your appointment today and let our team take care of your dental health.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/book-appointment">
                <Button size="lg" variant="secondary" className="rounded-full px-8 text-base font-semibold h-12">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Book Your Appointment Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <div className="text-center mb-12">
              <motion.p variants={fadeInUp} className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Testimonials</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</motion.h2>
            </div>

            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={fadeInUp}>
                  <Card className="h-full border-border/50">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-pulpcare-gold text-pulpcare-gold" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
                      <p className="font-semibold text-sm">{t.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Working Hours & Location */}
      <section className="section-padding bg-pulpcare-light">
        <div className="container-narrow mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Visit Us</p>
              <h2 className="text-3xl font-bold mb-6">Working Hours & Location</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-medium">Monday – Friday</span>
                  <span className="text-muted-foreground">8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-medium">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>123 Medical Road, Ikeja, Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+2348012345678" className="hover:text-primary transition-colors">+234 801 234 5678</a>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden shadow-lg bg-muted min-h-[300px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Map Placeholder</p>
                <p className="text-sm text-muted-foreground">Google Maps embed will appear here in the WordPress build</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
