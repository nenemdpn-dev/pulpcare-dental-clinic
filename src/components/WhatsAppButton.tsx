import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/2348012345678?text=Hello%20Pulpcare!%20I%20would%20like%20to%20book%20an%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-pulpcare-success rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
