import bgBundle from "@/assets/merch/bg bundle.png";
import cardBundle from "@/assets/merch/card bundle.png";
import hoverBundle from "@/assets/merch/hover bundle.png";
import comingSoon from "@/assets/merch/coming soon.png";
import Reveal from "./Reveal";

const products = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 1,
  name: `Bundle ${i + 1}`,
  price: "IDR 0,00",
}));

function DesktopBundles() {
  return (
    <section className="relative w-full z-[7]">
      <img
        src={bgBundle}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 -top-[390px] w-full object-contain z-0"
        style={{ aspectRatio: "4320 / 3622" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 pt-[calc(240px+3rem)] pb-20">
        <Reveal>
          <h2
            className="font-essays font-bold italic text-left text-[150px] leading-none tracking-[9px] text-[#245C39] -mt-[270px] mb-16"
            style={{ textShadow: "0px 0px 16.6px #808F66" }}
          >
            Bundles
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-[100px]">
          {products.map((product, i) => (
            <Reveal
              key={product.id}
              className="w-full max-w-[440px]"
              delay={i * 0.12}
            >
              <div
                className="relative w-full aspect-[890/1170]"
              >
                <img src={comingSoon} alt="Coming Soon" className="absolute inset-0 w-full h-full object-contain scale-[1.35]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileBundles() {
  return (
    <section className="relative w-full z-[7] overflow-hidden">
      <img
        src={bgBundle}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.8]"
      />

      <div
        className="absolute inset-x-0 top-0 h-48 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(38,58,31,0.55) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(45,30,22,0.6) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[480px] mx-auto px-6 pt-[calc(140px+2.5rem)] pb-16">
        <Reveal>
          <h2
            className="font-essays font-bold italic text-left text-[64px] leading-none tracking-[2px] sm:text-[84px] sm:tracking-[4px] text-[#245C39] -mt-[170px] mb-6"
            style={{ textShadow: "0px 0px 16.6px #808F66" }}
          >
            Bundles
          </h2>
        </Reveal>

        <div className="flex flex-col items-center gap-10 mt-10">
          {products.map((product, i) => (
            <Reveal key={product.id} className="w-full max-w-[260px]" delay={i * 0.08}>
              <div className="relative w-full aspect-[890/1170]">
                <img src={comingSoon} alt="Coming Soon" className="absolute inset-0 w-full h-full object-contain scale-[1.3]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BundlesSection({ onSelectProduct, variant = "desktop" }) {
  return variant === "mobile" ? <MobileBundles /> : <DesktopBundles />;
}