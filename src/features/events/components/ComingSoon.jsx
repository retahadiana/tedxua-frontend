import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar, Footer } from '@/components/layout'

// Import asset sesuai aturan file management
import topTexture from '../../../assets/images/coming-soon-top-texture.webp'
import comingSoonTitle from '../../../assets/images/coming-soon-title.webp'
import bottomGrass from '../../../assets/images/coming-soon-bottom-grass.webp'

export default function ComingSoon() {
  // Countdown Timer
  const targetDate = new Date('2026-08-08T09:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div
      className="relative w-full min-h-screen text-white flex flex-col overflow-x-hidden font-gordita selection:bg-ted-red selection:text-white"
    >
      <Navbar />
      {/* ── BASE BACKGROUND MOBILE: Hijau hutan gelap — Sesuai Figma Mobile (block sm:hidden) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 block sm:hidden"
        style={{ background: 'linear-gradient(180deg, #1E2E0E 0%, #0E1A07 100%)' }}
      />

      {/* ── BASE BACKGROUND DESKTOP: Hijau olive cerah — Sesuai Figma Desktop (hidden sm:block) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hidden sm:block"
        style={{ background: 'linear-gradient(180deg, #3E4D25 0%, #222E11 100%)' }}
      />

      {/* ── OVERLAY MOBILE: Dark vignette dramatis ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 block sm:hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(10,20,5,0.55) 50%, rgba(0,0,0,0.75) 100%)'
        }}
      />

      {/* ── OVERLAY DESKTOP: Gradasi hijau-hitam standard Figma Desktop ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-70 hidden sm:block"
        style={{
          background: 'linear-gradient(215deg, rgba(92,124,69,0.5) 0%, rgba(0,0,0,0.85) 100%)'
        }}
      />

      {/* ── ELLIPSE GLOWS MOBILE (gelap, moody) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden block sm:hidden">
        {/* Amber besar kiri atas — dominan */}
        <div
          className="absolute rounded-full"
          style={{
            width: '420px', height: '420px',
            top: '-160px', left: '-140px',
            background: 'radial-gradient(circle, rgba(184,115,46,0.85) 0%, rgba(110,63,24,0.6) 50%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />
        {/* Hijau gelap kanan tengah */}
        <div
          className="absolute rounded-full"
          style={{
            width: '280px', height: '280px',
            top: '120px', right: '-90px',
            background: 'radial-gradient(circle, rgba(40,70,20,0.7) 0%, rgba(20,40,10,0.4) 60%, transparent 85%)',
            filter: 'blur(55px)'
          }}
        />
        {/* Vignette pojok kanan bawah */}
        <div
          className="absolute rounded-full"
          style={{
            width: '300px', height: '300px',
            bottom: '0', right: '-60px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {/* ── ELLIPSE GLOWS DESKTOP (cerah, vibrant) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden sm:block">
        {/* Amber/coklat kiri atas besar */}
        <div
          className="absolute w-[606px] h-[606px] rounded-full opacity-70"
          style={{
            top: '-160px', left: '-120px',
            background: 'radial-gradient(circle, #B8732E 0%, #6E3F18 60%, transparent 85%)',
            filter: 'blur(80px)'
          }}
        />
        {/* Coklat kanan */}
        <div
          className="absolute w-[606px] h-[606px] rounded-full opacity-65"
          style={{
            top: '80px', right: '-160px',
            background: 'radial-gradient(circle, #A66324 0%, #593110 60%, transparent 85%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* ── BACKGROUND LAYER 2: Gambar Akar ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src={topTexture}
          alt="Mycelium Roots"
          aria-hidden="true"
          className="w-full h-auto object-top opacity-100 mix-blend-multiply filter contrast-150 brightness-90 drop-shadow-md"
        />
      </div>

      {/* ── MAIN CONTENT SECTION (Title & Subtitle Tagline) ── */}
      <main className="relative z-30 sm:flex-1 flex flex-col items-center justify-start text-center px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-2 sm:pb-6">
        <motion.img
          src={comingSoonTitle}
          alt="Coming Soon"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 },
          }}
          className="
            w-[236px] sm:w-[540px] md:w-[650px] lg:w-[750px]
            h-auto object-contain
            drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]
            select-none
          "
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-3 sm:mt-8 relative z-40 font-essays text-[15px] sm:text-2xl md:text-3xl text-[#FEF8E0] leading-relaxed sm:leading-relaxed max-w-[200px] sm:max-w-3xl font-normal drop-shadow-[0_6px_20px_rgba(0,0,0,1)] tracking-wide"
        >
          {/* Layout Khusus Mobile (4 Baris Sesuai Figma) */}
          <span className="inline sm:hidden">
            It's already <span className="text-[#FFFB99]">growing.</span><br />
            <span className="underline decoration-1 underline-offset-4 decoration-[#FEF8E0]">Beneath what we see</span>,<br />
            something <span className="text-[#FFFB99]">extraordinary</span> is<br />
            taking root.
          </span>

          {/* Layout Desktop */}
          <span className="hidden sm:inline">
            It's already <span className="text-[#FFFB99]">growing.</span> <br />
            <span className="underline decoration-1 underline-offset-4 decoration-[#FEF8E0]">Beneath what we see</span>, something <span className="text-[#FFFB99]">extraordinary</span> is taking <br />
            root.
          </span>
        </motion.p>
      </main>

      {/* ── BOTTOM GRASS TERRAIN & FOOTER INTEGRATION ── */}
      <div className="relative z-10 w-full flex flex-col items-center -mt-12 sm:-mt-48 md:-mt-[260px] lg:-mt-[300px]">
        {/* Gambar Rumput & Jamur */}
        <div className="relative w-full flex justify-center">
          <img
            src={bottomGrass}
            alt="Grass and mushrooms terrain"
            className="w-full h-auto object-contain sm:object-cover sm:object-top select-none block"
          />
        </div>

        {/* Footer ditarik ke atas rumput agar rumput tembus dibagian atas footer yang transparan */}
        <Footer className="relative z-20 w-full -mt-28 sm:-mt-44 md:-mt-60" />
      </div>
    </div>
  )
}
