import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight text-foreground">Pulpcare</span>
            <span className="text-xs text-muted-foreground leading-tight">Dental Clinic</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+2348012345678" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span>+234 801 234 5678</span>
          </a>
          <Link to="/book-appointment">
            <Button className="rounded-full px-6 font-semibold">
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/book-appointment" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full font-semibold mt-4">
                    Book Appointment
                  </Button>
                </Link>
                <a href="tel:+2348012345678" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <Phone className="w-4 h-4" />
                  <span>+234 801 234 5678</span>
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
