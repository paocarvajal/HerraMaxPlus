import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoHerramax from "@/assets/logo-herramax-white.png";

const Footer = () => (
  <footer className="industrial-gradient text-surface-dark-foreground">
    <div className="container section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <img src={logoHerramax} alt="Herramax Plus" className="h-14 w-auto" />
          </div>
          <p className="text-sm text-surface-dark-foreground/60 mb-4">
            Tu ferretería de confianza en Cholula. Herramientas, materiales y soluciones para cada proyecto.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-lg mb-4 text-primary">NAVEGACIÓN</h4>
          <div className="space-y-2 text-sm text-surface-dark-foreground/60">
            <Link to="/catalogo" className="block hover:text-primary transition-colors">Tienda</Link>
            <Link to="/renta" className="block hover:text-primary transition-colors">Renta de Herramientas</Link>
            <Link to="/talleres" className="block hover:text-primary transition-colors">Talleres</Link>
            <Link to="/blog" className="block hover:text-primary transition-colors">¿Sabías que?</Link>
            <Link to="/b2b" className="block hover:text-primary transition-colors">Profesionales B2B</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg mb-4 text-primary">CONTACTO</h4>
          <div className="space-y-3 text-sm text-surface-dark-foreground/60">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Av. Reforma 123, Cholula, Puebla</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> (222) 123-4567</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@herramaxplus.mx</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Lun-Sáb 8:00 - 20:00</div>
          </div>
        </div>

        {/* Map */}
        <div>
          <h4 className="font-display text-lg mb-4 text-primary">UBICACIÓN</h4>
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.123!2d-98.303!3d19.063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzQ2LjgiTiA5OMKwMTgnMTAuOCJX!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ubicación Herramax Plus"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-surface-dark-foreground/10 text-center text-sm text-surface-dark-foreground/40">
        © 2026 Herramax Plus Ferretería. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
