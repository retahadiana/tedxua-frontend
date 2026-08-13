import React, { useState } from 'react'
import whatsOnPrevious from '@/assets/images/homepage/whats on previous.png'
import rumput from '@/assets/images/homepage/rumput.png'
import buttonVideo from '@/assets/images/homepage/button video.png'

/**
 * SECTION 4 — Previous Event
 * Memenuhi spesifikasi desain:
 * - Space kotak untuk video Google Drive (https://drive.google.com/file/d/1UVvqEce4wv-kI17p5VYVAn9-9ihuWHue/view?usp=drive_link)
 * - Video Google Drive dapat berjalan langsung di tampilan dengan rasio ukuran yang dipertahankan
 * - Tombol play "button video.png" diaktifkan sebagai pemicu gestur sentuh (User Activation) untuk pemutaran di iPad & Mobile
 * - Gambar "whats on previous.png" di bagian atas
 * - Gambar "rumput.png" di bagian bawah sendiri
 */
export default function PreviousEvent() {
    const gdriveFileId = '1UVvqEce4wv-kI17p5VYVAn9-9ihuWHue'
    const gdrivePreviewUrl = `https://drive.google.com/file/d/${gdriveFileId}/preview`
    const gdrivePosterUrl = `https://lh3.googleusercontent.com/u/0/d/${gdriveFileId}`

    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = (e) => {
        if (e) e.stopPropagation()
        setIsPlaying(true)
    }

    return (
        <section className="relative z-10 w-full bg-gradient-to-b from-transparent via-transparent via-25% via-[#444335] via-55% to-[#323124] pt-4 sm:pt-8 md:pt-24 pb-20 sm:pb-28 md:pb-40 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center justify-between">

            {/* Container Utama Konten */}
            <div className="relative z-20 mx-auto w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12 my-auto">

                {/* Gambar "Whats On Previous" */}
                <div className="flex justify-center w-full relative z-20 -mt-6 sm:-mt-10 md:-mt-14">
                    <img
                        src={whatsOnPrevious}
                        alt="What's On Previous TEDx Universitas Airlangga"
                        className="w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] select-none"
                    />
                </div>

                {/* Space Kotak Video GDrive (Rasio aspect-video dan Ukuran Tetap Dipertahankan) */}
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl aspect-video min-h-[240px] sm:min-h-[300px] md:min-h-[360px] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.8)] border border-white/15 relative z-30 bg-black/90 group pointer-events-auto touch-auto cursor-pointer" onClick={handlePlay}>
                    {isPlaying ? (
                        <iframe
                            src={`${gdrivePreviewUrl}?autoplay=1`}
                            title="TEDxUA Previous Event Video"
                            className="w-full h-full border-0 pointer-events-auto"
                            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation"
                        />
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center bg-black/70">
                            {/* Thumbnail Background Video */}
                            <img
                                src={gdrivePosterUrl}
                                alt="Video Preview Thumbnail"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                }}
                            />

                            {/* Overlay Gradasi Halus */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />

                            {/* Tombol Play Video (buttonVideo.png) */}
                            <button
                                type="button"
                                onClick={handlePlay}
                                aria-label="Play Previous Event Video"
                                className="relative z-10 flex items-center justify-center p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 group-hover:scale-110 group-hover:bg-black/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                            >
                                <img
                                    src={buttonVideo}
                                    alt="Play Video Button"
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
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
                className="pointer-events-none absolute -bottom-8 sm:-bottom-12 md:-bottom-20 lg:-bottom-28 left-0 z-10 w-full h-auto object-contain opacity-95 select-none"
            />
        </section>
    )
}