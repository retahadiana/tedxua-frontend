import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion'
import { X, Calendar, CalendarClock, Clock, MapPin, Play, Download, ExternalLink, Sparkles, Volume2, VolumeX } from 'lucide-react'

// Layout Components
import { Navbar, Footer } from '@/components/layout'

// Main Event Figma Assets (Dedicated Folder)
import myloKagum from '@/assets/images/main-event/mylo_kagum_aqil.webp'
import fireflies from '@/assets/images/main-event/fireflies-768b94.webp'
import tedxTitle from '@/assets/images/main-event/tedx.webp'
import bgButton from '@/assets/images/main-event/bg-button.webp'
import tolong16 from '@/assets/images/main-event/tolong_16-4d9d4a.webp'
import organicAccent from '@/assets/images/main-event/organic_accent-177fd5.webp'
// Speaker/gallery & bottom countdown images served from Cloudinary
const CDN_GAMBAR = 'https://res.cloudinary.com/aqqyudsd/image/upload/v1791703995/gambar.png'
const CDN_KOTAK = 'https://res.cloudinary.com/aqqyudsd/image/upload/v1791703816/kotak.png'
const CDN_MAP = 'https://res.cloudinary.com/aqqyudsd/image/upload/v1791703817/map.png'
const CDN_BG_BAWAH = 'https://res.cloudinary.com/aqqyudsd/image/upload/v1791703817/bg_bawah_1.png'
const CDN_TANAH = 'https://res.cloudinary.com/kyfyfkw0/image/upload/v1792386257/tanah.png'
const CDN_JAMUR_KIRI = 'https://res.cloudinary.com/aqqyudsd/image/upload/v1791703814/jamur_kiri.png'
const CDN_JAMUR_KANAN = 'https://res.cloudinary.com/aqqyudsd/image/upload/v1791703814/jamur_kanan.png'
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

