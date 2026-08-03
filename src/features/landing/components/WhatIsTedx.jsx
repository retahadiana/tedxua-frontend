import React from 'react'
import { motion } from 'framer-motion'
import about from '@/assets/images/homepage/about tedx.png'
import aboutua from '@/assets/images/homepage/about tedxua.png'
import mascot from '@/assets/images/homepage/mascot.png'
import akar6 from '@/assets/images/homepage/akar 6.png'
import abouttedxmobile from '@/assets/images/homepage/about tedx mobile.png'

/**
 * SECTION 3 — What is TEDx (About TEDx & About TEDxUA)
 * Memenuhi spesifikasi desain:
 * - Alur akar/gradasi dari seksi sebelumnya di bagian atas
 * - Gambar "about tedx.png" di bagian atas (memenuhi halaman)
 * - Gambar "about tedxua.png" di bagian bawah
 * - Gambar "mascot.png" muncul dari tepi kanan berjalan ke tempatnya saat scroll down
 * - Gambar "akar 6.png" di bagian bawah turun hingga masuk ke bagian atas section previous
 */
export default function WhatIsTedx() {
    return (
        <section className="relative z-10 min-h-fit md:min-h-screen w-full bg-gradient-to-b from-[#424132] via-[#3E3D2E] via-75% to-black pt-0 sm:pt-4 md:pt-24 pb-4 sm:pb-8 md:pb-36 px-4 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-between select-none overflow-x-clip">

            {/* 1. Akar 6 di bagian bawah section WhatIsTedx, diposisikan sedikit lebih ke bawah pada mobile */}
            <img
                src={akar6}
                alt="Akar 6 Background Bottom"
                className="pointer-events-none absolute inset-x-0 -bottom-12 sm:-bottom-16 md:top-auto md:-bottom-52 lg:-bottom-[280px] z-0 w-full h-auto object-cover object-bottom"
            />

            {/* Container Utama Konten (z-10 di depan akar 6) */}
            <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12">

                {/* TAMPILAN MOBILE (< md): Hanya panggil `abouttedxmobile`, gambar desktop dihilangkan — Diposisikan sedikit ke bawah */}
                <div className="flex md:hidden justify-center w-full mt-4 sm:mt-6 md:mt-0">
                    <img
                        src={abouttedxmobile}
                        alt="About TEDx & TEDxUniversitas Airlangga Mobile"
                        className="w-full max-w-md sm:max-w-xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                    />
                </div>

                {/* TAMPILAN DESKTOP (≥ md): Panggil `about`, `aboutua`, dan `mascot` (Tetap 100% seperti semula) */}
                <div className="hidden md:flex flex-col items-center gap-8 md:gap-12 w-full">
                    {/* 2. Bagian Atas: Gambar About TEDx */}
                    <div className="flex justify-center w-full">
                        <img
                            src={about}
                            alt="About TEDx"
                            className="w-full max-w-3xl md:max-w-4xl lg:max-w-4xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] [clip-path:inset(0_0_6px_0)]"
                        />
                    </div>

                    {/* 3. Bagian Bawah: Gambar About TEDxUA dengan Mascot Menimpa Space Kosong di Kanan */}
                    <div className="relative flex justify-center w-full max-w-3xl md:max-w-4xl lg:max-w-4xl">
                        {/* Gambar About TEDxUA */}
                        <img
                            src={aboutua}
                            alt="About TEDx Universitas Airlangga"
                            className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                        />

                        {/* Mascot dengan Animasi Muncul Berjalan dari Tepi Kanan (Sangat Pelan) saat Scroll Down */}
                        <motion.div
                            initial={{ x: '140%', opacity: 0, rotate: 5 }}
                            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 8.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="absolute right-[-4%] sm:right-[-3%] md:right-[-2%] lg:right-[-1%] top-[-10%] sm:top-[-8%] md:top-[-6%] lg:top-[-4%] z-20 flex items-center justify-center pointer-events-none"
                        >
                            {/* Glow halus di belakang Mascot */}
                            <div className="pointer-events-none absolute h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] md:h-[160px] md:w-[160px] rounded-full bg-[#FFE8B2]/30 blur-[30px]" />

                            <img
                                src={mascot}
                                alt="Mascot TEDxUA"
                                className="relative z-10 h-[85px] sm:h-[120px] md:h-[155px] lg:h-[185px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
