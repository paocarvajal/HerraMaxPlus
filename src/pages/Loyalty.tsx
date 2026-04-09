import { Star, Gift, Trophy, Clock, TrendingUp, Award, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Mock data
const userPoints = {
  current: 1250,
  lifetime: 3800,
  level: "Plata",
  nextLevel: "Oro",
  nextLevelAt: 2000,
};

const levels = [
  { name: "Bronce", min: 0, icon: "🥉", color: "hsl(30 50% 50%)" },
  { name: "Plata", min: 500, icon: "🥈", color: "hsl(0 0% 65%)" },
  { name: "Oro", min: 2000, icon: "🥇", color: "hsl(18 85% 52%)" },
  { name: "Diamante", min: 5000, icon: "💎", color: "hsl(200 80% 60%)" },
];

const rewards = [
  { id: "1", name: "5% de descuento en tu próxima compra", cost: 200, icon: "🏷️" },
  { id: "2", name: "10% de descuento en herramientas eléctricas", cost: 500, icon: "⚡" },
  { id: "3", name: "Envío gratis en tu siguiente pedido", cost: 300, icon: "🚚" },
  { id: "4", name: "Renta gratis 2 horas de rotomartillo", cost: 400, icon: "🔨" },
  { id: "5", name: "15% de descuento en talleres", cost: 600, icon: "🎓" },
  { id: "6", name: "Camiseta HERRAMAX PLUS exclusiva", cost: 1000, icon: "👕" },
];

const history = [
  { id: "1", date: "2025-03-01", description: "Compra: Taladro Bosch GSB 13RE", points: 120, type: "earned" as const },
  { id: "2", date: "2025-02-25", description: "Canje: Envío gratis", points: -300, type: "redeemed" as const },
  { id: "3", date: "2025-02-20", description: "Compra: Tornillería variada", points: 45, type: "earned" as const },
  { id: "4", date: "2025-02-14", description: "Compra: Pintura interior 19L", points: 85, type: "earned" as const },
  { id: "5", date: "2025-02-10", description: "Bonus: Compra en taller", points: 50, type: "bonus" as const },
  { id: "6", date: "2025-01-28", description: "Compra: Kit de plomería", points: 65, type: "earned" as const },
  { id: "7", date: "2025-01-15", description: "Canje: 5% descuento", points: -200, type: "redeemed" as const },
  { id: "8", date: "2025-01-10", description: "Compra: Esmeriladora DeWalt", points: 150, type: "earned" as const },
];

const progressPercent = ((userPoints.current - 500) / (userPoints.nextLevelAt - 500)) * 100;

const Loyalty = () => {
  return (
    <>
      {/* Hero */}
      <section className="industrial-gradient section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container max-w-3xl"
        >
          <Badge className="mb-4 amber-gradient text-primary-foreground border-0">
            Programa de Lealtad
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl text-surface-dark-foreground mb-3">
            PUNTOS <span className="text-gradient-amber">HERRAMAX PLUS</span>
          </h1>
          <p className="text-surface-dark-foreground/70 max-w-lg mx-auto">
            Gana 1 punto por cada $10 de compra. Acumula y canjea por descuentos, envíos gratis y recompensas exclusivas.
          </p>
        </motion.div>
      </section>

      {/* Stats Cards */}
      <section className="section-padding">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Puntos actuales", value: userPoints.current.toLocaleString(), icon: Star, accent: true },
              { label: "Nivel actual", value: userPoints.level, icon: Trophy },
              { label: "Puntos totales", value: userPoints.lifetime.toLocaleString(), icon: TrendingUp },
              { label: "Recompensas canjeadas", value: "3", icon: Gift },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={stat.accent ? "border-primary/40 bg-primary/5" : ""}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.accent ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-2xl font-bold font-display">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Level Progress */}
          <Card className="mb-10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">🥈 {userPoints.level}</span>
                <span className="text-sm font-medium">🥇 {userPoints.nextLevel}</span>
              </div>
              <Progress value={progressPercent} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground text-center">
                Te faltan <span className="font-bold text-foreground">{(userPoints.nextLevelAt - userPoints.current).toLocaleString()}</span> puntos para alcanzar el nivel {userPoints.nextLevel}
              </p>
            </CardContent>
          </Card>

          {/* Levels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {levels.map((level) => {
              const isActive = level.name === userPoints.level;
              return (
                <div
                  key={level.name}
                  className={`rounded-lg border p-4 text-center transition-all ${
                    isActive ? "border-primary bg-primary/5 shadow-md" : "border-border"
                  }`}
                >
                  <span className="text-3xl">{level.icon}</span>
                  <p className={`font-display text-lg mt-1 ${isActive ? "text-primary" : ""}`}>{level.name}</p>
                  <p className="text-xs text-muted-foreground">{level.min.toLocaleString()}+ pts</p>
                </div>
              );
            })}
          </div>

          {/* Tabs: Rewards & History */}
          <Tabs defaultValue="rewards">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="rewards">🎁 Recompensas</TabsTrigger>
              <TabsTrigger value="history">📋 Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {rewards.map((r) => {
                  const canRedeem = userPoints.current >= r.cost;
                  return (
                    <Card key={r.id} className={!canRedeem ? "opacity-60" : ""}>
                      <CardHeader className="pb-2">
                        <span className="text-2xl">{r.icon}</span>
                        <CardTitle className="text-base font-semibold leading-tight">{r.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">{r.cost} pts</span>
                        <Button
                          size="sm"
                          disabled={!canRedeem}
                          className={canRedeem ? "amber-gradient text-primary-foreground hover:opacity-90" : ""}
                        >
                          Canjear
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="mt-4 space-y-2">
                {history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                        h.type === "earned" ? "bg-green-100 text-green-700" :
                        h.type === "bonus" ? "bg-blue-100 text-blue-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {h.type === "earned" ? "+" : h.type === "bonus" ? "★" : "−"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{h.description}</p>
                        <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold shrink-0 ml-3 ${
                      h.points > 0 ? "text-green-600" : "text-red-500"
                    }`}>
                      {h.points > 0 ? "+" : ""}{h.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="mt-12 text-center industrial-gradient rounded-xl p-8">
            <Award className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-display text-3xl text-surface-dark-foreground mb-2">¿AÚN NO ERES MIEMBRO?</h2>
            <p className="text-surface-dark-foreground/70 mb-4 max-w-md mx-auto text-sm">
              Regístrate gratis y empieza a acumular puntos con cada compra.
            </p>
            <Button className="amber-gradient text-primary-foreground hover:opacity-90" size="lg">
              Crear cuenta gratis <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loyalty;
