import React from 'react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import {
    cardBg,
    groundBg,
    jamurLeft,
    jamurRight,
    tedxTitle,
} from '../../../assets/images/tickets';

/**
 * ── PRIVACY POLICY ──
 * Halaman Privacy Policy TEDxUA
 * Background, layout & footer matched 100% to SupportInformation.jsx
 */
export default function PrivacyPolicy() {
    return (
        <div
            className="min-h-screen w-full relative overflow-x-clip flex flex-col items-center text-white pb-0 mb-0"
            style={{
                background: 'linear-gradient(to bottom, #000000 0%, #100302 140px, #3A120C 450px, #450000 750px, #0D0202 100%)',
            }}
        >

            {/* ── SVG FILTERS — Matched to SupportInformation.jsx ── */}
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

            {/* Light beam polygon background (card-bg.svg) — Matched to SupportInformation.jsx */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[120px] sm:top-[185px] md:top-[238px] w-[105vw] min-w-[105vw] h-[850px] sm:h-[950px] md:h-[1050px] z-0 select-none opacity-65 mix-blend-screen">
                <img
                    src={cardBg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-fill pointer-events-none select-none"
                />
            </div>

            {/* ── WRAPPER UTAMA ── */}
            <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32 pb-0 mb-0">

                {/* 1. Logo TEDx Title */}
                <header className="flex justify-center items-center mb-6 sm:mb-10 w-full select-none relative z-10">
                    <img
                        src={tedxTitle}
                        alt="TEDx Universitas Airlangga"
                        className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[797px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                    />
                </header>

                {/* 2. Judul PRIVACY POLICY */}
                <h1 className="font-swung tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] mb-3 sm:mb-5 md:mb-6 select-none px-2">
                    PRIVACY POLICY
                </h1>

                {/* 3. Deskripsi Pengantar */}
                <p className="font-gordita text-sm sm:text-base md:text-lg lg:text-xl text-white/90 text-center max-w-3xl leading-relaxed mb-8 sm:mb-12 md:mb-14 px-3 sm:px-4 select-none">
                    We collect only the information needed to process your ticket purchase, manage event registration, and deliver your e-ticket. Your personal information is never used for unrelated purposes and is handled with care to protect your privacy.
                </p>

                {/* 4. GRID 4 KOTAK INFORMASI PRIVACY POLICY */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 mb-10 sm:mb-14 md:mb-18 select-none">

                    {/* Kotak 1: Your Privacy Matters */}
                    <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                            Your Privacy Matters
                        </h2>
                        <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px]">
                            Your privacy is important to us. When purchasing tickets through this website, we collect only the information needed to manage registrations, process transactions, deliver your e-ticket and support your event experience. We handle your personal information securely and responsibly throughout the entire ticketing process.
                        </p>
                    </div>

                    {/* Kotak 2: Information We Collect */}
                    <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                            Information We Collect
                        </h2>
                        <div className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px] text-center w-full space-y-1">
                            <p className="mb-2">To complete your registration, we may ask for:</p>
                            <p className="text-left pl-6">➔ Full name</p>
                            <p className="text-left pl-6">➔ Email address</p>
                            <p className="text-left pl-6">➔ WhatsApp number</p>
                            <p className="text-left pl-6">➔ Ticket category</p>
                            <p className="text-left pl-6">➔ Number of tickets purchased</p>
                            <p className="text-left pl-6">➔ Payment information</p>
                            <p className="text-left pl-6">➔ Order and transaction details</p>
                            <p className="mt-3">We only collect information that is relevant to your participation in the event.</p>
                        </div>
                    </div>

                    {/* Kotak 3: Keeping Your Information Safe */}
                    <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                            Keeping Your Information Safe
                        </h2>
                        <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px] mb-3">
                            Your information is stored securely and can only be accessed by authorized members of the organizing committee or trusted service providers supporting our ticketing operations.
                        </p>
                        <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px]">
                            We retain your information only for the duration needed to manage the event and complete related administrative processes.
                        </p>
                    </div>

                    {/* Kotak 4: Need to Update Your Information? */}
                    <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                            Need to Update Your Information?
                        </h2>
                        <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px]">
                            If you notice an error in your registration details, please contact our Ticketing Support team as soon as possible. We'll do our best to assist you before your ticket is issued.
                        </p>
                    </div>

                </div>

                {/* 5. INFORMASI CONTACT PERSON */}
                <div className="w-full flex flex-col items-center text-center gap-3 sm:gap-4 mb-10 select-none">
                    <h2 className="font-essays italic text-2xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Contact Person
                    </h2>
                    <h3 className="font-gordita font-bold text-lg sm:text-2xl text-white tracking-wide">
                        Support & Information
                    </h3>
                    <p className="font-gordita italic text-sm sm:text-lg text-white/90 max-w-xl leading-relaxed px-4">
                        Your privacy is safe with us. We only use your data to process your order, send your tickets, and manage the event.
                    </p>

                    <div className="font-gordita text-sm sm:text-lg text-white/95 mt-2 flex flex-col gap-1">
                        <p className="font-bold">Contact Our Team</p>
                        <p>Lila ( +62 81574175457)</p>
                        <p>Dimas ( +62 822446920550)</p>
                    </div>
                </div>

            </main>

            {/* ── DEKORASI AREA BAWAH (TANAH & JAMUR) — Matched to SupportInformation.jsx ── */}
            <div className="relative w-full block m-0 p-0 leading-none overflow-visible mt-20 sm:mt-28 md:mt-36 -mb-16 sm:-mb-24 md:-mb-32">
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

                <div className="absolute bottom-0 left-0 w-full h-32 sm:h-44 md:h-56 bg-gradient-to-t from-black via-black/85 via-50% to-transparent pointer-events-none z-10" />

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
