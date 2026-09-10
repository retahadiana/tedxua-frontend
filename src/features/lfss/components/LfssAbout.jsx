import { motion } from "framer-motion";

import whatIsLfss from "@/assets/images/lfss/whatislfss.webp";
import rootsBg from "@/assets/images/lfss/roots_section2.webp";
import brownGrass from "@/assets/images/lfss/rumput_coklat.webp";
import timeline from "@/assets/images/lfss/timeline.webp";

const LfssAbout = () => {
  return (
    <section className="relative z-[1] overflow-hidden bg-[#2f3d0d] px-5 pt-52 text-[#FEF8E0] md:px-8 md:pt-48">
      <img
        src={rootsBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#1f2b07]/20" />

      <div className="relative z-20 mx-auto max-w-5xl pb-[150px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.img
            src={whatIsLfss}
            alt="What is LFSS?"
            animate={{
              opacity: [1, 0.32, 1, 0.22, 1, 0.38, 1, 0.18, 1, 0.42, 1, 1],
              filter: [
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
                "brightness(0.72) drop-shadow(0 0 5px rgba(255,245,180,0.1))",
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
                "brightness(0.62) drop-shadow(0 0 3px rgba(255,245,180,0.08))",
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
                "brightness(0.78) drop-shadow(0 0 6px rgba(255,245,180,0.11))",
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
                "brightness(0.58) drop-shadow(0 0 2px rgba(255,245,180,0.06))",
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
                "brightness(0.8) drop-shadow(0 0 6px rgba(255,245,180,0.12))",
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
                "brightness(1.08) drop-shadow(0 0 16px rgba(255,245,180,0.28))",
              ],
            }}
            transition={{
              duration: 4.7,
              repeat: Infinity,
              ease: "steps(1)",
              times: [
                0, 0.035, 0.07, 0.105, 0.14, 0.18, 0.22, 0.265, 0.31, 0.355,
                0.405, 1,
              ],
            }}
            className="mx-auto block w-full max-w-[88vw] mix-blend-screen md:max-w-[720px]"
            style={{
              WebkitMaskImage:
                "radial-gradient(closest-side, black 75%, transparent 100%)",
              maskImage:
                "radial-gradient(closest-side, black 75%, transparent 100%)",
            }}
          />

          <div
            className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-[13px] font-normal leading-[18px] text-[#FEF8E0] sm:text-[15px] sm:leading-[22px] md:space-y-5 md:text-[17px] md:leading-snug"
            style={{ fontFamily: "Gordita, sans-serif" }}
          >
            <p>
              <strong>Looking for Student Speaker</strong> is an event held by{" "}
              <strong>TEDxUniversitasAirlangga 2026</strong>, providing a
              platform for Airlangga University Students to share their ideas
              and take the stage as speakers at TEDxUniversitasAirlangga 2026.
            </p>

            <p>
              <strong>Great ideas do not always begin in the spotlight.</strong>{" "}
              Sometimes, they grow quietly beneath the surface, waiting for the
              right moment to emerge, connect, and create an impact. Inspired by
              the <strong> unseen network of mycelium</strong>, TEDxUniversitas
              Airlangga is <strong>looking for a new voice</strong> with fresh
              ideas that can connect perspectives, spark conversations, and
              contribute to something greater.
            </p>

            <p>
              So, <strong>stand up, speak up, and prepare your ideas</strong> to
              become the <strong>STUDENT SPEAKER</strong> of
              TEDxUniversitasAirlangga 2026.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 mt-12 flex justify-center pb-[110px]"
        >
          <img
            src={timeline}
            alt="Timeline LFSS"
            className="relative z-20 w-full max-w-[920px] drop-shadow-[0_0_24px_rgba(255,245,180,0.28)]"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-[8] h-[350px] w-full bg-[#4D2814]" />
      <img
        src={brownGrass}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[330px] left-1/2 z-[9] h-auto w-[120vw] max-w-none -translate-x-1/2 scale-y-[0.58] object-contain origin-bottom"
      />
    </section>
  );
};

export default LfssAbout;
