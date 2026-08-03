import React, { useState } from 'react'
import whatsOnPrevious from '@/assets/images/homepage/whats on previous.png'
import rumput from '@/assets/images/homepage/rumput.png'
import buttonVideo from '@/assets/images/homepage/button video.png'

/**
 * SECTION 4 — Previous Event
 * Memenuhi spesifikasi desain:
 * - Space kotak untuk video YouTube (https://youtu.be/c3lerC_9C4w?si=g5O4De18sBiSrMtw)
 * - Gambar "button video.png" sebagai tombol play interaktif dengan efek hover timbul ke depan & membesar
 * - Gambar "whats on previous.png" di bagian atas
 * - Gambar "rumput.png" di bagian bawah sendiri
 */
export default function PreviousEvent() {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoId = 'c3lerC_9C4w'

    return (
        <section className="relative z-10 w-full bg-gradient-to-b from-transparent via-transparent via-25% via-[#444335] via-55% to-[#323124] pt-4 sm:pt-8 md:pt-24 pb-20 sm:pb-28 md:pb-40 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center justify-between select-none">

            {/* Container Utama Konten */}
            <div className="relative z-20 mx-auto w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12 my-auto">

                {/* Gambar "Whats On Previous" */}
                <div className="flex justify-center w-full relative z-20 -mt-6 sm:-mt-10 md:-mt-14">
                    <img
                        src={whatsOnPrevious}
                        alt="What's On Previous TEDx Universitas Airlangga"
                        className="w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                    />
                </div>

                {/* Space Kotak Video Youtube (Ukuran Sedang Pas) */}
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.8)] border border-white/15 relative bg-black/80 group">
                    {isPlaying ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title="TEDxUA Previous Event Video"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Thumbnail Youtube Background */}
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                alt="Video Thumbnail"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay Dark Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />

                            {/* Tombol Play Video (buttonVideo) dengan Efek Hover Timbul Ke Depan & Membesar */}
                            <button
                                onClick={() => setIsPlaying(true)}
                                aria-label="Play YouTube Video"
                                className="relative z-10 flex items-center justify-center group/btn focus:outline-none transition-all duration-300 transform hover:scale-115 sm:hover:scale-125 hover:-translate-y-2 active:scale-95 cursor-pointer"
                            >
                                {/* Glow backdrop saat hover */}
                                <div className="pointer-events-none absolute h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 rounded-full bg-[#FFE8B2]/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                                <img
                                    src={buttonVideo}
                                    alt="Play Video Button"
                                    className="w-20 sm:w-28 md:w-36 lg:w-44 h-auto object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover/btn:drop-shadow-[0_22px_35px_rgba(0,0,0,0.95)]"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Gambar Rumput di Paling Bawah */}
            <img
                src={rumput}
                alt="Rumput Overlay Bottom"
                className="pointer-events-none absolute -bottom-8 sm:-bottom-12 md:-bottom-20 lg:-bottom-28 left-0 z-30 w-full h-auto object-contain opacity-95"
            />
        </section>
    )
}