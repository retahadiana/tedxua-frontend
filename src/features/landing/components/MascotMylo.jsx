import React from 'react'
import akar3 from '@/assets/images/homepage/akar 3.png'
import akar4 from '@/assets/images/homepage/akar 4.png'
import jamur1 from '@/assets/images/homepage/jamur 1.png'
import jamur2 from '@/assets/images/homepage/jamur 2.png'
import mylogif from '@/assets/images/homepage/Mylo.gif'

/**
 * SECTION 2 — Mascot Mylo
 * Memenuhi spesifikasi presisi:
 * - Seamless transition tanpa perbedaan warna kasar dari Hero Section
 * - Akar 4 paling belakang posisi agak bawah
 * - Ellipse glow lebih besar & bernuansa keemasan/kuning hangat (#FFE8B2/25 blur-[140px])
 * - Akar 3 diperkecil pas di belakang kepala/badan Mylo
 * - Font "Hi, I'm MYLO" sedikit diperkecil & diposisikan rapi
 * - Mylo.gif di tengah container persis di samping font dengan ukuran diperkecil
 * - Paragraf deskripsi agak digeser ke kiri
 * - Jamur 1 & 2 diperkecil & menempel pas di garis tepi paling luar
 */
export default function MascotMylo() {
    return (
        <section className="relative z-20 min-h-fit md:min-h-screen w-full bg-gradient-to-b from-[#1E130B] via-[#2D2419] to-[#424132] pt-20 sm:pt-32 md:pt-44 pb-6 sm:pb-12 md:pb-20 flex flex-col justify-start md:justify-between select-none">
            {/* 1. Akar 4 — Diposisikan di Belakang Mobile (diposisikan lebih ke bawah), Desktop (md:) Tetap 100% */}
            <img
                src={akar4}
                alt="Akar Background Bottom"
                className="pointer-events-none absolute top-[40%] sm:top-[45%] md:top-auto md:-bottom-[900px] lg:-bottom-[950px] inset-x-0 z-10 w-full h-auto object-contain opacity-35 sm:opacity-40 md:opacity-40 scale-125 sm:scale-110 md:scale-100"
            />

            {/* Container Konten Utama */}
            <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-12 md:px-16 lg:px-24 flex-1 flex flex-col justify-start md:justify-between">

                {/* Area Atas: Mascot GIF (Atas di Mobile) + Wordmark Text (Bawah di Mobile) */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 mt-4 sm:mt-8 md:mt-24">

                    {/* Mascot Mylo GIF & Akar 3 — Order 1 di Mobile (di atas font), Order 2 di Desktop */}
                    <div className="order-1 md:order-2 relative flex items-center justify-center z-30 my-2 md:my-0 ml-0 md:ml-4">
                        {/* Ellipse Glow bersinar tepat di belakang Mylo.gif */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] sm:h-[400px] sm:w-[400px] md:h-[800px] md:w-[800px] lg:h-[900px] lg:w-[900px] rounded-full bg-[#FFDF6D]/45 blur-[80px] sm:blur-[120px] z-0" />

                        {/* Akar 3 — Pas di Belakang Mylo.gif */}
                        <img
                            src={akar3}
                            alt="Akar Behind Mylo"
                            className="pointer-events-none absolute z-10 w-[280px] sm:w-[330px] md:w-[390px] h-auto object-contain opacity-35 sm:opacity-50 md:opacity-90"
                        />

                        {/* Mylo GIF */}
                        <img
                            src={mylogif}
                            alt="Mylo Mascot"
                            className="relative z-50 h-[190px] sm:h-[280px] md:h-[400px] lg:h-[430px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                        />
                    </div>

                    {/* Teks "Hi, I'm MYLO" — Order 2 & RATA KIRI (Agak di Kekanankan sikit pl-6) di Mobile, Order 1 di Desktop */}
                    <div className="order-2 md:order-1 flex flex-col items-start text-left w-full md:w-auto pl-6 sm:pl-10 md:pl-0 z-20 mt-1 md:mt-0">
                        <span className="font-essays text-2xl sm:text-3xl md:text-5xl font-bold text-[#F6EBE7] tracking-wider drop-shadow-md">
                            Hi, I&apos;m
                        </span>
                        <h1 className="font-swung text-[68px] sm:text-[105px] md:text-[160px] lg:text-[190px] leading-[0.85] text-[#F6EBE7] tracking-wide drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] -mt-1 md:-mt-2">
                            MYLO
                        </h1>
                    </div>
                </div>

                {/* Area Bawah: Paragraf Deskripsi — Ukuran sedikit diperbesar, posisi tetap */}
                <div className="flex justify-center md:justify-end mt-6 sm:mt-10 md:mt-16 mb-4 sm:mb-6 z-30 mr-0 md:mr-12 lg:mr-16">
                    <div className="max-w-md sm:max-w-xl md:max-w-2xl text-center md:text-right font-essays text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-[#F6EBE7] drop-shadow-lg px-2 sm:px-0">
                        <p>
                            I began as something unseen — quiet, unfinished, and easy to overlook. But like every small thing that eventually takes root, I&apos;m here now to guide you through{' '}
                            <span className="font-bold text-[#FF2B06] drop-shadow-[0_0_20px_rgba(255,43,6,0.8)]">
                                TEDxUniversitas Airlangga
                            </span>{' '}
                            2026, one step at a time.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Jamur 1 — Dihilangkan Khusus di Mobile (hidden md:block) */}
            <img
                src={jamur1}
                alt="Jamur Kiri"
                className="pointer-events-none absolute bottom-0 -left-2 sm:-left-4 md:-left-8 lg:-left-10 z-40 w-20 sm:w-28 md:w-48 lg:w-52 h-auto object-contain drop-shadow-xl hidden md:block"
            />

            {/* 4. Jamur 2 — Dihilangkan Khusus di Mobile (hidden md:block) */}
            <img
                src={jamur2}
                alt="Jamur Kanan"
                className="pointer-events-none absolute bottom-0 -right-2 sm:-right-4 md:-right-8 lg:-right-10 z-40 w-24 sm:w-32 md:w-52 lg:w-56 h-auto object-contain drop-shadow-xl hidden md:block"
            />
        </section>
    )
}


