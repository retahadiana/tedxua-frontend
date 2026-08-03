import React, { useState } from 'react'
import buttonArrowKanan from '@/assets/images/homepage/button arrow kanan.png'
import buttonArrowKiri from '@/assets/images/homepage/button arrow kiri.png'

/**
 * SECTION 7 — Subtheme Carousel
 * - Lebar jarak atas & bawah diperbesar (py-28 sm:py-36 md:py-48)
 * - Animasi bergeser fisik ke tengah (translateX + scale) saat tombol ditekan
 * - Kartu bersinar (glowing shadow) dengan kartu aktif di tengah
 */
const CARDS = [1, 2, 3, 4, 5]

export default function SubthemeCarousel() {
    const [activeIndex, setActiveIndex] = useState(2)

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? CARDS.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === CARDS.length - 1 ? 0 : prev + 1))
    }

    return (
        <section className="relative w-full overflow-x-clip pt-4 sm:pt-8 md:pt-24 pb-10 sm:pb-14 md:pb-24 bg-gradient-to-b from-[#2E1C10] via-[#22140A] to-[#1A100B] select-none flex flex-col items-center justify-center">

            {/* Soft Radial Glow di tengah section */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] md:h-[900px] md:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE8B2]/15 blur-[140px]" />

            {/* Container Carousel */}
            <div className="relative z-10 w-full max-w-7xl px-4 flex items-center justify-center min-h-[280px] sm:min-h-[360px] md:min-h-[440px]">

                {/* 5 Cards Sliding Track — Fisik bergeser & mekar ke tengah */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {CARDS.map((card, i) => {
                        let offset = i - activeIndex

                        // Cyclical offset wrapping untuk 5 kartu
                        if (offset < -2) offset += CARDS.length
                        if (offset > 2) offset -= CARDS.length

                        const isCenter = offset === 0
                        const isAdjacent = Math.abs(offset) === 1

                        return (
                            <div
                                key={card}
                                onClick={() => setActiveIndex(i)}
                                className={`absolute aspect-[3/4.2] rounded-2xl md:rounded-3xl bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${isCenter
                                        ? 'w-28 sm:w-40 md:w-52 lg:w-60 z-30 shadow-[0_0_70px_rgba(255,230,140,0.7)] border-2 border-[#FFE8B2]/50 opacity-100'
                                        : isAdjacent
                                            ? 'w-24 sm:w-32 md:w-44 lg:w-52 z-20 shadow-[0_0_40px_rgba(255,220,130,0.4)] opacity-85 hover:opacity-100'
                                            : 'w-20 sm:w-28 md:w-36 lg:w-40 z-10 shadow-[0_0_25px_rgba(255,220,130,0.2)] opacity-60 hover:opacity-85 hidden sm:flex'
                                    }`}
                                style={{
                                    // translateX % dihitung per level agar jarak visual antar kartu setara
                                    // offset ±1: 115%, offset ±2: 258% (berbasis lebar kartu masing-masing)
                                    transform: `translateX(${offset === 0 ? '0' :
                                            Math.abs(offset) === 1 ? `${offset < 0 ? '-' : ''}115%` :
                                                `${offset < 0 ? '-' : ''}258%`
                                        }) scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})`,
                                }}
                            >
                                {/* Placeholder Putih Polos (Siap diisi gambar) */}
                            </div>
                        )
                    })}
                </div>

                {/* Left Arrow Button */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Sebelumnya"
                    className="absolute z-40 p-2 right-[calc(50%+3.3rem)] sm:right-[calc(50%+4.6rem)] md:right-[calc(50%+6rem)] lg:right-[calc(50%+6.8rem)] transition-transform duration-300 hover:scale-125 active:scale-95 focus:outline-none"
                >
                    <img
                        src={buttonArrowKiri}
                        alt="Tombol Kiri"
                        className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
                    />
                </button>

                {/* Right Arrow Button */}
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Selanjutnya"
                    className="absolute z-40 p-2 left-[calc(50%+3.3rem)] sm:left-[calc(50%+4.6rem)] md:left-[calc(50%+6rem)] lg:left-[calc(50%+6.8rem)] transition-transform duration-300 hover:scale-125 active:scale-95 focus:outline-none"
                >
                    <img
                        src={buttonArrowKanan}
                        alt="Tombol Kanan"
                        className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
                    />
                </button>

            </div>
        </section>
    )
}