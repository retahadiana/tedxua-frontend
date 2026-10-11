import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion'
import { X, Calendar, Play, Download, ExternalLink, Sparkles, Volume2, VolumeX } from 'lucide-react'

// Layout Components
import { Navbar, Footer } from '@/components/layout'

// Main Event Figma Assets (Dedicated Folder)
import myloKagum from '@/assets/images/main-event/mylo_kagum_aqil.webp'
import fireflies from '@/assets/images/main-event/fireflies-768b94.webp'
import tedxTitle from '@/assets/images/main-event/tedx.webp'
import bgButton from '@/assets/images/main-event/bg-button.webp'
import tolong16 from '@/assets/images/main-event/tolong_16-4d9d4a.webp'
import organicAccent from '@/assets/images/main-event/organic_accent-177fd5.webp'
import himti1 from '@/assets/images/main-event/himti1.webp'
import himti2 from '@/assets/images/main-event/himti2.webp'
import himti3 from '@/assets/images/main-event/himti3.webp'
import himti4 from '@/assets/images/main-event/himti4.webp'
import himti5 from '@/assets/images/main-event/himti5.webp'
import himti6 from '@/assets/images/main-event/himti6.webp'
import playIcon from '@/assets/images/main-event/play_icon.svg'
import calendarIcon from '@/assets/images/main-event/calendar_icon.svg'
import cardBorder from '@/assets/images/main-event/border.webp'
import roda from '@/assets/images/main-event/roda.webp'

// Brush-edge background shared by the hero CTA buttons
const buttonBgStyle = {
  backgroundImage: `url(${bgButton})`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
}

// Wheel carries 8 photo cards 45deg apart; each step turns it by one slot
const WHEEL_STEP = 45
// Cards ride the inner ring; the one resting at 9 o'clock moves out to the larger focus ring (% of wheel size)
const WHEEL_CARD_RADIUS = 55
const WHEEL_FOCUS_RADIUS = 85
// Below md the wheel is smaller, so cards ride tighter rings
const WHEEL_CARD_RADIUS_COMPACT = 46
const WHEEL_FOCUS_RADIUS_COMPACT = 58

