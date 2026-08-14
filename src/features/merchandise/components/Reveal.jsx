import { motion } from "framer-motion";

// Pembungkus animasi fade-in saat elemen masuk ke viewport.
// Dipakai di halaman merchandise untuk memberi efek muncul pelan saat user scroll.
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  amount = 0.2,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}