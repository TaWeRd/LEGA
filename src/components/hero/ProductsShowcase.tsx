import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    image: "/img/imgNew/cortinas-roller.jpg",
    title: "Cortinas Roller",
    description: "Blackout, sunscreen y decorativas para todo tipo de ambientes",
    tag: "Mas vendido"
  },
  {
    image: "/img/imgNew/cortinas-vertical.jpg",
    title: "Cortinas Verticales",
    description: "Ideales para oficinas y grandes ventanales con control de luz",
    tag: "Profesional"
  },
  {
    image: "/img/imgNew/toldos.jpg",
    title: "Toldos",
    description: "Retractiles y fijos para exteriores, terrazas y comercios",
    tag: "Exterior"
  }
];

const ProductsShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Productos que puedes <span className="text-gradient-gold">cotizar</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Amplio catalogo de cortinas y toldos con precios actualizados y calculo automatico
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="absolute top-4 left-4 glass px-4 py-1.5 rounded-full"
              >
                <span className="text-gold text-sm font-medium">{product.tag}</span>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shrink-0 ml-4"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-gold-foreground" />
                  </motion.div>
                </div>
              </div>

              <motion.div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
