import React, { useRef } from 'react'

// Components
import { Navbar, Footer } from '@/components/layout'

// Assets
import reverieTitleGraphic from '../../../assets/images/reverie_hero_graphic.svg'
import heroRightGraphic from '../../../assets/images/hero_right_graphic.svg'
import maskot1 from '../../../assets/images/milo-hero-new.webp'
import maskot2 from '../../../assets/images/Jebril_Milo.webp'
import cloudTexture from '../../../assets/images/cloud_texture.webp'
import quoteIcon from '../../../assets/images/quote_icon.svg'
import kampusA from '../../../assets/images/kampus_a.webp'
import kampusB from '../../../assets/images/kampus_b.webp'
import kampusC from '../../../assets/images/kampus_c.webp'
import jamurIcon from '../../../assets/images/jamur.svg'
import akarHero from '../../../assets/images/akar-hero-new.webp'
import akarBawah from '../../../assets/images/akar-bawah.webp'
import akar7 from '../../../assets/images/akar 7.webp'

const CAMPUS_DATA = [
  {
    id: 'kampus-a',
    title: 'Kampus A',
    address: 'JL. KAMPUS MEDIS NO.1, SURABAYA 60115',
    image: kampusA,
  },
  {
    id: 'kampus-b',
    title: 'Kampus B',
    address: 'JL. DHARMAWANGSA B NO.3, SURABAYA 60286',
    image: kampusB,
  },
  {
    id: 'kampus-c',
    title: 'Kampus C',
    address: 'JL. MULYOREJO CAKUPAN NO.5, SURABAYA 60115',
    image: kampusC,
  },
]

