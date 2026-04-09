import { workshops } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Monitor, Users } from "lucide-react";
import { toast } from "sonner";

const Workshops = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="font-display text-4xl md:text-5xl mb-2">TALLERES & CURSOS</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Aprende oficios con nuestros instructores expertos. Cursos presenciales y virtuales para todos los niveles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshops.map((w) => (
          <div key={w.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted overflow-hidden relative">
              <img src={w.image} alt={w.title} className="w-full h-full object-cover" loading="lazy" />
              <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${w.type === "presencial" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}>
                {w.type === "presencial" ? <><MapPin className="w-3 h-3 inline mr-1" />Presencial</> : <><Monitor className="w-3 h-3 inline mr-1" />Virtual</>}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl mb-1">{w.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{w.description}</p>

              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3 h-3" /> {new Date(w.date).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}</div>
                <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {w.time} ({w.duration})</div>
                <div className="flex items-center gap-1 text-muted-foreground"><Users className="w-3 h-3" /> {w.spotsLeft} lugares disponibles</div>
                <div className="font-bold text-lg">${w.price} MXN</div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">Instructor: {w.instructor}</p>

              <Button
                disabled={w.spotsLeft === 0}
                onClick={() => toast.success(`Te has registrado al taller "${w.title}"`)}
                className="w-full amber-gradient text-primary-foreground hover:opacity-90"
              >
                {w.spotsLeft === 0 ? "Sin lugares" : "Inscribirme"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Workshops;
