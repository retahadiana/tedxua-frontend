import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { useOrder } from '../../../context/OrderContext';
import { formatPrice } from '../../../services/ticketService';
import {
    cardBg,
    confirmationTitle,
    groundBg,
    jamurLeft,
    jamurRight,
    myceliumDarkBg,
    myceliumPattern,
    tedxTitle,
} from '../../../assets/images/tickets';

/**
 * ── SUCCESS VERIFICATION ──
 * Halaman konfirmasi akhir pemesanan tiket TEDxUA.
 * Menampilkan ringkasan order dari OrderContext.
 */
export default function SuccessVerification() {
    const navigate = useNavigate();
    const { selectedTier, quantity, buyerData, currentOrder, clearOrder } = useOrder();

    // Jika tidak ada order, redirect ke halaman tiket
    useEffect(() => {
        if (!currentOrder && !selectedTier) {
            navigate('/tickets', { replace: true });
        }
    }, [currentOrder, selectedTier, navigate]);

    const unitPrice = selectedTier?.price ? parseFloat(selectedTier.price) : 0;
    const totalPrice = currentOrder?.total_amount
        ? parseFloat(currentOrder.total_amount)
        : unitPrice * quantity;

    const tierLabel = selectedTier
        ? `Pre Event : ${selectedTier.tier || selectedTier.ticketName || 'Ticket'}`
        : currentOrder
        ? 'Pre Event Ticket'
        : '-';

    const handleBackToHome = () => {
        clearOrder();
        navigate('/');
    };

    return (
        <div
            className="min-h-screen w-full relative overflow-x-clip flex flex-col items-center text-white pb-0 mb-0"
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
            <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 pt-16 sm:pt-24 md:pt-32 pb-0 mb-0">

                {/* 1. Judul CONFIRMATION */}
                <div className="relative flex justify-center items-center mt-10 sm:mt-20 md:mt-36 mb-6 sm:mb-8 md:mb-10 select-none w-full">
                    <h1 className="sr-only">CONFIRMATION</h1>
                    <img
                        src={confirmationTitle}
                        alt="CONFIRMATION"
                        className="w-full max-w-[160px] sm:max-w-[240px] md:max-w-[380px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
                    />
                </div>

                {/* 2. Kotak Ringkasan Order */}
                <div className="relative w-full max-w-4xl p-6 sm:p-10 md:p-12 mb-8 sm:mb-10 select-none">
                    <div
                        className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-xl rounded-2xl pointer-events-none"
                        style={{ filter: 'url(#rough-paper-edge)' }}
                    />

                    <div className="relative z-10 flex flex-col gap-5 sm:gap-6">

                        {/* Info e-ticket */}
                        <div className="flex flex-col border-b border-[#871417]/30 pb-4 text-center">
                            <p className="font-essays italic font-bold text-[#871417] text-xl sm:text-2xl md:text-3xl leading-relaxed">
                                E-ticket will be sent to registered email address within 24 Hours
                            </p>
                        </div>

                        {/* Order Number */}
                        {currentOrder?.order_number && (
                            <div className="flex flex-col border-b border-[#871417]/30 pb-4">
                                <span className="font-essays italic font-bold text-[#871417] text-base sm:text-lg">
                                    Order No:
                                </span>
                                <span className="font-gordita font-black text-[#3C2A1E] text-lg sm:text-xl">
                                    {currentOrder.order_number}
                                </span>
                            </div>
                        )}

                        {/* Nama pembeli */}
                        {buyerData?.name && (
                            <div className="flex flex-col border-b border-[#871417]/30 pb-4">
                                <span className="font-essays italic font-bold text-[#871417] text-base sm:text-lg">
                                    Buyer Name:
                                </span>
                                <span className="font-gordita font-black text-[#3C2A1E] text-lg sm:text-xl">
                                    {buyerData.name}
                                </span>
                                {buyerData.email && (
                                    <span className="font-gordita text-[#3C2A1E]/70 text-sm sm:text-base">
                                        {buyerData.email}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Tiket */}
                        <div className="flex flex-col border-b border-[#871417]/30 pb-4">
                            <span className="font-essays italic font-bold text-[#871417] text-base sm:text-lg">
                                Ticket:
                            </span>
                            <span className="font-gordita font-black text-[#3C2A1E] text-xl sm:text-2xl">
                                {tierLabel}
                            </span>
                            <span className="font-gordita text-[#3C2A1E]/70 text-sm sm:text-base">
                                {quantity} ticket(s) × {unitPrice > 0 ? formatPrice(unitPrice) : '-'}
                            </span>
                        </div>

                        {/* Total */}
                        <div className="flex flex-col text-center">
                            <span className="font-essays italic font-bold text-[#871417] text-xl sm:text-2xl md:text-3xl">
                                Total Payment
                            </span>
                            <span className="font-gordita font-black text-[#3C2A1E] text-3xl sm:text-4xl">
                                {totalPrice > 0 ? formatPrice(totalPrice) : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. See You At */}
                <div className="text-center leading-normal sm:leading-loose mb-10 sm:mb-12">
                    <p className="font-essays italic text-white text-2xl sm:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        See You At
                    </p>
                    <p className="font-essays italic text-white text-2xl sm:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        TEDx Universitas Airlangga
                    </p>
                </div>

                {/* 4. Logo TEDx Title */}
                <header className="flex justify-center items-center mb-8 w-full select-none relative z-10">
                    <img
                        src={tedxTitle}
                        alt="TEDx Universitas Airlangga"
                        className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[797px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(235,0,40,0.4)]"
                    />
                </header>

                {/* 5. Tombol Kembali ke Beranda */}
                <div className="w-full max-w-[420px] mb-8 px-4 sm:px-0">
                    <button
                        type="button"
                        onClick={handleBackToHome}
                        className="group relative z-10 w-full min-h-[58px] sm:min-h-[66px] px-6 py-3 transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none cursor-pointer"
                    >
                        <div
                            className="absolute inset-0 rounded-md bg-[#991A04] border-[3px] border-[#FD2A05] pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <span className="relative z-10 block font-swung tracking-wider text-xl sm:text-2xl md:text-3xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            BACK TO HOME
                        </span>
                    </button>
                </div>

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
