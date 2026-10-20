import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Loader2, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
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
    mainEventTitle,
    myceliumDarkBg,
    myceliumPattern,
    myloMascot,
    preEventTitle,
    tedxTitle,
    ticketSoldOut,
    ticketEarlyBird,
    ticketPresale1,
    ticketPresale2,
    ticketNormal,
} from '../../../assets/images/tickets';
import myloKagum from '../../../assets/images/main-event/mylo_kagum.webp';
import comingSoonTitle from '../../../assets/images/coming-soon-title.webp';

const MAIN_EVENT_DATE = {
    day: 'Saturday, 21 November 2026',
    time: '09:00 AM - 16.00 PM',
    location: 'Coming Soon',
    isComingSoon: true,
    mapQuery: null,
};

const PRE_EVENT_DATE = {
    day: 'Saturday, 31 October 2026',
    time: '09:00 AM',
    location: "ETHNIC’A ( Jl.Jawa No. 25, Gubeng, Surabaya,\nJawa Timur )",
    mapQuery: "ETHNIC'A%20Jl.%20Jawa%20No.%2025%20Gubeng%20Surabaya",
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
                className={`absolute inset-0 rounded-md border-[2px] sm:border-[3px] pointer-events-none ${isGray
                    ? 'bg-[#3E3835] border-[#665D58]'
                    : 'bg-[#8B1309] border-[#FF2211]'
                    }`}
                style={{
                    filter: 'url(#rough-edge)',
                }}
            />

            {/* Text */}
            <span
                className={`relative z-10 block font-swung tracking-wider text-sm sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight ${isGray ? 'text-[#AFA49C]' : 'text-[#FFFFFF]'
                    }`}
            >
                {label}
            </span>
        </button>
    );
}

