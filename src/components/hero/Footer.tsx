import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <img src="/img/logoUpdate.png" alt="LEGA" className="w-12 h-12" />
            <div>
              <span className="font-bold text-foreground">LEGA</span>
              <span className="text-muted-foreground text-sm block">Cortinas Argentina</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm text-center"
          >
            (c) 2025 LEGA Cortinas. Todos los derechos reservados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Terminos
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Contacto
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
