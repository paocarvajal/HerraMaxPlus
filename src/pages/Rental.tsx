import { rentalTools } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

const Rental = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="font-display text-4xl md:text-5xl mb-2">RENTA DE HERRAMIENTAS</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Equipo profesional por hora o por día. Incluye asesoría de uso y entrega disponible.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalTools.map((tool) => (
          <div key={tool.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted overflow-hidden">
              <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{tool.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${tool.available ? "bg-[hsl(142,70%,90%)] text-[hsl(142,70%,30%)]" : "bg-destructive/10 text-destructive"}`}>
                  {tool.available ? "Disponible" : "No disponible"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> Por hora</span>
                  <span className="font-bold">${tool.pricePerHour}/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3 h-3" /> Por día</span>
                  <span className="font-bold">${tool.pricePerDay}/día</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><Shield className="w-3 h-3" /> Depósito</span>
                  <span className="font-bold">${tool.deposit.toLocaleString()}</span>
                </div>
              </div>

              <Button
                disabled={!tool.available}
                onClick={() => toast.success("Solicitud de renta enviada. Te contactaremos pronto.")}
                className="w-full amber-gradient text-primary-foreground hover:opacity-90"
              >
                Reservar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Rental;
