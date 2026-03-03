import { motion } from "framer-motion";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/2348139994755?text=Hello%20Pulpcare!%20I%20would%20like%20to%20book%20an%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:shadow-pulpcare-success/40"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
    >
      <img src={whatsappIcon} alt="WhatsApp" className="w-16 h-16 drop-shadow-lg" />
    </motion.a>
  );
};

export default WhatsAppButton;
