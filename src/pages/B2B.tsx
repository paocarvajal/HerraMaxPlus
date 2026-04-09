import { Building2, FileText, Repeat, Receipt, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const benefits = [
  { icon: FileText, title: "Cotizaciones Rápidas", desc: "Recibe cotizaciones en menos de 24 horas para tus proyectos grandes." },
  { icon: Receipt, title: "Facturación", desc: "Factura electrónica CFDI automática en cada compra." },
  { icon: Repeat, title: "Pedidos Recurrentes", desc: "Programa tus pedidos frecuentes y olvídate de reordenar." },
  { icon: Building2, title: "Precios por Volumen", desc: "Descuentos exclusivos para compras mayoristas." },
];

const B2B = () => (
  <div className="section-padding">
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl mb-2">PORTAL PROFESIONAL <span className="text-gradient-amber">B2B</span></h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Constructoras, electricistas, plomeros y carpinteros: obtén precios especiales, cotizaciones rápidas y facturación automática.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 p-5 bg-card border border-border rounded-lg">
              <div className="w-10 h-10 rounded-lg amber-gradient flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration form */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="font-display text-2xl mb-6">SOLICITA TU CUENTA PROFESIONAL</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Solicitud enviada. Te contactaremos en menos de 24 horas.");
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Nombre completo" required />
              <Input placeholder="Empresa o razón social" required />
              <Input type="email" placeholder="Correo electrónico" required />
              <Input type="tel" placeholder="Teléfono" required />
            </div>
            <Input placeholder="RFC (para facturación)" />
            <Textarea placeholder="Describe tu giro o los materiales que sueles comprar..." rows={3} />
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
              Al registrarte aceptas recibir comunicaciones comerciales de Herramax Plus.
            </div>
            <Button type="submit" size="lg" className="amber-gradient text-primary-foreground hover:opacity-90 font-semibold">
              Enviar Solicitud
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default B2B;