export function PreEventOne() {
  const campusScrollRef = useRef(null)

  const handleCampusScrollLeft = () => {
    if (campusScrollRef.current) {
      campusScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const handleCampusScrollRight = () => {
    if (campusScrollRef.current) {
      campusScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="relative min-h-screen w-full text-white font-gordita selection:bg-[#38502F] selection:text-white overflow-visible flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, #2D1E16 0%, #263A1F 52%, #8B8B8B 100%)',
      }}
    >
      {/* Header Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Decorative Akar Hero - Flush to Top Right Screen Edge Below Navbar */}
      <img
        src={akarHero}
        alt=""
        aria-hidden="true"
        className="absolute top-16 sm:top-20 right-0 z-20 w-[300px] sm:w-[480px] md:w-[600px] lg:w-[720px] max-w-none object-contain pointer-events-none opacity-90"
      />

      {/* Decorative Akar Bawah - Flush to Bottom Left Screen Edge */}
      <img
        src={akarBawah}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-0 w-[300px] sm:w-[480px] md:w-[600px] lg:w-[720px] max-w-none object-contain pointer-events-none opacity-85"
      />

      {/* Decorative Akar 7 - Absolute at Bottom 0 above background */}
      <img
        src={akar7}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 z-10 w-[700px] sm:w-[950px] lg:w-full max-w-none h-auto object-cover sm:object-contain pointer-events-none opacity-95"
      />

      {/* Outer Grid Wrapper with Top Padding ensuring all content starts below Navbar */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 flex-grow">

        {/* SECTION 1: HERO GRID (VESTIGES VISUAL + QUOTE) */}
        <section className="relative">
          <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[720px] lg:h-[844px]">
            {/* Left Column in Desktop / Bottom Column in Mobile: Visual Artwork Frame (Figma node 904:1403) */}
            <div className="order-2 lg:order-1 lg:col-span-7 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden min-h-[480px]">
              {/* Green Radial Glow (#904:2051) */}
              <div className="absolute -bottom-12 -left-12 w-[800px] h-[350px] bg-[#3a2e1f] blur-[110px] pointer-events-none z-0 opacity-90" />

              {/* Cloud Texture Overlay 1 (#904:1452) */}
              <img
                src={cloudTexture}
                alt=""
                aria-hidden="true"
                className="absolute top-[375px] -left-[118px] w-[511px] h-[304px] object-cover pointer-events-none z-0 opacity-80 mix-blend-overlay"
              />

              {/* Cloud Texture Overlay 2 (#904:1453) */}
              <img
                src={cloudTexture}
                alt=""
                aria-hidden="true"
                className="absolute top-[523px] left-[239px] w-[594px] h-[353px] object-cover pointer-events-none z-0 opacity-80 mix-blend-overlay"
              />

              {/* Center Mascot Image (#1327:1604) */}
              <div className="absolute top-[32%] lg:top-[272px] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[212px] z-20 w-[220px] sm:w-[260px] lg:w-[271px] h-auto pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                <img src={maskot1} alt="Mascot" className="w-full h-auto object-contain" />
              </div>

              {/* Empty Spacer Top */}
              <div className="relative z-20" />

              {/* Title Graphic Overlay at Bottom Left (#46:1131) */}
              <div className="relative z-30 flex flex-col items-start gap-2 pt-32 sm:pt-48">
                <span className="font-swung text-3xl sm:text-4xl lg:text-[48px] text-white tracking-tight leading-none drop-shadow-md">
                  Vestiges of
                </span>
                {reverieTitleGraphic && (
                  <img
                    src={reverieTitleGraphic}
                    alt="REVERIE Title Graphic"
                    className="w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[494px] h-auto drop-shadow-2xl"
                  />
                )}
              </div>
            </div>

            {/* Right Column in Desktop / Top Column in Mobile: Quote */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative z-30 flex flex-col justify-start items-start lg:items-end p-4 sm:p-6 lg:p-8">
              {/* Top Quote Card with Figma Node 1826:7511 Graphic Frame */}
              <div className="relative w-full max-w-[560px] lg:max-w-[600px] h-fit rounded-2xl overflow-hidden px-6 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-8 flex flex-col justify-center">
                {/* Background Frame SVG with grunge gold filaments */}
                <img
                  src={heroRightGraphic}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
                />

                {/* Quote Content with Top-Left and Bottom-Right Quote Marks */}
                <div className="relative z-10 flex flex-col">
                  {/* Top-Left Opening Quote Mark */}
                  <div className="flex items-start mb-1">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 fill-current opacity-95"
                      viewBox="0 0 42 42"
                      fill="currentColor"
                    >
                      <path d="M22.7492 34.44V20.6778L30.9421 7.56H38.0303L31.7246 19.8493H38.0303V34.44H22.7492ZM4.2002 34.44V20.6778L12.255 7.56H19.5273L13.0835 19.8493H19.5273V34.44H4.2002Z" />
                    </svg>
                  </div>

                  {/* Paragraph Text */}
                  <p className="font-gordita font-normal text-sm sm:text-base lg:text-[17px] text-white leading-relaxed tracking-normal pl-4 sm:pl-5 pr-2">
                    Explores the quiet traces we leave behind in everyday life. Through immersive and interactive experiences, participants are invited to discover that even the smallest, seemingly invisible actions can become the beginning of a greater impact.
                  </p>

                  {/* Bottom-Right Closing Quote Mark */}
                  <div className="flex items-center justify-end mt-1">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 fill-current opacity-95 rotate-180"
                      viewBox="0 0 42 42"
                      fill="currentColor"
                    >
                      <path d="M22.7492 34.44V20.6778L30.9421 7.56H38.0303L31.7246 19.8493H38.0303V34.44H22.7492ZM4.2002 34.44V20.6778L12.255 7.56H19.5273L13.0835 19.8493H19.5273V34.44H4.2002Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CONCEPT HEADLINE (Figma node 46:1068 & 1826:7818) */}
        <section className="relative my-6 sm:my-8 py-10 sm:py-16 lg:py-20 px-2 sm:px-4 lg:px-8 overflow-hidden">
          <div className="relative z-10 w-full flex flex-col items-end text-right gap-1 sm:gap-3 lg:gap-4">
            <h2
              className="w-full font-swung text-[clamp(1.75rem,6.4vw,95px)] tracking-[-0.04em] leading-[1.1] sm:leading-[1.02] bg-clip-text text-transparent break-words sm:whitespace-nowrap"
              style={{
                fontFamily: "'Swung Note', cursive",
                backgroundImage: 'linear-gradient(90deg, #8B8B8B 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Even the faintest presence
            </h2>

            {/* "leaves a trace" with Left-to-Right Hover Wipe Effect (Figma node 1826:7818 & 1826:7819) */}
            <div className="relative group cursor-pointer inline-flex items-center justify-end overflow-hidden px-3 sm:px-5 py-1 sm:py-2 rounded-xl transition-all duration-500">
              {/* Animated Background Fill Layer: Expands Left to Right */}
              <div
                className="absolute inset-0 z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #4B2D22 0%, #2D1E16 100%)',
                }}
              />

              {/* Default State Text Layer (Gradient: #8B8B8B to #FFFFFF) */}
              <h2
                className="relative z-10 font-swung text-[clamp(1.75rem,6.4vw,95px)] tracking-[-0.04em] leading-[1.1] sm:leading-[1.02] bg-clip-text text-transparent break-words sm:whitespace-nowrap transition-opacity duration-300"
                style={{
                  fontFamily: "'Swung Note', cursive",
                  backgroundImage: 'linear-gradient(90deg, #8B8B8B 0%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                leaves a trace
              </h2>

              {/* Hover State Text Layer: Sweeps Left to Right (Gradient: #EEB281 to #FFFFFF) */}
              <h2
                aria-hidden="true"
                className="absolute inset-0 px-3 sm:px-5 py-1 sm:py-2 z-20 font-swung text-[clamp(1.75rem,6.4vw,95px)] tracking-[-0.04em] leading-[1.1] sm:leading-[1.02] bg-clip-text text-transparent break-words sm:whitespace-nowrap pointer-events-none transition-all duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] flex items-center justify-end"
                style={{
                  fontFamily: "'Swung Note', cursive",
                  backgroundImage: 'linear-gradient(90deg, #EEB281 0%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                leaves a trace
              </h2>
            </div>
          </div>
        </section>

        {/* SECTION 3: EVENT COUNTDOWN / CALENDAR (Figma node 46:1172) */}
        <section className="relative my-8 overflow-visible">
          {/* Main Box - Always 1 Row Layout */}
          <div className="relative flex flex-row items-center justify-between gap-3 sm:gap-6 lg:gap-8 overflow-visible">
            {/* Cloud Background Texture 1 (Top - Shifted Left) */}
            <img
              src={cloudTexture}
              alt=""
              aria-hidden="true"
              className="absolute -top-20 -left-8 sm:-left-16 lg:-left-24 w-[560px] h-[330px] max-w-none object-cover pointer-events-none z-0 opacity-90 mix-blend-overlay overflow-visible"
            />

            {/* Cloud Background Texture 2 (Bottom Right - Extended Right) */}
            <img
              src={cloudTexture}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-20 -right-24 sm:-right-40 lg:-right-60 w-[650px] h-[390px] max-w-none object-cover pointer-events-none z-0 opacity-90 mix-blend-overlay overflow-visible"
            />

            {/* Left Column: Date Range Text Frame (#46:1172) */}
            <div className="relative z-10 flex flex-col items-start text-left max-w-[501px] flex-1 min-w-0">
              {/* Header Tag */}
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <img src={jamurIcon} alt="" className="w-4 h-5 sm:w-[18px] sm:h-[22px] object-contain" />
                <span className="font-gordita font-medium text-sm sm:text-base text-white tracking-normal">
                  Mark your calendar
                </span>
              </div>

              <div className="flex flex-col -space-y-2 sm:-space-y-3">
                <span
                  className="font-swung text-2xl sm:text-4xl lg:text-[40px] tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Swung Note', cursive",
                    backgroundImage: 'linear-gradient(180deg, #8B8B8B 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  18 augustus
                </span>
                <span
                  className="font-swung text-4xl sm:text-8xl lg:text-[96px] tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Swung Note', cursive",
                    backgroundImage: 'linear-gradient(180deg, #8B8B8B 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  until
                </span>
                <span
                  className="font-swung text-3xl sm:text-7xl lg:text-[96px] tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Swung Note', cursive",
                    backgroundImage: 'linear-gradient(180deg, #8B8B8B 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  4 september
                </span>
              </div>
            </div>

            {/* Right Column: Mascot 2 Mylo (#1327:1795) */}
            <div className="relative z-10 flex items-center justify-center w-[200px] sm:w-[340px] lg:w-[440px] xl:w-[480px] h-auto flex-shrink-0">
              {/* Mascot 2 Mylo */}
              <img
                src={maskot2}
                alt="Mascot Mylo"
                className="relative z-20 w-[200px] sm:w-[340px] lg:w-[440px] xl:w-[480px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: CAMPUS LOCATIONS */}
        <section className="relative my-8 pt-6 pb-12">
          {/* Top Tag */}
          <div className="flex items-center gap-2 mb-3">
            <img src={jamurIcon} alt="" className="w-4 h-5 sm:w-[18px] sm:h-[22px] object-contain" />
            <span className="font-gordita font-medium text-base text-white tracking-normal">
              Connect the roots on
            </span>
          </div>

          {/* Section Subtitle */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-swung text-3xl sm:text-4xl lg:text-[40px] text-white tracking-tight uppercase leading-tight">
              Where it all began to connect.
            </h3>

            {/* Navigation Controls (Figma node 261:392 arrow cta) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleCampusScrollLeft}
                aria-label="Previous Campus"
                className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-[#212020] hover:bg-[#263A1F] active:bg-[#263A1F] text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-white rotate-180" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.8044 7.5289L6.2488 1.97335C5.98835 1.7129 5.56613 1.7129 5.30568 1.97335C5.04524 2.23379 5.04524 2.65605 5.30568 2.9165L10.3901 8.00091L5.30568 13.0854C5.04524 13.3458 5.04524 13.768 5.30568 14.0285C5.43546 14.1582 5.60613 14.224 5.7768 14.224C5.94746 14.224 6.11813 14.1591 6.24791 14.0285L11.8035 8.47292C12.0639 8.21248 12.0639 7.79027 11.8035 7.52983L11.8044 7.5289Z" />
                </svg>
              </button>
              <button
                onClick={handleCampusScrollRight}
                aria-label="Next Campus"
                className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-[#212020] hover:bg-[#263A1F] active:bg-[#263A1F] text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.8044 7.5289L6.2488 1.97335C5.98835 1.7129 5.56613 1.7129 5.30568 1.97335C5.04524 2.23379 5.04524 2.65605 5.30568 2.9165L10.3901 8.00091L5.30568 13.0854C5.04524 13.3458 5.04524 13.768 5.30568 14.0285C5.43546 14.1582 5.60613 14.224 5.7768 14.224C5.94746 14.224 6.11813 14.1591 6.24791 14.0285L11.8035 8.47292C12.0639 8.21248 12.0639 7.79027 11.8035 7.52983L11.8044 7.5289Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 3 Campus Grid Cards (Figma node 1826:7749 & 1826:7750 Hover Variant) */}
          <div
            ref={campusScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            {CAMPUS_DATA.map((campus) => (
              <div
                key={campus.id}
                className="w-[280px] sm:w-[320px] md:w-auto snap-start flex-shrink-0 md:flex-shrink flex flex-col rounded-sm overflow-hidden p-2 sm:p-2.5 transition-all duration-500 bg-[#8B8B8B]/10 hover:bg-gradient-to-br hover:from-[#FF4C4C] hover:to-[#650101] group cursor-pointer"
              >
                {/* Campus Image Frame (Clean without image hover effects) */}
                <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden rounded-sm">
                  <img
                    src={campus.image}
                    alt={campus.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Campus Details with Dark Red Base in Hover State */}
                <div className="flex flex-col gap-[10px] text-left pt-4 pb-2 px-1.5 transition-colors duration-500">
                  <h4 className="font-gordita font-medium text-[24px] leading-tight text-white group-hover:text-white transition-colors duration-300">
                    {campus.title}
                  </h4>
                  <p className="font-gordita font-medium text-[15.4px] leading-normal text-[#FEF8E0] group-hover:text-[#FFF5D6] uppercase tracking-normal transition-colors duration-300">
                    {campus.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="relative z-40">
        <Footer />
      </div>
    </div>
  )
}

export default PreEventOne
