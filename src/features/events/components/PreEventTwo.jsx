import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// Layout Components
import { Navbar, Footer } from '@/components/layout'

// Images & Graphics from Figma
import akar7 from '@/assets/images/akar 7.webp'
import heroGraphic from '@/assets/images/pe2/MYLO POSE 1 1.png'
import cardDecor from '@/assets/images/pe2/MYLO POSE 2 1.png'
import activityArt from '@/assets/images/preevent2_activity_art.png'
import venueImg from '@/assets/images/pe2/ethnica-depan.jpeg'
import carouselNavIcon from '@/assets/images/carousel_nav_icon.svg'
import mapsIcon from '@/assets/images/maps_icon.svg'
import ctaTexture from '@/assets/images/preevent2_cta_texture.png'
import ellipseIcon from '@/assets/icons/Ellipse 1.png'

// Activity items for the carousel
const ACTIVITIES = [
  {
    id: 'mini-talks',
    name: 'Mini Talks',
    title: 'Mini Talks',
    description: 'Inspiring perspectives and stories from thought leaders illuminating how small actions ignite transformation.',
    image: activityArt,
  },
  {
    id: 'art-installation',
    name: 'Art Installation',
    title: 'Art Installation',
    description: 'Step inside a living constellation of light and form trace how a single gesture ripples outward.',
    image: activityArt,
  },
  {
    id: 'workshop-braille',
    name: 'Workshop : Learning the Braille System',
    title: 'Workshop : Learning the Braille System',
    description: 'Interactive session discovering the network effect of individual choices in modern ecosystems.',
    image: activityArt,
  },
  {
    id: 'performance',
    name: 'Performance',
    title: 'Performance',
    description: 'An evocative sensory performance melding sound and visual echoes of collective resonance.',
    image: activityArt,
  },
]

// October 2026 calendar configuration (Oct 1 is Thursday -> 4 empty prefix days)
const CALENDAR_DAYS_HEADER = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const EMPTY_PREFIX_COUNT = 4
const DAYS_IN_OCTOBER = 31
const HIGHLIGHTED_DAY = 31

// Typewriter effect component for the Section 2 narrative paragraph
function TypewriterParagraph({ text, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!isInView) return
    let index = 0
    // Delay so card decor has walked in comfortably before typing begins
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        index += 2
        if (index >= text.length) {
          setDisplayedText(text)
          clearInterval(interval)
        } else {
          setDisplayedText(text.slice(0, index))
        }
      }, 20)
      return () => clearInterval(interval)
    }, 1500)

    return () => clearTimeout(delayTimer)
  }, [isInView, text])

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {isInView && displayedText.length < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-[#985A27] ml-0.5 animate-pulse align-baseline" />
      )}
    </p>
  )
}

