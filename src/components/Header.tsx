import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/pulpcare-logo.png";

const serviceLinks = [
  { label: "General Dentistry", path: "/services/general-dentistry" },
  { label: "Dental Cleaning", path: "/services/dental-cleaning" },
  { label: "Tooth Extraction", path: "/services/tooth-extraction" },
  { label: "Teeth Whitening", path: "/services/teeth-whitening" },
  { label: "Paediatric Dentistry", path: "/services/paediatric-dentistry" },
  { label: "Root Canal Treatment", path: "/services/root-canal" },
  { label: "Cosmetic Dentistry", path: "/services/cosmetic-dentistry" },
  { label: "Emergency Dental Care", path: "/services/emergency-dental-care" },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services", hasDropdown: true },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Pulpcare Dental Clinic Logo" className="h-12 w-auto" />
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight text-foreground">Pulpcare</span>
            <span className="text-xs text-muted-foreground leading-tight">Dental Clinic</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setMegaOpen(true)}
              onMouseLeave={() => link.hasDropdown && setMegaOpen(false)}
            >
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1 py-2 ${
                  location.pathname === link.path || (link.hasDropdown && location.pathname.startsWith("/services"))
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                )}
              </Link>

              {/* Mega Dropdown */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    >
                      <div className="bg-card rounded-xl shadow-2xl border border-border p-4 w-[520px] grid grid-cols-2 gap-1">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.path}
                            to={s.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary/40" />
                            {s.label}
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          className="col-span-2 mt-2 pt-2 border-t border-border text-center text-sm font-semibold text-primary hover:underline"
                        >
                          View All Services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:08139994755" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span>0813 999 4755</span>
          </a>
          <Link to="/book-appointment">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button className="rounded-full px-6 font-semibold">Book Appointment</Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card overflow-y-auto">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => !link.hasDropdown && setOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary block py-1 ${
                        location.pathname === link.path ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.path}
                            to={s.path}
                            onClick={() => setOpen(false)}
                            className="block text-sm text-muted-foreground hover:text-primary py-1.5"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link to="/book-appointment" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full font-semibold mt-4">Book Appointment</Button>
                </Link>
                <a href="tel:08139994755" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <Phone className="w-4 h-4" /><span>0813 999 4755</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
