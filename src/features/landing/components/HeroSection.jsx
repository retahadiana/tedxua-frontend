import React from 'react'
import akar1 from '@/assets/images/homepage/akar 1.webp'
import akar2 from '@/assets/images/homepage/akar 2.webp'
import tedxUnair from '@/assets/images/homepage/tedx unair.webp'

/**
 * SECTION 1 — Hero
 * Urutan Layer:
 * 1. (z-0) Warna dark green dengan layer blur (blob dekoratif)
 * 2. (z-10) Akar 1 (Akar 1.png) - Background akar
 * 3. (z-20) TEDx Unair (tedx unair.webp) - Gambar logo/teks utama
 * 4. (z-30) Akar 2 (akar 2.webp) - Foreground overlay (dimulai dari area gambar TEDx Unair)
 */
export default function HeroSection() {
    return (
        <section className="relative flex min-h-[35vh] sm:min-h-[55vh] md:min-h-[140vh] w-full flex-col items-center justify-center bg-[#0A0A0A] pt-16 sm:pt-24 md:pt-32 pb-6 sm:pb-12 md:pb-64 overflow-x-clip">
            {/* 1. LAYER 1: Warna dark green dengan layer blur */}
            <div
                className="pointer-events-none absolute left-[-5%] top-[35%] z-0 h-[180px] sm:h-[280px] md:h-[400px] w-[95%] -rotate-[7deg]
                   rounded-full bg-[#16220E] blur-[50px] sm:blur-[70px] md:blur-[100px]"
            />
            <div
                className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[240px] w-[240px] sm:h-[400px] sm:w-[400px] md:h-[600px] md:w-[600px] -translate-x-1/2 -translate-y-1/2 
                   rounded-full bg-[#1A3A25]/70 blur-[70px] sm:blur-[90px] md:blur-[130px]"
            />

            {/* 2. LAYER 2: Akar 1 (Akar 1.png) */}
            <img
                src={akar1}
                alt="Akar 1 Background"
                className="absolute inset-x-0 top-0 z-10 h-full w-full object-cover opacity-85 pointer-events-none"
            />

            {/* 3. LAYER 3: TEDx Unair (tedx unair.webp) — Diperbesar Pas di HP (tidak mepet tepi), Desktop (md:) Tetap 100% */}
            <div className="relative z-20 flex w-full max-w-7xl flex-col items-center px-4 sm:px-8 md:px-24 lg:px-32 text-center my-auto">
                <img
                    src={tedxUnair}
                    alt="TEDx Universitas Airlangga"
                    className="h-auto w-[86%] sm:w-[90%] md:w-full md:max-w-4xl object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />
            </div>

            {/* 4. LAYER 4 (Paling Depan): Akar 2 (akar 2.webp) — Disesuaikan Kebawah Sedikit Lagi di HP, Desktop (md:) Tetap 100% */}
            <img
                src={akar2}
                alt="Akar 2 Foreground"
                className="pointer-events-none absolute top-[31%] sm:top-[36%] md:top-[23%] lg:top-[23%] inset-x-0 z-30 h-[120%] sm:h-[130%] md:h-full w-full object-cover object-top opacity-100"
            />

            {/* 5. Gradasi warna hijau ke coklat gelap di paling bawah */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-35 h-32 sm:h-48 md:h-96 bg-gradient-to-b from-transparent via-[#142617]/70 to-[#1E130B]" />
        </section>
    )
}