import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Book Appointment", path: "/book-appointment" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const serviceLinks = [
  { label: "General Dentistry", path: "/services/general-dentistry" },
  { label: "Dental Cleaning", path: "/services/dental-cleaning" },
  { label: "Teeth Whitening", path: "/services/teeth-whitening" },
  { label: "Root Canal Treatment", path: "/services/root-canal" },
  { label: "Cosmetic Dentistry", path: "/services/cosmetic-dentistry" },
  { label: "Emergency Dental Care", path: "/services/emergency-dental-care" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-narrow mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight">Pulpcare</span>
                <span className="text-xs opacity-70 leading-tight">Dental Clinic</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted partner for comprehensive dental care in Lagos, Nigeria. We combine modern techniques with compassionate care for the whole family.
            </p>
            <a
              href="https://wa.me/2348012345678?text=Hello%20Pulpcare!%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pulpcare-success text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>123 Medical Road, Ikeja, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-80">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-primary transition-colors">+234 801 234 5678</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-80">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@pulpcaredentalclinic.com.ng" className="hover:text-primary transition-colors">info@pulpcaredentalclinic.com.ng</a>
              </li>
              <li className="flex items-start gap-2.5 text-sm opacity-80">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
                  <p>Sat: 9:00 AM – 3:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Pulpcare Dental Clinic. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
