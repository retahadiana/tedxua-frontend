import React, { useRef } from 'react'

// Assets
import vestigesBg from '../../../assets/images/vestiges_bg.png'
import vestigesTitleGraphic from '../../../assets/images/vestiges_title_graphic.png'
import maskot1 from '../../../assets/images/maskot-1.png'
import maskot2 from '../../../assets/images/maskot-2.png'
import awanHero from '../../../assets/images/awan-hero.png'
import hiasan2 from '../../../assets/images/hiasan-2.png'
import quoteIcon from '../../../assets/images/quote_icon.svg'
import calendarDecor1 from '../../../assets/images/calendar_decor_1.png'
import calendarDecor2 from '../../../assets/images/calendar_decor_2.png'
import kampusA from '../../../assets/images/kampus_a.png'
import kampusB from '../../../assets/images/kampus_b.png'
import kampusC from '../../../assets/images/kampus_c.png'
import jamurIcon from '../../../assets/icons/jamur.svg'

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
      campusScrollRef.current.scrollBy({ left: -240, behavior: 'smooth' })
    }
  }

  const handleCampusScrollRight = () => {
    if (campusScrollRef.current) {
      campusScrollRef.current.scrollBy({ left: 240, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#111111] text-white selection:bg-yellow-400 selection:text-black font-gordita overflow-x-hidden">
      {/* Clean Full Width Layout Container */}
      <div className="relative w-full max-w-full px-4 sm:px-8 lg:px-12 py-8 overflow-x-hidden">

        {/* Section 1: Hero Section */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch py-2 sm:py-4">
            {/* Left Column: Vestiges Visual Banner */}
            <div className="order-2 lg:order-1 lg:col-span-6 relative w-full h-[60vh] sm:h-[72vh] lg:h-[80vh] min-h-[440px] max-h-[820px] p-4 sm:p-5 lg:p-[20px] rounded-none overflow-visible flex flex-col justify-end bg-[#111111] shadow-2xl">
              {/* Background Texture Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={vestigesBg}
                  alt="Vestiges Background"
                  className="w-full h-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
              </div>

              {/* Decorative Cloud Overlay - Top Left */}
              <img
                src={awanHero}
                alt=""
                aria-hidden="true"
                className="absolute -top-10 sm:-top-16 lg:-top-20 -left-10 sm:-left-16 lg:-left-20 z-[100] w-56 sm:w-80 lg:w-[480px] max-w-none object-contain pointer-events-none mix-blend-overlay opacity-90"
              />

              {/* Decorative Cloud Overlay - Bottom Right */}
              <img
                src={awanHero}
                alt=""
                aria-hidden="true"
                className="absolute -bottom-10 sm:-bottom-16 lg:-bottom-20 -right-10 sm:-right-16 lg:-right-20 z-[100] w-56 sm:w-80 lg:w-[480px] max-w-none object-contain pointer-events-none mix-blend-overlay opacity-90 transform rotate-180"
              />

              {/* Glowing Center Radial Blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-black/60 rounded-full blur-3xl pointer-events-none" />

              {/* Center Mascot Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-36 sm:w-48 md:w-52 lg:w-60 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
                <img
                  src={maskot1}
                  alt="Mascot"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Bottom Left Text Overlay */}
              <div className="relative z-30 flex flex-col items-start space-y-1 text-left pt-16 sm:pt-24 lg:pt-32">
                <span className="font-swung text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  VESTIGES OF
                </span>
                {vestigesTitleGraphic && (
                  <img
                    src={vestigesTitleGraphic}
                    alt="REVERIE Title Graphic"
                    className="w-full max-w-[220px] sm:max-w-xs lg:max-w-md h-auto drop-shadow-2xl"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Quote & Theme Concept Statement */}
            <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-between h-full min-h-0 lg:min-h-[440px] lg:h-[80vh] lg:max-h-[820px] lg:pl-10 xl:pl-14 text-left py-2 sm:py-4 relative">
              {/* Quote Content Section */}
              <div className="relative space-y-4 sm:space-y-6">
                {/* Quote Icon */}
                <div className="flex items-center justify-start">
                  {quoteIcon ? (
                    <img src={quoteIcon} alt="Quote" className="w-6 sm:w-8 h-6 sm:h-8 object-contain" />
                  ) : (
                    <span className="font-serif text-2xl sm:text-3xl text-yellow-300">“</span>
                  )}
                </div>

                {/* Quote Description Text */}
                <p className="font-gordita font-medium text-base sm:text-xl md:text-2xl text-gray-200 leading-relaxed tracking-tight">
                  Explores the quiet traces we leave behind in everyday life. Through
                  immersive and interactive experiences, participants are invited to
                  discover that even the smallest, seemingly invisible actions can
                  become the beginning of a greater impact.
                </p>
              </div>

              {/* Scroll to explore CTA */}
              <div className="flex justify-end pt-6 sm:pt-8">
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                  className="flex items-center gap-3 text-white cursor-pointer hover:opacity-85 transition-opacity"
                >
                  <span className="font-gordita font-medium text-base sm:text-lg lg:text-xl">
                    Scroll to explore
                  </span>
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Concept Headline Section */}
        <section className="relative py-24 flex flex-col items-end justify-center text-right overflow-hidden">
          <div className="relative z-10 w-full px-4 flex flex-col items-end gap-6 text-right">
            <div className="flex flex-col items-end text-right">
              <h2 className="font-swung text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-white drop-shadow-md">
                Even the faintest presence
              </h2>
              <h2 className="font-swung text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFB99] via-yellow-200 to-transparent drop-shadow-md mt-1 sm:mt-2">
                leaves a trace
              </h2>
            </div>
          </div>
        </section>

        {/* Section 3: Event Countdown & Calendar */}
        <div className="relative">
          {/* Hiasan 2 Graphic on Left Spanning Sections 2 & 3 */}
          <img
            src={hiasan2}
            alt=""
            aria-hidden="true"
            className="absolute -left-24 sm:-left-36 -top-32 z-0 w-[450px] sm:w-[650px] md:w-[750px] max-w-none object-contain pointer-events-none opacity-85"
          />

          <section className="relative py-16 px-4 w-full">
            {/* Header Tag */}
            <div className="flex items-center gap-2 mb-6 text-gray-300">
              <img src={jamurIcon} alt="Jamur" className="w-5 h-5 object-contain" />
              <span className="font-gordita font-medium text-lg uppercase tracking-wider text-gray-300">
                Mark your calendar
              </span>
            </div>

            {/* Main Section Content (Always Horizontal Row) */}
            <div className="relative min-h-[220px] sm:min-h-[360px] flex flex-row items-center justify-between gap-4 sm:gap-8 py-2 sm:py-4">
              {/* Date Text Content */}
              <div className="relative z-10 flex flex-col text-left space-y-0.5 sm:space-y-1">
                <span className="font-swung text-2xl sm:text-4xl md:text-6xl text-[#FFFB99] tracking-tight">
                  18 augustus
                </span>
                <span className="font-swung text-4xl sm:text-7xl md:text-9xl text-[#FFFB99] tracking-tighter leading-none">
                  UNTIL
                </span>
                <span className="font-swung text-3xl sm:text-6xl md:text-8xl text-[#FFFB99] tracking-tight">
                  4 SEPTEMBER
                </span>
              </div>

              {/* Right Mascot 2 & Head/Feet Calendar Decor */}
              <div className="relative z-10 flex items-center justify-center pr-2 sm:pr-8 lg:pr-16 flex-shrink-0">
                {/* Calendar Decor 1 at Head (Top) */}
                <img
                  src={calendarDecor1}
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-6 sm:-top-16 -right-3 sm:-right-8 z-10 w-36 sm:w-80 md:w-[380px] max-w-none object-contain pointer-events-none mix-blend-overlay opacity-25"
                />

                {/* Calendar Decor 2 at Feet (Bottom) */}
                <img
                  src={calendarDecor2}
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-6 sm:-bottom-16 -left-3 sm:-left-8 z-10 w-36 sm:w-80 md:w-[380px] max-w-none object-contain pointer-events-none mix-blend-overlay opacity-25"
                />

                {/* Mascot 2 */}
                <img
                  src={maskot2}
                  alt="Mascot 2 Mylo"
                  className="relative z-20 w-24 sm:w-56 md:w-64 h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Section 4: Campus Locations */}
        <section className="relative py-8 sm:py-16 px-4 w-full">
          {/* Section Tag */}
          <div className="flex items-center gap-2 text-gray-400 mb-3 hidden sm:flex">
            <img src={jamurIcon} alt="Jamur" className="w-4 sm:w-5 h-4 sm:h-5 object-contain" />
            <span className="font-gordita font-medium text-xs sm:text-lg text-gray-300">
              Connect the roots on
            </span>
          </div>

          {/* Section Header: Headline Text & Navigation Arrows Side-By-Side */}
          <div className="flex flex-row items-center justify-between gap-3 mb-4 sm:mb-8 text-left">
            <h3 className="font-swung text-xs xs:text-sm sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none">
              WHERE IT ALL BEGAN TO CONNECT.
            </h3>

            {/* Arrow Buttons Navigation (< >) - Mobile/Tablet Only */}
            <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleCampusScrollLeft}
                aria-label="Previous Campus"
                className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded bg-[#181818] border border-[#262626] text-[#FFFB99] hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer text-sm sm:text-lg font-bold"
              >
                ‹
              </button>
              <button
                onClick={handleCampusScrollRight}
                aria-label="Next Campus"
                className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded bg-[#181818] border border-[#262626] text-[#FFFB99] hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer text-sm sm:text-lg font-bold"
              >
                ›
              </button>
            </div>
          </div>

          {/* Campus Cards Layout */}
          <div
            ref={campusScrollRef}
            className="flex md:grid md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          >
            {CAMPUS_DATA.map((campus) => (
              <div
                key={campus.id}
                className="w-[calc(50%-6px)] sm:w-[calc(50%-12px)] md:w-auto snap-start flex-shrink-0 md:flex-shrink flex flex-col gap-2 sm:gap-4 text-left"
              >
                {/* Campus Image Frame (Strict 1:1 Square Aspect Ratio) */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={campus.image}
                    alt={campus.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Content Details */}
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <h4 className="font-gordita font-bold text-sm sm:text-2xl lg:text-3xl text-white">
                    {campus.title}
                  </h4>
                  <p className="font-gordita text-[9px] sm:text-xs text-gray-400 leading-tight uppercase tracking-wider">
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
