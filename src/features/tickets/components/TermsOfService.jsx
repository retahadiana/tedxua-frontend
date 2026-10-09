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
 * ── TERMS OF SERVICE ──
 * Halaman Terms Of Service TEDxUA
 * Background, layout & footer matched 100% to SupportInformation.jsx
 */
export default function TermsOfService() {
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

                {/* 2. Judul TERMS OF SERVICE */}
                <h1 className="font-swung tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] mb-3 sm:mb-5 md:mb-6 select-none px-2">
                    TERMS OF SERVICE
                </h1>

                {/* 3. Deskripsi Pengantar */}
                <p className="font-gordita text-sm sm:text-base md:text-lg lg:text-xl text-white/90 text-center max-w-3xl leading-relaxed mb-8 sm:mb-12 md:mb-14 px-3 sm:px-4 select-none">
                    Using this ticketing website means you agree to follow the terms and provide accurate information for ticket processing, payment verification, and event registration.
                </p>

                {/* 4. GRID KOTAK INFORMASI TERMS OF SERVICE */}
                <div className="w-full max-w-5xl flex flex-col gap-4 sm:gap-6 md:gap-10 mb-10 sm:mb-14 md:mb-18 select-none">

                    {/* Baris Top: 2 Kotak (Welcome & Responsibilities) */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
                        {/* Kotak 1: Welcome to Our Ticketing Platform */}
                        <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                                Welcome to Our Ticketing Platform
                            </h2>
                            <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px]">
                                This website is designed to make purchasing tickets and registering for the event simple and convenient. By using this platform, you agree to follow the terms outlined below.
                            </p>
                        </div>

                        {/* Kotak 2: Your Responsibilities */}
                        <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                                Your Responsibilities
                            </h2>
                            <div className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px] text-center w-full space-y-1">
                                <p className="mb-2">To ensure a smooth ticketing experience, please:</p>
                                <p className="text-left pl-6">➔ Provide accurate and complete information.</p>
                                <p className="text-left pl-6">➔ Use an active email address.</p>
                                <p className="text-left pl-6">➔ Provide a reachable WhatsApp number.</p>
                                <p className="text-left pl-6">➔ Review your order carefully before completing payment.</p>
                                <p className="mt-3">Please note that incorrect information may affect ticket delivery or event registration.</p>
                            </div>
                        </div>
                    </div>

                    {/* Baris Tengah: 2 Kotak (Payments & Refunds) */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
                        {/* Kotak 3: Payments & Ticket Delivery */}
                        <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                                Payments & Ticket Delivery
                            </h2>
                            <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px]">
                                All payments are processed through the payment methods available on this website. Once your payment has been successfully confirmed, we'll prepare your invoice and electronic ticket using the information you've provided.
                            </p>
                        </div>

                        {/* Kotak 4: Refunds & Ticket Changes */}
                        <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                                Refunds & Ticket Changes
                            </h2>
                            <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px] mb-3">
                                Unless stated otherwise, completed ticket purchases are non-refundable and non-transferable.
                            </p>
                            <p className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px]">
                                If you need to update your registration details, please contact our Ticketing Support team before your ticket has been issued. Requests will be reviewed on a case-by-case basis.
                            </p>
                        </div>
                    </div>

                    {/* Baris Bawah: 1 Kotak Tengah (Fair Use of the Platform) */}
                    <div className="w-full flex justify-center">
                        <div className="relative p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] w-full max-w-2xl flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.01]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-[#991A04] border-[3px] border-[#FD2A05] shadow-2xl pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <h2 className="relative z-10 font-gordita font-bold text-[22px] sm:text-[24px] text-white mb-4 drop-shadow leading-[29.8px]">
                                Fair Use of the Platform
                            </h2>
                            <div className="relative z-10 font-gordita text-base sm:text-[18px] text-white/95 leading-[28px] text-center w-full space-y-1">
                                <p className="mb-2">To ensure a smooth experience for everyone, users are expected not to:</p>
                                <p className="text-left pl-6">➔ Submit false or misleading information.</p>
                                <p className="text-left pl-6">➔ Interfere with the website or payment process.</p>
                                <p className="text-left pl-6">➔ Misuse the support channels.</p>
                                <p className="text-left pl-6">➔ Perform any activity that may disrupt the ticketing system or other participants.</p>
                                <p className="mt-3">The organizing committee reserves the right to cancel any order that violates these terms.</p>
                            </div>
                        </div>
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
