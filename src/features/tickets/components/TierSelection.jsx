import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Loader2 } from 'lucide-react';
import { getTickets, formatPrice, isTierOnSale } from '../../../services/ticketService';
import { useOrder } from '../../../context/OrderContext';
import { useAuth } from '../../../hooks/useAuth';

import {
    borderAkar,
    brownGlowBg,
    cardBg,
    doorAkar,
    groundBg,
    jamurLeft,
    jamurRight,
    myceliumDarkBg,
    myceliumPattern,
    myloMascot,
    preEventTitle,
    tedxTitle,
    ticketNormal,
} from '../../../assets/images/tickets';

const SAVE_THE_DATE = {
    day: 'Saturday, 31 October 2026',
    time: '09:00 AM',
    location: "ETHNIC’A ( Jl. Jawa No. 25, Gubeng, Surabaya,\nJawa Timur )",
};

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function EventNavButton({ label, onClick, isGray = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative z-10 w-full min-h-[42px] sm:min-h-[60px] md:min-h-[72px] lg:min-h-[82px] px-3 sm:px-6 py-2 sm:py-3 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none cursor-pointer"
        >
            {/* Box background: Red or Gray */}
            <div
                className={`absolute inset-0 rounded-md border-[2px] sm:border-[3px] pointer-events-none ${
                    isGray
                        ? 'bg-[#3E3835] border-[#665D58]'
                        : 'bg-[#8B1309] border-[#FF2211]'
                }`}
                style={{
                    filter: 'url(#rough-edge)',
                }}
            />

            {/* Text */}
            <span
                className={`relative z-10 block font-swung tracking-wider text-sm sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight ${
                    isGray ? 'text-[#AFA49C]' : 'text-[#FFFFFF]'
                }`}
            >
                {label}
            </span>
        </button>
    );
}

function MapFrame({ label }) {
    return (
        <figure className="relative w-full aspect-[5/4] max-w-[588px] mx-auto overflow-hidden">
            {/* Embedded interactive Google Maps of ETHNIC'A Jl. Jawa No. 25, Gubeng, Surabaya */}
            <div className="absolute inset-[3.5%] sm:inset-[4.5%] overflow-hidden rounded-xl bg-[#e5e0d8]">
                <iframe
                    title={label}
                    src="https://maps.google.com/maps?q=ETHNIC'A%20Jl.%20Jawa%20No.%2025%20Gubeng%20Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full border-0 pointer-events-auto select-none"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            {/* Frame border-akar.png overlay */}
            <img
                src={borderAkar}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-fill select-none z-10"
            />
            <figcaption className="sr-only">{label}</figcaption>
        </figure>
    );
}