function MapFrame({ label, mapQuery = "ETHNIC'A%20Jl.%20Jawa%20No.%2025%20Gubeng%20Surabaya", isComingSoon = false }) {
    return (
        <figure className="relative w-full aspect-[5/4] max-w-[588px] mx-auto overflow-hidden group">
            {/* Embedded interactive Google Maps OR Aesthetic Teaser Card */}
            <div className="absolute inset-[3.5%] sm:inset-[4.5%] overflow-hidden rounded-xl bg-[#140705] flex items-center justify-center select-none">
                {isComingSoon ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 text-center overflow-hidden bg-gradient-to-b from-[#2B1009] via-[#170804] to-[#0A0302]">
                        {/* Ambient glowing radial light */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,80,30,0.25),transparent_70%)]" />
                        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#FFE8B2]/15 blur-3xl" />

                        {/* Subtle background mycelium texture */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
                            style={{
                                backgroundImage: `url(${myceliumPattern})`,
                                backgroundSize: '240px auto',
                                backgroundRepeat: 'repeat',
                            }}
                        />

                        {/* Floating Mascot Mylo Kagum */}
                        <motion.div
                            animate={{
                                y: [0, -6, 0],
                                rotate: [0, 1.5, -1.5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="relative z-10 mb-1 sm:mb-2.5"
                        >
                            <img
                                src={myloKagum}
                                alt="Mylo kagum"
                                className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-[0_8px_20px_rgba(255,140,40,0.35)] select-none pointer-events-none"
                            />
                        </motion.div>

                        {/* Coming Soon Graphic / Title */}
                        <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                            <img
                                src={comingSoonTitle}
                                alt="Coming Soon"
                                className="h-auto w-28 sm:w-40 md:w-48 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none select-none"
                            />

                            {/* Badge: Secret Venue */}
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#3E160E]/85 border border-[#FF6B35]/40 shadow-lg backdrop-blur-sm mt-0.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2211]" />
                                </span>
                                <span className="font-gordita font-bold text-[#FFE8B2] text-[10px] sm:text-xs md:text-sm tracking-wider uppercase">
                                    Secret Venue Reveal Soon
                                </span>
                            </div>

                            <p className="font-gordita text-[#E5D0BF]/75 text-[10px] sm:text-xs md:text-sm max-w-[88%] mt-0.5 sm:mt-1 leading-tight">
                                Lokasi Main Event akan diumumkan segera. Nantikan kejutan dari kami!
                            </p>
                        </div>
                    </div>
                ) : (
                    <iframe
                        title={label}
                        src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                        className="h-full w-full border-0 pointer-events-auto select-none"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                )}
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

function SaveTheDateCard({ mascotSide = 'right', data = PRE_EVENT_DATE }) {
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
                            <span>{data.day}</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-4">
                            <Clock className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 text-[#3C2A1E]" aria-hidden="true" strokeWidth={2.25} />
                            <span>{data.time}</span>
                        </li>
                        <li className="flex items-start gap-2 sm:gap-4">
                            <MapPin className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 text-[#3C2A1E] mt-0.5 sm:mt-1" aria-hidden="true" strokeWidth={2.25} />
                            <span className="whitespace-pre-line">{data.location}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
}

function TicketPlaceholderGrid({ prefix, tickets, loading }) {
    const navigate = useNavigate();
    const { setSelectedTier, setQuantity } = useOrder();
    const { isLoggedIn } = useAuth();

    // Tier yang menunggu pilih jumlah tiket (modal qty). Order dibuat nanti di halaman Identity.
    const [pendingSelection, setPendingSelection] = useState(null);
    const [pendingQty, setPendingQty] = useState(1);

    // Di perangkat touch (tanpa hover): tap pertama tampilkan info, tap kedua baru lanjut beli.
    const [revealedIdx, setRevealedIdx] = useState(null);
    const [canHover, setCanHover] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mql = window.matchMedia('(hover: hover)');
        const update = () => setCanHover(mql.matches);
        update();
        mql.addEventListener?.('change', update);
        return () => mql.removeEventListener?.('change', update);
    }, []);

    // ponytail: kunci scroll selama modal pilih jumlah terbuka (cegah bleed-through);
    // target documentElement — html-lah scroll container-nya (index.css: html{overflow-x:clip}
    // → overflow-y dipaksa auto), lock di body tidak ngefek
    useEffect(() => {
        if (!pendingSelection) return;
        const el = document.documentElement;
        const prev = el.style.overflow;
        el.style.overflow = 'hidden';
        return () => { el.style.overflow = prev; };
    }, [pendingSelection]);

    const handleSelectTier = (tier, ticketName) => {
        setPendingSelection({ tier, ticketName });
        setPendingQty(1);
    };

    // Hover device: klik langsung beli. Touch device: tap-1 reveal, tap-2 beli.
    // Halaman boleh dibuka tanpa login; login diwajibkan saat mau beli (klik tiket).
    const handleCardTap = (view, idx) => {
        if (!view.name) return;
        // Touch: tap pertama cuma buka info, tap berikutnya baru lanjut beli.
        if (!canHover && revealedIdx !== idx) {
            setRevealedIdx(idx);
            return;
        }
        const wantsBuy = view.clickable || view.buyIntent;
        if (!wantsBuy) return;
        if (!isLoggedIn) {
            navigate('/sign-in', { state: { from: { pathname: '/tickets' } } });
            return;
        }
        if (view.clickable) handleSelectTier(view.tier, view.ticketName);
    };

    const handleConfirmQuantity = () => {
        if (!pendingSelection) return;
        setSelectedTier({ ...pendingSelection.tier, ticketName: pendingSelection.ticketName });
        setQuantity(pendingQty);
        setPendingSelection(null);
        navigate('/tickets/identity');
    };

    const modalQuota = Number(pendingSelection?.tier?.quota_left);
    const maxQty = Number.isFinite(modalQuota) && modalQuota > 0 ? Math.min(5, modalQuota) : 5;
    const unitPriceModal = pendingSelection?.tier?.price != null ? parseFloat(pendingSelection.tier.price) : 0;

    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollButtons = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        updateScrollButtons();
        el.addEventListener('scroll', updateScrollButtons, { passive: true });
        window.addEventListener('resize', updateScrollButtons);
        return () => {
            el.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    const handleScroll = (direction) => {
        if (!scrollContainerRef.current) return;
        const offset = direction === 'left' ? -320 : 320;
        scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    // 5 kartu tiket urutan: Pre-Event 2 (Sold Out), Early Bird, Pre-Sale 1, Pre-Sale 2, Normal Tickets
    const cardImages = [
        ticketSoldOut,
        ticketEarlyBird,
        ticketPresale1,
        ticketPresale2,
        ticketNormal,
    ];

    // Konten dari API (1 card per ticket). Kalau kosong, pakai konten fallback di bawah.
    const apiCards = [];
    if (tickets && tickets.length > 0) {
        for (const ticket of tickets) {
            const tier = (ticket.tiers && ticket.tiers.length > 0) ? ticket.tiers[0] : null;
            apiCards.push({ ticket, tier });
            if (apiCards.length >= 5) break;
        }
    }

    // Konten cadangan: Pre-Event 2 (Sold Out), Early Bird, Pre-Sale 1, Pre-Sale 2, Normal Tickets
    const fallbackText = [
        { name: 'Pre-Event 2', description: 'Pre-Event 2 TEDxUNAIR', tierLabel: 'Normal Price', priceText: 'Rp 69.000', statusText: 'Sold Out', seatsText: null },
        { name: 'Early Bird', description: 'Main Event TEDxUNAIR', tierLabel: 'Early Bird', priceText: 'TBA', statusText: 'Coming Soon', seatsText: null },
        { name: 'Pre-Sale 1', description: 'Main Event TEDxUNAIR', tierLabel: 'Pre-Sale 1', priceText: 'TBA', statusText: 'Coming Soon', seatsText: null },
        { name: 'Pre-Sale 2', description: 'Main Event TEDxUNAIR', tierLabel: 'Pre-Sale 2', priceText: 'TBA', statusText: 'Coming Soon', seatsText: null },
        { name: 'Normal Tickets', description: 'Main Event TEDxUNAIR', tierLabel: 'Normal Price', priceText: 'TBA', statusText: 'Coming Soon', seatsText: null },
    ];

    const cardViews = [0, 1, 2, 3, 4].map((idx) => {
        const img = cardImages[idx];

        if (apiCards[idx]) {
            const { ticket, tier } = apiCards[idx];
            const onSale = tier ? isTierOnSale(tier) : false;
            const quota = tier && tier.quota_left != null ? Number(tier.quota_left) : null;
            const soldOut = quota != null && quota <= 0;
            const available = !!(tier && onSale && quota != null && quota > 0);
            return {
                img,
                name: ticket.name,
                description: ticket.description || '',
                tierLabel: tier?.tier ? `${tier.tier} Price` : 'Normal Price',
                priceText: tier && tier.price != null && parseFloat(tier.price) > 0 ? formatPrice(tier.price) : 'TBA',
                statusText: tier ? (!onSale ? 'Not on sale' : soldOut ? 'Sold Out' : null) : null,
                seatsText: available && quota <= 5 ? `${quota} seats left` : null,
                clickable: available,
                buyIntent: false,
                tier,
                ticketName: ticket.name,
            };
        }

        const fb = fallbackText[idx];
        if (fb) {
            return {
                img,
                name: fb.name,
                description: fb.description,
                tierLabel: fb.tierLabel,
                priceText: fb.priceText,
                statusText: fb.statusText,
                seatsText: fb.seatsText,
                clickable: false,
                buyIntent: fb.buyIntent === true,
                tier: null,
                ticketName: fb.name,
            };
        }

        return { img, name: null, description: '', tierLabel: '', priceText: '', statusText: null, seatsText: null, clickable: false, buyIntent: false, tier: null, ticketName: null };
    });

    return (
        <>
            <div className="relative w-full max-w-[1360px] mx-auto px-1 sm:px-2">
                {/* Scroll Button Left */}
                <button
                    type="button"
                    onClick={() => handleScroll('left')}
                    disabled={!canScrollLeft}
                    aria-label="Scroll tiket ke kiri"
                    className={`hidden md:flex absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                        canScrollLeft
                            ? 'bg-gradient-to-b from-[#8B1309] to-[#4A0A05] text-[#FFE8B2] border-2 border-[#D9A29A]/50 hover:scale-110 active:scale-95'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
                </button>

                {/* Scroll Button Right */}
                <button
                    type="button"
                    onClick={() => handleScroll('right')}
                    disabled={!canScrollRight}
                    aria-label="Scroll tiket ke kanan"
                    className={`hidden md:flex absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                        canScrollRight
                            ? 'bg-gradient-to-b from-[#8B1309] to-[#4A0A05] text-[#FFE8B2] border-2 border-[#D9A29A]/50 hover:scale-110 active:scale-95'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
                </button>

                {/* Horizontal Scrollable Ticket Strip — scrollbar hidden for clean aesthetics */}
                <ul
                    ref={scrollContainerRef}
                    className="no-scrollbar flex flex-nowrap items-stretch gap-4 sm:gap-6 md:gap-7 lg:gap-8 w-full overflow-x-auto overflow-y-visible py-5 px-3 sm:px-5 list-none m-0 scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {cardViews.map((view, idx) => {
                        const hasContent = !!view.name;
                        const revealed = revealedIdx === idx;
                        const interactive = view.clickable || view.buyIntent || (hasContent && !canHover);
                        return (
                            <li
                                key={`${prefix}-ticket-${idx + 1}`}
                                onClick={hasContent ? () => handleCardTap(view, idx) : undefined}
                                className={`shrink-0 w-[240px] sm:w-[260px] md:w-[280px] lg:w-[295px] h-[340px] sm:h-[390px] md:h-[420px] lg:h-[440px] snap-center relative p-2 sm:p-3 select-none transition-transform duration-300 group ${interactive ? 'cursor-pointer' : 'cursor-not-allowed'} ${view.clickable || view.buyIntent ? 'hover:scale-105 active:scale-95' : ''}`}
                            >
                                {/* Frame bergerigi sebagai aksen tepi kartu (warna disamakan untuk semua card) */}
                                <div
                                    className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-[#2E1B10] via-[#1C1008] to-[#0E0703] border-2 border-[#8B6B38]/40 group-hover:border-[#FFE8B2] shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-none"
                                    style={{ filter: 'url(#rough-paper-edge)' }}
                                />

                                {/* Design gambar diletakkan di dalam frame */}
                                <div className="relative z-10 h-full w-full overflow-hidden rounded-[10px]">
                                    {loading ? (
                                        <div className="flex h-full items-center justify-center">
                                            <Loader2 className="h-8 w-8 text-[#F6E3C4] animate-spin" />
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={view.img}
                                                alt={view.name || 'Coming Soon'}
                                                className={`h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${hasContent ? 'group-hover:opacity-60' : ''} ${revealed && !canHover ? 'opacity-60' : ''}`}
                                            />

                                            {/* Info ticket — hover di desktop, tap-1 di touch */}
                                            {hasContent && (
                                                <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-0.5 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-3 text-center transition-opacity duration-300 ${canHover ? 'opacity-0 group-hover:opacity-100' : revealed ? 'opacity-100' : 'opacity-0'}`}>
                                                    <span className="font-gordita font-bold text-white text-base sm:text-lg leading-tight">
                                                        {view.name}
                                                    </span>
                                                    {view.description && (
                                                        <span className="font-gordita font-normal text-white text-xs sm:text-sm leading-snug line-clamp-2 max-w-[92%]">
                                                            {view.description}
                                                        </span>
                                                    )}
                                                    {view.tierLabel && (
                                                        <span className="font-gordita font-semibold text-[#D9A29A] text-xs sm:text-sm mt-1.5">
                                                            {view.tierLabel}
                                                        </span>
                                                    )}
                                                    {view.priceText && (
                                                        <span className="font-gordita font-bold text-[#FF2211] text-lg sm:text-xl leading-tight">
                                                            {view.priceText}
                                                        </span>
                                                    )}
                                                    {view.statusText && (
                                                        <span className="font-gordita font-normal text-[#FF2211] text-xs sm:text-sm">
                                                            {view.statusText}
                                                        </span>
                                                    )}
                                                    {view.seatsText && (
                                                        <span className="mt-1.5 rounded-full border border-green-500/40 bg-green-500/20 px-3.5 py-1 font-gordita font-normal text-green-400 text-xs sm:text-sm backdrop-blur-sm">
                                                            {view.seatsText}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* ── MODAL PILIH JUMLAH TIKET ── */}
            {pendingSelection && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Pilih jumlah tiket"
                    onClick={() => setPendingSelection(null)}
                >
                    <div
                        className="relative w-full max-w-[420px] p-6 sm:p-8 select-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-[0_18px_60px_rgba(0,0,0,0.7)] pointer-events-none"
                            style={{ filter: 'url(#rough-paper-edge)' }}
                        />
                        <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 text-center">
                            <div className="flex flex-col gap-1">
                                <span className="font-essays italic font-bold text-[#871417] text-xl sm:text-2xl leading-tight">
                                    {pendingSelection.ticketName} — {pendingSelection.tier.tier}
                                </span>
                                <span className="font-gordita text-[#3C2A1E]/70 text-xs sm:text-sm">
                                    Pilih jumlah tiket (maks. 5)
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPendingQty((q) => Math.max(1, q - 1))}
                                    disabled={pendingQty <= 1}
                                    aria-label="Kurangi jumlah tiket"
                                    className="w-10 h-10 rounded-lg bg-[#871417] text-white flex items-center justify-center transition-all hover:bg-[#6B0F07] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow"
                                >
                                    <Minus className="h-5 w-5" />
                                </button>
                                <span className="font-gordita font-black text-[#3C2A1E] text-4xl min-w-[3rem] text-center">
                                    {pendingQty}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setPendingQty((q) => Math.min(maxQty, q + 1))}
                                    disabled={pendingQty >= maxQty}
                                    aria-label="Tambah jumlah tiket"
                                    className="w-10 h-10 rounded-lg bg-[#871417] text-white flex items-center justify-center transition-all hover:bg-[#6B0F07] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>

                            {maxQty < 5 && (
                                <span className="font-gordita text-[#6B4E2B] text-xs">
                                    Sisa kuota: {maxQty}
                                </span>
                            )}

                            <div className="w-full flex flex-col gap-0.5 border-t border-[#871417]/30 pt-4">
                                <span className="font-gordita text-[#3C2A1E]/70 text-xs sm:text-sm">
                                    {formatPrice(unitPriceModal)} × {pendingQty} tiket
                                </span>
                                <span className="font-gordita font-black text-[#3C2A1E] text-2xl sm:text-3xl">
                                    {formatPrice(unitPriceModal * pendingQty)}
                                </span>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={handleConfirmQuantity}
                                    className="group relative z-10 w-full min-h-[52px] px-6 py-2.5 transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none cursor-pointer"
                                >
                                    <div
                                        className="absolute inset-0 rounded-md bg-[#991A04] border-[3px] border-[#FD2A05] pointer-events-none"
                                        style={{ filter: 'url(#rough-edge)' }}
                                    />
                                    <span className="relative z-10 block font-swung tracking-wider text-xl sm:text-2xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        LANJUT
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPendingSelection(null)}
                                    className="font-gordita font-bold text-[#871417]/80 hover:text-[#871417] text-sm transition-colors cursor-pointer"
                                >
                                    BATAL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function EventSection({
    id,
    titleSrc,
    titleAlt,
    mapLabel,
    mapQuery,
    saveTheDate,
    layout = 'map-first',
    mascotSide = 'right',
}) {
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
                        <SaveTheDateCard mascotSide={mascotSide} data={saveTheDate} />
                        <MapFrame label={mapLabel} mapQuery={mapQuery} isComingSoon={saveTheDate?.isComingSoon ?? false} />
                    </>
                ) : (
                    <>
                        <MapFrame label={mapLabel} mapQuery={mapQuery} isComingSoon={saveTheDate?.isComingSoon ?? false} />
                        <SaveTheDateCard mascotSide={mascotSide} data={saveTheDate} />
                    </>
                )}
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
                            {/* Left Button (MAIN EVENT) with Left Mushroom */}
                            <div className="relative w-[44%] max-w-[160px] sm:max-w-[220px] md:max-w-[290px] lg:max-w-[350px]">
                                <img
                                    src={jamurLeft}
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -top-16 sm:-top-24 md:-top-32 lg:-top-40 xl:-top-44 -left-1 sm:-left-2 md:-left-4 z-0 w-14 sm:w-20 md:w-28 lg:w-36 xl:w-[172px] h-auto rotate-[11.14deg] select-none drop-shadow-xl"
                                />
                                <EventNavButton
                                    label="MAIN EVENT"
                                    isGray={false}
                                    onClick={() => scrollToSection('main-event')}
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
                                    isGray={false}
                                    onClick={() => scrollToSection('pre-event')}
                                />
                            </div>
                        </nav>
                    </div>
                </header>

                {/* ── CONTENT SECTIONS — with side padding ── */}
                <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10">

                    {/* ── MAIN EVENT SECTION (Diatas Pre-Event) ── */}
                    <div className="mt-8 sm:mt-14 md:mt-20 lg:mt-24 w-full">
                        <EventSection
                            id="main-event"
                            titleSrc={mainEventTitle}
                            titleAlt="Main Event"
                            mapLabel="Peta lokasi Main Event"
                            mapQuery={MAIN_EVENT_DATE.mapQuery}
                            saveTheDate={MAIN_EVENT_DATE}
                            layout="map-first"
                            mascotSide="right"
                        />
                    </div>

                    {/* ── PRE-EVENT SECTION ── */}
                    <div className="mt-14 sm:mt-20 md:mt-28 lg:mt-32 w-full">
                        <EventSection
                            id="pre-event"
                            titleSrc={preEventTitle}
                            titleAlt="Pre-Event"
                            mapLabel="Peta lokasi Pre-Event"
                            mapQuery={PRE_EVENT_DATE.mapQuery}
                            saveTheDate={PRE_EVENT_DATE}
                            layout="card-first"
                            mascotSide="left"
                        />
                    </div>

                    {/* ── TICKET SELECTION & ACTION ── */}
                    <div className="mt-14 sm:mt-20 md:mt-24 w-full flex flex-col items-center">
                        <p className="relative z-10 font-swung text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#F6E3C4] text-center mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
                            Pick Your Ticket!
                        </p>
                        <div className="relative z-10 w-full">
                            <TicketPlaceholderGrid prefix="tickets" tickets={tickets} loading={loading} />
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
