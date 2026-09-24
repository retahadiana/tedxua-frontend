import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Clock, Minus, Plus } from 'lucide-react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { useOrder } from '../../../context/OrderContext';
import { createOrder, uploadPaymentProof, getSecondsUntilExpiry, formatCountdown } from '../../../services/orderService';
import { formatPrice } from '../../../services/ticketService';
import {
    cardBg,
    groundBg,
    jamurLeft,
    jamurRight,
    myceliumDarkBg,
    myceliumPattern,
    paymentTitle,
    qrisCode,
    tedxTitle,
} from '../../../assets/images/tickets';

/**
 * ── QRIS MANUAL PAYMENT ──
 * Halaman pembayaran QRIS.
 * - Quantity dipilih di sini
 * - Subtotal & Total dihitung otomatis (harga × qty)
 * - Order dibuat otomatis saat klik "CONFIRM PAYMENT"
 */
export default function QRISManualPayment() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const {
        selectedTier,
        quantity,
        setQuantity,
        buyerData,
        currentOrder,
        setCurrentOrder,
    } = useOrder();

    const [proofFile, setProofFile] = useState(null);
    const [proofPreview, setProofPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [creatingOrder, setCreatingOrder] = useState(false);
    // Re-evaluate effect setelah create selesai (sukses/gagal) — creatingOrder tdk di deps
    const [createEpoch, setCreateEpoch] = useState(0);
    const attemptsRef = useRef({}); // max 2 attempt per key tier:qty

    // Countdown timer (aktif setelah order dibuat)
    const [countdown, setCountdown] = useState(0);
    const [isExpired, setIsExpired] = useState(false);

    // Jika tidak ada tiket yang dipilih, redirect ke halaman pilih tiket
    useEffect(() => {
        if (!selectedTier) {
            navigate('/tickets', { replace: true });
        }
    }, [selectedTier, navigate]);

    // Pastikan selalu ada order hidup → timer tampil.
    // Qty mismatch TIDAK bikin order baru (hold menumpuk saat +/-) — CONFIRM yang handle.
    // Create selesai → epoch++ (2s) re-eval; gagal → max 2 attempt per key lalu berhenti.
    useEffect(() => {
        if (!selectedTier || creatingOrder) return;
        const stillValid =
            currentOrder?.expired_at &&
            getSecondsUntilExpiry(currentOrder.expired_at) > 0;
        if (stillValid) return;

        const attemptKey = `${selectedTier.id}:${currentOrder?.quantity ?? quantity}:${currentOrder?.id ?? 'new'}`;
        if ((attemptsRef.current[attemptKey] || 0) >= 2) return;
        attemptsRef.current[attemptKey] = (attemptsRef.current[attemptKey] || 0) + 1;

        let isMounted = true;
        let nextTimer;
        setCreatingOrder(true);
        setErrorMessage('');
        createOrder({
            ticket_tier_id: selectedTier.id,
            quantity,
        })
            .then((order) => {
                if (isMounted) {
                    attemptsRef.current = {}; // sukses → boleh attempt lagi (mis. nanti expired)
                    setCurrentOrder(order);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setErrorMessage(err.message || 'Failed to create order. Please check your connection.');
                }
            })
            .finally(() => {
                if (!isMounted) return;
                setCreatingOrder(false);
                nextTimer = setTimeout(() => {
                    if (isMounted) setCreateEpoch((e) => e + 1);
                }, 2000);
            });
        return () => {
            isMounted = false;
            clearTimeout(nextTimer);
        };
        // creatingOrder sengaja tidak di deps: cukup guard di atas, hindari re-entry
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTier, quantity, currentOrder, setCurrentOrder, createEpoch]);

    useEffect(() => {
        if (!currentOrder?.expired_at) return;
        setIsExpired(false);
        // ponytail: `let` dulu — tick() bisa jalan sebelum setInterval
        // (order expired di sessionStorage → secs<=0 di panggilan pertama → TDZ kalau const)
        let timer;
        const tick = () => {
            const secs = getSecondsUntilExpiry(currentOrder.expired_at);
            setCountdown(secs);
            if (secs <= 0) {
                setIsExpired(true);
                clearInterval(timer);
            }
        };
        tick();
        timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, [currentOrder?.expired_at]);

    // Ubah quantity → order lama tetap dipakai utk timer (tidak di-null → hold tdk menumpuk).
    // Qty mismatch baru dibuat order BARU di CONFIRM PAYMENT.
    const handleQuantityChange = useCallback((newQty) => {
        setQuantity(newQty);
        setIsExpired(false);
        setCountdown(0);
        setErrorMessage('');
    }, [setQuantity]);

    // Hitung harga
    const unitPrice = selectedTier?.price != null ? parseFloat(selectedTier.price) : 0;
    const subtotal = unitPrice * quantity;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                setErrorMessage('Please upload an image file (JPG, PNG, WEBP).');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage('Maximum file size is 5MB.');
                return;
            }
            setProofFile(file);
            setProofPreview(URL.createObjectURL(file));
            setErrorMessage('');
        }
    };

    const handleRemoveFile = () => {
        setProofFile(null);
        if (proofPreview) {
            URL.revokeObjectURL(proofPreview);
            setProofPreview(null);
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
        setErrorMessage('');
    };

    /**
     * CONFIRM PAYMENT:
     * 1. Jika belum ada order → buat order dulu (POST /api/v1/orders)
     * 2. Upload bukti pembayaran
     * 3. Navigate ke confirmation
     */
    const handleConfirmPayment = async () => {
        if (!proofFile) {
            setErrorMessage('Proof of payment is required before proceeding!');
            return;
        }

        let orderId = currentOrder?.id;

        // Buat order baru jika belum ada ATAU qty beda (order lama dipertahankan utk timer)
        const orderQtyMatches = currentOrder?.quantity === quantity;
        const orderAlive =
            currentOrder?.expired_at && getSecondsUntilExpiry(currentOrder.expired_at) > 0;
        if (!orderId || !orderQtyMatches || !orderAlive) {
            if (!selectedTier) {
                setErrorMessage('Ticket tier not found. Please go back and select a ticket.');
                return;
            }
            setCreatingOrder(true);
            setErrorMessage('');
            try {
                const order = await createOrder({
                    ticket_tier_id: selectedTier.id,
                    quantity,
                });
                setCurrentOrder(order);
                orderId = order.id;
            } catch (err) {
                setErrorMessage(err.message || 'Failed to create order. Please try again.');
                setCreatingOrder(false);
                return;
            }
            setCreatingOrder(false);
        }

        // Upload bukti pembayaran
        setUploading(true);
        setErrorMessage('');
        try {
            await uploadPaymentProof(orderId, proofFile);
            navigate('/tickets/confirmation');
        } catch (err) {
            setErrorMessage(err.message || 'Failed to upload payment proof. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleBack = () => {
        navigate('/tickets/identity');
    };

    // Jika belum ada tier, jangan render apapun (akan redirect di useEffect)
    if (!selectedTier) return null;

    const tierLabel = `Pre Event : ${selectedTier.tier || selectedTier.ticketName || 'Ticket'}`;

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
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[120px] sm:top-[185px] md:top-[238px] w-[105vw] min-w-[105vw] h-[850px] sm:h-[950px] md:h-[1050px] z-0 select-none opacity-65 mix-blend-screen">
                <img
                    src={cardBg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-fill pointer-events-none select-none"
                />
            </div>

            {/* ── WRAPPER UTAMA ── */}
            <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32 pb-0 mb-0">

                {/* ── LOGO TEDx ── */}
                <header className="flex justify-center items-center mb-8 sm:mb-12 md:mb-14 w-full select-none relative z-10">
                    <img
                        src={tedxTitle}
                        alt="TEDx Universitas Airlangga"
                        className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[797px] h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                    />
                </header>

                {/* ── JUDUL PAYMENT ── */}
                <div className="relative flex justify-center items-center mb-8 sm:mb-10 select-none w-full">
                    <h1 className="sr-only">PAYMENT</h1>
                    <img
                        src={paymentTitle}
                        alt="PAYMENT"
                        className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[380px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(200,80,30,0.4)]"
                    />
                </div>

                {/* ── KOTAK SUMMARY PESANAN ── */}
                <div className="relative w-full max-w-4xl p-6 sm:p-10 md:p-12 mb-4 select-none">
                    <div
                        className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-xl rounded-2xl pointer-events-none"
                        style={{ filter: 'url(#rough-paper-edge)' }}
                    />
                    <div className="relative z-10 flex flex-col gap-5 sm:gap-7">

                        {/* ── BARIS TIKET + QUANTITY STEPPER ── */}
                        <div className="flex items-center justify-between gap-4 border-b border-[#871417]/30 pb-4">
                            {/* Nama tiket (kiri) */}
                            <span className="font-essays italic font-bold text-[#871417] text-lg sm:text-2xl md:text-3xl leading-tight">
                                {tierLabel}
                            </span>

                            {/* Quantity stepper (kanan) */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1 || creatingOrder || uploading}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#871417] text-white flex items-center justify-center transition-all hover:bg-[#6B0F07] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-gordita font-black text-[#3C2A1E] text-xl sm:text-2xl min-w-[2rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(Math.min(5, quantity + 1))}
                                    disabled={quantity >= 5 || creatingOrder || uploading}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#871417] text-white flex items-center justify-center transition-all hover:bg-[#6B0F07] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Order Number (muncul setelah order dibuat) */}
                        {currentOrder?.order_number && (
                            <div className="flex flex-col border-b border-[#871417]/30 pb-3">
                                <span className="font-essays italic font-bold text-[#871417] text-base sm:text-lg">
                                    Order No:
                                </span>
                                <span className="font-gordita font-black text-[#3C2A1E] text-lg sm:text-xl">
                                    {currentOrder.order_number}
                                </span>
                            </div>
                        )}

                        {/* Subtotal */}
                        <div className="flex flex-col border-b border-[#871417]/30 pb-3">
                            <span className="font-essays italic font-bold text-[#871417] text-xl sm:text-2xl md:text-3xl">
                                Subtotal :
                            </span>
                            <span className="font-gordita font-black text-[#3C2A1E] text-lg sm:text-xl md:text-2xl">
                                {unitPrice >= 0 ? formatPrice(unitPrice) : '-'} × {quantity}
                            </span>
                        </div>

                        {/* Total */}
                        <div className="flex flex-col">
                            <span className="font-essays italic font-bold text-[#871417] text-xl sm:text-2xl md:text-3xl">
                                Total :
                            </span>
                            <span className="font-gordita font-black text-[#3C2A1E] text-2xl sm:text-3xl md:text-4xl">
                                {subtotal >= 0 ? formatPrice(subtotal) : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Countdown Timer (Real-time sesuai expired_at dari API) */}
                {currentOrder?.expired_at ? (
                    <div className={`relative flex items-center gap-3 px-6 py-3.5 rounded-2xl mb-6 shadow-lg transition-all ${
                        isExpired ? 'bg-red-950/80 border border-red-500/80 text-red-200' : countdown <= 120 ? 'bg-amber-950/80 border border-amber-500/80 text-amber-100 animate-pulse' : 'bg-[#2E1B10] border border-[#6B4E2B]/60 text-white'
                    }`}>
                        <Clock className={`h-6 w-6 shrink-0 ${isExpired ? 'text-red-400' : countdown <= 120 ? 'text-amber-400' : 'text-[#F6E3C4]'}`} />
                        <div className="flex flex-col">
                            <span className="font-gordita font-bold text-xs sm:text-sm">
                                {isExpired ? 'Order Expired! Please try ordering again.' : 'Payment Time Remaining:'}
                            </span>
                            {!isExpired && (
                                <span className={`font-gordita font-black text-2xl sm:text-3xl tracking-wider ${
                                    countdown <= 120 ? 'text-amber-300' : 'text-white'
                                }`}>
                                    {formatCountdown(countdown)}
                                </span>
                            )}
                        </div>
                    </div>
                ) : creatingOrder ? (
                    <div className="relative flex items-center gap-3 px-6 py-3 rounded-2xl mb-6 bg-[#2E1B10]/80 border border-[#6B4E2B]/40 text-white/80">
                        <Loader2 className="h-5 w-5 animate-spin text-[#F6E3C4]" />
                        <span className="font-gordita font-semibold text-xs sm:text-sm">
                            Loading payment timer from API...
                        </span>
                    </div>
                ) : null}

                {/* Judul "Pay" */}
                <h2 className="font-essays italic text-3xl sm:text-4xl text-white text-center mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide">
                    Pay
                </h2>

                {/* ── KOTAK QRIS ── */}
                <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] p-4 sm:p-6 md:p-8 mb-4 flex items-center justify-center select-none">
                    <div
                        className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-xl rounded-2xl pointer-events-none"
                        style={{ filter: 'url(#rough-paper-edge)' }}
                    />
                    <img
                        src={qrisCode}
                        alt="QRIS TEDx Universitas Airlangga"
                        className="relative z-10 w-full h-auto max-h-[460px] sm:max-h-[560px] object-contain rounded-xl shadow-md border border-[#6B4E2B]/20"
                    />
                </div>

                {/* ── TOMBOL DOWNLOAD QRIS ── */}
                <a
                    href={qrisCode}
                    download="QRIS-TEDx-Universitas-Airlangga.png"
                    className="group relative z-10 min-h-[48px] px-6 py-2.5 mb-10 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none cursor-pointer flex items-center gap-2"
                >
                    <div
                        className="absolute inset-0 rounded-md bg-[#991A04] border-[2.5px] border-[#FD2A05] pointer-events-none"
                        style={{ filter: 'url(#rough-edge)' }}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#FFFFFF"
                        className="relative z-10 w-5 h-5 sm:w-6 sm:h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                    </svg>
                    <span className="relative z-10 block font-swung tracking-wider text-lg sm:text-xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        DOWNLOAD QRIS
                    </span>
                </a>

                {/* Judul "Upload" */}
                <h2 className="font-essays italic text-3xl sm:text-4xl text-white text-center mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide">
                    Upload
                </h2>

                {/* ── KOTAK UPLOAD ── */}
                <div className="relative w-full max-w-4xl h-[340px] sm:h-[400px] md:h-[447px] mb-10 flex flex-col items-center justify-between p-6 sm:p-10 md:p-12 select-none">
                    <div
                        className="absolute inset-0 bg-[#EDE3D4] border-[2.5px] border-[#6B4E2B]/30 shadow-xl rounded-2xl pointer-events-none"
                        style={{ filter: 'url(#rough-paper-edge)' }}
                    />

                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-2 sm:py-4">
                        <h3 className="font-essays italic font-bold text-[#871417] text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-center tracking-tight leading-tight">
                            Upload Your Proof of Payment
                        </h3>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            id="payment-proof-upload"
                        />

                        {!proofFile ? (
                            <label
                                htmlFor="payment-proof-upload"
                                className="group relative cursor-pointer flex flex-col items-center justify-center my-auto transition-transform hover:scale-105 active:scale-95"
                            >
                                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-[6px] sm:border-[8px] md:border-[10px] border-[#871417] flex items-center justify-center bg-transparent transition-colors group-hover:bg-[#871417]/5 shadow-lg">
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 fill-[#871417]"
                                    >
                                        <path d="M50 22 L28 44 H42 V58 H58 V44 H72 Z" fill="#871417" />
                                        <rect x="28" y="64" width="44" height="9" rx="4.5" fill="#871417" />
                                    </svg>
                                </div>
                            </label>
                        ) : (
                            <div className="flex flex-col items-center justify-center my-auto gap-2">
                                <div className="relative group flex justify-center bg-[#3C2A1E]/5 p-2 rounded-xl border border-[#871417]/20">
                                    <img
                                        src={proofPreview}
                                        alt="Preview Bukti Pembayaran"
                                        className="max-h-36 sm:max-h-48 md:max-h-56 object-contain rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full max-w-xs px-2 gap-2">
                                    <span className="font-gordita text-xs sm:text-sm text-[#3C2A1E]/80 truncate">
                                        📄 {proofFile.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="font-gordita text-xs sm:text-sm font-bold text-[#871417] hover:underline cursor-pointer flex items-center gap-1 shrink-0"
                                    >
                                        Hapus / Ganti
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Pesan Error */}
                        {errorMessage && (
                            <div className="bg-[#991A04]/10 border border-[#991A04]/40 text-[#871417] font-gordita text-xs sm:text-sm font-semibold py-1.5 px-4 rounded-xl flex items-center justify-center gap-2 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── TOMBOL AKSI ── */}
                <div className="w-full max-w-full sm:max-w-[420px] md:max-w-[480px] flex flex-col gap-3 sm:gap-4 mt-2 mb-6 px-4 sm:px-0">

                    <button
                        type="button"
                        onClick={handleConfirmPayment}
                        disabled={uploading || creatingOrder || (isExpired && !!currentOrder)}
                        className="group relative z-10 w-full min-h-[58px] sm:min-h-[66px] px-6 py-3 transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <div
                            className="absolute inset-0 rounded-md bg-[#991A04] border-[3px] border-[#FD2A05] pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2 font-swung tracking-wider text-xl sm:text-2xl md:text-3xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {(creatingOrder || uploading) && <Loader2 className="h-5 w-5 animate-spin" />}
                            {creatingOrder ? 'MEMPROSES...' : uploading ? 'MENGUNGGAH...' : 'CONFIRM PAYMENT'}
                        </span>
                    </button>

                    {/* Tombol BACK */}
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={creatingOrder || uploading}
                        className="group relative z-10 w-full min-h-[58px] sm:min-h-[66px] px-6 py-3 transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none cursor-pointer disabled:opacity-60"
                    >
                        <div
                            className="absolute inset-0 rounded-md bg-[#991A04] border-[3px] border-[#FD2A05] pointer-events-none"
                            style={{ filter: 'url(#rough-edge)' }}
                        />
                        <span className="relative z-10 block font-swung tracking-wider text-xl sm:text-2xl md:text-3xl text-[#FFFFFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            BACK
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
