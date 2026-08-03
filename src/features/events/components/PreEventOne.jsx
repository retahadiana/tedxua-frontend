import React, { useRef } from 'react'

// Assets
import vestigesTitleGraphic from '../../../assets/images/vestiges_title_graphic.svg'
import maskot1 from '../../../assets/images/maskot_1_hero.png'
import maskot2 from '../../../assets/images/maskot_2_calendar.png'
import cloudTexture from '../../../assets/images/cloud_texture.png'
import quoteIcon from '../../../assets/images/quote_icon.svg'
import kampusA from '../../../assets/images/kampus_a.png'
import kampusB from '../../../assets/images/kampus_b.png'
import kampusC from '../../../assets/images/kampus_c.png'
import jamurIcon from '../../../assets/images/jamur.svg'
import akarHero from '../../../assets/images/akar-hero.png'
import akarBawah from '../../../assets/images/akar-bawah.png'

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

// Technical Grid Plus Intersection Cross
const PlusMark = ({ className = '' }) => (
  <svg
    className={`absolute z-30 w-5 h-5 text-[#444444] pointer-events-none select-none ${className}`}
    viewBox="0 0 20 20"
  >
    <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
  </svg>
)

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
    <div className="relative min-h-screen w-full bg-[#111111] text-white font-gordita selection:bg-[#38502F] selection:text-white overflow-x-hidden">
      {/* Decorative Akar Hero - Flush to Top Right Screen Edge */}
      <img
        src={akarHero}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 z-20 w-[300px] sm:w-[480px] md:w-[600px] lg:w-[720px] max-w-none object-contain pointer-events-none opacity-90"
      />

      {/* Decorative Akar Bawah - Flush to Bottom Left Screen Edge */}
      <img
        src={akarBawah}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-0 w-[300px] sm:w-[480px] md:w-[600px] lg:w-[720px] max-w-none object-contain pointer-events-none opacity-85"
      />

      {/* Outer Grid Wrapper with Side Padding on Desktop */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-6 sm:py-10">

        {/* SECTION 1: HERO GRID (VESTIGES VISUAL + QUOTE) */}
        <section className="relative border border-[#212020] bg-[#111111]">

          {/* Intersection Cross Markers */}
          <PlusMark className="-top-2.5 -left-2.5" />
          <PlusMark className="-top-2.5 -right-2.5" />
          <PlusMark className="-bottom-2.5 -left-2.5" />
          <PlusMark className="-bottom-2.5 -right-2.5" />
          <PlusMark className="-top-2.5 left-7/12 -translate-x-1/2 hidden lg:block" />
          <PlusMark className="-bottom-2.5 left-7/12 -translate-x-1/2 hidden lg:block" />

          <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[720px] lg:h-[844px]">
            {/* Left Column in Desktop / Bottom Column in Mobile: Visual Artwork Frame (Figma node 904:1403) */}
            <div className="order-2 lg:order-1 lg:col-span-7 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#212020] bg-[#111111] overflow-hidden min-h-[480px]">
              {/* Green Radial Glow (#904:2051) */}
              <div className="absolute -bottom-12 -left-12 w-[800px] h-[350px] bg-[#263A1F] blur-[110px] pointer-events-none z-0 opacity-90" />

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

              {/* Title Graphic Overlay at Bottom Left (#904:1405 & #904:1443) */}
              <div className="relative z-30 flex flex-col items-start gap-2 pt-32 sm:pt-48">
                <span className="font-swung text-3xl sm:text-4xl lg:text-[48px] text-white tracking-tight leading-none drop-shadow-md">
                  Vestiges of
                </span>
                {vestigesTitleGraphic && (
                  <img
                    src={vestigesTitleGraphic}
                    alt="REVERIE Title Graphic"
                    className="w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[481px] h-auto drop-shadow-2xl"
                  />
                )}
              </div>
            </div>

            {/* Right Column in Desktop / Top Column in Mobile: Quote & CTA */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative z-30 flex flex-col justify-between p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 border-[#212020] bg-[#111111]">
              {/* Plus Mark on internal split line */}
              <PlusMark className="top-[380px] -right-2.5 hidden lg:block" />

              {/* Top Quote Content */}
              <div className="relative z-40 flex flex-col gap-5 pt-2">
                <img src={quoteIcon} alt="Quote" className="w-10 h-10 object-contain" />
                <p className="font-gordita font-medium text-lg sm:text-xl lg:text-[20px] text-white leading-relaxed tracking-tight">
                  Explores the quiet traces we leave behind in everyday life. Through immersive and interactive experiences, participants are invited to discover that even the smallest, seemingly invisible actions can become the beginning of a greater impact.
                </p>
              </div>

              {/* Horizontal Divider Line inside Right Column */}
              <div className="w-full h-[1px] bg-[#212020] my-8 lg:my-0" />

              {/* Bottom CTA: Scroll to explore */}
              <div className="flex items-center justify-end pt-4">
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
                  className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity cursor-pointer group"
                >
                  <span className="font-gordita font-medium text-lg sm:text-xl">
                    Scroll to explore
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full border border-white/20 group-hover:border-white transition-colors">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CONCEPT HEADLINE (Figma node 517:1488) */}
        <section className="relative my-8 border-t border-b border-[#212020] py-16 sm:py-20 lg:py-24 px-4 sm:px-8">
          <PlusMark className="-top-2.5 -left-2.5" />
          <PlusMark className="-top-2.5 -right-2.5" />
          <PlusMark className="-bottom-2.5 -left-2.5" />
          <PlusMark className="-bottom-2.5 -right-2.5" />

          <div className="relative z-10 w-full flex flex-col items-end text-right gap-2 sm:gap-4">
            <h2
              className="w-full font-swung text-3xl sm:text-6xl md:text-8xl lg:text-[118px] xl:text-[135px] tracking-[-0.04em] leading-[1.02] bg-clip-text text-transparent whitespace-nowrap"
              style={{
                backgroundImage: 'linear-gradient(90deg, #666666 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Even the faintest presence
            </h2>
            <h2
              className="w-full font-swung text-3xl sm:text-6xl md:text-8xl lg:text-[118px] xl:text-[135px] tracking-[-0.04em] leading-[1.02] bg-clip-text text-transparent whitespace-nowrap"
              style={{
                fontFamily: "'Swung Note', cursive",
                backgroundImage: 'linear-gradient(90deg, #38502F 0%, #22351E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              leaves a trace
            </h2>
          </div>
        </section>

        {/* SECTION 3: EVENT COUNTDOWN / CALENDAR (Figma node 517:1503) */}
        <section className="relative my-8">
          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-4">
            <img src={jamurIcon} alt="" className="w-3.5 h-4 object-contain" />
            <span className="font-gordita font-medium text-base text-white tracking-normal">
              Mark your calendar
            </span>
          </div>

          {/* Main Box with Grid Border - Always 1 Row Layout */}
          <div className="relative border border-[#212020] bg-[#111111] p-4 sm:p-8 lg:p-10 min-h-[220px] sm:min-h-[329px] flex flex-row items-center justify-between gap-3 sm:gap-6 lg:gap-8">
            <PlusMark className="-top-2.5 -left-2.5" />
            <PlusMark className="-top-2.5 -right-2.5" />
            <PlusMark className="-bottom-2.5 -left-2.5" />
            <PlusMark className="-bottom-2.5 -right-2.5" />

            {/* Cloud Background Texture 1 (Top - Shifted Left) */}
            <img
              src={cloudTexture}
              alt=""
              aria-hidden="true"
              className="absolute -top-16 right-4 sm:right-16 lg:right-28 w-[511px] h-[304px] object-cover pointer-events-none z-0 opacity-85 mix-blend-overlay"
            />

            {/* Cloud Background Texture 2 (Bottom Right - Extended Right) */}
            <img
              src={cloudTexture}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-16 -right-32 sm:-right-44 w-[594px] h-[353px] object-cover pointer-events-none z-0 opacity-85 mix-blend-overlay"
            />

            {/* Left Column: Date Range Text Frame (#517:1504) */}
            <div className="relative z-10 flex flex-col items-start text-left -space-y-1.5 sm:-space-y-3 lg:-space-y-3 max-w-[501px] flex-1 min-w-0">
              <span className="font-swung text-2xl sm:text-4xl lg:text-[40px] text-[#38502F] tracking-tight leading-none" style={{ fontFamily: "'Swung Note', cursive" }}>
                18 augustus
              </span>
              <span className="font-swung text-4xl sm:text-8xl lg:text-[96px] text-[#38502F] tracking-tight leading-none" style={{ fontFamily: "'Swung Note', cursive" }}>
                until
              </span>
              <span className="font-swung text-3xl sm:text-7xl lg:text-[96px] text-[#38502F] tracking-tight leading-none" style={{ fontFamily: "'Swung Note', cursive" }}>
                4 september
              </span>
            </div>

            {/* Right Column: Mascot 2 Mylo (#1327:1795) */}
            <div className="relative z-10 flex items-center justify-center w-[120px] sm:w-[220px] lg:w-[262px] h-auto flex-shrink-0">
              {/* Mascot 2 Mylo */}
              <img
                src={maskot2}
                alt="Mascot Mylo"
                className="relative z-20 w-[120px] sm:w-[220px] lg:w-[262px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: CAMPUS LOCATIONS */}
        <section className="relative my-8 pt-6 pb-12 border-b border-[#212020]">
          <PlusMark className="-bottom-2.5 -left-2.5" />
          <PlusMark className="-bottom-2.5 -right-2.5" />

          {/* Top Tag */}
          <div className="flex items-center gap-2 mb-3">
            <img src={jamurIcon} alt="" className="w-3.5 h-4 object-contain" />
            <span className="font-gordita font-medium text-base text-white tracking-normal">
              Connect the roots on
            </span>
          </div>

          {/* Section Subtitle */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-swung text-3xl sm:text-4xl lg:text-[40px] text-white tracking-tight uppercase leading-tight">
              Where it all began to connect.
            </h3>

            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleCampusScrollLeft}
                aria-label="Previous Campus"
                className="w-9 h-9 flex items-center justify-center rounded border border-[#212020] bg-[#151515] text-white hover:bg-neutral-800 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={handleCampusScrollRight}
                aria-label="Next Campus"
                className="w-9 h-9 flex items-center justify-center rounded border border-[#212020] bg-[#151515] text-white hover:bg-neutral-800 transition-colors"
              >
                ›
              </button>
            </div>
          </div>

          {/* 3 Campus Grid Cards */}
          <div
            ref={campusScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            {CAMPUS_DATA.map((campus) => (
              <div
                key={campus.id}
                className="w-[280px] sm:w-[320px] md:w-auto snap-start flex-shrink-0 md:flex-shrink flex flex-col gap-4 group cursor-pointer"
              >
                {/* Campus Image Frame (360px height on desktop) with Figma node 517:1553 Green Tint Overlay */}
                <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[360px] overflow-hidden border border-transparent group-hover:border-[#38502F]/60 transition-all duration-300">
                  <img
                    src={campus.image}
                    alt={campus.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Green Tint Overlay (rgba(38, 58, 31, 0.3) from Figma node 517:1553) */}
                  <div className="absolute inset-0 bg-[#263A1F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#263A1F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Campus Details */}
                <div className="flex flex-col gap-1 text-left">
                  <h4 className="font-gordita font-medium text-xl lg:text-[24px] text-white group-hover:text-[#FFFB99] transition-colors duration-300">
                    {campus.title}
                  </h4>
                  <p className="font-gordita font-medium text-sm lg:text-[16px] text-[#747474] group-hover:text-gray-300 uppercase tracking-wide transition-colors duration-300">
                    {campus.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default PreEventOne
