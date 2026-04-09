import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/522221234567?text=Hola%2C%20me%20interesa%20un%20producto%20de%20Herramax%20Plus"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
    aria-label="Contactar por WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-card" />
  </a>
);

export default WhatsAppButton;
