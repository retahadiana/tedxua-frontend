import { motion } from "framer-motion";

export default function MyloIllustration({ assets, fgMylo = false }) {
  const { mylo, glow, grassFarthest, grassBack, grassFront, door } = assets;

  const cardZ = fgMylo ? "z-[7]" : "z-[4]";
  const grassBackZ = fgMylo ? "z-[4]" : "z-[5]";
  const myloZ = fgMylo ? "z-[8]" : "z-[7]";
  const grassFrontZ = fgMylo ? "z-[5]" : "z-[8]";

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {/* rumput paling belakang (rumput tolong), mulai dari tengah layar */}
      <img
        src={grassFarthest}
        alt=""
        className="absolute inset-x-0 top-[270px] z-[3] h-[640px] w-full max-w-none origin-bottom scale-x-[4] object-contain object-bottom"
      />

      {/* door di belakang mylo */}
      {door && (
        <motion.img
          src={door}
          alt=""
          initial={{ y: "70vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 1.6,
          }}
          className={`absolute left-[330px] top-[130px] ${cardZ} h-[660px] w-[440px] max-w-none object-contain`}
        />
      )}

      {/* rumput belakang mylo, posisi lebih ke bawah */}
      <img
        src={grassBack}
        alt=""
        className={`absolute inset-x-0 top-[530px] ${grassBackZ} h-[540px] w-full max-w-none object-bottom`}
      />

      {/* glow di belakang mylo */}
      <img alt="" src={glow} className="absolute left-[113px] top-[790px] z-[6] w-[201px] max-w-none" />

      {/* mascot mylo */}
      <motion.img
        src={mylo}
        alt="Mylo mascot"
        initial={{ x: "-120vw" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute left-[230px] top-[360px] ${myloZ} h-[470px] w-[352px] object-cover`}
      />

      {/* rumput depan mylo, paling bawah, paling atas layer-nya */}
      <img
        src={grassFront}
        alt=""
        className={`absolute inset-x-0 top-[660px] ${grassFrontZ} h-[480px] w-full max-w-none object-bottom`}
      />
    </div>
  );
}
