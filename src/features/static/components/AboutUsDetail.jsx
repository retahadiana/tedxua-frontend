import React from 'react';
import { motion } from 'framer-motion';

// Mascots & Banners
import myloHero from '../../../assets/images/mylo-hero-mascot.svg';
import myloBanner from '../../../assets/images/mylo-banner.svg';
import myloTed from '../../../assets/images/mylo-ted.png';
import myloTedx from '../../../assets/images/mylo-tedx-mascot.svg';
import myloTedxUa from '../../../assets/images/mylo-tedxua-mascot.svg';

// Card Images
import aboutTed from '../../../assets/images/about-ted.png';
import aboutTedx from '../../../assets/images/about-tedx.png';
import aboutTedxUa from '../../../assets/images/about-tedxua.png';
import cardAboutTed from '../../../assets/images/card-about-ted.png';
import cardAboutTedx from '../../../assets/images/card-about-tedx.png';
import cardAboutTedxUa from '../../../assets/images/card-about-tedxua.png';
import papyrus1 from '../../../assets/images/papyrus-1.png';
import redLightAboutTed from '../../../assets/images/red-light-about-ted.png';

// Canopy, Root & Ground
import mycelium from '../../../assets/images/mycelium.png';
import mushroomBottomGroundGroup from '../../../assets/images/mushroom-bottom-ground-group.png';
import mushroomLightBottom from '../../../assets/images/mushroom-light-bottom.png';

// Fireflies
import firefly1 from '../../../assets/images/firefly-1.png';
import firefly2 from '../../../assets/images/firefly-2.png';

// Mushrooms
import mushroom1 from '../../../assets/images/mushroom-1.png';
import mushroom2 from '../../../assets/images/mushroom-2.png';
import mushroom3 from '../../../assets/images/mushroom-3.png';
import mushroom4 from '../../../assets/images/mushroom-4.png';
import mushroom6 from '../../../assets/images/mushroom-6.png';
import mushroomOntop from '../../../assets/images/mushroom-small-ontop-18b1c9.png';

// ---------------------------------------------------------------------------
// Pixel-perfect scaled-canvas system.
// All coordinates below are taken verbatim from the Figma dev-mode export
// (canvas 1440 x 3933). Every element is positioned as a PERCENTAGE of that canvas,
// inside a wrapper that keeps the exact 1440:3933 aspect ratio. Font sizes use
// `cqw` (container query width units) tied to the same 1440 baseline.
// ---------------------------------------------------------------------------
const CW = 1440;
const CH = 4200;
const L = (px) => `${(px / CW) * 100}%`;
const T = (px) => `${(px / CH) * 100}%`;
const W = (px) => `${(px / CW) * 100}%`;
const H = (px) => `${(px / CH) * 100}%`;
const FS = (px) => `${(px / CW) * 100}cqw`;

const tedSolidStyle = {
  color: '#E2402B',
  textShadow: '2px 3px 4px rgba(0, 0, 0, 0.5), 1px 1px 0px #701308',
};

