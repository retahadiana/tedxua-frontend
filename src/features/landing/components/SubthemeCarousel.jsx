import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import buttonArrowKanan from '@/assets/images/homepage/button arrow kanan.webp'
import buttonArrowKiri from '@/assets/images/homepage/button arrow kiri.webp'
import cardpe1 from '@/assets/images/homepage/card pe1.webp'
import cardpe2 from '@/assets/images/homepage/card pe2.webp'
import comson from '@/assets/images/homepage/card comson.webp'

/**
 * SECTION 7 — Subtheme Carousel
 * - Lebar jarak atas & bawah diperbesar (py-28 sm:py-36 md:py-48)
 * - Animasi bergeser fisik ke tengah (translateX + scale) saat tombol ditekan
 * - Kartu bersinar (glowing shadow) dengan kartu aktif di tengah
 * - Klik card aktif (center) → navigasi ke halaman event terkait
 */
const CARDS = [
    { id: 1, image: comson, alt: 'Card Comson 1', route: '/coming-soon' },
    { id: 2, image: comson, alt: 'Card Comson 2', route: '/coming-soon' },
    { id: 3, image: cardpe1, alt: 'Card PE 1', route: '/events/pre-event-1' },
    { id: 4, image: cardpe2, alt: 'Card PE 2', route: '/coming-soon' },
    { id: 5, image: comson, alt: 'Card Comson 3', route: '/coming-soon' },
]

export default function SubthemeCarousel() {
    const [activeIndex, setActiveIndex] = useState(2)
    const navigate = useNavigate()

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? CARDS.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === CARDS.length - 1 ? 0 : prev + 1))
    }

    const handleCardClick = (i) => {
        if (i === activeIndex) {
            // Card sudah aktif di tengah → navigasi ke halaman event
            navigate(CARDS[i].route)
        } else {
            // Card belum aktif → geser ke tengah dulu
            setActiveIndex(i)
        }
    }

    return (
        <section className="relative w-full overflow-x-clip pt-4 sm:pt-8 md:pt-24 pb-10 sm:pb-14 md:pb-24 bg-gradient-to-b from-[#2E1C10] via-[#22140A] to-[#1A100B] select-none flex flex-col items-center justify-center">

            {/* Soft Radial Glow di tengah section */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] md:h-[900px] md:w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE8B2]/15 blur-[140px]" />

            {/* Container Carousel */}
            <div className="relative z-10 w-full max-w-7xl px-4 flex items-center justify-center min-h-[340px] sm:min-h-[460px] md:min-h-[580px]">

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
                                key={card.id}
                                onClick={() => handleCardClick(i)}
                                title={isCenter ? `Buka ${card.alt}` : 'Klik untuk pilih'}
                                className={`absolute aspect-[1262/1746] rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center overflow-hidden ${isCenter
                                    ? 'w-40 sm:w-56 md:w-[310px] lg:w-[350px] z-30 opacity-100'
                                    : isAdjacent
                                        ? 'w-32 sm:w-44 md:w-[250px] lg:w-[290px] z-20 opacity-85 hover:opacity-100'
                                        : 'w-28 sm:w-36 md:w-[200px] lg:w-[230px] z-10 opacity-60 hover:opacity-85 hidden sm:flex'
                                    }`}
                                style={{
                                    // translateX % dihitung lebih dekat antar kartu (offset ±1: 85%, offset ±2: 180%)
                                    transform: `translateX(${offset === 0 ? '0' :
                                        Math.abs(offset) === 1 ? `${offset < 0 ? '-' : ''}85%` :
                                            `${offset < 0 ? '-' : ''}180%`
                                        }) scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})`,
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.alt}
                                    className="w-full h-full object-cover rounded-2xl md:rounded-3xl block"
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Left Arrow Button */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Sebelumnya"
                    className="absolute z-40 p-2 right-[calc(50%+3.2rem)] sm:right-[calc(50%+4.4rem)] md:right-[calc(50%+6.2rem)] lg:right-[calc(50%+7.2rem)] transition-transform duration-300 hover:scale-125 active:scale-95 focus:outline-none"
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
                    className="absolute z-40 p-2 left-[calc(50%+3.2rem)] sm:left-[calc(50%+4.4rem)] md:left-[calc(50%+6.2rem)] lg:left-[calc(50%+7.2rem)] transition-transform duration-300 hover:scale-125 active:scale-95 focus:outline-none"
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