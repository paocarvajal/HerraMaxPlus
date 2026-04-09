import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import logoHerramax from "@/assets/logo-herramax-white.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  const links = [
    { to: "/catalogo", label: "Tienda" },
    { to: "/renta", label: "Renta" },
    { to: "/talleres", label: "Talleres" },
    { to: "/blog", label: "¿Sabías que?" },
    { to: "/b2b", label: "Profesionales" },
    { to: "/lealtad", label: "Puntos" },
    { to: "/contratistas", label: "Contratistas" },
  ];

  return (
    <nav className="sticky top-0 z-50 industrial-gradient border-b border-border/20">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src={logoHerramax} alt="Herramax Plus" className="h-12 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-surface-dark-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/catalogo" className="text-surface-dark-foreground/80 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/carrito" className="relative text-surface-dark-foreground/80 hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-surface-dark-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden industrial-gradient border-t border-border/20 pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block px-4 py-3 text-sm font-medium text-surface-dark-foreground/80 hover:text-primary hover:bg-secondary/20 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
