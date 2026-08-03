import React from 'react'
import grandtheme from '@/assets/images/homepage/grandtheme.png'
import maintheme from '@/assets/images/homepage/main theme.png'

/**
 * SECTION 5 — Grand Theme: "Beneath What We See — The Mycelium"
 * - Background coklat gradasi ke coklat-hitam
 * - Gambar "grandtheme.png" diperkecil ~50% di atas
 * - Gambar "main theme.png" diperlebar penuh di bawahnya, pepet ke atas
 * - Dua paragraf sejajar kiri-kanan, dirapatkan ke gambar
 */
export default function GrandThemeMycelium() {
    return (
        <section className="relative w-full bg-gradient-to-b from-[#1C120C] via-[#140D08] to-[#0A0604] pt-4 sm:pt-12 md:pt-44 pb-20 sm:pb-28 md:pb-40 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center select-none overflow-x-clip">

            {/* Soft background radial glow */}
            <div className="pointer-events-none absolute top-1/3 left-1/2 z-0 h-[450px] w-[450px] md:h-[650px] md:w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE8B2]/15 blur-[130px]" />

            {/* Container Utama Konten */}
            <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center">

                {/* 1. Gambar Grand Theme Wordmark — Diposisikan sedikit lebih ke bawah pada mobile */}
                <div className="flex justify-center w-full mt-8 sm:mt-10 md:mt-0">
                    <img
                        src={grandtheme}
                        alt="Grand Theme - Beneath What We See The Mycelium"
                        className="w-full max-w-xs sm:max-w-md md:max-w-xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                    />
                </div>

                {/* 2. Gambar Main Theme Visual — Diposisikan mepet di bawah grandtheme pada mobile */}
                <div className="flex justify-center w-full -mt-6 sm:-mt-8 md:-mt-52">
                    <img
                        src={maintheme}
                        alt="Main Theme Mycelium Illustration"
                        className="w-full max-w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                    />
                </div>

                {/* 3. Dua Paragraf Deskripsi — Diposisikan mepet di bawah maintheme pada mobile */}
                <div className="w-full max-w-5xl md:max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 sm:gap-6 md:gap-14 -mt-10 sm:-mt-14 md:-mt-40 font-essays text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[#F6EBE7] text-justify drop-shadow-md">
                    {/* Paragraf Kiri */}
                    <div className="flex-1">
                        <p>
                            Far beneath the surface, long before a single flower blooms, a network of mycelium is already at work, unseen, unlit, and uncelebrated. Nothing above ground exists without what moves below it. Though often overlooked, the largest change is rarely born in the spotlight. It is born in silence, in roles unnamed, in effort no one thought to trace back to its source.
                        </p>
                    </div>

                    {/* Paragraf Kanan */}
                    <div className="flex-1">
                        <p>
                            This theme is an invitation to look beyond the surface, to notice that every individual carries a role, that every action leaves a trace, that meaningful change grows slowly from roots no one applauds. It is a reminder that true contribution is not always visible. But it is always felt, in what stands, in what holds, in what keeps quietly growing long after the credit has gone somewhere else.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
