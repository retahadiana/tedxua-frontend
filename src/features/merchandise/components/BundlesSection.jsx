import bgBundle from "@/assets/merch/bg bundle.webp";
import cardBundle from "@/assets/merch/card bundle.webp";
import hoverBundle from "@/assets/merch/hover bundle.webp";
import comingSoon from "@/assets/merch/coming soon.webp";
import { formatRupiah } from "@/utils/formatters";
import Reveal from "./Reveal";
import { useBundles } from "../hooks/useBundles";

function BundleCard({ bundle, index, onSelectProduct }) {
  return (
    <Reveal className="w-full max-w-[440px]" delay={(index % 3) * 0.12}>
      <button
        onClick={() => onSelectProduct?.(bundle.id)}
        className="relative group w-full aspect-[890/1170] text-left cursor-pointer"
      >
        <img
          src={cardBundle}
          alt={bundle.name}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        />

        <img
          src={hoverBundle}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {bundle.image ? (
          <img
            src={bundle.image}
            alt={bundle.name}
            className="absolute object-contain transition-all duration-300 drop-shadow-[0_0_14px_rgba(255,235,170,0.65)] group-hover:opacity-70 group-hover:brightness-[0.85]"
            style={{
              top: "calc(25% + 20px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 15,
              width: "calc(100% * 0.6)",
              height: "calc(100% * 0.6)",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-gordita text-sm text-white/60 bg-black/40 px-4 py-2 rounded-lg">
              Foto belum tersedia
            </span>
          </div>
        )}

        <div className="absolute left-[calc(5.45%+15px)] right-[5.45%] p-4 bottom-[calc(5.5%+30px)]">
          <p className="font-gordita font-bold text-[#16220E] text-3xl leading-tight">
            {bundle.name}
          </p>
          <p className="font-gordita italic text-[#16220E] text-lg mt-1 truncate">
            {bundle.subtitle || "—"}
          </p>
          <p className="font-gordita font-bold text-[#16220E] text-2xl mt-2">
            {formatRupiah(bundle.price)}
          </p>
        </div>
      </button>
    </Reveal>
  );
}

// Placeholder saat belum ada bundle (loading/kosong/API gagal) — visual lama.
function ComingSoonCard({ index, maxWidth }) {
  return (
    <Reveal className={`w-full ${maxWidth}`} delay={(index % 3) * 0.12}>
      <div className="relative w-full aspect-[890/1170]">
        <img src={comingSoon} alt="Coming Soon" className="absolute inset-0 w-full h-full object-contain scale-[1.35]" />
      </div>
    </Reveal>
  );
}

function DesktopBundles({ onSelectProduct }) {
  const { bundles } = useBundles();

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
          {bundles.length > 0
            ? bundles.map((bundle, i) => (
                <BundleCard key={bundle.id} bundle={bundle} index={i} onSelectProduct={onSelectProduct} />
              ))
            : [0, 1, 2].map((i) => (
                <ComingSoonCard key={`soon-${i}`} index={i} maxWidth="max-w-[440px]" />
              ))}
        </div>
      </div>
    </section>
  );
}

function MobileBundles({ onSelectProduct }) {
  const { bundles } = useBundles();

  return (
    <section className="relative w-full z-[7] mt-[80px]">
      <img
        src={bgBundle}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 w-full object-cover z-0"
        style={{ top: "-200px", height: "calc(100% + 300px)" }}
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

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 justify-items-center mt-10">
          {bundles.length > 0
            ? bundles.map((bundle, i) => (
                <BundleCard key={bundle.id} bundle={bundle} index={i} onSelectProduct={onSelectProduct} />
              ))
            : [0, 1, 2].map((i) => (
                <ComingSoonCard key={`soon-${i}`} index={i} maxWidth="max-w-[260px]" />
              ))}
        </div>
      </div>
    </section>
  );
}

export default function BundlesSection({ onSelectProduct, variant = "desktop" }) {
  return variant === "mobile" ? <MobileBundles onSelectProduct={onSelectProduct} /> : <DesktopBundles onSelectProduct={onSelectProduct} />;
}
