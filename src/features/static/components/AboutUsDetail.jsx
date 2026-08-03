import React from 'react';

// Mascots & Banners
import myloHero from '../../../assets/images/mylo-hero-mascot.svg';
import myloBanner from '../../../assets/images/mylo-banner.svg';
import myloTed from '../../../assets/images/mylo-ted-mascot.svg';
import myloTedx from '../../../assets/images/mylo-tedx-mascot.svg';
import myloTedxUa from '../../../assets/images/mylo-tedxua-mascot.svg';

// Canopy & Ground
import mycelium from '../../../assets/images/mycelium.png';
import bottomGround from '../../../assets/images/bottom-ground-7dc83c.png';

// Fireflies & Glows
import fireflyGlowHero from '../../../assets/images/firefly-glow-hero.png';
import firefly1 from '../../../assets/images/firefly-1.png';
import firefly2 from '../../../assets/images/firefly-2.png';
import fireflyGlow from '../../../assets/images/firefly-glow-1-3d4ee5.png';
import fireflyGlow1 from '../../../assets/images/firefly-glow-1-3d4ee5.png';
import fireflyGlow2 from '../../../assets/images/firefly-glow-2-3ffc64.png';
import fireflyGlow3 from '../../../assets/images/firefly-glow-3-3cd17d.png';

// Mushrooms & Figma Assets
import mushroom1 from '../../../assets/images/mushroom-1.png';
import mushroom2 from '../../../assets/images/mushroom-2.png';
import mushroom3 from '../../../assets/images/mushroom-3.png';
import mushroom4 from '../../../assets/images/mushroom-4.png';
import mushroom6 from '../../../assets/images/mushroom-6.png';
import mushroomOntop from '../../../assets/images/mushroom-small-ontop-18b1c9.png';
import mushroomBg1 from '../../../assets/images/mushroom-bg-1-31da33.png';
import mushroomBg2 from '../../../assets/images/mushroom-bg-2-4d9d4a.png';
import mushroomBg3 from '../../../assets/images/mushroom-bg-3-4fa71a.png';

// Figma Branch Assets
import cardBranch1 from '../../../assets/images/card-branch-1.svg';
import cardBranch2 from '../../../assets/images/card-branch-2.svg';
import cardBranch3 from '../../../assets/images/card-branch-3.svg';

// Footer Logo & Icons
import tedxLogoWhite from '../../../assets/images/tedx_unair_putih.png';
import footerSocialIcons from '../../../assets/images/footer-social-icons.svg';

const tedGradient = 'bg-clip-text text-transparent bg-gradient-to-b from-[#FF2B06] to-[#991A04] drop-shadow-[0_0_20px_rgba(254,248,224,0.5)]';

const Card = ({ children, className = "", innerClassName = "" }) => (
  <div className={`p-[4px] bg-gradient-to-b from-[#4B2D22] via-[#DE9B55] to-[#FFFB99] rounded-[20px] shadow-2xl relative z-10 ${className}`}>
    <div className={`w-full h-full bg-gradient-to-b from-[#FFFB99]/30 to-[#ADA98B]/30 rounded-[16px] p-6 sm:p-8 md:p-10 backdrop-blur-md text-[#FEF8E0] relative overflow-hidden ${innerClassName}`}>
      {children}
    </div>
  </div>
);

