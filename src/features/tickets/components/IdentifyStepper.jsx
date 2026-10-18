import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { useOrder } from '../../../context/OrderContext';
import { formatPrice } from '../../../services/ticketService';
import { createOrder, cancelOrder, getSecondsUntilExpiry } from '../../../services/orderService';
import {
    brownGlowBg,
    cardBg,
    groundBg,
    identityTitle,
    jamurLeft,
    jamurRight,
    myceliumPattern,
    myceliumDarkBg,
} from '../../../assets/images/tickets';

// Pesan error BE (Inggris, teknis) → Indonesia yang jelas untuk user.
const ORDER_ERROR_ID = {
    'quota exceeded': 'Sisa kuota tiket tidak cukup untuk jumlah ini. Kurangi quantity atau pilih tier lain.',
    'quantity must be between 1 and 5': 'Jumlah tiket harus antara 1 dan 5.',
    'ticket sale not started': 'Penjualan tiket ini belum dimulai.',
    'ticket sale ended': 'Masa penjualan tiket ini sudah berakhir.',
    'order expired': 'Order kedaluwarsa. Silakan buat order baru.',
    'order not awaiting approval': 'Order ini sudah tidak aktif (batal/kedaluwarsa).',
};

function friendlyOrderError(err, fallback) {
    const raw = err?.message || '';
    return ORDER_ERROR_ID[raw] || raw || fallback;
}

// Bandingkan attendee_tickets dari order lama dengan data form (untuk reuse order).
// Order-insensitive: urutan baris dari BE (PK uuid acak) tidak dijamin sama dengan urutan input.
function attendeesMatch(existing, attendees) {
    if (!Array.isArray(existing) || existing.length !== attendees.length) return false;
    const key = (x) =>
        [x.attendee_name || '', x.attendee_email || '', x.attendee_phone || '', x.audience_type || ''].join('\u0001');
    const pool = existing.map(key);
    return attendees.every((a) => {
        const i = pool.indexOf(key(a));
        if (i === -1) return false;
        pool.splice(i, 1);
        return true;
    });
}

/**
 * ── IDENTITY TITLE ──
 * Judul halaman menggunakan asset Identity.png
 */
function IdentityTitle() {
    return (
        <div className="relative flex justify-center items-center mt-8 sm:mt-16 md:mt-28 mb-4 sm:mb-6 md:mb-8 select-none w-full">
            <h1 className="sr-only">IDENTITY</h1>
            <img
                src={identityTitle}
                alt="IDENTITY"
                className="w-full max-w-[220px] sm:max-w-[340px] md:max-w-[520px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(200,80,30,0.4)]"
            />
        </div>
    );
}

/**
 * ── ICON AVATAR ──
 */
