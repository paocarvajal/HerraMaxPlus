import { useState } from "react";
import { Wrench, Zap, Droplets, Hammer, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const specialties = [
  { id: "plomero", label: "Plomería", icon: Droplets },
  { id: "electricista", label: "Electricidad", icon: Zap },
  { id: "carpintero", label: "Carpintería", icon: Hammer },
  { id: "albañil", label: "Albañilería", icon: Wrench },
];

const Contractors = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", experience: "", bio: "" });

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || selected.length === 0) {
      toast({ title: "Campos requeridos", description: "Nombre, teléfono y al menos una especialidad son obligatorios.", variant: "destructive" });
      return;
    }
    if (form.phone.trim().length < 10) {
      toast({ title: "Teléfono inválido", description: "Ingresa un número de al menos 10 dígitos.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "¡Registro recibido!", description: "Nos pondremos en contacto contigo pronto." });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md mx-auto p-8">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl mb-2">¡GRACIAS!</h2>
          <p className="text-muted-foreground">Tu información ha sido recibida. Nuestro equipo revisará tu perfil y te contactará para formar parte de nuestra red de colaboradores.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="industrial-gradient py-16 md:py-24">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-6xl text-surface-dark-foreground mb-4">
              ÚNETE A NUESTRA RED DE{" "}
              <span className="text-gradient-amber">PROFESIONALES</span>
            </h1>
            <p className="text-surface-dark-foreground/60 max-w-2xl mx-auto text-lg">
              ¿Eres plomero, electricista, carpintero o albañil? Regístrate y conecta con clientes que necesitan tus servicios en Cholula y alrededores.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Clientes Constantes", desc: "Te referimos directamente con clientes que buscan servicios profesionales." },
              { title: "Sin Costo", desc: "El registro es completamente gratuito. Solo necesitas tus datos y ganas de trabajar." },
              { title: "Crece tu Reputación", desc: "Los clientes dejan reseñas y calificaciones que fortalecen tu perfil." },
            ].map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-lg p-6 text-center">
                <h3 className="font-display text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-8">REGISTRA TUS DATOS</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Specialties */}
            <div>
              <Label className="mb-3 block">Especialidades *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {specialties.map((s) => {
                  const active = selected.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggle(s.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <s.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre completo *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} placeholder="Juan Pérez" />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono *</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} placeholder="222 123 4567" />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} placeholder="juan@email.com" />
              </div>
              <div>
                <Label htmlFor="city">Ciudad / Zona</Label>
                <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={100} placeholder="Cholula, Puebla" />
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Años de experiencia</Label>
              <Input id="experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} maxLength={50} placeholder="Ej: 5 años" />
            </div>

            <div>
              <Label htmlFor="bio">Cuéntanos sobre tu trabajo</Label>
              <Textarea id="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} maxLength={500} rows={4} placeholder="Describe los servicios que ofreces, herramientas con las que cuentas, zonas que cubres..." />
            </div>

            <Button type="submit" size="lg" className="w-full amber-gradient text-primary-foreground hover:opacity-90 font-semibold">
              Enviar mi Registro
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contractors;
