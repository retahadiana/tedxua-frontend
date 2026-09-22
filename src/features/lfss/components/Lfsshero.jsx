import heroTitle from "@/assets/images/lfss/werelookingfor.webp";
import grass from "@/assets/images/lfss/rumput_section1.webp";
import hiasanTulisan from "@/assets/images/lfss/hiasantulisan.png";
import { motion } from "framer-motion";

const LfssHero = () => {
  return (
    <section className="relative isolate z-[2] h-[390px] overflow-visible pt-[58px] sm:h-[500px] md:h-[650px] md:pt-[76px]">
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #8f9f68 0%, #fff58a 72%, #fff58a 100%)",
        }}
      >
        <img
          src={hiasanTulisan}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-35px] z-[1] w-[260%] max-w-none -translate-x-1/2 opacity-65 sm:top-[-70px] sm:w-[220%] md:top-[-120px] md:w-[200%] md:max-w-[1500px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-[4] mx-auto flex h-[215px] max-w-6xl items-end justify-center px-5 sm:h-[300px] md:h-[390px] md:px-6"
      >
        <div className="relative w-full max-w-[340px] overflow-visible sm:max-w-[620px] md:max-w-[980px]">
          <img
            src={heroTitle}
            alt="We're Looking For Student Speakers"
            className="block w-full"
            style={{ clipPath: "inset(0 0 3px 0)" }}
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-0 -bottom-[34px] z-[3] h-[250px] w-full overflow-hidden sm:hidden">
        <img
          src={grass}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-[-12px] h-auto w-[190vw] max-w-none -translate-x-1/2 object-contain"
        />
      </div>

      <img
        src={grass}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 z-[3] hidden h-auto w-full object-contain sm:block sm:-bottom-[140px] md:-bottom-[180px]"
      />
    </section>
  );
};

export default LfssHero;