const aboutRedGradientStyle = {
  backgroundImage: 'linear-gradient(90deg, #AC0003 0%, #450000 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

// Absolute box positioned from Figma px coordinates, scaled to the canvas.
const Box = ({ left, top, width, height, className = '', style = {}, children, initial, whileInView, viewport, transition }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={initial}
    whileInView={whileInView}
    viewport={viewport || { once: true, amount: 0.3 }}
    transition={transition || { duration: 0.8, ease: "easeOut" }}
    style={{
      left: L(left),
      top: T(top),
      ...(width != null ? { width: W(width) } : {}),
      ...(height != null ? { height: H(height) } : {}),
      ...style,
    }}
  >
    {children}
  </motion.div>
);

// Bordered translucent parchment card background, matching Figma's card style
// (border-4 #4B2D22, soft yellow -> khaki gradient fill).
const CardBg = ({ left, top, width, height, className = '' }) => (
  <Box
    left={left}
    top={top}
    width={width}
    height={height}
    className={`rounded-[1.2cqw] border-[0.3cqw] border-[#4B2D22] shadow-[0_1.5cqw_3cqw_rgba(0,0,0,0.55)] pointer-events-none ${className}`}
    style={{ background: 'linear-gradient(180deg, rgba(255,251,153,0.3) 0%, rgba(173,169,131,0.3) 100%)' }}
  />
);

export default function AboutUsDetail() {
  return (
    <div
      className="w-full"
      style={{
        containerType: 'inline-size',
        background: 'linear-gradient(180deg, #1E0F0A 0%, #1E0F0A 14%, #ADA983 100%)',
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ paddingTop: `${(CH / CW) * 100}%` }}>
        <div className="absolute inset-0">

          {/* ============ 1. BASE BACKGROUND & COLORED AMBIENT GLOWS (BEHIND ROOTS) ============ */}
          {/* Main Top Radial Warm Highlight */}
          <div
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{
              height: H(1800),
              background: 'radial-gradient(ellipse 80% 65% at 50% 12%, #A84E25 0%, #6E2D16 45%, #1E0F0A 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            }}
          />

          {/* Hero Colored Glow Ellipses (Figma Ellipse 1, Ellipse 4 & Center Glow) */}
          <Box left={126} top={101} width={1230} height={659} className="rounded-full pointer-events-none" style={{ background: 'rgba(168, 78, 37, 0.65)', filter: 'blur(5cqw)', transform: 'rotate(9deg)' }} />
          <Box left={145} top={296} width={1272} height={687} className="rounded-full pointer-events-none" style={{ background: 'rgba(254, 248, 224, 0.25)', filter: 'blur(5cqw)', transform: 'rotate(-13deg)' }} />
          <Box left={664.5} top={227} width={256} height={384} className="rounded-full pointer-events-none" style={{ background: 'rgba(255, 251, 153, 0.9)', filter: 'blur(3cqw)' }} />

          {/* Section 1 Ambient Glow */}
          <Box left={-107} top={1582} width={1615} height={923} className="rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(254, 248, 224, 0.35) 0%, rgba(152, 90, 39, 0.35) 100%)', filter: 'blur(3cqw)' }} />

          {/* Section 1 Papyrus Background Texture */}
          <Box left={-150} top={850} width={1740} height={1400} className="z-0 pointer-events-none opacity-85">
            <img
              src={papyrus1}
              alt=""
              className="w-full h-full object-cover"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                maskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
              }}
            />
          </Box>

          {/* Section 2 Ambient Glows */}
          <Box left={308} top={2260} width={948} height={431} className="rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(173, 169, 131, 0.35) 0%, rgba(254, 248, 224, 0.35) 100%)', filter: 'blur(3cqw)' }} />
          <Box left={777} top={2282} width={336} height={361.5} className="rounded-full pointer-events-none" style={{ background: 'rgba(255, 251, 153, 0.8)', filter: 'blur(2.5cqw)' }} />
          <Box left={934} top={2183} width={336} height={361.5} className="rounded-full pointer-events-none" style={{ background: 'rgba(255, 251, 153, 0.4)', filter: 'blur(2.5cqw)' }} />

          {/* Section 3 Ambient Glows */}
          <Box left={155} top={2740} width={1131} height={585} className="rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(254, 248, 224, 0.35) 0%, rgba(137, 185, 137, 0.35) 100%)', filter: 'blur(3cqw)' }} />
          <Box left={449} top={2908} width={289.5} height={369} className="rounded-full pointer-events-none" style={{ background: 'rgba(255, 251, 153, 0.7)', filter: 'blur(2.5cqw)' }} />

          {/* ============ 2. ROOT CANOPY TEXTURE (MYLO SECTION TOP CANOPY) ============ */}
          <img
            src={mycelium}
            alt=""
            className="absolute top-0 left-0 w-full object-cover object-top pointer-events-none opacity-90"
            style={{ height: H(800) }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15,8,4,0.3) 100%)' }} />

          {/* ============ 3. HERO CONTENT: Hi, I'm MYLO ============ */}
          <Box left={89} top={293} width={255} className="z-10"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="font-['Essays1743'] font-bold text-[#FEF8E0] leading-none whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontSize: FS(44.7) }}>
              Hi, I&apos;m
            </p>
          </Box>

          {/* MYLO Red Banner Asset (mylo-banner.svg) */}
          <Box left={68} top={370} width={708} height={206} className="z-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img 
              src={myloBanner} 
              alt="MYLO" 
              className="w-full h-full object-contain drop-shadow-2xl" 
              animate={{ rotate: [-1, 1, -1], y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </Box>

          <Box left={509} top={327} width={442.5} height={479} className="z-20"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.img 
              src={myloHero} 
              alt="Mylo Hero" 
              className="w-full h-full object-contain drop-shadow-2xl pointer-events-none" 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </Box>

          <Box left={166} top={1070} width={264.7} height={265.2} style={{ transform: 'rotate(10deg)' }} className="z-30">
            <img src={firefly1} alt="" className="w-full h-full object-contain opacity-90 animate-pulse" />
          </Box>

          <Box left={502} top={1033} width={854} className="text-right z-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="font-['Essays1743'] font-medium text-[#FEF8E0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ fontSize: FS(40), lineHeight: 1.35 }}>
              I began as something unseen — quiet, unfinished, and easy to overlook. But like every small thing that eventually takes root, I&apos;m here now to guide you through{' '}
              <span className="font-bold text-[#FFFB99]">TEDxUniversitas Airlangga 2026,</span> one step at a time.
            </p>
          </Box>

          {/* ============ SECTION 1: ABOUT TED TITLE ASSET ============ */}
          <Box left={0} top={800} width={660} className="z-20 pointer-events-none"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          >
            <img src={aboutTed} alt="About TED" className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
          </Box>

          {/* Section 1 Red Light Ambient Asset */}
          <Box left={480} top={1150} width={1250} height={900} className="z-0 pointer-events-none opacity-85">
            <img src={redLightAboutTed} alt="" className="w-full h-full object-contain" />
          </Box>

         <Box left={378} top={1550} width={958} height={532.5} className="z-0 pointer-events-none"
           initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
         >
  <img
    src={cardAboutTed}
    alt=""
    className="w-full h-full object-contain"
    // Tidak ada lagi styling maskImage
  />
</Box>

          <Box left={430} top={1570} width={770} height={480} className="z-10 flex items-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-['Essays1743'] font-normal text-[#FEF8E0] text-justify" style={{ fontSize: FS(29), lineHeight: 1.42 }}>
              <span className="font-bold text-[#FFFB99]">TED</span> is a grassroots initiative, created in the spirit of TED&apos;s overall mission to research and discover &quot;ideas change everything&quot;. TED brings the spirit of TED to local communities around the globe through TED events. These events are organized by passionate individuals who seek to uncover new ideas and to share the latest research in their local areas that spark conversations in their communities. More than 3000 events are now held annually. The content and design of each TED event is unique and developed independently, but all of them have features in common.
            </p>
          </Box>

          <Box left={1120} top={1440} width={417} height={500.8} className="z-30"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 50 }}
          >
            <motion.img 
              src={myloTed} 
              alt="Mylo TED" 
              className="w-full h-full object-contain"
              animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </Box>
          <Box left={1144} top={1320} width={236.6} height={210.5} style={{ transform: 'rotate(360deg)' }} className="z-20">
            <img src={firefly2} alt="" className="w-full h-full object-contain opacity-90 animate-pulse" />
          </Box>

          {/* ============ SECTION 2: ABOUT TEDx TITLE ASSET ============ */}
          <Box left={740} top={2120} width={570} className="z-20 pointer-events-none"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
          >
            <img src={aboutTedx} alt="About TEDx" className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
          </Box>

          <Box left={231} top={2255} width={688} height={309} className="z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          >
            <img src={cardAboutTedx} alt="" className="w-full h-full object-fill drop-shadow-[0_1.5cqw_3cqw_rgba(0,0,0,0.55)]" />
          </Box>

          <Box left={260} top={2270} width={630} height={260} className="z-10 flex items-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-['Essays1743'] font-normal text-[#FEF8E0] text-juatify" style={{ fontSize: FS(29), lineHeight: 1.45 }}>
              <span className="font-bold text-[#FFFB99]">TEDx</span> is TED&apos;s mission brought closer to home local ideas, told by local voices. Anyone, anywhere can start one, and today there are over 3,000 of them around the world, each sparking conversations that matter to their own community.
            </p>
          </Box>

          <Box left={840} top={2260} width={285} height={315.4} className="z-30"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 50 }}
          >
            <motion.img 
              src={myloTedx} 
              alt="Mylo TEDx" 
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              animate={{ y: [0, -12, 0], x: [0, 8, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </Box>
          <Box left={-11} top={2296} width={264.7} height={265.2} style={{ transform: 'rotate(4deg)' }} className="z-20">
            <img src={firefly1} alt="" className="w-full h-full object-contain opacity-90 animate-pulse" />
          </Box>

          {/* ============ SECTION 3: ABOUT TEDx UNIVERSITAS AIRLANGGA TITLE ASSET ============ */}
          <Box left={140} top={2640} width={950} className="z-20 pointer-events-none"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          >
            <img src={aboutTedxUa} alt="About TEDx Universitas Airlangga" className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
          </Box>

          <Box left={600} top={2820} width={750} height={370} className="z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          >
            <img src={cardAboutTedxUa} alt="" className="w-full h-full object-contain" />
          </Box>

          <Box left={640} top={2870} width={670} height={240} className="z-10 flex items-center justify-end"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-['Essays1743'] font-medium text-[#FEF8E0] text-right" style={{ fontSize: FS(32), lineHeight: 1.2 }}>
              We&apos;re an independent community under <span className="font-bold text-[#FFFB99]">BEM FEB Universitas Airlangga</span>, six years running, now back on an offline stage. This isn&apos;t just an event to attend. It&apos;s a space to be moved, to reflect, and maybe even to change something.
            </p>
          </Box>

          <Box left={400} top={2870} width={276.1} height={300} className="z-30"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 50 }}
          >
            <motion.img 
              src={myloTedxUa} 
              alt="Mylo TEDx UA" 
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              animate={{ y: [0, -10, 0], x: [0, -10, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </Box>
          <Box left={1200} top={2775} width={140} height={180} style={{ transform: 'rotate(-50deg)' }} className="z-20">
            <img src={firefly1} alt="" className="w-full h-full object-contain opacity-90 animate-pulse" />
          </Box>

          {/* ============ BOTTOM MUSHROOM LIGHT GLOW ============ */}
          <Box left={-100} top={3367} width={1640} height={800} className="z-10 pointer-events-none opacity-90">
            <img src={mushroomLightBottom} alt="" className="w-full h-full object-contain" />
          </Box>

          {/* ============ BOTTOM MUSHROOM FIELD & EARTH SOIL GROUND (SINGLE COMBINED ASSET) ============ */}
          <Box left={-70} top={3484} width={1580} height={716} className="z-20">
            <img src={mushroomBottomGroundGroup} alt="" className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]" />
          </Box>
        </div>
      </div>
    </div>
  );
}