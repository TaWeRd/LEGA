import { motion } from "framer-motion";
import { MapPin, Wrench, Headphones } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Argentina",
    subtitle: "Cobertura Nacional",
    description:
      "Precios adaptados a cada zona del pais. Calculo automatico de costos de envio y valores regionales actualizados.",
    highlights: ["Buenos Aires", "Cordoba", "Santa Fe", "Mendoza", "+ 20 provincias"]
  },
  {
    icon: Wrench,
    title: "Instalacion",
    subtitle: "Servicio Profesional",
    description:
      "Red de instaladores certificados en todo el pais. Incluye el costo de instalacion en tus presupuestos automaticamente.",
    highlights: ["Instaladores verificados", "Garantia de trabajo", "Agenda flexible", "Soporte tecnico"]
  },
  {
    icon: Headphones,
    title: "Soporte",
    subtitle: "Atencion Dedicada",
    description:
      "Equipo disponible para ayudarte con tus cotizaciones, dudas tecnicas y seguimiento de pedidos.",
    highlights: ["WhatsApp directo", "Respuesta rapida", "Capacitacion", "Actualizaciones"]
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/30" />
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que <span className="text-gradient-gold">necesitas</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Una plataforma completa diseniada para profesionales de cortinas en Argentina
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="glass-strong rounded-3xl p-8 group hover:border-glow-gold transition-all duration-500"
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-10 h-10 text-gold" />
              </motion.div>

              <div className="mb-4">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {feature.title}
                </h3>
                <span className="text-gold font-medium">
                  {feature.subtitle}
                </span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {feature.highlights.map((highlight, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
                    className="px-3 py-1.5 rounded-full bg-secondary/60 text-muted-foreground text-sm"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
