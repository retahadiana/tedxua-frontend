import React, { useRef } from 'react'
import { motion } from 'framer-motion'

// Components
import { Navbar, Footer } from '@/components/layout'

// Assets
import reverieTitleGraphic from '../../../assets/images/reverie_hero_graphic.svg'
import heroRightGraphic from '../../../assets/images/hero_right_graphic.svg'
import maskot1 from '../../../assets/images/milo-hero-new.png'
import maskot2 from '../../../assets/images/Jebril_Milo.png'
import cloudTexture from '../../../assets/images/cloud_texture.png'
import kampusA from '../../../assets/images/kampus_a.png'
import kampusB from '../../../assets/images/kampus_b.png'
import kampusC from '../../../assets/images/kampus_c.png'
import jamurIcon from '../../../assets/images/jamur.svg'
import akarHero from '../../../assets/images/akar-hero-new.png'
import akarBawah from '../../../assets/images/akar-bawah.png'
import akar7 from '../../../assets/images/akar 7.png'

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

// Scroll Entrance Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
}

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
      className="relative min-h-screen w-full text-white font-gordita selection:bg-[#38502F] selection:text-white flex flex-col justify-between overflow-x-clip"
      style={{
        background: 'linear-gradient(180deg, #2D1E16 0%, #263A1F 52%, #8B8B8B 100%)',
      }}
    >
      {/* Header Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Decorative Akar Hero - Static Dekorasi */}
      <img
        src={akarHero}
        alt=""
        aria-hidden="true"
        className="absolute top-16 sm:top-20 right-0 z-20 w-[300px] sm:w-[480px] md:w-[600px] lg:w-[720px] max-w-none object-contain pointer-events-none opacity-90"
      />

      {/* Decorative Akar Bawah - Static Dekorasi */}
      <img
        src={akarBawah}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-0 w-[300px] sm:w-[480px] md:w-[600px] lg:w-[720px] max-w-none object-contain pointer-events-none opacity-85"
      />

      {/* Decorative Akar 7 - Static Dekorasi */}
      <img
        src={akar7}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 z-10 w-[700px] sm:w-[950px] lg:w-full max-w-none h-auto object-cover sm:object-contain pointer-events-none opacity-95"
      />

      {/* Outer Grid Wrapper with Top Padding */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 flex-grow">

        {/* SECTION 1: HERO GRID (VESTIGES VISUAL + QUOTE) */}
        <section className="relative overflow-visible">
          <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[720px] lg:h-[844px] overflow-visible">
            {/* Left Column: Visual Artwork (Frame removed, overflow visible) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="order-2 lg:order-1 lg:col-span-7 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-visible min-h-[480px]"
            >
              {/* Radial Glow - responsive size on mobile */}
              <div className="absolute -bottom-12 -left-12 w-[350px] sm:w-[800px] h-[250px] sm:h-[350px] bg-[#3a2e1f] blur-[70px] sm:blur-[110px] pointer-events-none z-0 opacity-70 sm:opacity-90" />

              {/* [WAJIB] Awan 1 - Animasi Melayang Mengambang (Responsive mobile & desktop) */}
              <motion.img
                src={cloudTexture}
                alt=""
                aria-hidden="true"
                animate={{
                  x: [-8, 8, -8],
                  y: [-4, 4, -4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                }}
                className="absolute top-[60px] sm:top-[375px] -left-[30px] sm:-left-[118px] w-[340px] sm:w-[511px] h-auto sm:h-[304px] object-cover pointer-events-none z-0 opacity-80 mix-blend-overlay"
              />

              {/* [WAJIB] Awan 2 - Desktop, Tablet & Mobile */}
              <motion.img
                src={cloudTexture}
                alt=""
                aria-hidden="true"
                animate={{
                  x: [10, -10, 10],
                  y: [5, -5, 5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 9.5,
                  ease: 'easeInOut',
                }}
                className="absolute top-[180px] sm:top-[523px] -right-[30px] sm:right-auto sm:left-[239px] w-[320px] sm:w-[594px] h-auto sm:h-[353px] object-cover pointer-events-none z-0 opacity-80 mix-blend-overlay"
              />

              {/* [WAJIB] Center Mascot Image - Naik pada tampilan mobile */}
              <div className="absolute top-[8%] sm:top-[20%] lg:top-[272px] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[212px] z-20 w-[210px] sm:w-[260px] lg:w-[271px] h-auto pointer-events-none">
                <motion.img
                  src={maskot1}
                  alt="Mascot Milo"
                  animate={{
                    y: [0, -14, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: 'easeInOut',
                  }}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none"
                />
              </div>

              {/* Spacer Top */}
              <div className="relative z-20" />

              {/* Title Graphic Overlay at Bottom Left */}
              <div className="relative z-30 flex flex-col items-start gap-2 pt-32 sm:pt-48">
                <span className="font-swung text-3xl sm:text-4xl lg:text-[48px] text-white tracking-tight leading-none drop-shadow-md">
                  Vestiges of
                </span>
                {reverieTitleGraphic && (
                  <img
                    src={reverieTitleGraphic}
                    alt="REVERIE Title Graphic"
                    className="w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[494px] h-auto drop-shadow-2xl select-none"
                  />
                )}
              </div>
            </motion.div>

            {/* Right Column: Quote with Scroll Entrance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="order-1 lg:order-2 lg:col-span-5 relative z-30 flex flex-col justify-start items-start lg:items-end p-4 sm:p-6 lg:p-8"
            >
              {/* Quote Card */}
              <div className="relative w-full max-w-[560px] lg:max-w-[600px] h-fit rounded-2xl overflow-hidden px-6 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-8 flex flex-col justify-center shadow-xl">
                {/* Background Frame SVG */}
                <img
                  src={heroRightGraphic}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
                />

                {/* Quote Content */}
                <div className="relative z-10 flex flex-col">
                  {/* Top-Left Quote Mark */}
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

                  {/* Bottom-Right Quote Mark */}
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
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: CONCEPT HEADLINE (Animasi Masuk Scroll) */}
        <section className="relative my-6 sm:my-8 py-10 sm:py-16 lg:py-20 px-2 sm:px-4 lg:px-8 overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative z-10 w-full flex flex-col items-end text-right gap-1 sm:gap-3 lg:gap-4"
          >
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

            {/* "leaves a trace" with Left-to-Right Hover Wipe Effect */}
            <div className="relative group cursor-pointer inline-flex items-center justify-end overflow-hidden px-3 sm:px-5 py-1 sm:py-2 rounded-xl transition-all duration-500">
              {/* Animated Background Fill Layer: Expands Left to Right */}
              <div
                className="absolute inset-0 z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #4B2D22 0%, #2D1E16 100%)',
                }}
              />

              {/* Default State Text Layer */}
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

              {/* Hover State Text Layer: Sweeps Left to Right */}
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
          </motion.div>
        </section>

        {/* SECTION 3: EVENT COUNTDOWN / CALENDAR */}
        <section className="relative my-12 sm:my-16 lg:my-20 py-4 sm:py-8 overflow-visible">
          {/* Main Box - 1 Row Layout */}
          <div className="relative flex flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 overflow-visible">
            {/* [WAJIB] Awan 1 - Animasi Melayang (Responsive size & opacity di mobile) */}
            <motion.img
              src={cloudTexture}
              alt=""
              aria-hidden="true"
              animate={{
                x: [-6, 6, -6],
                y: [-3, 3, -3],
              }}
              transition={{
                repeat: Infinity,
                duration: 9,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 sm:-top-20 -left-10 sm:-left-16 lg:-left-24 w-[280px] sm:w-[480px] lg:w-[560px] h-auto sm:h-[330px] object-cover pointer-events-none z-0 opacity-40 sm:opacity-85 mix-blend-overlay overflow-visible"
            />

            {/* [WAJIB] Awan 2 - Desktop & Tablet (Hidden di mobile agar tidak menumpuk) */}
            <motion.img
              src={cloudTexture}
              alt=""
              aria-hidden="true"
              animate={{
                x: [10, -10, 10],
                y: [4, -4, 4],
              }}
              transition={{
                repeat: Infinity,
                duration: 10.5,
                ease: 'easeInOut',
              }}
              className="hidden sm:block absolute -bottom-20 -right-24 sm:-right-40 lg:-right-60 w-[650px] h-[390px] max-w-none object-cover pointer-events-none z-0 opacity-80 mix-blend-overlay overflow-visible"
            />

            {/* Left Column: Date Range Text Frame (Animasi Masuk Scroll) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="relative z-10 flex flex-col items-start text-left max-w-[501px] flex-1 min-w-0"
            >
              {/* Header Tag */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <img src={jamurIcon} alt="" className="w-4 h-5 sm:w-[18px] sm:h-[22px] object-contain" />
                <span className="font-gordita font-medium text-sm sm:text-base text-white tracking-normal">
                  Mark your calendar
                </span>
              </div>

              <div className="flex flex-col space-y-0.5 sm:-space-y-3">
                <span
                  className="font-swung text-2xl sm:text-4xl lg:text-[40px] tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Swung Note', cursive",
                    backgroundImage: 'linear-gradient(180deg, #8B8B8B 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  18 agustus
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
            </motion.div>

            {/* [WAJIB] Right Column: Mascot 2 Mylo & Jebril (Animasi Masuk Scroll + Idle Floating) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="relative z-10 flex items-center justify-center w-[170px] sm:w-[340px] lg:w-[440px] xl:w-[480px] h-auto flex-shrink-0"
            >
              {/* Mascot 2 Image with Idle Floating Motion */}
              <motion.img
                src={maskot2}
                alt="Mascot Mylo & Jebril"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                }}
                className="relative z-20 w-[170px] sm:w-[340px] lg:w-[440px] xl:w-[480px] h-auto object-contain drop-shadow-2xl select-none"
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: CAMPUS LOCATIONS (Animasi Masuk Scroll) */}
        <section className="relative my-8 pt-6 pb-12">
          {/* Top Tag & Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 mb-3">
              <img src={jamurIcon} alt="" className="w-4 h-5 sm:w-[18px] sm:h-[22px] object-contain" />
              <span className="font-gordita font-medium text-base text-white tracking-normal">
                Connect the roots on
              </span>
            </div>

            {/* Section Subtitle & Controls */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-swung text-3xl sm:text-4xl lg:text-[40px] text-white tracking-tight uppercase leading-tight">
                Where it all began to connect.
              </h3>

              {/* Navigation Controls */}
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
          </motion.div>

          {/* 3 Campus Grid Cards with Staggered Scroll Entrance */}
          <motion.div
            ref={campusScrollRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            {CAMPUS_DATA.map((campus) => (
              <motion.div
                key={campus.id}
                variants={fadeInUp}
                className="w-[280px] sm:w-[320px] md:w-auto snap-start flex-shrink-0 md:flex-shrink flex flex-col rounded-sm overflow-hidden p-2 sm:p-2.5 transition-all duration-500 bg-[#8B8B8B]/10 hover:bg-gradient-to-br hover:from-[#FF4C4C] hover:to-[#650101] group cursor-pointer"
              >
                {/* Campus Image Frame */}
                <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden rounded-sm">
                  <img
                    src={campus.image}
                    alt={campus.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Campus Details */}
                <div className="flex flex-col gap-[10px] text-left pt-4 pb-2 px-1.5 transition-colors duration-500">
                  <h4 className="font-gordita font-medium text-[24px] leading-tight text-white group-hover:text-white transition-colors duration-300">
                    {campus.title}
                  </h4>
                  <p className="font-gordita font-medium text-[15.4px] leading-normal text-[#FEF8E0] group-hover:text-[#FFF5D6] uppercase tracking-normal transition-colors duration-300">
                    {campus.address}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