function SaveTheDateCard({ mascotSide = 'right' }) {
    const mascotOnLeft = mascotSide === 'left';

    return (
        <article className="relative mx-auto w-full max-w-[631px] pt-12 sm:pt-14">
            {/* Mascot sitting on top corner with smooth scroll entry animation */}
            <motion.div
                initial={{
                    x: mascotOnLeft ? -80 : 80,
                    y: 30,
                    opacity: 0,
                    scale: 0.8,
                    rotate: mascotOnLeft ? -12 : 12,
                }}
                whileInView={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className={`pointer-events-none absolute z-20 ${mascotOnLeft
                    ? 'left-0 sm:-left-4 md:-left-8 -top-12 sm:-top-14'
                    : 'right-0 sm:-right-4 md:-right-8 -top-12 sm:-top-14'
                    }`}
            >
                {/* Glow halus di belakang Mascot */}
                <div className="pointer-events-none absolute h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] rounded-full bg-[#FFE8B2]/25 blur-[25px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <img
                    src={myloMascot}
                    alt="Mylo, maskot TEDxUA"
                    className={`relative z-10 h-auto max-h-[100px] sm:max-h-[155px] md:max-h-[190px] lg:max-h-[220px] w-16 sm:w-28 md:w-36 lg:w-44 xl:w-[170px] object-contain select-none drop-shadow-2xl ${mascotOnLeft ? '' : '-scale-x-100'
                        }`}
                />
            </motion.div>

            {/* Paper card box container */}
            <div className="relative min-h-[200px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[389px] p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                {/* Pronounced rough torn-paper edge background box */}
                <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FFFDD8] via-[#FFF3A0] to-[#FFEE85] shadow-[0_14px_40px_rgba(0,0,0,0.45)] border-[2.5px] border-[#6B4E2B]/35 pointer-events-none"
                    style={{
                        filter: 'url(#rough-paper-edge)',
                    }}
                />

                {/* Content layer — crisp, non-distorted typography and icons */}
                <div className="relative z-10 text-[#3C2A1E]">
                    <h3 className="font-swung tracking-widest text-xl sm:text-2xl md:text-3xl lg:text-[2.65rem] text-[#3C2A1E] mb-3 sm:mb-5 md:mb-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                        SAVE THE DATE
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4 font-gordita text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#3C2A1E]">
                        <li className="flex items-center gap-2 sm:gap-4">
                            <CalendarDays className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 text-[#3C2A1E]" aria-hidden="true" strokeWidth={2.25} />
                            <span>{SAVE_THE_DATE.day}</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-4">
                            <Clock className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 text-[#3C2A1E]" aria-hidden="true" strokeWidth={2.25} />
                            <span>{SAVE_THE_DATE.time}</span>
                        </li>
                        <li className="flex items-start gap-2 sm:gap-4">
                            <MapPin className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 text-[#3C2A1E] mt-0.5 sm:mt-1" aria-hidden="true" strokeWidth={2.25} />
                            <span className="whitespace-pre-line">{SAVE_THE_DATE.location}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
}

function TicketPlaceholderGrid({ prefix, tickets, loading }) {
    const navigate = useNavigate();
    const { setSelectedTier } = useOrder();
    const { isLoggedIn } = useAuth();

    const handleSelectTier = (tier, ticketName) => {
        setSelectedTier({ ...tier, ticketName });
        navigate('/tickets/identity');
    };

    // Flatten all tiers from all tickets into an array of at most 4 for the grid
    const tierCards = [];
    if (tickets && tickets.length > 0) {
        for (const ticket of tickets) {
            for (const tier of (ticket.tiers || [])) {
                tierCards.push({ tier, ticketName: ticket.name });
                if (tierCards.length >= 4) break;
            }
            if (tierCards.length >= 4) break;
        }
    }

    // Placeholder tier jika API belum ada data — agar user tetap bisa akses form
    const PLACEHOLDER_TIER = {
        id: null,
        tier: 'Normal',
        price: '0',
        quota_left: 0,
        is_active: true,
        sale_start: null,
        sale_end: null,
        ticketName: 'Pre Event',
    };

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-[40px] w-full max-w-[1238px] mx-auto list-none p-0 m-0">
            {/* Box 1: Normal Tickets Card Poster — Full-bleed, top-aligned */}
            <li
                className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[440px] flex flex-col items-center justify-center select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group overflow-hidden"
                onClick={() => {
                    if (tierCards.length > 0) {
                        handleSelectTier(tierCards[0].tier, tierCards[0].ticketName);
                    } else {
                        // Belum ada data API — set placeholder tier dan lanjutkan
                        setSelectedTier(PLACEHOLDER_TIER);
                        navigate('/tickets/identity');
                    }
                }}
            >
                <div
                    className="absolute inset-0 rounded-[16px] bg-[#100302] border-2 border-[#8B1309] group-hover:border-[#FF2211] shadow-[0_8px_30px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_35px_rgba(255,34,17,0.5)] transition-all duration-300 pointer-events-none"
                    style={{ filter: 'url(#rough-paper-edge)' }}
                />
                <img
                    src={ticketNormal}
                    alt="Normal Tickets"
                    className="relative z-10 w-full h-full object-cover object-top rounded-[16px] transition-transform duration-500 group-hover:scale-105"
                />
                {/* Tier info overlay */}
                {tierCards.length > 0 && (
                    <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-[16px] flex flex-col items-center text-center">
                        <span className="font-gordita font-bold text-white text-xs sm:text-sm md:text-base leading-tight drop-shadow">
                            {tierCards[0].tier.tier}
                        </span>
                        <span className="font-gordita font-black text-[#FF6B52] text-sm sm:text-base md:text-lg leading-tight">
                            {formatPrice(tierCards[0].tier.price)}
                        </span>
                        <span className={`font-gordita text-[10px] sm:text-xs mt-0.5 ${
                            isTierOnSale(tierCards[0].tier) && tierCards[0].tier.quota_left > 0
                                ? 'text-green-400'
                                : 'text-red-400'
                        }`}>
                            {!isTierOnSale(tierCards[0].tier)
                                ? 'Not on sale'
                                : tierCards[0].tier.quota_left > 0
                                    ? `${tierCards[0].tier.quota_left} seats left`
                                    : 'SOLD OUT'}
                        </span>
                    </div>
                )}
            </li>

            {/* Remaining 3 slots */}
            {[1, 2, 3].map((idx) => {
                const card = tierCards[idx];
                const onSale = card ? isTierOnSale(card.tier) : false;
                const soldOut = card ? card.tier.quota_left <= 0 : false;

                return (
                    <li
                        key={`${prefix}-ticket-${idx + 1}`}
                        onClick={() => {
                            if (card && onSale && !soldOut) handleSelectTier(card.tier, card.ticketName);
                            else navigate('/coming-soon');
                        }}
                        className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[440px] flex flex-col items-center justify-center select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 group overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-[#2E1B10] via-[#1C1008] to-[#0E0703] border-2 border-[#8B6B38]/40 group-hover:border-[#FFE8B2] shadow-xl transition-colors pointer-events-none"
                            style={{ filter: 'url(#rough-paper-edge)' }}
                        />
                        <img
                            src={doorAkar}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-80 pointer-events-none select-none scale-110"
                        />
                        <div className="absolute inset-x-[18%] top-[15%] bottom-[15%] bg-[#FFFDF0]/80 blur-md rounded-t-full pointer-events-none" />

                        {loading ? (
                            <div className="relative z-10 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-[#F6E3C4] animate-spin" />
                            </div>
                        ) : card ? (
                            <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center gap-1">
                                <span className="font-gordita font-bold text-white text-sm sm:text-base md:text-lg drop-shadow">
                                    {card.ticketName}
                                </span>
                                <span className="font-gordita font-black text-[#FF6B52] text-base sm:text-xl md:text-2xl">
                                    {formatPrice(card.tier.price)}
                                </span>
                                <span className="font-gordita font-bold text-white/80 text-xs sm:text-sm">
                                    {card.tier.tier}
                                </span>
                                <span className={`font-gordita text-[10px] sm:text-xs mt-1 px-2 py-0.5 rounded-full ${
                                    onSale && !soldOut
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                                }`}>
                                    {!onSale ? 'Not on sale' : soldOut ? 'SOLD OUT' : `${card.tier.quota_left} seats left`}
                                </span>
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
                                <span className="font-gordita font-black text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] tracking-wider text-[#3D5618] drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] leading-tight uppercase">
                                    COMING<br />SOON
                                </span>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

function EventSection({
    id,
    titleSrc,
    titleAlt,
    mapLabel,
    layout = 'map-first',
    mascotSide,
    tickets,
    loading,
}) {
    const navigate = useNavigate();
    const isMirrored = layout === 'card-first';

    return (
        <section id={id} className="relative w-full scroll-mt-20 sm:scroll-mt-28 flex flex-col items-center">
            {/* Ambient brown glow */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[160px] sm:top-[240px] md:top-[314px] bottom-[60px] sm:bottom-[90px] md:bottom-[120px] w-[140%] max-w-[1500px] z-0 select-none opacity-90 mix-blend-screen">
                <img
                    src={brownGlowBg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-fill pointer-events-none select-none"
                />
            </div>

            <h2 className="relative z-10 mb-5 sm:mb-8 md:mb-12 flex justify-center w-full">
                <img
                    src={titleSrc}
                    alt={titleAlt}
                    className="h-auto w-full max-w-[200px] sm:max-w-[320px] md:max-w-[480px] lg:max-w-[560px] object-contain mix-blend-screen"
                />
            </h2>

            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-12 lg:gap-16 items-center">
                {isMirrored ? (
                    <>
                        <SaveTheDateCard mascotSide={mascotSide} />
                        <MapFrame label={mapLabel} />
                    </>
                ) : (
                    <>
                        <MapFrame label={mapLabel} />
                        <SaveTheDateCard mascotSide={mascotSide} />
                    </>
                )}
            </div>

            <p className="relative z-10 font-swung text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#F6E3C4] text-center mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
                Pick Your Ticket!
            </p>
            <div className="relative z-10 w-full">
                <TicketPlaceholderGrid prefix={id} tickets={tickets} loading={loading} />
            </div>

            {/* Support and Information Button matching Figma */}
            <div className="relative z-10 mt-10 sm:mt-14 md:mt-16 flex justify-center w-full px-2">
                <button
                    type="button"
                    onClick={() => navigate('/tickets/support')}
                    className="group relative w-full max-w-[320px] sm:max-w-[480px] md:max-w-[582px] min-h-[52px] sm:min-h-[70px] md:min-h-[93px] px-3 sm:px-6 md:px-8 py-2 sm:py-3 transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none flex items-center justify-center"
                >
                    <div
                        className="absolute inset-0 rounded-2xl bg-[#8B1309] border-[3px] border-[#FF2211] shadow-2xl pointer-events-none"
                        style={{ filter: 'url(#rough-edge)' }}
                    />
                    <span className="relative z-10 block font-swung tracking-wider text-xs sm:text-xl md:text-2xl lg:text-[2.1rem] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap text-center">
                        SUPPORT AND INFORMATION
                    </span>
                </button>
            </div>
        </section>
    );
}

export default function TierSelection() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getTickets(true)
            .then((data) => { if (!cancelled) setTickets(data || []); })
            .catch(() => { if (!cancelled) setTickets([]); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-x-clip bg-gradient-to-b from-[#1A0806] via-[#3A120C] to-black text-[#FCEBD9] pb-0 mb-0">
            {/* Global Continuous Mycelium dark background overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-screen select-none"
                style={{
                    backgroundImage: `url(${myceliumDarkBg})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'top center',
                }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-25 mix-blend-overlay select-none"
                style={{
                    backgroundImage: `url(${myceliumPattern})`,
                    backgroundSize: '600px auto',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'top center',
                }}
                aria-hidden="true"
            />

            {/* SVG filters for organic rough edges on buttons and paper cards */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
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

            <main className="relative z-10 w-full flex flex-col items-center pb-0 mb-0">

                {/* ── HERO SECTION ── */}
                <header className="relative w-full flex flex-col items-center overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28">
                    <h1 className="sr-only">TEDx Universitas Airlangga Tickets</h1>

                    {/* TEDx Title — centered at top */}
                    <div className="relative z-10 w-full flex justify-center px-3 sm:px-4">
                        <img
                            src={tedxTitle}
                            alt="TEDx Universitas Airlangga"
                            className="w-full max-w-[260px] sm:max-w-[400px] md:max-w-[640px] lg:max-w-[840px] xl:max-w-[1040px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(235,0,40,0.45)]"
                        />
                    </div>

                    {/* Door — positioned below title, shifted slightly upwards */}
                    <div className="relative z-0 w-full flex justify-center -mt-4 sm:-mt-8 md:-mt-14 lg:-mt-20 xl:-mt-24">
                        <img
                            src={doorAkar}
                            alt="Pintu melengkung dengan akar mycelium"
                            className="relative z-10 w-full max-w-none h-auto object-contain mix-blend-lighten select-none"
                        />

                        {/* Navigation Buttons + Mushrooms */}
                        <nav
                            aria-label="Navigasi event"
                            className="absolute bottom-3 sm:bottom-6 md:bottom-10 lg:bottom-14 xl:bottom-18 left-1/2 -translate-x-1/2 z-20 w-full max-w-[94vw] sm:max-w-[680px] md:max-w-[820px] lg:max-w-[960px] xl:max-w-[1080px] px-2 sm:px-4 md:px-6 flex justify-between items-end"
                        >
                            {/* Left Button (MAIN EVENT) with Left Mushroom — Grayed out & links to /coming-soon */}
                            <div className="relative w-[44%] max-w-[160px] sm:max-w-[220px] md:max-w-[290px] lg:max-w-[350px]">
                                <img
                                    src={jamurLeft}
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -top-16 sm:-top-24 md:-top-32 lg:-top-40 xl:-top-44 -left-1 sm:-left-2 md:-left-4 z-0 w-14 sm:w-20 md:w-28 lg:w-36 xl:w-[172px] h-auto rotate-[11.14deg] select-none drop-shadow-xl opacity-60 grayscale"
                                />
                                <EventNavButton
                                    label="MAIN EVENT"
                                    isGray={true}
                                    onClick={() => navigate('/coming-soon')}
                                />
                            </div>

                            {/* Center space for door opening */}
                            <div className="w-[10%] shrink-0 pointer-events-none" aria-hidden="true" />

                            {/* Right Button (PRE-EVENT) with Right Mushroom */}
                            <div className="relative w-[44%] max-w-[160px] sm:max-w-[220px] md:max-w-[290px] lg:max-w-[350px]">
                                <img
                                    src={jamurRight}
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -top-10 sm:-top-14 md:-top-20 lg:-top-24 xl:-top-28 -right-1 sm:-right-2 md:-right-4 z-0 w-10 sm:w-14 md:w-20 lg:w-24 xl:w-[107px] h-auto select-none drop-shadow-xl"
                                />
                                <EventNavButton
                                    label="PRE-EVENT"
                                    onClick={() => scrollToSection('pre-event')}
                                />
                            </div>
                        </nav>
                    </div>
                </header>

                {/* ── CONTENT SECTIONS — with side padding ── */}
                <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10">

                    {/* ── PRE-EVENT SECTION ── */}
                    <div className="mt-8 sm:mt-14 md:mt-20 lg:mt-24 w-full">
                        <EventSection
                            id="pre-event"
                            titleSrc={preEventTitle}
                            titleAlt="Pre-Event"
                            mapLabel="Peta lokasi Pre-Event"
                            layout="card-first"
                            mascotSide="left"
                            tickets={tickets}
                            loading={loading}
                        />
                    </div>

                </div>{/* end content wrapper */}

                {/* ── DEKORASI AREA BAWAH (TANAH & JAMUR) ── */}
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
            </main>
        </div>
    );
}
