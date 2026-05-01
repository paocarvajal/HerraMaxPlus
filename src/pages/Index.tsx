import { Link } from "react-router-dom";
import { ArrowRight, Truck, Clock, Shield, Star, Wrench, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-cover.png";
import { motion } from "framer-motion";


const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Herramientas profesionales" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,5%,0.9)] via-[hsl(0,0%,5%,0.7)] to-transparent" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h1 className="font-display text-5xl md:text-7xl text-surface-dark-foreground leading-none mb-4">
              TODO PARA <br />
              <span className="text-gradient-amber">TU PROYECTO</span>
            </h1>
            <p className="text-surface-dark-foreground/70 text-lg mb-6">
              Herramientas, materiales y equipo profesional con entrega express en Cholula y Cuautlancingo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/catalogo">
                <Button size="lg" className="amber-gradient text-primary-foreground hover:opacity-90 font-semibold">
                  Comprar Ahora <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/renta">
                <Button size="lg" variant="outline" className="border-surface-dark-foreground/30 text-surface-dark-foreground hover:bg-surface-dark-foreground/10">
                  Rentar Herramientas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits bar */}
      <section className="bg-secondary py-4">
        <div className="container flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
          {[
            { icon: Truck, text: "Entrega Express 30-60 min" },
            { icon: Clock, text: "Lun-Sáb 8:00-20:00" },
            { icon: Shield, text: "Garantía en productos" },
            { icon: Star, text: "Programa de Lealtad" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-secondary-foreground">
              <b.icon className="w-4 h-4 text-primary" />
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">CATEGORÍAS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalogo?categoria=${cat.id}`}
                className="group bg-card border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all"
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count} productos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="section-padding bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl">PRODUCTOS DESTACADOS</h2>
            <Link to="/catalogo" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              Ver todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Services highlights */}
      <section className="section-padding">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">NUESTROS SERVICIOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "Renta de Herramientas", desc: "Equipo profesional por hora o por día. Rotomartillos, hidrolavadoras y más.", link: "/renta" },
              { icon: GraduationCap, title: "Talleres & Cursos", desc: "Aprende carpintería, electricidad y más con nuestros instructores expertos.", link: "/talleres" },
              { icon: Users, title: "Portal Profesional B2B", desc: "Precios por volumen, cotizaciones y facturación para constructoras y técnicos.", link: "/b2b" },
            ].map((s) => (
              <Link key={s.title} to={s.link} className="group bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg amber-gradient flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="industrial-gradient section-padding">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-5xl text-surface-dark-foreground mb-4">
            ¿ERES <span className="text-gradient-amber">PROFESIONAL</span>?
          </h2>
          <p className="text-surface-dark-foreground/60 mb-6 max-w-lg mx-auto">
            Regístrate en nuestro portal B2B y accede a precios especiales por volumen, cotizaciones rápidas y facturación.
          </p>
          <Link to="/b2b">
            <Button size="lg" className="amber-gradient text-primary-foreground hover:opacity-90 font-semibold">
              Registrarme como Profesional
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
