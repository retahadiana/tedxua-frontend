import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import {
    cardBg,
    groundBg,
    jamurLeft,
    jamurRight,
    supportInformationTitle,
    tedxTitle,
} from '../../../assets/images/tickets';

/**
 * ── SUPPORT AND INFORMATION ──
 * Halaman Support & Information TEDxUA
 * Background & footer matched 100% to IdentifyStepper.jsx
 */
export default function SupportInformation() {
    const navigate = useNavigate();
    const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

    return (
        <div
            className="min-h-screen w-full relative overflow-x-clip flex flex-col items-center text-white pb-0 mb-0"
            style={{
                background: 'linear-gradient(to bottom, #000000 0%, #100302 140px, #3A120C 450px, #450000 750px, #0D0202 100%)',
            }}
        >

            {/* ── SVG FILTERS — Matched to IdentifyStepper.jsx ── */}
            <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
                <defs>
                    <filter id="rough-edge" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <filter id="rough-paper-edge" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.038" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* ── NAVBAR ── */}
            <Navbar />

            {/* Light beam polygon background (card-bg.svg) — Positioned directly below tedxTitle */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[120px] sm:top-[185px] md:top-[238px] w-[105vw] min-w-[105vw] h-[850px] sm:h-[950px] md:h-[1050px] z-0 select-none opacity-65 mix-blend-screen">
                <img
                    src={cardBg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-fill pointer-events-none select-none"
                />
            </div>

            {/* ── WRAPPER UTAMA ── */}
            <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32 pb-0 mb-0">

                {/* 1. Logo TEDx Title (Tanpa warna merah di bawah logo) */}
                <header className="flex justify-center items-center mb-8 sm:mb-12 md:mb-14 w-full select-none relative z-10">
                    <img
                        src={tedxTitle}
                        alt="TEDx Universitas Airlangga"
                        className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[797px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                    />
                </header>

                {/* 2. Judul SUPPORT AND INFORMATION (SupportInformation.png graphic title) ── */}
                <div className="relative flex justify-center items-center mb-8 sm:mb-12 md:mb-16 select-none w-full">
                    <h1 className="sr-only">SUPPORT AND INFORMATION</h1>
                    <img
                        src={supportInformationTitle}
                        alt="SUPPORT AND INFORMATION"
                        className="w-full max-w-[260px] sm:max-w-[400px] md:max-w-[540px] lg:max-w-[680px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
                    />
                </div>

                {/* 3. TIGA KOTAK INFORMASI (PRIVACY POLICY, TERMS OF SERVICE, SUPPORT CONTACT) — Dengan Animasi Bergoyang ── */}
                <div className="w-full max-w-[520px] sm:max-w-[620px] md:max-w-[1240px] grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 md:gap-14 lg:gap-16 items-start mb-10 sm:mb-16 md:mb-[280px] select-none">
                    {/* Kotak 1: PRIVACY POLICY (Kotak Merah Bergoyang) */}
                    <div className="animate-card-sway-1">
                        <div
                            onClick={() => navigate('/tickets/privacy-policy')}
                            className="relative min-h-[180px] sm:min-h-[260px] md:min-h-[480px] flex items-center justify-center p-6 text-center cursor-pointer transition-transform duration-300 hover:scale-105"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <span className="relative z-10 font-swung tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFFFFF] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] leading-[1.15]">
                                PRIVACY<br />POLICY
                            </span>
                        </div>
                    </div>

                    {/* Kotak 2: TERMS OF SERVICE (Kertas Sobek Beige Bergoyang) */}
                    <div className="md:translate-y-[220px]">
                        <div className="animate-card-sway-2">
                            <div
                                onClick={() => navigate('/tickets/terms-of-service')}
                                className="relative min-h-[180px] sm:min-h-[260px] md:min-h-[480px] flex items-center justify-center p-6 text-center cursor-pointer transition-transform duration-300 hover:scale-105 z-20"
                            >
                                <div
                                    className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-2xl rounded-2xl pointer-events-none"
                                    style={{ filter: 'url(#rough-paper-edge)' }}
                                />
                                <span className="relative z-10 font-swung tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#991A04] drop-shadow-sm leading-[1.15]">
                                    TERMS OF<br />SERVICE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Kotak 3: SUPPORT CONTACT (Kotak Merah Bergoyang dengan Dropdown Kontak) */}
                    <div className="relative animate-card-sway-3 z-30">
                        <div
                            onClick={() => setIsSupportDropdownOpen((prev) => !prev)}
                            className="relative min-h-[180px] sm:min-h-[260px] md:min-h-[480px] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-transform duration-300 hover:scale-105"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <span className="relative z-10 font-swung tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFFFFF] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] leading-[1.15]">
                                SUPPORT<br />CONTACT
                            </span>

                            {/* Chevron Indicator */}
                            <div className="relative z-10 mt-3 flex items-center gap-1 font-gordita text-xs sm:text-sm font-semibold text-[#FFD7D0]">
                                <span>Click to choose contact</span>
                                <ChevronDown
                                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                                        isSupportDropdownOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Dropdown Menu Contact Person */}
                        <AnimatePresence>
                            {isSupportDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    className="absolute left-0 right-0 top-full mt-3 z-40 p-4 sm:p-5 rounded-2xl bg-[#590C03] border-2 border-[#FF3A1A] shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col items-center text-center gap-3 backdrop-blur-md"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-[#590C03] pointer-events-none -z-10" style={{ filter: 'url(#rough-edge)' }} />
                                    
                                    <div className="font-gordita font-bold text-sm sm:text-base md:text-lg text-white border-b border-white/20 pb-2 w-full flex items-center justify-center gap-2">
                                        <Phone className="h-4 w-4 text-[#FF5A40]" />
                                        <span>Contact Our Team</span>
                                    </div>

                                    <div className="w-full flex flex-col gap-2.5 pt-1">
                                        {/* Contact 1: Lila */}
                                        <a
                                            href="https://wa.me/6281574175457"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl bg-[#8B1309] hover:bg-[#B3190C] border border-[#FF4D33]/60 transition-all duration-200 active:scale-95 shadow-md"
                                        >
                                            <div className="flex items-center gap-2.5 text-left">
                                                <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
                                                <div>
                                                    <p className="font-gordita font-bold text-sm sm:text-base text-white leading-none">Lila</p>
                                                    <p className="font-gordita text-xs sm:text-sm text-white/80 mt-1">+62 81574175457</p>
                                                </div>
                                            </div>
                                            <span className="font-gordita text-xs font-semibold px-2.5 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 group-hover:bg-[#25D366] group-hover:text-black transition-colors whitespace-nowrap">
                                                WhatsApp
                                            </span>
                                        </a>

                                        {/* Contact 2: Dimas */}
                                        <a
                                            href="https://wa.me/62822446920550"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl bg-[#8B1309] hover:bg-[#B3190C] border border-[#FF4D33]/60 transition-all duration-200 active:scale-95 shadow-md"
                                        >
                                            <div className="flex items-center gap-2.5 text-left">
                                                <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
                                                <div>
                                                    <p className="font-gordita font-bold text-sm sm:text-base text-white leading-none">Dimas</p>
                                                    <p className="font-gordita text-xs sm:text-sm text-white/80 mt-1">+62 822446920550</p>
                                                </div>
                                            </div>
                                            <span className="font-gordita text-xs font-semibold px-2.5 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 group-hover:bg-[#25D366] group-hover:text-black transition-colors whitespace-nowrap">
                                                WhatsApp
                                            </span>
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 4. INFORMASI CONTACT PERSON */}
                <div className="w-full flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 select-none px-4">
                    <h2 className="font-essays italic text-xl sm:text-2xl md:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Contact Person
                    </h2>
                    <h3 className="font-gordita font-bold text-base sm:text-lg md:text-2xl text-white tracking-wide">
                        Support & Information
                    </h3>
                    <p className="font-gordita italic text-xs sm:text-sm md:text-lg text-white/90 max-w-xl leading-relaxed">
                        Your privacy is safe with us. We only use your data to process your order, send your tickets, and manage the event.
                    </p>

                    <div className="font-gordita text-xs sm:text-sm md:text-lg text-white/95 mt-2 flex flex-col gap-1.5">
                        <p className="font-bold text-[#FF6B52]">Contact Our Team</p>
                        <a href="https://wa.me/6281574175457" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                            Lila ( +62 81574175457 )
                        </a>
                        <a href="https://wa.me/62822446920550" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                            Dimas ( +62 822446920550 )
                        </a>
                    </div>
                </div>

            </main>

            {/* ── DEKORASI AREA BAWAH (TANAH & JAMUR) — Matched to IdentifyStepper.jsx ── */}
            <div className="relative w-full block m-0 p-0 leading-none overflow-visible mt-20 sm:mt-28 md:mt-36 -mb-16 sm:-mb-24 md:-mb-32">
                {/* Gambar tanah membentang penuh dengan gradasi transparansi di bagian bawah */}
                <img
                    src={groundBg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-[340px] object-cover object-bottom block pointer-events-none select-none"
                    style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 92%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 92%)',
                    }}
                />

                {/* Trik Blending: Fade-Out hitam sangat lembut di bagian dasar agar menyatu sempurna dengan Footer */}
                <div className="absolute bottom-0 left-0 w-full h-32 sm:h-44 md:h-56 bg-gradient-to-t from-black via-black/85 via-50% to-transparent pointer-events-none z-10" />

                {/* Jamur kiri dan kanan berdiri tepat DI ATAS permukaan tanah (ground-bg.png) */}
                <img
                    src={jamurLeft}
                    alt=""
                    aria-hidden="true"
                    className="absolute top-0 -translate-y-1/2 left-4 sm:left-10 md:left-16 w-28 sm:w-40 md:w-56 h-auto object-contain pointer-events-none select-none z-20 drop-shadow-2xl"
                />
                <img
                    src={jamurRight}
                    alt=""
                    aria-hidden="true"
                    className="absolute top-0 -translate-y-1/2 right-4 sm:right-10 md:right-16 w-28 sm:w-40 md:w-56 h-auto object-contain pointer-events-none select-none z-20 drop-shadow-2xl"
                />
            </div>

            {/* ── FOOTER ── */}
            <Footer />
        </div>
    );
}