function useIsCompact() {
  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

const WHEEL_SLOTS = [0, 45, 90, 135, 180, 225, 270, 315]

// One photo card mounted on the wheel rim
function WheelCard({ slot, spin, wheelRot, photo, onSelect, compact }) {
  const rad = (slot * Math.PI) / 180
  const finalAngle = slot - spin * WHEEL_STEP
  // Signed angle from the 9 o'clock position, in (-180, 180]
  const d = ((((finalAngle - 180) % 360) + 540) % 360) - 180
  const focusRadius = compact ? WHEEL_FOCUS_RADIUS_COMPACT : WHEEL_FOCUS_RADIUS
  const cardRadius = compact ? WHEEL_CARD_RADIUS_COMPACT : WHEEL_CARD_RADIUS
  const radius = d === 0 ? focusRadius : cardRadius

  // Tilt eases to its new value; the live wheel angle is subtracted so cards stay upright while turning
  const tilt = useMotionValue(-0.5 * d)
  useEffect(() => {
    const controls = animate(tilt, -0.5 * d, { duration: 1, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [d, tilt])
  const rotate = useTransform([tilt, wheelRot], ([t, w]) => t - w)

  return (
    <motion.button
      type="button"
      aria-label={`Rotate wheel to ${photo.title}`}
      onClick={() => onSelect(Math.round(d / WHEEL_STEP))}
      initial={false}
      animate={{
        scale: d === 0 ? (compact ? 1.7 : 1.8) : 1,
        left: `${50 + radius * Math.cos(rad)}%`,
        top: `${50 - radius * Math.sin(rad)}%`,
      }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotate, x: '-50%', y: '-50%', zIndex: d === 0 ? 10 : 5 }}
      className="pointer-events-auto absolute w-[96px] sm:w-[120px] md:w-[200px] lg:w-[240px] xl:w-[280px] aspect-[16/10] cursor-pointer"
    >
      {/* Photo sits inside the frame line so nothing spills past it */}
      <div className="absolute inset-[1.5%] rounded-[14px] lg:rounded-[16px] overflow-hidden bg-black/40">
      <img
        src={photo.image}
        alt={photo.title}
        draggable={false}
        className="w-full h-full object-cover"
        style={{ objectPosition: photo.position }}
      />
      {/* Caption blended into the card; only visible while it rests at the center */}
      <motion.div
        initial={false}
        animate={{ opacity: d === 0 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="hidden md:block absolute inset-x-0 bottom-0 px-3 pt-8 pb-2 text-left text-white bg-gradient-to-t from-black/85 via-black/55 to-transparent"
      >
        <span className="block font-essays font-bold text-xs leading-tight text-[#FFFB99]">
          {photo.title}
        </span>
        <span className="mt-0.5 block font-essays font-bold text-[10px] leading-tight">
          {photo.description}
        </span>
      </motion.div>
      </div>
      {/* Hand-drawn frame */}
      <img
        src={cardBorder}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
      />
    </motion.button>
  )
}

export function MainEventDetail() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [spin, setSpin] = useState(0)
  const compact = useIsCompact()

  // Wheel angle (deg) is a motion value so the wheel can follow the pointer while dragging
  const wheelRot = useMotionValue(0)
  const wheelRef = useRef(null)
  const wheelAnim = useRef(null)
  const dragMoved = useRef(false)

  const rotateWheelTo = (targetSpin) => {
    setSpin(targetSpin)
    wheelAnim.current?.stop()
    wheelAnim.current = animate(wheelRot, targetSpin * WHEEL_STEP, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    })
  }

  // Manual rotation: drag around the wheel center, then snap to the nearest card slot
  const handleWheelPointerDown = (e) => {
    const rect = wheelRef.current?.getBoundingClientRect()
    if (!rect || (e.pointerType === 'mouse' && e.button !== 0)) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const angleOf = (ev) => (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI
    wheelAnim.current?.stop()
    const startRot = wheelRot.get()
    let last = angleOf(e)
    let total = 0
    dragMoved.current = false

    const onMove = (ev) => {
      const a = angleOf(ev)
      let delta = a - last
      if (delta > 180) delta -= 360
      if (delta < -180) delta += 360
      total += delta
      last = a
      if (Math.abs(total) > 4) dragMoved.current = true
      wheelRot.set(startRot + total)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      if (dragMoved.current) {
        rotateWheelTo(Math.round(wheelRot.get() / WHEEL_STEP))
        setTimeout(() => {
          dragMoved.current = false
        }, 0)
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  // Carousel/Showcase items for the TED Talks card stack
  const talksPhotos = [
    {
      id: 0,
      description: 'Insightful explanation by visionary speakers, with each topic sharply focused on our key sub-themes.',
      title: 'Deep Critical Creative Thinking',
      image: himti1,
      position: '50% 50%',
    },
    {
      id: 1,
      description: 'A conversation that sparks fresh angles on every sub-theme, led by speakers who challenge the usual view.',
      title: 'Igniting Sub-Theme Explorations',
      image: himti2,
      position: '50% 50%',
    },
    {
      id: 2,
      description: 'Stories that look beneath the surface and reveal what often goes unseen in our everyday lives.',
      title: 'Unraveling the Unseen',
      image: himti3,
      position: '50% 50%',
    },
    {
      id: 3,
      description: 'Voices that connect like a mycelium network, carrying ideas between people and communities.',
      title: 'Voices From The Mycelium',
      image: himti4,
      position: '50% 50%',
    },
    {
      id: 4,
      description: 'Ideas worth spreading, shared on stage by speakers from many different backgrounds.',
      title: 'Ideas Worth Spreading',
      image: himti5,
      position: '50% 50%',
    },
    {
      id: 5,
      description: 'A closer look at the stories, people, and moments that shape the theme this year.',
      title: 'Beneath What We See',
      image: himti6,
      position: '50% 50%',
    },
  ]



  // The card resting at 9 o'clock (slot 180deg) is the selected one
  const selectedSlotIndex = (((WHEEL_SLOTS.indexOf(180) + spin) % WHEEL_SLOTS.length) + WHEEL_SLOTS.length) % WHEEL_SLOTS.length
  const selectedPhoto = talksPhotos[selectedSlotIndex % talksPhotos.length]

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false)
        setIsCalendarModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Google Calendar Link generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=TEDxUniversitasAirlangga+2026%3A+Beneath+What+We+See&dates=20261024T020000Z/20261024T100000Z&details=The+grand+finale+of+TEDxUnair+2026.+Beyond+the+signature+TED+Talks%2C+attendees+will+immerse+themselves+in+curated+art+showcases%2C+live+performances%2C+interacTED%2C+and+inspiraTED+sessions.&location=Universitas+Airlangga%2C+Surabaya`

  // Download .ics file
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TEDxUniversitasAirlangga//MainEvent//EN',
      'BEGIN:VEVENT',
      'UID:tedxunair-2026-main-event@tedxunair.com',
      'DTSTAMP:20261001T000000Z',
      'DTSTART:20261024T020000Z',
      'DTEND:20261024T100000Z',
      'SUMMARY:TEDxUniversitasAirlangga 2026: Beneath What We See',
      'DESCRIPTION:The grand finale of TEDxUnair 2026 featuring visionary TED Talks, curated art showcases, and live performances.',
      'LOCATION:Universitas Airlangga, Surabaya',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'TEDxUniversitasAirlangga-2026.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative min-h-screen w-full bg-[#845D49] text-[#FEF8E0] font-gordita selection:bg-[#FF2B06] selection:text-white flex flex-col justify-between overflow-clip">
      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* =========================================================================
          BACKGROUND AMBIENCE & ROOTS (Seamless across Section 1 & 2)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Master Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#845D49] via-[#7E866B] to-[#CB9A6F] opacity-95" />

        {/* Ambient Glows */}
        <div className="absolute top-[320px] left-[-60px] w-[600px] h-[450px] bg-[#F6EBE7]/20 rounded-full blur-[120px]" />
        <div className="absolute top-[1000px] right-[-100px] w-[700px] h-[550px] bg-[#FFFB99]/15 rounded-full blur-[140px]" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow w-full">
        {/* =========================================================================
            SECTION 1: HERO (TEDx)
            Figma Node Reference: #3258:241 Top Section
            ========================================================================= */}
        <section
          id="hero-tedx"
          className="relative w-full pt-28 lg:pt-32 pb-8 lg:pb-12 overflow-visible"
        >
          <div className="relative z-20 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col gap-4 lg:gap-2">
            {/* TEDx Universitas Airlangga Title (brush-edge artwork) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <h1 className="m-0">
                <img
                  src={tedxTitle}
                  alt="TEDx Universitas Airlangga"
                  className="block w-full max-w-[420px] sm:max-w-[640px] lg:max-w-[960px] xl:max-w-[1080px] h-auto select-none"
                />
              </h1>
            </motion.div>

            {/* Text + Artwork Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 lg:gap-6">
              {/* Left Content Column */}
              <div className="lg:col-span-7 flex flex-col items-start z-20">
                {/* Subtitle: "Beneath What We See :" */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-essays font-bold text-xl lg:text-2xl text-white tracking-wide"
                >
                  Beneath What We See :
                </motion.h2>

                {/* Description Paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-gordita font-bold text-base lg:text-lg text-white/95 leading-[1.62] max-w-[560px] lg:max-w-[640px] mt-2"
                >
                  The grand finale of{' '}
                  <span className="text-[#FFFAA6] font-black">TEDxUnair 2026</span>. Beyond the
                  signature <span className="text-[#FFFAA6] font-black">TED Talks</span>, attendees
                  will immerse themselves in curated{' '}
                  <span className="text-[#FFFAA6] font-black">
                    art showcases, live performances, interacTED, and inspiraTED sessions
                  </span>{' '}
                  which are all designed to reflect and deepen the understanding of this year&apos;s
                  theme.
                </motion.p>

                {/* Call-to-Action Buttons Row */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 w-full"
                >
                  {/* Button 1: Watch Teaser */}
                  <button
                    type="button"
                    id="btn-watch-teaser"
                    onClick={() => setIsVideoModalOpen(true)}
                    style={buttonBgStyle}
                    className="group flex items-center gap-3 text-[#855C49] px-8 py-4 lg:px-10 lg:py-5 transition-colors duration-300 hover:text-[#FF2B06]"
                  >
                    <span className="font-essays font-medium text-xl lg:text-2xl leading-none whitespace-nowrap">
                      Watch Teaser
                    </span>
                    <img
                      src={playIcon}
                      alt="Play icon"
                      className="w-8 h-8 lg:w-9 lg:h-9 object-contain flex-shrink-0"
                    />
                  </button>

                  {/* Button 2: Save The Date */}
                  <button
                    type="button"
                    id="btn-save-the-date"
                    onClick={() => setIsCalendarModalOpen(true)}
                    style={buttonBgStyle}
                    className="group flex items-center gap-3 text-[#855C49] px-8 py-4 lg:px-10 lg:py-5 transition-colors duration-300 hover:text-[#FF2B06]"
                  >
                    <span className="font-essays font-medium text-xl lg:text-2xl leading-none whitespace-nowrap">
                      Save The Date
                    </span>
                    <img
                      src={calendarIcon}
                      alt="Calendar icon"
                      className="w-7 h-7 lg:w-8 lg:h-8 object-contain flex-shrink-0"
                    />
                  </button>
                </motion.div>
              </div>

              {/* Right Visual Artwork Column (Mylo, Moon Glow, Fireflies) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative w-full max-w-[420px] lg:max-w-none lg:-mt-28 min-h-[300px] sm:min-h-[360px] lg:min-h-[340px] flex items-end justify-center lg:justify-start"
              >
                {/* Moon glow (tolong 16) + fireflies as one unit, both centered on the same point */}
                <div className="absolute -top-8 lg:-top-10 right-0 sm:right-4 lg:-right-4 w-[240px] sm:w-[320px] lg:w-[400px] aspect-square -translate-y-[20%] lg:translate-x-[20%] pointer-events-none z-0">
                  <img
                    src={tolong16}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] aspect-[3/4]">
                    <img
                      src={fireflies}
                      alt="Fireflies glow"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Mascot Mylo Kagum */}
                <div className="relative z-10 lg:-ml-12 mt-10 lg:mt-0">
                  <img
                    src={myloKagum}
                    alt="Mylo TEDxUNAIR"
                    className="w-[200px] sm:w-[230px] lg:w-[280px] h-auto object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: WHAT'S ON MAIN EVENT? (TED Talks)
            Figma Node Reference: #3258:241 Second Section
            ========================================================================= */}
        <section
          id="ted-talks"
          className="relative w-full py-[104px] lg:py-32 md:min-h-[656px] lg:min-h-[814px] xl:min-h-[964px] flex items-start md:items-center overflow-visible"
        >
          {/* Background Foliage (Tolong 16) */}
          <div className="absolute inset-0 pointer-events-none overflow-x-clip">
            <img
              src={tolong16}
              alt=""
              aria-hidden="true"
              className="absolute top-8 sm:top-16 right-[-20px] sm:right-10 lg:right-20 w-[420px] sm:w-[540px] lg:w-[700px] object-contain opacity-35 mix-blend-screen pointer-events-none"
            />

            {/* Giant Decorative Wheel: one rotating unit (circle + wheel + photo cards), centered on the right viewport edge */}
            <div
              ref={wheelRef}
              onPointerDown={handleWheelPointerDown}
              className="absolute right-0 bottom-[250px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 translate-x-1/2 w-[420px] md:w-[640px] lg:w-[800px] xl:w-[860px] aspect-square pointer-events-auto touch-none select-none"
            >
              <motion.div className="absolute inset-0" style={{ rotate: wheelRot }}>
                <img
                  src={roda}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain cursor-grab active:cursor-grabbing"
                  draggable={false}
                />

                {/* Photo cards mounted on the rim; they turn with the wheel */}
                {WHEEL_SLOTS.map((slot, j) => (
                  <WheelCard
                    key={slot}
                    slot={slot}
                    spin={spin}
                    wheelRot={wheelRot}
                    compact={compact}
                    photo={talksPhotos[j % talksPhotos.length]}
                    onSelect={(steps) => {
                      if (!dragMoved.current) rotateWheelTo(spin + steps)
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 lg:gap-y-8 items-start">
              {/* Section Heading */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-12"
              >
                <h3 className="font-essays font-bold text-2xl sm:text-3xl lg:text-[32px] text-white tracking-wide leading-tight">
                  WHAT’S ON MAIN EVENT?
                </h3>
              </motion.div>

              {/* Left Column: "TED Talks" display + audience silhouette */}
              <div className="lg:col-span-4 flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  <h2
                    className="font-swung text-[#FFFB99] text-6xl sm:text-8xl lg:text-[100px] xl:text-[120px] leading-[1] tracking-normal"
                    style={{ WebkitTextStroke: '2px #FFFB99' }}
                  >
                    TED
                    <br />
                    Talks
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative mt-4 w-full max-w-[320px] lg:max-w-[360px] hidden md:block"
                >
                  <img
                    src={organicAccent}
                    alt="TED Talks Community"
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </div>

              {/* Center Column: caption */}
              <div className="lg:col-span-5 flex flex-col items-start">
                {/* Reserves room for the wheel on small screens */}
                <div className="h-[440px] w-full md:hidden" aria-hidden="true" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPhoto.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 max-w-[300px] text-white md:hidden"
                  >
                    <h4 className="font-essays font-bold text-lg lg:text-xl leading-snug text-[#FFFB99]">
                      {selectedPhoto.title}
                    </h4>
                    <p className="mt-1 font-essays font-bold text-sm lg:text-base leading-snug">
                      {selectedPhoto.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          INTERACTIVE MODAL: WATCH TEASER
          ========================================================================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl bg-[#2D1E16] border-2 border-[#FFFB99]/50 rounded-[20px] lg:rounded-[24px] overflow-hidden p-4 sm:p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#FEF8E0]/15">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#FF2B06] animate-pulse" />
                  <h3 className="font-essays font-bold text-xl sm:text-2xl text-white">
                    TEDxUniversitasAirlangga 2026 Teaser
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative mt-4 aspect-video rounded-[14px] overflow-hidden bg-black flex items-center justify-center group">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                  title="TEDxUniversitasAirlangga Official Teaser"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-[#FEF8E0]/80 font-gordita">
                <p>Theme: Beneath What We See — The Grand Finale</p>
                <div className="flex items-center gap-2 text-[#FFFAA6]">
                  <Sparkles className="w-4 h-4" />
                  <span>Main Event 2026 Coming Soon</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          INTERACTIVE MODAL: SAVE THE DATE
          ========================================================================= */}
      <AnimatePresence>
        {isCalendarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalendarModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg bg-[#2D1E16] border-2 border-[#FFFB99]/60 rounded-[20px] lg:rounded-[24px] overflow-hidden p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FEF8E0] border-2 border-[#FFFB99] flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-[#855C49]" />
                </div>

                <h3 className="font-essays font-bold text-2xl sm:text-3xl text-white">
                  Save The Date
                </h3>
                <p className="font-gordita text-sm sm:text-base text-[#FEF8E0]/80 mt-2">
                  TEDxUniversitasAirlangga 2026: Beneath What We See
                </p>

                {/* Event Highlights Card */}
                <div className="mt-6 p-4 rounded-xl bg-black/30 border border-[#FEF8E0]/15 text-left space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FEF8E0]/60">Date:</span>
                    <span className="font-medium text-[#FFFAA6]">Saturday, October 24, 2026</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FEF8E0]/60">Time:</span>
                    <span className="font-medium text-white">09:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#FEF8E0]/60">Location:</span>
                    <span className="font-medium text-white">Universitas Airlangga, Surabaya</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-[#FEF8E0] hover:bg-white text-[#855C49] font-essays font-semibold text-lg transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Calendar
                  </a>
                  <button
                    type="button"
                    onClick={handleDownloadICS}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-[#3E291F] hover:bg-[#4E3427] text-white border border-[#FFFB99]/40 font-essays font-semibold text-lg transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Download .iCal
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  )
}

export default MainEventDetail
