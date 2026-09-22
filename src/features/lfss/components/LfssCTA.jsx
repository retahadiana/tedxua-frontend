import { motion } from "framer-motion";

import stepForward from "@/assets/images/lfss/stepforward.webp";
import buttonBg from "@/assets/images/lfss/kotakregist.webp";
import contactBox from "@/assets/images/lfss/Rectangle_cp.webp";
import contactText from "@/assets/images/lfss/kontak_cp.webp";

const links = [
  {
    label: "Registration",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScHVABKvBPdGuaSACGSw-IBV5AzXFmwBVwcDKgoxBIl3HlsxQ/viewform ",
  },
  {
    label: "Guidebook",
    href: "https://drive.google.com/drive/folders/1Xr4TAhR6-5QhADcGsO2SLO4edEGynXNM?usp=sharing",
  },
];

const contacts = [
  { name: "Abigail", phone: "0895404171242" },
  { name: "Lino", phone: "081330136277" },
];

const LfssCTA = () => {
  return (
    <section className="relative -mt-[260px] overflow-visible bg-[#4D2814] px-6 pb-24 pt-16 text-[#FEF8E0] md:-mt-[380px] md:pb-28 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <img
          src={stepForward}
          alt="Step forward and become our next Student Speakers"
          className="w-full max-w-[760px] drop-shadow-[0_0_18px_rgba(255,248,224,0.35)]"
        />

        <div className="mt-20 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          {links.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.08,
                y: -8,
                rotate: item.label === "Registration" ? -2 : 2,
                filter: "brightness(1.05)",
              }}
              whileTap={{
                scale: 0.96,
                y: -2,
              }}
              transition={{
                type: "spring",
                stiffness: 360,
                damping: 16,
              }}
              className="group relative flex h-[96px] w-[245px] items-center justify-center md:h-[133px] md:w-[335px]"
            >
              <img
                src={buttonBg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-fill"
              />

              <span
                className="relative z-10 text-[30px] font-bold leading-none text-[#241308] md:text-[38px]"
                style={{ fontFamily: '"Essays 1743", Essays1743, serif' }}
              >
                {item.label}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-28 flex flex-col items-center">
          <p className="font-serif text-[20px] font-black leading-none text-[#FEF8E0] drop-shadow-[0_0_20px_rgba(254,248,224,0.8)] md:text-[24px]">
            For Further Information, please feel free to contact :
          </p>

          <p
            className="mt-5 text-[36px] font-medium uppercase leading-none text-[#FEF8E0] drop-shadow-[0_0_20px_rgba(254,248,224,0.6)] md:text-[48px]"
            style={{ fontFamily: '"Swung Note", "SwungNote", serif' }}
          >
            WHATS APP
          </p>

            <div className="relative mt-4 flex min-h-[86px] w-full max-w-[640px] items-center justify-center px-10 py-5">
              <img
                src={contactBox}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-fill"
              />

              <img
                src={contactText}
                alt="Abigail 0895404171242 dan Lino 081330136277"
                className="relative z-10 w-full max-w-[520px]"
              />
            </div>
          </div>
      </motion.div>
    </section>
  );
};

export default LfssCTA;