// Countdown digit card with stippled organic border
function CountdownCard({ value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-14 sm:w-20 md:w-24 lg:w-28 h-20 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center cursor-default"
    >
      {/* Translucent background fill */}
      <div
        className="absolute inset-0 rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] bg-[#B98F72]/50 backdrop-blur-[2px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),0_6px_16px_rgba(40,20,10,0.2)]"
      />
      {/* Outer rough speckled border */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[14px] sm:rounded-[18px] lg:rounded-[22px]"
        style={{
          border: '3px solid rgba(130, 85, 55, 0.85)',
          filter: 'url(#cnt-roughen)',
        }}
      />
      {/* Inner rough highlight border */}
      <div
        className="absolute pointer-events-none rounded-[12px] sm:rounded-[16px] lg:rounded-[20px]"
        style={{
          inset: '2px',
          border: '1.5px solid rgba(240, 205, 160, 0.4)',
          filter: 'url(#cnt-roughen)',
        }}
      />
      {/* Number text */}
      <span className="relative z-10 font-swung font-bold text-[#FFFAA6] text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_4px_rgba(60,35,15,0.4)] select-none">
        {value}
      </span>
    </motion.div>
  )
}

export function MainEventDetail() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [spin, setSpin] = useState(0)
  const compact = useIsCompact()

  // Live countdown to event
  const [timeLeft, setTimeLeft] = useState({
    days: '30',
    hours: '21',
    minutes: '59',
    seconds: '59',
  })

  useEffect(() => {
    const targetDate = new Date('2026-11-11T14:00:00')
    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24))
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const m = Math.floor((diff / (1000 * 60)) % 60)
        const s = Math.floor((diff / 1000) % 60)
        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        })
      } else {
        setTimeLeft({
          days: '30',
          hours: '21',
          minutes: '59',
          seconds: '59',
        })
      }
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

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
      image: CDN_GAMBAR,
      position: '50% 50%',
    },
    {
      id: 1,
      description: 'A conversation that sparks fresh angles on every sub-theme, led by speakers who challenge the usual view.',
      title: 'Igniting Sub-Theme Explorations',
      image: CDN_GAMBAR,
      position: '50% 50%',
    },
    {
      id: 2,
      description: 'Stories that look beneath the surface and reveal what often goes unseen in our everyday lives.',
      title: 'Unraveling the Unseen',
      image: CDN_GAMBAR,
      position: '50% 50%',
    },
    {
      id: 3,
      description: 'Voices that connect like a mycelium network, carrying ideas between people and communities.',
      title: 'Voices From The Mycelium',
      image: CDN_GAMBAR,
      position: '50% 50%',
    },
    {
      id: 4,
      description: 'Ideas worth spreading, shared on stage by speakers from many different backgrounds.',
      title: 'Ideas Worth Spreading',
      image: CDN_GAMBAR,
      position: '50% 50%',
    },
    {
      id: 5,
      description: 'A closer look at the stories, people, and moments that shape the theme this year.',
      title: 'Beneath What We See',
      image: CDN_GAMBAR,
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
        {/* Bottom fade: blends the ted-talks section into the speakers section teal — z-index 1 so it sits behind wheel/cards */}
        <div
          className="pointer-events-none"
          style={{
            position: 'relative',
            marginTop: '-120px',
            height: '120px',
            background: 'linear-gradient(to bottom, transparent 0%, #7E866B 100%)',
            zIndex: 1,
          }}
        />
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

      {/* =========================================================================
          SECTION: SPEAKERS
          ========================================================================= */}
      <section
        id="speakers"
        className="relative w-full overflow-hidden"
        style={{ minHeight: '520px', background: 'linear-gradient(to bottom, #7E866B 0%, #C4A882 100%)' }}
      >


        {/* Title Row */}
        <div className="relative z-10 flex items-center justify-center pt-12 pb-6 px-0">
          {/* Cloud Left — flush to left edge, full opacity */}
          <div className="absolute left-0 top-0 h-full flex items-center pointer-events-none">
            <img
              src="https://res.cloudinary.com/aqqyudsd/image/upload/v1791703815/awan_kiri.png"
              alt=""
              aria-hidden="true"
              className="h-[120px] lg:h-[160px] w-auto object-contain opacity-100"
              style={{ maxWidth: '220px' }}
            />
          </div>



          {/* SPEAKERS heading */}
          <h2
            className="font-swung text-white text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.6)' }}
          >
            SPEAKERS
          </h2>
        </div>

        {/* Cards Row */}
        <div className="relative z-10 flex items-center justify-center gap-4 lg:gap-6 px-12 lg:px-20 pb-14">
          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Previous speaker"
            className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-[#8B5E3C] hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
              <polygon points="30,4 8,20 30,36" fill="#C07A3A" />
            </svg>
          </button>

          {/* 4 Speaker Cards */}
          {[1, 2, 3, 4].map((n) => (
            <motion.div
              key={n}
              className="relative flex-1 max-w-[180px] sm:max-w-[210px] lg:max-w-[240px] h-[270px] sm:h-[310px] lg:h-[350px] cursor-pointer select-none"
              style={{ minWidth: '110px' }}
              whileHover={{ scale: 1.08, y: -10, zIndex: 40 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ── Inner clip area: glassmorphism oval (clip-content) ── */}
              <div
                className="absolute inset-[4px] overflow-hidden rounded-[9999px]"
                style={{
                  background: 'linear-gradient(165deg, rgba(235, 220, 180, 0.25) 0%, rgba(200, 180, 130, 0.14) 50%, rgba(150, 125, 80, 0.18) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: 'inset 0 2px 12px rgba(255, 240, 180, 0.20), inset 0 -4px 16px rgba(60, 40, 15, 0.18), 0 8px 24px rgba(40, 20, 10, 0.15)',
                }}
              >
                {/* Convex dome shine (kaca cembung) — strong upper radial highlight */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[9999px]"
                  style={{
                    background: 'radial-gradient(ellipse 85% 55% at 50% 16%, rgba(255,255,235,0.48) 0%, rgba(255,245,185,0.14) 42%, transparent 70%)',
                  }}
                />
                {/* Edge darkening for 3D depth */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[9999px]"
                  style={{
                    background: 'radial-gradient(ellipse 90% 50% at 50% 102%, rgba(50,30,10,0.25) 0%, transparent 60%)',
                  }}
                />

                {/* ── Vector Person (Head + Dome Torso - Clip Content) ── */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none pb-0">
                  {/* Head circle */}
                  <div
                    className="w-[36%] aspect-square rounded-full mb-2.5 flex-shrink-0"
                    style={{
                      backgroundColor: '#D1D5DB',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    }}
                  />
                  {/* Torso dome (clipped by parent oval at bottom) */}
                  <div
                    className="w-[82%] h-[48%] rounded-t-[9999px] flex-shrink-0"
                    style={{
                      backgroundColor: '#D1D5DB',
                      boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
                    }}
                  />
                </div>
              </div>

              {/* ── Native SVG Textured Border (guaranteed visible across all browsers) ── */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 240 350"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id={`spk-roughen-${n}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.09 0.09" numOctaves="4" seed={n * 17} result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                {/* Primary textured border ring */}
                <rect
                  x="4"
                  y="4"
                  width="232"
                  height="342"
                  rx="116"
                  ry="116"
                  fill="none"
                  stroke="rgba(202, 166, 78, 0.90)"
                  strokeWidth="5"
                  filter={`url(#spk-roughen-${n})`}
                />
                {/* Inner highlight textured border ring */}
                <rect
                  x="7"
                  y="7"
                  width="226"
                  height="336"
                  rx="113"
                  ry="113"
                  fill="none"
                  stroke="rgba(255, 235, 140, 0.45)"
                  strokeWidth="2"
                  filter={`url(#spk-roughen-${n})`}
                />
              </svg>
            </motion.div>
          ))}

          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Next speaker"
            className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-[#8B5E3C] hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
              <polygon points="10,4 32,20 10,36" fill="#C07A3A" />
            </svg>
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION: SAVE THE DATE & COUNTDOWN (TAKING ROOT IN)
          ========================================================================= */}
      <section
        id="save-the-date-countdown"
        className="relative w-full overflow-hidden pt-6 pb-0"
        style={{ background: '#C4A882' }}
      >
        {/* SVG filter for rough stippled borders */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <filter id="cnt-roughen" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08 0.1" numOctaves="4" seed="18" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Card: Save the Date & Map */}
          <div className="relative w-full max-w-5xl mx-auto rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-2xl">
            {/* Background image: kotak.png */}
            <img
              src={CDN_KOTAK}
              alt="Save The Date Box"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
            />

            {/* Content inside kotak */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10">
              {/* Left Column: Fonts */}
              <div className="flex-1 flex flex-col justify-between w-full h-full">
                <h3 className="font-swung text-[#3E291F] text-2xl sm:text-3xl lg:text-4xl tracking-wide mb-6 sm:mb-8 lg:mb-10">
                  Save The Date
                </h3>

                <div className="space-y-4 sm:space-y-5 lg:space-y-6 font-swung text-[#3E291F] text-lg sm:text-xl lg:text-2xl">
                  {/* Day, Year/Date/Month */}
                  <div className="flex items-center gap-3">
                    <span>Day, Year/Date/Month</span>
                    <CalendarClock className="w-6 h-6 sm:w-7 sm:h-7 text-[#3E291F] flex-shrink-0" />
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <span>Time</span>
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#3E291F] flex-shrink-0" />
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <span>Location</span>
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#3E291F] flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* Right Column: Map Image */}
              <div className="flex-shrink-0 w-full md:w-[48%] max-w-[420px] flex items-center justify-center">
                <img
                  src={CDN_MAP}
                  alt="Location Map"
                  className="w-full h-auto object-contain drop-shadow-md rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Heading: TAKING ROOT IN... */}
          <div className="text-center mt-12 sm:mt-16 mb-4 sm:mb-6">
            <h2 className="font-swung text-[#5C4537] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider drop-shadow-sm">
              TAKING ROOT IN...
            </h2>
          </div>
        </div>

        {/* Countdown strip with background bg_bawah_1.png and mushrooms on left/right */}
        <div className="relative w-full overflow-hidden flex items-center justify-center pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
          {/* Background image: tanah.png — mentok kiri-kanan & bawah, tetap pas dengan countdown */}
          <img
            src={CDN_TANAH}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none"
          />

          {/* Mushrooms + 4 Countdown Boxes */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-10">
            {/* Jamur Kiri */}
            <motion.img
              src={CDN_JAMUR_KIRI}
              alt="Mushroom Left"
              className="w-16 sm:w-24 md:w-32 lg:w-40 h-auto object-contain flex-shrink-0 drop-shadow-md select-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />

            {/* Countdown Boxes */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6">
              <CountdownCard value={timeLeft.days} />

              <span className="font-swung text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold select-none drop-shadow">
                :
              </span>

              <CountdownCard value={timeLeft.hours} />

              <span className="font-swung text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold select-none drop-shadow">
                :
              </span>

              <CountdownCard value={timeLeft.minutes} />

              <span className="font-swung text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold select-none drop-shadow">
                :
              </span>

              <CountdownCard value={timeLeft.seconds} />
            </div>

            {/* Jamur Kanan */}
            <motion.img
              src={CDN_JAMUR_KANAN}
              alt="Mushroom Right"
              className="w-16 sm:w-24 md:w-32 lg:w-40 h-auto object-contain flex-shrink-0 drop-shadow-md select-none"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-30 -mt-6 sm:-mt-8">
        <Footer />
      </div>
    </div>
  )
}

export default MainEventDetail
