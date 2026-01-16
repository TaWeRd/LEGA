import { motion } from "framer-motion";
import { Users, Clock, FileText, Star } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "2,500+",
    label: "Clientes Satisfechos",
    description: "En toda Argentina"
  },
  {
    icon: Clock,
    value: "< 3 min",
    label: "Tiempo Promedio",
    description: "Para generar cotizacion"
  },
  {
    icon: FileText,
    value: "1,200+",
    label: "Cotizaciones Mensuales",
    description: "Procesadas con exito"
  },
  {
    icon: Star,
    value: "4.9",
    label: "Calificacion",
    description: "De nuestros usuarios"
  }
];

const MetricsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gold opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resultados que <span className="text-gradient-gold">hablan</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Mas de 5 anos ayudando a profesionales de cortinas a optimizar sus procesos de cotizacion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-8 text-center group cursor-default"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-xl bg-secondary/60 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <metric.icon className="w-8 h-8 text-gold" />
              </motion.div>

              <motion.span
                className="text-4xl md:text-5xl font-bold text-foreground block mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.3, type: "spring" }}
              >
                {metric.value}
              </motion.span>

              <span className="text-foreground font-semibold block mb-1">
                {metric.label}
              </span>
              <span className="text-muted-foreground text-sm">
                {metric.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
