import { Fragment, useEffect, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";

import akarBelakang from "@/assets/merch/akar belakang.png";
import akarDepan from "@/assets/merch/akar depan.png";
import awan from "@/assets/merch/awan.png";
import merchandiseTitle from "@/assets/merch/Merchandise.png";
import panah1 from "@/assets/merch/panah 1.png";
import panah2 from "@/assets/merch/panah 2.png";
import panah3 from "@/assets/merch/panah 3.png";
import panah4 from "@/assets/merch/panah 4.png";
import cardSwap from "@/assets/merch/card swap.png";
import bag from "@/assets/merch/produk 4.png";
import sticker from "@/assets/merch/produk 1.png";
import keychain from "@/assets/merch/produk 2.png";

const ARROWS = [
  { src: panah1, w: 108, h: 159 },
  { src: panah2, w: 81, h: 132 },
  { src: panah3, w: 72, h: 87 },
  { src: panah4, w: 108, h: 107 },
];

const MOBILE_ARROWS = [
  { src: panah1, w: 24, h: 35 },
  { src: panah2, w: 18, h: 29 },
  { src: panah3, w: 16, h: 19 },
  { src: panah4, w: 24, h: 24 },
];

const SQUARE_IDS = [0, 1, 2];

const SWAP_IMAGES = [bag, sticker, keychain];

const PRODUCT_IMAGE_STYLES = [
  { padding: 10 },
  {
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: "80%",
    height: "80%",
  },
  {
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: "82%",
    height: "82%",
    transform: "rotate(45deg)",
  },
];

function ArrowRow({ compact = false }) {
  const [order, setOrder] = useState(SQUARE_IDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const arrows = compact ? MOBILE_ARROWS : ARROWS;
  const squareWidths = compact ? ["30%", "21%"] : ["26%", "20%"];
  const squareTops = compact ? [40, 10, 0] : [100, 20, 0];
  const arrowTops = compact ? [70, 55, 40, 18] : [200, 150, 100, 30];

  let squareIndex = 0;

  return (
    <LayoutGroup id="merch-squares">
      <div className="flex w-full items-start justify-between px-[3%]">
      {arrows.map((arrow, i) => {
        const squareWidth =
          squareIndex === 1 ? squareWidths[0] : squareWidths[1];

        const square =
          i < arrows.length - 1 ? (
            <div
              key={`slot-${squareIndex}`}
              className={`z-10 -rotate-[5deg] ${compact ? "mx-0" : "mx-2"}`}
              style={{ width: squareWidth, aspectRatio: "1 / 1", marginTop: squareTops[squareIndex] }}
            >
              <motion.div
                key={`item-${order[squareIndex]}`}
                layoutId={`merch-item-${order[squareIndex]}`}
                layout
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="relative h-full w-full"
              >
                <img
                  src={cardSwap}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full object-contain rounded-md ${
                    squareIndex === 1
                      ? "shadow-[0_0_70px_rgba(255,240,180,0.9)] brightness-105"
                      : "opacity-80 shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                  }`}
                />
                <img
                  src={SWAP_IMAGES[order[squareIndex]]}
                  alt=""
                  style={PRODUCT_IMAGE_STYLES[order[squareIndex]]}
                  className="relative h-full w-full object-contain rounded-md"
                />
              </motion.div>
            </div>
          ) : null;
        if (square) squareIndex += 1;

        return (
          <Fragment key={i}>
            <div
              className="relative shrink-0"
              style={{ marginTop: arrowTops[i], alignSelf: "flex-start" }}
            >
              <img
                src={arrow.src}
                alt={`Panah ${i + 1}`}
                style={{ width: arrow.w, height: arrow.h }}
                className="object-contain"
              />
            </div>
            {square}
          </Fragment>
        );
      })}
    </div>
    </LayoutGroup>
  );
}

function DesktopHero() {
  return (
    <section className="relative w-full min-h-[1580px] overflow-hidden bg-[#263A1F]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #FFFB99 0%, #3A662A 45%, #263A1F 100%)",
        }}
      />

      {/* Layer 1: akar belakang */}
      <img
        src={akarBelakang}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-[1] object-cover object-bottom"
        style={{ transform: "translateY(90px) scaleY(-1)" }}
      />

      {/* Layer 2: akar depan (overlay di atas akar belakang) */}
      <img
        src={akarDepan}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 w-full z-[2] object-contain object-bottom"
        style={{ height: "100%", transform: "translateY(-400px)" }}
      />

      {/* Layer 3: panah 1-4 + kotak produk di antara tiap panah */}
      <div
        className="absolute inset-x-0 top-1/2 z-[3]"
        style={{ transform: "translateY(calc(-50% - 380px))" }}
      >
        <ArrowRow />
      </div>

      {/* Layer 4: awan (overlay di atas akar) */}
      <img
        src={awan}
        alt=""
        aria-hidden="true"
        className="absolute bottom-[170px] left-0 w-full z-[4] object-contain object-bottom"
        style={{ height: "70%" }}
      />

      {/* Layer 5: judul merchandise */}
      <div
        className="absolute top-0 left-1/2 z-[5] w-full -translate-x-1/2 pt-[16px] flex justify-center"
        style={{ transform: "translate(-50%, 750px)" }}
      >
        <img
          src={merchandiseTitle}
          alt="Merchandise"
          className="w-[85%] max-w-[1200px] object-contain"
        />
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#263A1F]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #FFFB99 0%, #3A662A 45%, #263A1F 100%)",
        }}
      />

      {/* akar belakang */}
      <img
        src={akarBelakang}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 top-0 w-full h-full z-[1] object-cover object-bottom"
        style={{ transform: "scaleY(-1)" }}
      />

      {/* akar depan */}
      <img
        src={akarDepan}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 top-0 w-full z-[2] object-contain object-bottom"
        style={{ height: "100%", transform: "translateY(-140px)" }}
      />

      {/* 1. panah + kotak produk (kompak) — paling atas */}
      <div className="relative z-[3] flex justify-center pt-[110px]">
        <ArrowRow compact />
      </div>

      {/* 2. awan — lebar penuh mengikuti lebar device */}
      <div className="relative z-[4] w-full -mt-[50px]">
        <img
          src={awan}
          alt=""
          aria-hidden="true"
          className="block w-full object-cover object-bottom"
          style={{ aspectRatio: "4266 / 2419" }}
        />
      </div>

      {/* 3. judul merchandise — di bawah awan */}
      <div className="relative z-[5] flex justify-center -mt-[128px] px-4 pb-10">
        <img
          src={merchandiseTitle}
          alt="Merchandise"
          className="w-[82%] max-w-[340px] object-contain"
        />
      </div>
    </section>
  );
}

export default function HeroSection({ variant = "desktop" }) {
  return variant === "mobile" ? <MobileHero /> : <DesktopHero />;
}