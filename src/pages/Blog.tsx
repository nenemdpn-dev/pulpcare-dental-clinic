import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import dentalPattern from "@/assets/dental-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const posts = [
  {
    slug: "importance-of-regular-dental-checkups",
    title: "Why Regular Dental Check-Ups Are Important for Your Health",
    excerpt: "Many people only visit the dentist when something hurts. But regular check-ups are your best defence against cavities, gum disease, and more serious conditions.",
    date: "January 15, 2026",
    category: "Preventive Care",
  },
  {
    slug: "tips-for-childrens-dental-health",
    title: "5 Tips to Keep Your Child's Teeth Healthy and Strong",
    excerpt: "Starting dental care early sets your child up for a lifetime of healthy smiles. Here are five practical tips every Nigerian parent should know.",
    date: "December 8, 2025",
    category: "Paediatric Dentistry",
  },
  {
    slug: "what-to-do-in-dental-emergency",
    title: "What to Do in a Dental Emergency: A Quick Guide",
    excerpt: "Knocked-out tooth? Sudden severe pain? Knowing what to do in the first few minutes can save your tooth. Here's your emergency action plan.",
    date: "November 22, 2025",
    category: "Emergency Care",
  },
];

const Blog = () => {
  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="container-narrow mx-auto px-4 md:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4 !text-primary-foreground">
            Dental Health Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-lg opacity-90 max-w-2xl mx-auto">
            Expert dental advice, tips, and insights from the Pulpcare team to help you maintain a healthy, beautiful smile.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-narrow mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <Link to={`/blog/${post.slug}`}>
                  <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden">
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img src={dentalPattern} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" /> {post.date}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