function AvatarIcon() {
    return (
        <div className="relative flex justify-center mb-4 sm:mb-6 md:mb-8 select-none">
            <div className="relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[88px] md:h-[88px] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-md rounded-2xl pointer-events-none"
                    style={{ filter: 'url(#rough-paper-edge)' }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#871417"
                    className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}

/**
 * ── INPUT FIELD ──
 */
function InputField({ label, type = 'text', value, onChange, name }) {
    return (
        <div className="relative w-full h-[54px] sm:h-[64px] md:h-[80px] flex items-center px-4 sm:px-6 md:px-8">
            <div
                className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-[0_8px_24px_rgba(0,0,0,0.35)] rounded-2xl pointer-events-none"
                style={{ filter: 'url(#rough-paper-edge)' }}
            />
            <div className="relative z-10 w-full flex items-center">
                <label
                    htmlFor={name}
                    className="font-essays italic font-bold text-[#871417] text-base sm:text-xl md:text-2xl lg:text-3xl mr-2 sm:mr-4 md:mr-5 whitespace-nowrap select-none"
                >
                    {label}
                </label>
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="flex-1 bg-transparent outline-none text-[#3C2A1E] font-gordita font-bold text-sm sm:text-lg md:text-xl lg:text-2xl placeholder:text-[#3C2A1E]/35 min-w-0"
                    style={{
                        WebkitTextFillColor: '#3C2A1E',
                        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                    }}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}

/**
 * ── PERSON CARD ──
 */
function PersonCard({ label, values, onChange }) {
    return (
        <div className="w-full flex flex-col items-center gap-6 sm:gap-8">
            <div className="relative px-8 sm:px-12 py-2 sm:py-2.5">
                <div
                    className="absolute inset-0 bg-[#EDE3D4] border-[2px] border-[#6B4E2B]/25 shadow-sm rounded-xl pointer-events-none"
                    style={{ filter: 'url(#rough-paper-edge)' }}
                />
                <span className="relative z-10 font-essays italic font-bold text-[#871417] text-xl sm:text-2xl tracking-wide">
                    {label}
                </span>
            </div>

            <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-9">
                <InputField
                    label="Name :"
                    name={`${label.toLowerCase().replace(' ', '')}_name`}
                    value={values.name}
                    onChange={(e) => onChange('name', e.target.value)}
                />
                <InputField
                    label="Email :"
                    type="email"
                    name={`${label.toLowerCase().replace(' ', '')}_email`}
                    value={values.email}
                    onChange={(e) => onChange('email', e.target.value)}
                />
                <InputField
                    label="Phone Number :"
                    type="tel"
                    name={`${label.toLowerCase().replace(' ', '')}_phone`}
                    value={values.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                />
            </div>
        </div>
    );
}

/**
 * ── IDENTIFY STEPPER ──
 * Halaman pengisian identitas per tiket (satu form per lembar tiket).
 * Quantity dipilih di TierSelection; confirm di sini yang membuat/mereuse
 * order (hold kuota mulai) sebelum lanjut ke halaman Payment.
 */
export default function IdentifyStepper() {
    const navigate = useNavigate();
    const { selectedTier, quantity, buyerData, setBuyerData, currentOrder, setCurrentOrder } = useOrder();

    const ticketCount = Math.max(1, Math.min(5, Number(quantity) || 1));

    // Satu form per tiket. Prefill dari order yang sedang berjalan (jika tier & qty sama),
    // atau dari data pemegang tiket pertama yang tersimpan.
    // ponytail: audience_type wajib di BE → diisi 'umum' default (tidak ditanya ke user).
    const [persons, setPersons] = useState(() => {
        const existing =
            currentOrder &&
            currentOrder.ticket_tier_id === selectedTier?.id &&
            currentOrder.quantity === ticketCount &&
            Array.isArray(currentOrder.attendee_tickets) &&
            currentOrder.attendee_tickets.length === ticketCount
                ? currentOrder.attendee_tickets
                : null;
        if (existing) {
            return existing.map((a) => ({
                name: a.attendee_name || '',
                email: a.attendee_email || '',
                phone: a.attendee_phone || '',
                audience_type: a.audience_type || 'umum',
            }));
        }
        return Array.from({ length: ticketCount }, (_, i) => ({
            name: i === 0 ? buyerData?.name || '' : '',
            email: i === 0 ? buyerData?.email || '' : '',
            phone: i === 0 ? buyerData?.phone || '' : '',
            audience_type: 'umum',
        }));
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Jika tidak ada tiket dipilih, redirect ke halaman pilih tiket
    useEffect(() => {
        if (!selectedTier) {
            navigate('/tickets', { replace: true });
        }
    }, [selectedTier, navigate]);

    const handlePersonChange = (index, field, value) => {
        setPersons((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
    };

    const validatePersons = () => {
        for (let i = 0; i < persons.length; i += 1) {
            const p = persons[i];
            const suffix = ` (Ticket ${i + 1})`;
            if (!p.name.trim()) return `Name is required.${suffix}`;
            if (!p.email.trim()) return `Email is required.${suffix}`;
            if (!/^\S+@\S+\.\S+$/.test(p.email.trim())) return `Valid email is required.${suffix}`;
            if (!p.phone.trim()) return `Phone number is required.${suffix}`;
        }
        return '';
    };

    /**
     * CONFIRM IDENTITY:
     * Order reuse hanya bila order masih hold & tier/qty/attendees identik.
     * Data berubah → lepas hold lama (cancel) dulu, lalu buat order baru.
     */
    const handleContinue = async (e) => {
        e.preventDefault();
        if (submitting) return;

        const validationError = validatePersons();
        if (validationError) {
            setError(validationError);
            return;
        }

        const attendees = persons.map((p) => ({
            attendee_name: p.name.trim(),
            attendee_email: p.email.trim(),
            attendee_phone: p.phone.trim(),
            audience_type: p.audience_type,
        }));
        // Pemegang tiket pertama = penerima e-ticket
        const buyer = {
            name: attendees[0].attendee_name,
            email: attendees[0].attendee_email,
            phone: attendees[0].attendee_phone,
        };

        setSubmitting(true);
        setError('');
        try {
            const orderAlive =
                !!currentOrder &&
                currentOrder.status === 'awaiting_approval' &&
                !!currentOrder.expired_at &&
                getSecondsUntilExpiry(currentOrder.expired_at) > 0;
            const canReuse =
                orderAlive &&
                currentOrder.ticket_tier_id === selectedTier.id &&
                currentOrder.quantity === ticketCount &&
                attendeesMatch(currentOrder.attendee_tickets, attendees);

            if (!canReuse) {
                if (orderAlive) {
                    // ponytail: lepas hold lama dulu agar kuota tidak tertahan (cancel status-based di BE)
                    await cancelOrder(currentOrder.id);
                    setCurrentOrder(null);
                }
                const order = await createOrder({
                    ticket_tier_id: selectedTier.id,
                    quantity: ticketCount,
                    attendees,
                    buyer_name: buyer.name,
                    buyer_email: buyer.email,
                    buyer_phone: buyer.phone,
                });
                setCurrentOrder(order);
            }

            setBuyerData(buyer);
            navigate('/tickets/payment');
        } catch (err) {
            setError(friendlyOrderError(err, 'Failed to create order. Please check your connection.'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate('/tickets');
    };

    // Jangan render apa-apa kalau tier belum ada (akan redirect)
    if (!selectedTier) return null;

    const unitPrice = selectedTier.price != null ? parseFloat(selectedTier.price) : 0;

    return (
        <div
            className="min-h-screen w-full relative overflow-x-clip flex flex-col items-center text-white"
            style={{
                background: 'linear-gradient(to bottom, #000000 0%, #100302 140px, #3A120C 450px, #280906 750px, #0D0202 100%)',
            }}
        >
            {/* ── SVG FILTERS ── */}
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

            {/* ── MYCELIUM DARK BACKGROUND ── */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-85 mix-blend-screen select-none"
                style={{
                    backgroundImage: `url(${myceliumDarkBg})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'top center',
                }}
                aria-hidden="true"
            />

            {/* ── MYCELIUM PATTERN TEXTURE ── */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay select-none"
                style={{
                    backgroundImage: `url(${myceliumPattern})`,
                    backgroundSize: '500px auto',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'top center',
                }}
                aria-hidden="true"
            />

            {/* ── NAVBAR ── */}
            <Navbar />

            {/* Light beam background */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[110px] sm:top-[130px] md:top-[145px] w-[105vw] min-w-[105vw] h-[850px] sm:h-[950px] md:h-[1050px] z-0 select-none opacity-65 mix-blend-screen">
                <img
                    src={cardBg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-fill pointer-events-none select-none"
                />
            </div>

            {/* ── WRAPPER UTAMA ── */}
            <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-5 sm:px-8 pt-28 sm:pt-32 pb-0 mb-0">

                {/* ── JUDUL IDENTITY ── */}
                <IdentityTitle />

                {/* ── SELECTED TIER SUMMARY ── */}
                {selectedTier && (
                    <div className="relative w-full max-w-[560px] mb-6 sm:mb-8 px-5 py-4 flex flex-col items-center text-center gap-1">
                        <div
                            className="absolute inset-0 bg-[#EDE3D4] border-[2px] border-[#6B4E2B]/25 shadow-sm rounded-2xl pointer-events-none"
                            style={{ filter: 'url(#rough-paper-edge)' }}
                        />
                        <span className="relative z-10 font-gordita font-bold text-[#871417] text-sm sm:text-base">
                            {selectedTier.ticketName} — {selectedTier.tier}
                        </span>
                        <span className="relative z-10 font-gordita font-black text-[#3C2A1E] text-xl sm:text-2xl">
                            {formatPrice(selectedTier.price)}
                            <span className="text-sm sm:text-base font-normal"> / ticket</span>
                        </span>
                        <span className="relative z-10 font-gordita font-bold text-[#3C2A1E] text-base sm:text-lg">
                            {ticketCount} ticket{ticketCount > 1 ? 's' : ''} — Total: {formatPrice(unitPrice * ticketCount)}
                        </span>
                        {selectedTier.quota_left > 0 && selectedTier.quota_left <= 5 && (
                            <span className="relative z-10 font-gordita text-xs text-[#6B4E2B]">
                                Remaining seats: {selectedTier.quota_left}
                            </span>
                        )}
                    </div>
                )}


                {/* ── IKON AVATAR ── */}
                <AvatarIcon />

                {/* Error message */}
                {error && (
                    <div className="w-full max-w-[560px] mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-900/60 border border-red-500 text-red-200 font-gordita text-sm">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
                        {error}
                    </div>
                )}

                {/* ── FORM DATA DIRI PER TIKET ── */}
                <form
                    onSubmit={handleContinue}
                    className="w-full flex flex-col items-center gap-10 sm:gap-12"
                >
                    {persons.map((p, i) => (
                        <PersonCard
                            key={`ticket-${i + 1}`}
                            label={`Ticket ${i + 1}`}
                            values={p}
                            onChange={(field, value) => handlePersonChange(i, field, value)}
                        />
                    ))}

                    {/* Tombol Aksi */}
                    <div className="w-full max-w-[420px] sm:max-w-[480px] flex flex-col gap-4 mt-6 mb-6">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="group relative z-10 w-full min-h-[58px] sm:min-h-[66px] px-6 py-3 transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <div
                                className="absolute inset-0 rounded-md bg-[#991A04] border-[3px] border-[#FD2A05] pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3 font-swung tracking-wider text-2xl sm:text-3xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {submitting && <Loader2 className="h-6 w-6 animate-spin" />}
                                {submitting ? 'MEMPROSES...' : 'CONTINUE'}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={submitting}
                            className="group relative z-10 w-full min-h-[58px] sm:min-h-[66px] px-6 py-3 transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <div
                                className="absolute inset-0 rounded-md bg-[#991A04] border-[3px] border-[#FD2A05] pointer-events-none"
                                style={{ filter: 'url(#rough-edge)' }}
                            />
                            <span className="relative z-10 block font-swung tracking-wider text-2xl sm:text-3xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                BACK
                            </span>
                        </button>
                    </div>
                </form>
            </main>

            {/* ── DEKORASI AREA BAWAH ── */}
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
