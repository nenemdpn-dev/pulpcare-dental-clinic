import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const serviceData: Record<string, { title: string; description: string; benefits: string[]; whatToExpect: string; meta: string }> = {
  "general-dentistry": {
    title: "General Dentistry",
    meta: "Comprehensive general dentistry services in Lagos — check-ups, fillings, X-rays, and preventive care at Pulpcare Dental Clinic.",
    description: "General dentistry is the foundation of a healthy smile. At Pulpcare Dental Clinic, our general dental services include comprehensive oral examinations, digital X-rays, dental fillings, gum disease treatment, and preventive care plans tailored to your individual needs. We believe in catching problems early, so regular check-ups are key to avoiding costly and painful procedures down the line. Our team will thoroughly assess your teeth, gums, and jaw, then create a personalised treatment plan to keep your mouth in top condition.",
    benefits: [
      "Comprehensive oral health assessments",
      "Early detection of cavities and gum disease",
      "Digital X-rays for precise diagnosis",
      "Custom preventive care plans",
      "Comfortable, modern treatment environment",
    ],
    whatToExpect: "Your visit begins with a friendly welcome from our reception team. You'll have a thorough examination including digital X-rays if needed. Dr. Chris will discuss his findings with you clearly, answer all your questions, and recommend the best treatment options. Most general appointments take 30–60 minutes.",
  },
  "dental-cleaning": {
    title: "Dental Cleaning",
    meta: "Professional dental cleaning and teeth polishing in Lagos — remove plaque, tartar, and stains at Pulpcare Dental Clinic.",
    description: "Professional dental cleaning goes far beyond what your toothbrush can achieve. Our hygiene team uses ultrasonic scalers and specialised instruments to remove hardened plaque (tartar) from above and below the gum line, polish your teeth to remove surface stains, and apply fluoride protection. Regular professional cleanings every six months are essential for preventing gum disease, cavities, and bad breath.",
    benefits: [
      "Removes hardened plaque and tartar",
      "Prevents gum disease and tooth decay",
      "Freshens breath and removes stains",
      "Includes fluoride treatment for added protection",
      "Quick, comfortable procedure",
    ],
    whatToExpect: "A cleaning session typically takes 45–60 minutes. Our hygienist will gently scale away tartar, polish your teeth with a professional paste, and floss between each tooth. You'll leave with a noticeably cleaner, fresher smile. We'll also provide personalised advice on improving your at-home oral care routine.",
  },
  "tooth-extraction": {
    title: "Tooth Extraction",
    meta: "Safe, painless tooth extraction in Lagos — modern anaesthesia and expert care at Pulpcare Dental Clinic.",
    description: "Sometimes a tooth needs to come out — whether due to severe decay, infection, crowding, or impaction. At Pulpcare, we perform tooth extractions with the utmost care and precision. Using modern anaesthesia techniques, we ensure the procedure is as painless as possible. Our post-extraction care includes detailed instructions and follow-up support to promote fast, comfortable healing.",
    benefits: [
      "Painless procedure with modern anaesthesia",
      "Experienced oral surgery techniques",
      "Comprehensive post-extraction care",
      "Prevention of infection spread",
      "Clear aftercare instructions provided",
    ],
    whatToExpect: "After numbing the area completely, the dentist will carefully remove the tooth using specialised instruments. The entire process usually takes 20–40 minutes. You'll receive gauze and detailed aftercare instructions. Most patients recover fully within a few days.",
  },
  "teeth-whitening": {
    title: "Teeth Whitening",
    meta: "Professional teeth whitening in Lagos — brighten your smile safely and effectively at Pulpcare Dental Clinic.",
    description: "A brighter smile can transform your confidence. Our professional whitening treatments use clinically proven, enamel-safe whitening agents that deliver results far superior to over-the-counter products. Whether your teeth are stained from coffee, tea, or natural ageing, we can help you achieve a noticeably whiter smile in just one visit.",
    benefits: [
      "Noticeably whiter teeth in one session",
      "Safe, enamel-friendly whitening agents",
      "Long-lasting results with proper care",
      "Custom treatment for your shade goals",
      "Boosts confidence and appearance",
    ],
    whatToExpect: "We'll start by assessing your current tooth shade and discussing your goals. A protective barrier is applied to your gums, then the whitening agent is carefully applied to your teeth. The session takes about 60–90 minutes, and you'll see immediate results.",
  },
  "paediatric-dentistry": {
    title: "Paediatric Dentistry",
    meta: "Gentle children's dentistry in Lagos — child-friendly dental care at Pulpcare Dental Clinic.",
    description: "We love treating our youngest patients! Paediatric dentistry at Pulpcare is all about creating positive dental experiences that set children up for a lifetime of good oral health. Our team is specially trained to handle the unique dental needs of children, from their first tooth through adolescence. We use gentle techniques, child-friendly language, and a welcoming environment to make every visit enjoyable.",
    benefits: [
      "Gentle, child-friendly approach",
      "Fun, welcoming environment for kids",
      "Preventive care including sealants and fluoride",
      "Early detection of alignment issues",
      "Education on brushing and oral hygiene habits",
    ],
    whatToExpect: "We take extra time with our young patients. The visit includes a gentle examination, cleaning, and age-appropriate education about dental hygiene. We use simple language to explain everything and make the experience fun. Parents are welcome to stay during the entire visit.",
  },
  "root-canal": {
    title: "Root Canal Treatment",
    meta: "Pain-free root canal treatment in Lagos — save your natural teeth at Pulpcare Dental Clinic.",
    description: "A root canal treatment saves a tooth that's been badly damaged by decay or infection. Despite its reputation, modern root canal therapy is virtually painless and no more uncomfortable than getting a filling. At Pulpcare, we use advanced techniques and anaesthesia to ensure your comfort throughout the procedure. Saving your natural tooth is always preferred over extraction when possible.",
    benefits: [
      "Saves your natural tooth from extraction",
      "Eliminates pain from infection",
      "Virtually painless with modern anaesthesia",
      "Prevents spread of infection to other teeth",
      "Restores full tooth function with a crown",
    ],
    whatToExpect: "After thorough numbing, the dentist accesses the tooth's inner chamber, removes the infected tissue, cleans and shapes the canals, then fills and seals them. The procedure typically requires 1–2 visits. A crown is usually recommended afterward to protect the treated tooth.",
  },
  "cosmetic-dentistry": {
    title: "Cosmetic Dentistry",
    meta: "Cosmetic dentistry and smile makeovers in Lagos — veneers, bonding, and more at Pulpcare Dental Clinic.",
    description: "Your smile is one of the first things people notice. Our cosmetic dentistry services are designed to enhance the appearance of your teeth and give you the smile you've always wanted. From dental veneers and bonding to complete smile makeovers, we combine artistry with dental science to deliver natural-looking, beautiful results.",
    benefits: [
      "Custom porcelain and composite veneers",
      "Dental bonding for chips and gaps",
      "Complete smile design and makeovers",
      "Natural-looking, durable results",
      "Personalised treatment plans",
    ],
    whatToExpect: "We begin with a detailed consultation to understand your aesthetic goals. Digital imaging may be used to preview your new smile. Treatment timelines vary depending on the procedures chosen — some treatments can be completed in a single visit, while others require multiple appointments.",
  },
  "emergency-dental-care": {
    title: "Emergency Dental Care",
    meta: "Emergency dental care in Lagos — urgent treatment for dental injuries and severe pain at Pulpcare Dental Clinic.",
    description: "Dental emergencies don't wait, and neither should you. Whether you've knocked out a tooth, have severe toothache, a broken filling, or a dental abscess, our team is ready to provide urgent care when you need it most. We prioritise emergency cases and strive to see you as quickly as possible — walk-ins are welcome during clinic hours.",
    benefits: [
      "Same-day emergency appointments available",
      "Walk-ins welcome during clinic hours",
      "Rapid pain relief and treatment",
      "Experienced handling of dental trauma",
      "Follow-up care to ensure full recovery",
    ],
    whatToExpect: "Contact us immediately by phone or WhatsApp. We'll advise you on immediate first-aid steps and schedule you for the earliest available slot. On arrival, we'll assess the situation quickly, manage your pain, and begin treatment right away.",
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services"><Button variant="outline" className="rounded-full">Back to Services</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold !text-primary-foreground">
            {service.title}
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6">About This Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">{service.description}</p>

              <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
              <div className="space-y-3 mb-10">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pulpcare-success mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">{service.whatToExpect}</p>

              <div className="bg-pulpcare-light rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-3">Ready to Book?</h3>
                <p className="text-muted-foreground mb-6">Schedule your {service.title.toLowerCase()} appointment today.</p>
                <Link to="/book-appointment">
                  <Button size="lg" className="rounded-full px-8 font-semibold">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