export default function AboutUsDetail() {
  return (
    <div className="w-full overflow-x-hidden bg-[#1E0F0A] text-[#FEF8E0] relative min-h-screen">

      {/* Top Center Rich Warm Radial Glow (Matches Figma Image 1 / Target) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full min-w-[1440px] h-[850px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 20%, #9E4922 0%, #542516 45%, #1E0F0A 85%)'
        }}
      />

      {/* 1. Background Canopy (Single Mycelium Layer) */}
      <img
        src={mycelium}
        alt="Mycelium Canopy"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full min-w-[1440px] h-[850px] object-cover object-top pointer-events-none z-0 opacity-90"
      />

      {/* Document Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,8,4,0.4)_100%)] z-0"></div>

      {/* Background Glow Blobs */}
      <div className="absolute top-[8%] left-[5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-rose-100/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-yellow-800/20 rounded-full blur-[90px] md:blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[25%] left-[5%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#ADA98B]/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col pt-8 sm:pt-14 md:pt-20 pb-12">

        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 pt-48 sm:pt-64 md:pt-[340px] z-20">

          {/* Banner & Mascot Composition */}
          <div className="relative w-full flex flex-col items-start justify-center max-w-[1100px] mb-28 sm:mb-40 md:mb-56">

            {/* Teks "Hi, I'm" */}
            <p className="font-['Essays1743'] text-2xl sm:text-3xl md:text-[50px] font-bold text-[#FEF8E0] mb-1 sm:mb-2 ml-4 sm:ml-6 md:ml-8 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Hi, I'm
            </p>

            {/* Banner MYLO + Maskot Mylo Relative Group */}
            <div className="relative inline-flex items-start">
              {/* Banner MYLO */}
              <img
                src={myloBanner}
                alt="MYLO"
                className="w-[280px] sm:w-[440px] md:w-[660px] h-auto drop-shadow-2xl relative z-10 block"
              />

              {/* Maskot Mylo Hero */}
              <img
                src={myloHero}
                alt="Mylo Hero"
                className="absolute left-[60%] sm:left-[61%] md:left-[62%] -top-8 sm:-top-10 md:-top-12 w-44 sm:w-80 md:w-[400px] h-auto drop-shadow-2xl z-20 pointer-events-none"
              />
            </div>
          </div>

          {/* White/Glowing Firefly Asset from Figma (Node 1462:170) on Bottom Left of Hero */}
          <img 
            src={fireflyGlowHero} 
            alt="Firefly Glow Spot" 
            className="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 -left-8 sm:-left-16 md:-left-20 w-[440px] sm:w-[620px] md:w-[780px] h-auto pointer-events-none z-10 opacity-95 mix-blend-screen drop-shadow-[0_0_35px_rgba(255,251,153,0.5)]" 
          />

          {/* Paragraf Deskripsi Hero (Node 1462:169) - Lowered down slightly as requested */}
          <div className="w-full md:w-[75%] lg:w-[65%] ml-auto text-right relative z-10 md:pr-12 mt-12 sm:mt-16 md:mt-24">
            <p className="font-['Essays1743'] font-medium text-lg sm:text-2xl md:text-[40px] md:leading-[46px] text-[#FEF8E0] drop-shadow">
              I began as something unseen — quiet, unfinished, and easy to overlook. But like every small thing that eventually takes root, I'm here now to guide you through <span className="text-[#FFFB99] font-bold">TEDxUniversitas Airlangga 2026,</span> one step at a time.
            </p>
          </div>
        </section>

        {/* ================= SECTION 1: ABOUT TED ================= */}
        <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 flex flex-col mt-24 md:mt-32">

          {/* Background Glow & Giant Mushroom Bg for Section 1 */}
          <img src={fireflyGlow1} alt="" className="absolute -top-32 -left-20 w-[600px] h-auto opacity-60 pointer-events-none z-0" />
          <img src={mushroomBg1} alt="" className="absolute -left-48 top-10 w-[700px] h-auto opacity-35 pointer-events-none z-0" />

          {/* Title Composition */}
          <div className="relative w-full z-10 flex flex-col items-start md:ml-12 mb-4 md:-mb-12">
            <h2 className="font-['Essays1743'] font-bold text-[#FEF8E0] text-3xl md:text-[66px] leading-none md:absolute md:-top-4 md:left-[110px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] z-20">About</h2>
            <div className="relative inline-block">
              <h3 className={`font-['Swung_Note'] text-[150px] sm:text-[200px] md:text-[250px] leading-[0.8] ${tedGradient} drop-shadow-[0_0_20px_rgba(254,248,224,0.5)] z-10 relative`}>ted</h3>
              {/* Mushroom on top of "ted" title (Figma asset mushroomOntop) */}
              <img
                src={mushroomOntop}
                alt="Mushroom on TED"
                className="absolute -top-8 sm:-top-14 md:-top-16 right-0 sm:right-4 md:right-4 w-32 sm:w-48 md:w-[260px] pointer-events-none z-30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="relative w-full z-20 mt-4 md:mt-0">
            {/* Card (Wide) */}
            <div className="w-full md:w-[85%] lg:w-[88%] md:ml-auto relative z-10">
              <Card innerClassName="md:pr-[180px]">
                {/* Branch SVG from Figma */}
                <img
                  src={cardBranch1}
                  alt=""
                  className="absolute right-0 top-0 w-[380px] sm:w-[440px] md:w-[480px] h-auto pointer-events-none z-10"
                />
                <p className="font-['Essays1743'] font-medium text-base sm:text-2xl md:text-[30px] md:leading-[40px] text-justify text-[#FEF8E0] relative z-20">
                  <span className="font-bold text-[#FFFB99]">TED</span> is a grassroots initiative, created in the spirit of <span className="font-bold text-[#FFFB99]">TED</span>'s overall mission to research and discover <span className="font-bold text-[#FFFB99]">“ideas change everything”</span>. <span className="font-bold text-[#FFFB99]">TED</span> brings the spirit of <span className="font-bold text-[#FFFB99]">TED</span> to local communities around the globe through <span className="font-bold text-[#FFFB99]">TED</span> events. These events are organized by passionate individuals who seek to uncover new ideas and to share the latest research in their local areas that spark conversations in their communities. More than 3000 events are now held annually. The content and design of each <span className="font-bold text-[#FFFB99]">TED</span> event is unique and developed independently, but all of them have features in common.
                </p>
              </Card>
            </div>

            {/* Mascot Overlapping Card */}
            <div className="absolute right-0 md:-right-4 top-[-60px] md:-top-16 z-30 pointer-events-none hidden md:block">
              <img src={myloTed} alt="Mylo TED" className="w-[380px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] pointer-events-auto hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-10 z-20 flex items-center justify-center pointer-events-none">
                <div className="absolute w-24 h-24 bg-[#FFFB99]/40 rounded-full blur-[20px]"></div>
                <img src={firefly1} alt="" className="w-24 animate-pulse relative z-10 opacity-90" />
              </div>
            </div>
            {/* Mobile Mascot */}
            <div className="w-full flex justify-center mt-[-40px] relative z-30 md:hidden">
              <img src={myloTed} alt="Mylo TED" className="w-[220px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: ABOUT TEDx ================= */}
        <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 flex flex-col mt-20 md:mt-32">

          {/* Background Glow & Giant Mushroom Bg for Section 2 */}
          <img src={fireflyGlow2} alt="" className="absolute -top-20 right-0 w-[550px] h-auto opacity-50 pointer-events-none z-0" />
          <img src={mushroomBg2} alt="" className="absolute -right-44 top-0 w-[700px] h-auto opacity-30 pointer-events-none z-0" />

          {/* Title Composition (Right aligned) */}
          <div className="relative w-full z-10 flex flex-col items-end md:pr-24 mb-6 md:-mb-16">
            <h2 className="font-['Essays1743'] font-bold text-[#FEF8E0] text-3xl md:text-[66px] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] z-30 md:absolute md:-top-4 md:right-[430px]">About</h2>
            <div className="relative inline-flex items-end justify-end">
              <h3 className={`font-['Swung_Note'] text-[150px] sm:text-[200px] md:text-[250px] leading-[0.8] ${tedGradient} drop-shadow-[0_0_20px_rgba(254,248,224,0.5)] z-20`}>ted</h3>
              <span className="font-['Swung_Note'] text-[130px] sm:text-[180px] md:text-[230px] leading-[0.7] text-[#4B2D22] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-10 -ml-4 md:-ml-12 relative -bottom-4 md:bottom-2">X</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative w-full mt-4 md:mt-0 z-20">
            {/* Card (Wide Left) */}
            <div className="w-full md:w-[75%] lg:w-[65%] relative z-10">
              <Card innerClassName="md:pr-[120px]">
                {/* Branch SVG from Figma */}
                <img
                  src={cardBranch2}
                  alt=""
                  className="absolute right-0 top-0 w-[260px] sm:w-[300px] h-auto pointer-events-none z-10"
                />
                <p className="font-['Essays1743'] font-medium text-base sm:text-2xl md:text-[30px] md:leading-[40px] text-left text-[#FEF8E0] relative z-20">
                  <span className="font-bold text-[#FFFB99]">TEDx</span> is <span className="font-bold text-[#FFFB99]">TED</span>'s mission brought closer to home — local ideas, told by local voices. Anyone, anywhere can start one, and today there are over 3,000 of them around the world, each sparking conversations that matter to their own community.
                </p>
              </Card>
            </div>

            {/* Mascot (Absolute Right, Overlapping Card) */}
            <div className="absolute right-[5%] md:right-[15%] top-[-40px] md:top-12 z-30 pointer-events-none hidden md:block">
              <img src={myloTedx} alt="Mylo TEDx" className="w-[320px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] pointer-events-auto hover:-translate-y-2 transition-transform duration-700" />

              <div className="absolute top-[40%] right-4 z-20 flex items-center justify-center pointer-events-none">
                <div className="absolute w-24 h-24 bg-[#FFFB99]/30 rounded-full blur-[20px]"></div>
                <img src={firefly2} alt="" className="w-24 animate-pulse relative z-10 opacity-90" />
              </div>
            </div>
            {/* Mobile Mascot */}
            <div className="w-full flex justify-center mt-[-40px] relative z-30 md:hidden">
              <img src={myloTedx} alt="Mylo TEDx" className="w-[220px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]" />
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: ABOUT TEDx UNIVERSITAS AIRLANGGA ================= */}
        <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 flex flex-col mt-24 md:mt-32">

          {/* Background Glow & Giant Mushroom Bg for Section 3 */}
          <img src={fireflyGlow3} alt="" className="absolute top-10 left-10 w-[500px] h-auto opacity-50 pointer-events-none z-0" />
          <img src={mushroomBg3} alt="" className="absolute -left-20 top-20 w-[400px] h-auto opacity-40 pointer-events-none z-0" />

          {/* Title Composition (Left) */}
          <div className="relative w-full z-20 flex flex-col items-start mb-8 md:-mb-12 md:pl-[120px]">
            <h2 className="font-['Essays1743'] font-bold text-[#FEF8E0] text-3xl md:text-[66px] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] z-30 mb-2 md:mb-0 md:absolute md:-top-2 md:left-[110px]">About</h2>

            <div className="flex flex-col items-start relative z-20">
              {/* TEDx */}
              <div className="relative flex items-end justify-start -mb-4 md:-mb-8">
                <h3 className={`font-['Swung_Note'] text-[150px] sm:text-[200px] md:text-[250px] leading-[0.8] ${tedGradient} drop-shadow-[0_0_20px_rgba(254,248,224,0.5)] z-20 relative`}>ted</h3>
                <span className="font-['Swung_Note'] text-[110px] sm:text-[140px] md:text-[160px] leading-[0.7] text-[#4B2D22] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] relative -left-4 sm:-left-8 md:-left-8 z-10">X</span>
              </div>

              {/* universitas Airlangga */}
              <h4 className="font-['Swung_Note'] text-[60px] sm:text-[80px] md:text-[100px] text-[#FEF8E0] leading-[0.8] text-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-30 relative ml-2 md:-ml-8 md:mt-2">
                universitas Airlangga
              </h4>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative w-full mt-4 md:mt-16 z-10">

            {/* Card Right */}
            <div className="w-full md:w-[75%] lg:w-[65%] md:ml-auto relative z-20">
              <Card innerClassName="md:pl-[140px]">
                {/* Branch SVG from Figma */}
                <img
                  src={cardBranch3}
                  alt=""
                  className="absolute left-0 top-0 w-[260px] sm:w-[300px] h-auto pointer-events-none z-10"
                />
                <p className="font-['Essays1743'] font-medium text-base sm:text-2xl md:text-[30px] md:leading-[38px] text-center md:text-right text-[#FEF8E0] relative z-20">
                  We're an independent community under <span className="font-bold text-[#FFFB99]">BEM FEB Universitas Airlangga</span>, six years running, now back on an offline stage. This isn't just an event to attend. It's a space to be moved, to reflect, and maybe even to change something.
                </p>
              </Card>
            </div>

            {/* Mascot Absolute Left */}
            <div className="absolute left-[5%] md:left-[10%] top-[-80px] md:-top-10 z-30 pointer-events-none hidden md:block">
              <img src={myloTedxUa} alt="Mylo TEDx UA" className="w-[320px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] pointer-events-auto md:-rotate-6 hover:rotate-0 transition-transform duration-700" />
              <div className="absolute bottom-16 -right-4 z-20 flex items-center justify-center pointer-events-none">
                <div className="absolute w-24 h-24 bg-[#FFFB99]/40 rounded-full blur-[20px]"></div>
                <img src={firefly1} alt="" className="w-24 animate-pulse relative z-10 opacity-90" />
              </div>
            </div>

            {/* Mobile Mascot */}
            <div className="w-full flex justify-center mt-[-30px] relative z-30 md:hidden">
              <img src={myloTedxUa} alt="Mylo TEDx UA" className="w-[220px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]" />
            </div>
          </div>
        </section>

      </div>

      {/* ================= BOTTOM MUSHROOM FIELD ================= */}
      <div className="relative w-full h-56 sm:h-80 md:h-[480px] overflow-hidden mt-8 md:mt-16 z-20">
        {/* Warm Ground Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-orange-600/30 blur-[80px] pointer-events-none z-0"></div>

        {/* Soil Ground Background */}
        {bottomGround && (
          <img src={bottomGround} alt="" className="absolute bottom-0 left-0 w-full h-40 sm:h-56 md:h-80 object-cover pointer-events-none z-0 opacity-90" />
        )}

        {/* Mushrooms Arrangement (Natural composition, increased size) */}

        {/* Left group */}
        <div className="absolute bottom-0 sm:bottom-2 left-[-4%] z-20">
          <div className="absolute bottom-4 left-10 w-24 h-24 bg-orange-400/40 blur-2xl z-0 pointer-events-none"></div>
          <img src={mushroom1} alt="" className="w-36 sm:w-64 md:w-[400px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-10" />
        </div>

        {/* Middle-left */}
        <div className="absolute bottom-8 sm:bottom-16 md:bottom-28 left-[18%] z-10">
          <div className="absolute bottom-2 left-8 w-20 h-20 bg-yellow-200/30 blur-xl z-0 pointer-events-none"></div>
          <img src={mushroom4} alt="" className="w-32 sm:w-56 md:w-[350px] h-auto scale-x-[-1] drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] relative z-10" />
        </div>

        {/* Center/Middle higher */}
        <div className="absolute bottom-12 sm:bottom-24 md:bottom-40 left-[42%] z-10">
          <div className="absolute bottom-2 left-4 w-16 h-16 bg-[#FFFB99]/30 blur-lg z-0 pointer-events-none"></div>
          <img src={mushroom2} alt="" className="w-16 sm:w-28 md:w-[190px] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] relative z-10" />
        </div>

        {/* Middle-right */}
        <div className="absolute bottom-14 sm:bottom-20 md:bottom-32 right-[22%] z-10">
          <div className="absolute bottom-2 left-6 w-16 h-16 bg-orange-300/40 blur-xl z-0 pointer-events-none"></div>
          <img src={mushroom6} alt="" className="w-24 sm:w-36 md:w-[240px] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] relative z-10" />
        </div>

        {/* Right group */}
        <div className="absolute bottom-[-10px] sm:bottom-[-20px] right-[-2%] z-30">
          <div className="absolute bottom-10 left-16 w-32 h-32 bg-amber-500/40 blur-3xl z-0 pointer-events-none"></div>
          <img src={mushroom3} alt="" className="w-48 sm:w-80 md:w-[550px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-10" />
        </div>
      </div>

    </div>
  );
}