export function PreEventTwo() {
  const sectionTwoRef = useRef(null)
  const isSectionTwoInView = useInView(sectionTwoRef, { once: true, amount: 0.15 })
  const [activeActivityIndex, setActiveActivityIndex] = useState(1) // Default to 'Art Installation' as in Figma
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrevActivity = () => {
    setDirection(-1)
    setActiveActivityIndex((prev) => (prev === 0 ? ACTIVITIES.length - 1 : prev - 1))
  }

  const handleNextActivity = () => {
    setDirection(1)
    setActiveActivityIndex((prev) => (prev === ACTIVITIES.length - 1 ? 0 : prev + 1))
  }

  const handleSelectActivity = (idx) => {
    if (idx === activeActivityIndex) return
    setDirection(idx > activeActivityIndex ? 1 : -1)
    setActiveActivityIndex(idx)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#2D1E16] text-[#FEF8E0] font-gordita selection:bg-[#985A27] selection:text-[#FEF8E0] flex flex-col justify-between overflow-x-clip">
      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Decorative Roots (Akar 7) - Layer 1 (Top Background) */}
      <img
        src={akar7}
        alt=""
        aria-hidden="true"
        className="absolute -top-[120px] sm:-top-[300px] lg:-top-[480px] left-0 w-full max-w-none h-auto object-cover pointer-events-none opacity-[0.29] z-0"
      />

      {/* Decorative Roots (Akar 7) - Layer 2 (Lower Background) */}
      <img
        src={akar7}
        alt=""
        aria-hidden="true"
        className="absolute top-[1100px] lg:top-[1260px] left-0 w-full max-w-none h-auto object-cover pointer-events-none opacity-[0.29] z-0"
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow w-full">
        {/* =========================================================================
            SECTION 1: HERO SECTION
            ========================================================================= */}
        <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] xl:min-h-[880px] flex items-center overflow-visible">
          {/* Main Hero Container */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-[120px] pt-24 pb-12 sm:pt-28 sm:pb-24 lg:py-32 flex flex-col items-start">
            {/* Left Content Column */}
            <div className="flex flex-col items-start max-w-[560px] lg:max-w-[620px] z-20">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-2 mb-5 sm:mb-8">
                {/* Pre-Event 2 Icon */}
                <img
                  src={ellipseIcon}
                  alt=""
                  aria-hidden="true"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain flex-shrink-0"
                />
                <span className="font-swung text-xs sm:text-sm tracking-[0.2em] uppercase text-[#FEF8E0]">
                  Pre-Event 2
                </span>
              </div>

              {/* Title & Description Group */}
              <div className="flex flex-col mb-6 sm:mb-10">
                <h1
                  className="font-swung text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[104px] leading-[1.02] sm:leading-[1.05] text-[#FEF8E0] tracking-[0.03em] sm:tracking-[0.04em] mb-4 sm:mb-8"
                  style={{ fontFamily: "'Swung Note', 'SwungNote', cursive" }}
                >
                  Silent<br />Constellation
                </h1>

                <p className="font-gordita font-medium text-base sm:text-xl lg:text-[20px] text-[#F4D97B] leading-snug mb-2.5 sm:mb-4">
                  Discovering connections, realizing our impact.
                </p>

                <p className="font-gordita text-xs sm:text-[15px] leading-relaxed text-[#FEF8E0]/70 max-w-[480px]">
                  The second chapter after{' '}
                  <span className="font-swung text-[#FEF8E0] uppercase tracking-wide">
                    Vestiges of Reverie
                  </span>
                  <br />
                  a night where small, quiet acts light up into something collective.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
                {/* Primary Button: Get Your Tickets */}
                <button
                  onClick={() => scrollToSection('tickets')}
                  className="relative group w-[145px] xs:w-[160px] h-[44px] sm:h-[48px] flex items-center justify-center cursor-pointer active:scale-95 flex-shrink-0"
                >
                  <svg
                    width="160"
                    height="48"
                    viewBox="0 0 160 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full drop-shadow-md"
                  >
                    <path
                      d="M150 0C150 5.35031 154.202 9.71955 159.485 9.9873L160 10V38C154.477 38 150 42.4772 150 48H10C10 42.4772 5.52276 38.0001 0 38V10C5.35015 9.9999 9.71846 5.79825 9.98633 0.514648L10 0H150Z"
                      className="fill-[#985A27] group-hover:fill-[#B56C2D] transition-colors duration-200"
                    />
                  </svg>
                  <span className="relative z-10 font-semibold text-xs xs:text-sm sm:text-[15px] text-[#FEF8E0] group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                    Get Your Tickets
                  </span>
                </button>

                {/* Secondary Button: Explore what's on */}
                <button
                  onClick={() => scrollToSection('lineup')}
                  className="relative group w-[145px] xs:w-[160px] h-[44px] sm:h-[48px] flex items-center justify-center cursor-pointer active:scale-95 flex-shrink-0"
                >
                  <svg
                    width="160"
                    height="48"
                    viewBox="0 0 160 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                  >
                    <path
                      d="M150 0.5C150 5.626 154.025 9.778 159.13 10.038L159.5 10.05V37.95C154.2 38.21 150 42.477 150 47.5H10C10 42.477 5.8 38.21 0.5 37.95V10.05C5.626 9.778 9.778 5.626 10.038 0.514L10.05 0.5H150Z"
                      strokeWidth="1"
                      className="stroke-[#985A27] group-hover:stroke-[#F4D97B] fill-transparent group-hover:fill-[#985A27]/25 transition-all duration-200"
                    />
                  </svg>
                  <span className="relative z-10 font-semibold text-xs xs:text-sm sm:text-[15px] text-[#985A27] group-hover:text-[#F4D97B] transition-colors duration-200 whitespace-nowrap">
                    Explore what’s on
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile & Tablet Mascot Graphic - Centered below hero text */}
            <div className="w-full flex justify-center mt-8 sm:mt-12 lg:hidden pointer-events-none select-none z-10">
              <img
                src={heroGraphic}
                alt="Silent Constellation Hero Artwork"
                className="w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[360px] md:max-w-[400px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Right Hero Mascot Graphic - Anchored to Bottom Right */}
          <img
            src={heroGraphic}
            alt="Silent Constellation Hero Artwork"
            className="hidden lg:block absolute bottom-0 right-0 lg:-right-4 xl:-right-10 w-[440px] lg:w-[520px] xl:w-[600px] max-h-[640px] lg:max-h-[720px] xl:max-h-[800px] object-contain object-bottom pointer-events-none select-none z-10"
          />
        </section>

        {/* =========================================================================
            SECTION 2: BENEATH THE SURFACE (PARCHMENT CARD)
            ========================================================================= */}
        <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-36 flex justify-center">
          <motion.div
            ref={sectionTwoRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[760px]"
          >
            {/* Scalloped & Notched SVG Card Frame */}
            <div className="relative w-full max-w-[760px] min-h-[500px] sm:min-h-[540px] md:h-[560px] flex flex-col justify-center items-center px-5 xs:px-7 sm:px-10 md:px-[52px] py-14 sm:py-16 md:py-[53px]">
              {/* Background SVG shape matching Figma */}
              <svg
                viewBox="0 0 760 560"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_8px_24px_rgba(75,45,34,0.12)] pointer-events-none"
              >
                <path
                  d="M26 0C26 16.5685 39.4315 30 56 30C72.5685 30 86 16.5685 86 0H98C98 16.5685 111.431 30 128 30C144.569 30 158 16.5685 158 0H170C170 16.5685 183.431 30 200 30C216.569 30 230 16.5685 230 0H242C242 16.5685 255.431 30 272 30C288.569 30 302 16.5685 302 0H314C314 16.5685 327.431 30 344 30C360.569 30 374 16.5685 374 0H386C386 16.5685 399.431 30 416 30C432.569 30 446 16.5685 446 0H458C458 16.5685 471.431 30 488 30C504.569 30 518 16.5685 518 0H530C530 16.5685 543.431 30 560 30C576.569 30 590 16.5685 590 0H602C602 16.5685 615.431 30 632 30C648.569 30 662 16.5685 662 0H674C674 16.5685 687.431 30 704 30C720.569 30 734 16.5685 734 0H760V240C737.909 240 720 257.909 720 280C720 302.091 737.909 320 760 320V560H734C734 543.431 720.569 530 704 530C687.431 530 674 543.431 674 560H662C662 543.431 648.569 530 632 530C615.431 530 602 543.431 602 560H590C590 543.431 576.569 530 560 530C543.431 530 530 543.431 530 560H518C518 543.431 504.569 530 488 530C471.431 530 458 543.431 458 560H446C446 543.431 432.569 530 416 530C399.431 530 386 543.431 386 560H374C374 543.431 360.569 530 344 530C327.431 530 314 543.431 314 560H302C302 543.431 288.569 530 272 530C255.431 530 242 543.431 242 560H230C230 543.431 216.569 530 200 530C183.431 530 170 543.431 170 560H158C158 543.431 144.569 530 128 530C111.431 530 98 543.431 98 560H86C86 543.431 72.5685 530 56 530C39.4315 530 26 543.431 26 560H0V320C22.0914 320 40 302.091 40 280C40 257.909 22.0914 240 0 240V0H26Z"
                  fill="#FEF8E0"
                />
              </svg>

              {/* Overlapping Decorative Artwork - Walking in from right */}
              <motion.img
                src={cardDecor}
                alt=""
                aria-hidden="true"
                initial={{ x: 380, opacity: 0 }}
                animate={
                  isSectionTwoInView
                    ? {
                        x: 0,
                        y: [0, -8, 0, -7, 0, -6, 0, -5, 0, -3, 0],
                        rotate: [5, -4, 4, -3, 3, -2, 2, -1, 1, 0],
                        opacity: 1,
                      }
                    : { x: 380, opacity: 0 }
                }
                transition={{
                  x: { duration: 3.2, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 3.2, ease: 'easeInOut', times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
                  rotate: { duration: 3.2, ease: 'easeInOut', times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
                  opacity: { duration: 0.6, ease: 'easeOut' },
                }}
                className="absolute -top-14 -right-4 sm:-top-20 sm:-right-8 lg:-top-24 lg:-right-10 w-[115px] sm:w-[155px] lg:w-[180px] h-auto pointer-events-none z-20 select-none"
              />

              {/* Inner Content Block matching Figma width 654px and gap 35px */}
              <div className="relative z-10 w-full max-w-[654px] flex flex-col gap-4 sm:gap-6 md:gap-[35px]">
                {/* Title */}
                <span className="font-swung text-xs sm:text-sm md:text-base tracking-[0.26em] uppercase text-[#985A27] text-left">
                  Beneath the Surface
                </span>

                {/* Narrative Paragraph - Typing Animation */}
                <TypewriterParagraph
                  text="Silent Constellation invites participants to discover that no action is ever truly wasted. Through immersive installations and collaborative experiences, this pre-event explores how small acts create invisible connections that shape a greater collective impact — reminding us that meaningful change grows through time, consistency, and shared action."
                  className="font-essays text-[15px] xs:text-base sm:text-xl lg:text-[27px] leading-[1.55] sm:leading-[1.6] text-[#4B2D22] text-justify min-h-[140px] sm:min-h-[160px] lg:min-h-[180px]"
                />

                {/* Card Footer Divider Banner */}
                <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
                  <div className="h-[1px] bg-[#ADA983] flex-1 max-w-[40px] sm:max-w-[130px]" />
                  <span className="font-gordita font-medium text-[9.5px] xs:text-[11px] sm:text-[13px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#985A27] text-center whitespace-nowrap">
                    Beneath what we see, the mycelium
                  </span>
                  <div className="h-[1px] bg-[#ADA983] flex-1 max-w-[40px] sm:max-w-[130px]" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            SECTION 3: THE LINEUP / WHAT'S ON PRE-EVENT 2 (CAROUSEL)
            ========================================================================= */}
        <section id="lineup" className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-28 text-center">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-2 mb-10 sm:mb-16">
            <span className="font-gordita font-medium text-xs sm:text-sm tracking-[0.3em] uppercase text-[#FEF8E0]">
              The Lineup
            </span>
            <h2 className="font-swung text-3xl xs:text-4xl sm:text-5xl lg:text-[60px] text-[#FEF8E0] tracking-tight">
              What's on Pre-Event 2
            </h2>
          </div>

          {/* Horizontal Carousel / Slider Container */}
          <div className="relative w-full max-w-[1240px] mx-auto h-[430px] xs:h-[460px] sm:h-[510px] md:h-[550px] lg:h-[570px] flex items-center justify-center overflow-visible touch-pan-y">
            {/* Ambient Backlight Glow under active cards */}
            <div className="absolute w-[90%] max-w-[800px] h-[260px] bg-[#2D1E16] blur-[60px] pointer-events-none z-0" />

            {/* Slider Track with pan gesture support */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              onPanEnd={(_, info) => {
                if (info.offset.x < -40) {
                  handleNextActivity()
                } else if (info.offset.x > 40) {
                  handlePrevActivity()
                }
              }}
            >
              {ACTIVITIES.map((activity, index) => {
                // Responsive card sizing and spacing
                const isMobile = windowWidth < 640
                const isTablet = windowWidth >= 640 && windowWidth < 1024
                const cardWidth = isMobile ? 260 : isTablet ? 310 : 360
                const cardHeight = isMobile ? 410 : isTablet ? 470 : 520
                const cardSpacing = isMobile ? 280 : isTablet ? 335 : 396

                // Relative position math for cyclic 4-item horizontal slider
                let diff = 0
                if (index !== activeActivityIndex) {
                  const rawDiff = index - activeActivityIndex
                  if (rawDiff === 1 || rawDiff === -3) {
                    diff = 1 // Right adjacent card
                  } else if (rawDiff === -1 || rawDiff === 3) {
                    diff = -1 // Left adjacent card
                  } else {
                    // Opposite 4th card (off-screen) placed based on sliding direction
                    diff = direction >= 0 ? 2 : -2
                  }
                }

                const isCenter = diff === 0
                const isVisible = Math.abs(diff) <= 1
                const xOffset = diff * cardSpacing

                return (
                  <motion.div
                    key={activity.id}
                    onClick={() => handleSelectActivity(index)}
                    animate={{
                      x: xOffset,
                      scale: isCenter ? 1 : isVisible ? 0.94 : 0.88,
                      opacity: isCenter ? 1 : isVisible ? 0.75 : 0,
                      zIndex: isCenter ? 30 : isVisible ? 20 : 0,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                    }}
                    className={`absolute rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.55)] select-none transition-shadow duration-300 ${
                      !isVisible
                        ? 'pointer-events-none'
                        : isCenter
                        ? 'pointer-events-auto ring-1 ring-[#FEF8E0]/20 shadow-[0_25px_50px_rgba(0,0,0,0.65)]'
                        : 'pointer-events-auto cursor-pointer hover:opacity-95 hover:scale-[0.96]'
                    }`}
                  >
                    {/* Card Background Image */}
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    />

                    {/* Gradient Overlay Behind Text */}
                    {isCenter ? (
                      /* Center card: Subtle soft gradient so painting remains vivid */
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 via-45% to-transparent pointer-events-none" />
                    ) : (
                      /* Side cards: Darker tint so center card remains focal point */
                      <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-[#160D08]/85 via-50% to-transparent pointer-events-none" />
                    )}

                    {/* Card Text Content (Anchored at Bottom) */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7 flex flex-col justify-end text-left z-10">
                      <h3
                        className={`font-swung uppercase tracking-wide leading-tight mb-1.5 sm:mb-2.5 text-base xs:text-lg sm:text-xl md:text-[22px] lg:text-[25px] transition-colors duration-300 ${
                          isCenter ? 'text-[#FEF8E0] drop-shadow-md' : 'text-[#FEF8E0]/60'
                        }`}
                      >
                        {activity.title}
                      </h3>
                      <p
                        className={`font-gordita text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed transition-colors duration-300 max-w-[290px] ${
                          isCenter ? 'text-[#FEF8E0]/90 font-normal' : 'text-[#FEF8E0]/40 font-normal'
                        }`}
                      >
                        {activity.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Carousel Navigation Bar */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-10">
            {/* Prev Button */}
            <button
              onClick={handlePrevActivity}
              aria-label="Previous activity"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FEF8E0] hover:bg-white text-[#2D1E16] flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-90 cursor-pointer"
            >
              <img src={carouselNavIcon} alt="Previous" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Indicator Dots & Active Pill */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {ACTIVITIES.map((activity, idx) => {
                const isActive = idx === activeActivityIndex
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleSelectActivity(idx)}
                    aria-label={`Go to ${activity.title}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-6 sm:w-7 h-2.5 bg-[#FEF8E0]'
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#FEF8E0]/20 hover:bg-[#FEF8E0]/50'
                    }`}
                  />
                )
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextActivity}
              aria-label="Next activity"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FEF8E0] hover:bg-white text-[#2D1E16] flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-90 cursor-pointer"
            >
              <img src={carouselNavIcon} alt="Next" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
            </button>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SAVE THE MOMENT (SCHEDULE & VENUE)
            ========================================================================= */}
        <section id="schedule" className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-28 text-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-10 sm:mb-16">
            <span className="font-gordita font-medium text-xs sm:text-sm tracking-[0.3em] uppercase text-[#FEF8E0]">
              Save the moment
            </span>
            <h2 className="font-swung text-3xl xs:text-4xl sm:text-5xl lg:text-[60px] text-[#FEF8E0] tracking-tight">
              Schedule & venue
            </h2>
          </div>

          {/* Cards Grid Container */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-10 max-w-[1040px] mx-auto">
            {/* ---------------- CARD 1: CALENDAR CARD ---------------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full max-w-[460px] lg:max-w-[500px] mx-auto bg-[#FEF8E0] text-[#4B2D22] rounded-[24px] p-5 sm:p-8 border border-[#ADA983]/40 shadow-[0px_8px_24px_0px_rgba(75,45,34,0.14)] flex flex-col justify-between text-left"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-gordita font-bold text-[11px] sm:text-xs tracking-[0.1em] uppercase text-[#985A27]">
                    Mark your calendar
                  </span>
                  <span className="font-swung text-xl sm:text-[28px] text-[#4B2D22]">
                    October 2026
                  </span>
                </div>

                {/* Highlighted Date Badge */}
                <div className="bg-[#985A27] text-[#FEF8E0] rounded-[14px] sm:rounded-[16px] px-3 sm:px-4 py-1.5 sm:py-2 flex flex-col items-center justify-center min-w-[58px] sm:min-w-[66px] shadow-sm">
                  <span className="font-swung text-xl sm:text-3xl leading-none">
                    31
                  </span>
                  <span className="font-swung text-[9px] sm:text-[10px] tracking-[0.1em] uppercase mt-0.5">
                    Sat
                  </span>
                </div>
              </div>

              {/* Calendar Days Table */}
              <div className="mt-5 sm:mt-8 flex flex-col gap-1">
                {/* Weekdays Row */}
                <div className="grid grid-cols-7 gap-1 text-center font-gordita font-bold text-xs text-[#4B2D22]/40 pb-2">
                  {CALENDAR_DAYS_HEADER.map((day, i) => (
                    <span key={i} className="py-1">
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center font-gordita text-sm">
                  {/* Empty slots before day 1 */}
                  {Array.from({ length: EMPTY_PREFIX_COUNT }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-9 sm:h-11" />
                  ))}

                  {/* Day numbers 1 to 31 */}
                  {Array.from({ length: DAYS_IN_OCTOBER }, (_, i) => i + 1).map((day) => {
                    const isHighlighted = day === HIGHLIGHTED_DAY
                    return (
                      <div
                        key={day}
                        className={`h-9 sm:h-11 flex items-center justify-center rounded-lg ${
                          isHighlighted
                            ? 'bg-[#985A27] text-[#FEF8E0] font-swung text-sm sm:text-base shadow-sm font-medium'
                            : 'text-[#4B2D22]/70'
                        }`}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Notice Banner */}
              <div className="mt-5 sm:mt-6 bg-[#985A27]/10 rounded-[12px] p-3 sm:p-4">
                <p className="font-gordita text-xs sm:text-sm text-[#4B2D22]/75 leading-relaxed">
                  Full run-of-show revealed alongside the Finance Roadshow in late September.
                </p>
              </div>
            </motion.div>

            {/* ---------------- CARD 2: VENUE CARD ---------------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full max-w-[460px] lg:max-w-[500px] mx-auto bg-[#FEF8E0] text-[#4B2D22] rounded-[24px] p-2.5 sm:p-3 border border-[#ADA983]/40 shadow-[0px_8px_24px_0px_rgba(75,45,34,0.14)] flex flex-col justify-between text-left"
            >
              {/* Venue Photograph */}
              <div className="relative w-full h-[200px] xs:h-[220px] sm:h-[275px] rounded-[18px] sm:rounded-[20px] overflow-hidden">
                <img
                  src={venueImg}
                  alt="ETHNIC’A Venue"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details & Button */}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-gordita font-bold text-[11px] sm:text-xs tracking-[0.1em] uppercase text-[#985A27]">
                    Where it happens
                  </span>
                  <h3 className="font-swung text-xl sm:text-[28px] text-[#4B2D22]">
                    ETHNIC’A
                  </h3>
                  <p className="font-gordita text-xs sm:text-sm text-[#4B2D22]/70 leading-normal mt-0.5">
                    Jl. Jawa No. 25, Gubeng, Surabaya, Jawa Timur
                  </p>
                </div>

                {/* Maps Button */}
                <a
                  href="https://maps.google.com/?q=ETHNIC'A+Jl.+Jawa+No.+25+Gubeng+Surabaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[48px] sm:h-[52px] bg-[#4B2D22] hover:bg-[#382017] text-[#FEF8E0] rounded-[14px] sm:rounded-[16px] flex items-center justify-center gap-2.5 transition font-gordita font-bold text-xs sm:text-base shadow-sm group active:scale-[0.98]"
                >
                  <img src={mapsIcon} alt="" aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: GET YOUR TICKET NOW! (BOTTOM CTA)
            ========================================================================= */}
        <section
          id="tickets"
          className="relative w-full bg-[#985A27] text-[#FEF8E0] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 text-center selection:bg-[#FEF8E0] selection:text-[#4B2D22]"
        >
          {/* Top Rugged Soil / Mycelium Texture from Figma */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[102%] min-w-[102%] pointer-events-none z-0 leading-none">
            <img
              src={ctaTexture}
              alt=""
              aria-hidden="true"
              className="w-full h-auto min-w-full object-cover pointer-events-none block"
            />
          </div>

          <div className="relative z-20 max-w-[640px] mx-auto flex flex-col items-center gap-4 select-text">
            <h2 className="font-swung text-3xl xs:text-4xl sm:text-5xl lg:text-[60px] text-[#FEF8E0] leading-tight tracking-tight select-text cursor-text">
              Get your ticket now!
            </h2>
            <p className="font-gordita text-xs sm:text-base lg:text-lg text-[#FEF8E0]/90 leading-relaxed max-w-[512px] select-text cursor-text">
              One step closer to the constellation. Join a night where your small act becomes part of something collective.
            </p>

            {/* Large Cutout Ticket Button */}
            <Link
              to="/tickets"
              className="relative group mt-6 sm:mt-8 w-full max-w-[300px] xs:max-w-[360px] sm:max-w-[440px] lg:max-w-[524px] aspect-[524/158] flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            >
              {/* Notched Ticket SVG */}
              <svg
                viewBox="0 0 524 158"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
              >
                <path
                  d="M491.25 0C491.25 17.8046 505.458 32.2904 523.154 32.7387L524 32.7495V124.45C505.913 124.45 491.25 139.113 491.25 157.2H32.7495C32.7495 139.113 18.0871 124.45 0 124.45V32.7485C17.8046 32.7482 32.2905 18.5412 32.7387 0.844542L32.7495 0H491.25Z"
                  fill="#4B2D22"
                />
              </svg>

              {/* Button Typography */}
              <span className="relative z-10 font-swung text-2xl xs:text-3xl sm:text-4xl lg:text-[49px] text-[#FEF8E0] group-hover:text-[#F4D97B] transition-colors">
                Buy tickets!
              </span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="relative z-40">
        <Footer />
      </div>
    </div>
  )
}

export default PreEventTwo
