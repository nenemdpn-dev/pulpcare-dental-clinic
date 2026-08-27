import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";

const blogPosts: Record<string, { title: string; date: string; isoDate: string; category: string; content: string[]; image: string }> = {
  "importance-of-regular-dental-checkups": {
    title: "Why Regular Dental Check-Ups Are Important for Your Health",
    date: "January 15, 2026",
    isoDate: "2026-01-15",
    image: "https://pulpcaredentalclinic.lovable.app/favicon.png",
    category: "Preventive Care",
    content: [
      "Many Nigerians only visit the dentist when something hurts — a toothache, a broken filling, or swollen gums. While we're always happy to help in those situations, the truth is that regular dental check-ups can prevent most of these problems from occurring in the first place.",
      "During a routine check-up, your dentist examines your teeth, gums, tongue, and the soft tissues of your mouth for any signs of trouble. This includes looking for early-stage cavities, gum inflammation, oral cancer, and signs of teeth grinding or jaw problems.",
      "Professional dental cleanings, which are typically done during your check-up visit, remove hardened plaque (tartar) that you can't remove with regular brushing. Left untreated, tartar buildup leads to gum disease — the leading cause of tooth loss in adults.",
      "The Nigerian Dental Association recommends visiting your dentist at least twice a year for a check-up and cleaning. If you have existing dental conditions, your dentist may recommend more frequent visits.",
      "At Pulpcare Dental Clinic, we make your check-up experience comfortable, thorough, and informative. We take the time to explain our findings and help you understand the best path forward for your oral health. Book your check-up today — prevention is always better (and cheaper) than cure!",
    ],
  },
  "tips-for-childrens-dental-health": {
    title: "5 Tips to Keep Your Child's Teeth Healthy and Strong",
    date: "December 8, 2025",
    isoDate: "2025-12-08",
    image: "https://pulpcaredentalclinic.lovable.app/favicon.png",
    category: "Paediatric Dentistry",
    content: [
      "As parents, we want the best for our children — and that includes their dental health. Starting good oral hygiene habits early sets the foundation for a lifetime of healthy smiles. Here are five practical tips every Nigerian parent should know.",
      "1. Start Early: Begin cleaning your baby's gums with a soft, damp cloth even before teeth appear. Once the first tooth erupts, switch to a baby toothbrush with a rice-grain-sized amount of fluoride toothpaste.",
      "2. Make Brushing Fun: Let your child choose their own colourful toothbrush. Play a two-minute song while they brush. Make it a family activity — children learn best by watching their parents.",
      "3. Limit Sugary Snacks and Drinks: Frequent exposure to sugar is the main cause of cavities in children. Encourage water and healthy snacks. If your child has sweets, follow up with water or brushing.",
      "4. Schedule Regular Dental Visits: Your child should see a dentist by their first birthday or within six months of their first tooth appearing. Regular visits help catch problems early and make the dental office a familiar, non-scary place.",
      "5. Consider Dental Sealants: Ask your dentist about sealants — thin protective coatings applied to the chewing surfaces of back teeth. They're one of the most effective ways to prevent cavities in children.",
    ],
  },
  "what-to-do-in-dental-emergency": {
    title: "What to Do in a Dental Emergency: A Quick Guide",
    date: "November 22, 2025",
    isoDate: "2025-11-22",
    image: "https://pulpcaredentalclinic.lovable.app/favicon.png",
    category: "Emergency Care",
    content: [
      "Dental emergencies can happen anytime — during a football match, while eating, or even in the middle of the night. Knowing what to do in those critical first minutes can mean the difference between saving and losing a tooth.",
      "Knocked-Out Tooth: Pick up the tooth by the crown (the white part), not the root. Rinse it gently with water — don't scrub it. Try to place it back in the socket. If you can't, keep it in milk or saline solution. Get to a dentist within 30 minutes for the best chance of saving the tooth.",
      "Severe Toothache: Rinse your mouth with warm salt water. Use dental floss to remove any food trapped between teeth. Take over-the-counter pain medication as directed. Do not place aspirin directly on the gum — this can cause a chemical burn. See your dentist as soon as possible.",
      "Broken or Cracked Tooth: Rinse your mouth with warm water. Apply a cold compress to reduce swelling. Save any broken pieces. See your dentist immediately.",
      "Lost Filling or Crown: If you lose a filling, you can temporarily fill the cavity with sugar-free chewing gum. If a crown falls off, try to slip it back on with denture adhesive or toothpaste as a temporary measure. See your dentist promptly.",
      "At Pulpcare Dental Clinic, we prioritise emergency cases and do our best to see you the same day. Save our number — 0813 999 4755 — and don't hesitate to call or message us on WhatsApp if you have a dental emergency.",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog"><Button variant="outline" className="rounded-full">Back to Blog</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo
        title={`${post.title} | Pulpcare Dental Blog`}
        description={`${post.content[0].slice(0, 150).trim()}…`}
        path={`/blog/${slug}`}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.content[0].slice(0, 200),
            image: [post.image],
            datePublished: post.isoDate,
            dateModified: post.isoDate,
            author: { "@type": "Person", name: "Dr. Chris", url: "https://pulpcaredentalclinic.lovable.app/about" },
            publisher: {
              "@type": "Organization",
              name: "Pulpcare Dental Clinic",
              logo: {
                "@type": "ImageObject",
                url: "https://pulpcaredentalclinic.lovable.app/favicon.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pulpcaredentalclinic.lovable.app/blog/${slug}`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://pulpcaredentalclinic.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://pulpcaredentalclinic.lovable.app/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://pulpcaredentalclinic.lovable.app/blog/${slug}` },
            ],
          },
        ]}
      />
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-6 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-4 !text-primary-foreground max-w-3xl">
            {post.title}
          </motion.h1>
          <div className="flex items-center gap-4 text-sm opacity-70">
            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Dr. Chris</span>
            <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">{post.category}</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto max-w-3xl">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-lg max-w-none">
            {post.content.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">{p}</p>
            ))}
          </motion.article>

          <div className="bg-pulpcare-light rounded-2xl p-8 text-center mt-12">
            <h2 className="text-xl font-bold mb-3">Need Dental Care?</h2>
            <p className="text-muted-foreground mb-6">Book an appointment with our experienced team today.</p>
            <Link to="/book-appointment">
              <Button className="rounded-full px-8 font-semibold">Book Appointment</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
