export const WHATSAPP_NUMBER = "2348139994755";

const serviceTitles: Record<string, string> = {
  "general-dentistry": "General Dentistry",
  "dental-cleaning": "Dental Cleaning",
  "tooth-extraction": "Tooth Extraction",
  "teeth-whitening": "Teeth Whitening",
  "paediatric-dentistry": "Paediatric Dentistry",
  "root-canal": "Root Canal Treatment",
  "cosmetic-dentistry": "Cosmetic Dentistry",
  "emergency-dental-care": "Emergency Dental Care",
};

const blogTitles: Record<string, string> = {
  "importance-of-regular-dental-checkups": "Why Regular Dental Check-Ups Are Important for Your Health",
  "tips-for-childrens-dental-health": "5 Tips to Keep Your Child's Teeth Healthy and Strong",
  "what-to-do-in-dental-emergency": "What to Do in a Dental Emergency: A Quick Guide",
};

/** Builds the prefilled WhatsApp message for the current route. */
export function whatsappMessageForPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";

  const serviceMatch = clean.match(/^\/services\/(.+)$/);
  if (serviceMatch) {
    const title = serviceTitles[serviceMatch[1]];
    if (title) {
      return `Hello Pulpcare! I would like to book an appointment for ${title}.`;
    }
  }

  const blogMatch = clean.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const title = blogTitles[blogMatch[1]];
    if (title) {
      return `Hello Pulpcare! I just read your article "${title}" and would like to speak with a dentist.`;
    }
  }

  switch (clean) {
    case "/services":
      return "Hello Pulpcare! I would like to know more about your dental services.";
    case "/book-appointment":
      return "Hello Pulpcare! I would like to book an appointment.";
    case "/contact":
      return "Hello Pulpcare! I have a question about your clinic.";
    case "/about":
      return "Hello Pulpcare! I would like to know more about your clinic and team.";
    case "/blog":
      return "Hello Pulpcare! I have a dental health question.";
    default:
      return "Hello Pulpcare! I would like to book an appointment.";
  }
}

export function whatsappUrlForPath(pathname: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessageForPath(pathname))}`;
}
