import React from 'react'
import { Link } from 'react-router-dom'
import subtheme1Img from '@/assets/images/homepage/Subtheme card 1.webp'
import subtheme2Img from '@/assets/images/homepage/Subtheme card 2.webp'
import subtheme3Img from '@/assets/images/homepage/Subtheme card 3.webp'

/*
 * UNCOMMENT / DE-COMMAND DI BAWAH INI JIKA GAMBAR SUDAH SIAP DIMAUKAN:
 * import subtheme1Img from '@/assets/images/homepage/subtheme1.png'
 * import subtheme2Img from '@/assets/images/homepage/subtheme2.png'
 * import subtheme3Img from '@/assets/images/homepage/subtheme3.png'
 */

/**
 * Component Placeholder untuk Kartu Subtheme (Putih Rotated)
 */
function SubthemeCard({ rotate = 0, imgSrc = null }) {
    return (
        <div
            className="aspect-[572/882] w-28 sm:w-36 md:w-52 lg:w-56 shrink-0"
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <div className="w-full h-full rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt="Subtheme Card"
                        className="h-full w-full object-cover rounded-2xl block"
                    />
                ) : (
                    /* Placeholder Putih Polos (Nanti diganti dengan image props) */
                    <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center" />
                )}
            </div>
        </div>
    )
}

export default function Subthemes() {
    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1C120C] to-[#2E1C10] pt-4 sm:pt-8 md:pt-16 pb-12 sm:pb-16 md:pb-20 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-between select-none overflow-x-clip">

            {/* Header: "SUBTHEME —" di Pojok Kanan Atas */}
            <div className="w-full max-w-7xl mx-auto flex justify-end items-center gap-3">
                <div className="flex items-center gap-1 font-swung tracking-wider">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-black text-[#D7E36C] drop-shadow-[0_0_20px_rgba(215,227,108,0.4)]">
                        S
                    </span>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#A8BA82] tracking-widest mt-2">
                        UBTHEME
                    </span>
                </div>
                {/* Horizontal accent bar di samping tulisan */}
                <div className="h-4 sm:h-5 md:h-6 w-16 sm:w-24 md:w-32 rounded-sm bg-gradient-to-r from-[#7D6B3E] via-[#503E22] to-transparent mt-2" />
            </div>

            {/* Area Utama: 3 Subthemes Staggered */}
            <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 md:my-4 mb-4 flex flex-col">

                {/* 1. Subtheme 1 (Top Left: Kartu miring kiri, Teks di kanan dengan Hover Background Hijau Transparan ke Solid & Font Membesar) */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-6 z-10">
                    <SubthemeCard rotate={-12} imgSrc={subtheme1Img} />

                    <div className="group cursor-pointer flex flex-col font-swung text-white tracking-wide mt-2 text-center md:text-left">
                        {/* Line 1: THE + GARDENERS (Hover background hijau & font membesar) */}
                        <div className="flex items-baseline justify-center md:justify-start text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold gap-2 sm:gap-3">
                            <span><span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">T</span>HE</span>

                            <span className="relative inline-block overflow-hidden pl-2 pr-5 sm:pr-7 md:pr-9 py-1">
                                <span className="absolute inset-0 bg-gradient-to-b from-[#1F461F]/30 via-[#2D612D]/70 to-[#3B773A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:scale-105 origin-left">
                                    <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">G</span>ARDENERS
                                </span>
                            </span>
                        </div>

                        {/* Line 2: OF */}
                        <div className="text-xl sm:text-2xl md:text-4xl font-bold tracking-widest ml-0 md:ml-20 text-[#DFE7C7]">
                            OF
                        </div>

                        {/* Line 3: BECOMING (Hover background hijau & font membesar) */}
                        <div className="flex items-baseline justify-center md:justify-start text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold ml-0 md:ml-16">
                            <span className="relative inline-block overflow-hidden pl-2 pr-5 sm:pr-7 md:pr-9 py-1">
                                <span className="absolute inset-0 bg-gradient-to-b from-[#1F461F]/30 via-[#2D612D]/70 to-[#3B773A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:scale-105 origin-left">
                                    <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">B</span>ECOMING
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Subtheme 2 (Center Right: Kartu miring kanan, Teks di kiri dengan Hover Background Oren Transparan ke Solid & Font Membesar) */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-6 sm:gap-8 md:gap-6 mt-10 sm:mt-14 md:-mt-16 z-20">
                    <div className="group cursor-pointer flex flex-col font-swung text-white tracking-wide text-center md:text-left mt-2">
                        {/* Line 1: THE + INVISIBLE (Hover background oren & font membesar) */}
                        <div className="flex items-baseline justify-center md:justify-start text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold gap-2 sm:gap-3">
                            <span><span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">T</span>HE</span>

                            <span className="relative inline-block overflow-hidden pl-2 pr-5 sm:pr-7 md:pr-9 py-1">
                                <span className="absolute inset-0 bg-gradient-to-b from-[#B8450A]/30 via-[#D05813]/70 to-[#E86B1A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:scale-105 origin-left">
                                    <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">I</span>NVISIBLE
                                </span>
                            </span>
                        </div>

                        {/* Line 2: STRING */}
                        <div className="flex items-baseline justify-center md:justify-start text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold ml-0 md:ml-24">
                            <span className="relative inline-block overflow-hidden pl-2 pr-5 sm:pr-7 md:pr-9 py-1">
                                <span className="absolute inset-0 bg-gradient-to-b from-[#B8450A]/30 via-[#D05813]/70 to-[#E86B1A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:scale-105 origin-left">
                                    <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">S</span>TRING
                                </span>
                            </span>
                        </div>
                    </div>

                    <SubthemeCard rotate={12} imgSrc={subtheme2Img} />
                </div>

                {/* 3. Subtheme 3 (Bottom Left: Kartu miring kanan, Teks di kanan dengan Hover Background Oren & Font Abu-abu + Membesar) */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-6 mt-10 sm:mt-14 md:mt-6 z-30">
                    <SubthemeCard rotate={10} imgSrc={subtheme3Img} />

                    <div className="group cursor-pointer flex flex-col font-swung text-white tracking-wide mt-2 text-center md:text-left ml-0 md:ml-10 lg:ml-16">
                        {/* Line 1: THE SLOW */}
                        <div className="flex items-baseline justify-center md:justify-start text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold gap-2 sm:gap-3">
                            <span><span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">T</span>HE</span>

                            <span className="relative inline-block overflow-hidden pl-2 pr-5 sm:pr-7 md:pr-9 py-1">
                                <span className="absolute inset-0 bg-gradient-to-b from-[#E86B1A]/30 via-[#D05813]/70 to-[#B8450A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 inline-block transition-all duration-300 ease-out group-hover:scale-105 group-hover:text-[#2A2A2A] origin-left">
                                    <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">S</span>LOW
                                </span>
                            </span>
                        </div>

                        {/* Line 2: UNFOLDING (Hover background oren & font abu-abu + membesar) */}
                        <div className="flex items-baseline justify-center md:justify-start text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold ml-0 md:ml-14 mt-1">
                            <span className="relative inline-block overflow-hidden pl-2 pr-5 sm:pr-7 md:pr-9 py-1">
                                <span className="absolute inset-0 bg-gradient-to-b from-[#E86B1A]/30 via-[#D05813]/70 to-[#B8450A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                                <span className="relative z-10 inline-block transition-all duration-300 ease-out group-hover:scale-105 group-hover:text-[#2A2A2A] origin-left">
                                    <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black">U</span>NFOLDING
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Nav Bar: Progress Bar Gradient + Tombol "Get To Know More" (Pepet & Gradient Dissolve dari Background) */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-end gap-3 sm:gap-4 pt-6 border-t border-white/5">
                {/* Horizontal Progress Bar Gradient (Dissolve dari warna background ke hijau sage, pepet ke tombol) */}
                <div className="h-4 sm:h-5 flex-1 max-w-2xl sm:max-w-3xl md:max-w-4xl bg-gradient-to-r from-transparent via-[#546043]/60 to-[#8A9B74] shadow-inner" />

                {/* Tombol "Get To Know More →" */}
                <Link
                    to="/about/theme"
                    className="flex shrink-0 items-center gap-2 rounded-full border border-[#85745F]/60 bg-gradient-to-r from-[#4A3827] via-[#73684B] to-[#7E5738] px-5 sm:px-6 py-2 font-essays text-sm sm:text-base font-semibold text-[#F6EBE7] shadow-lg transition-all duration-300 hover:scale-105"
                >
                    <span>Get To Know More</span>
                    <span className="text-lg leading-none">→</span>
                </Link>
            </div>
        </section>
    )
}