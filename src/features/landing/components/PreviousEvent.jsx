import React from 'react'
import whatsOnPrevious from '@/assets/images/homepage/whats on previous.png'
import rumput from '@/assets/images/homepage/rumput.png'
import video from '@/assets/images/homepage/video.mp4'
// import buttonVideo from '@/assets/images/homepage/button video.png'

/**
 * SECTION 4 — Previous Event
 * Memenuhi spesifikasi desain:
 * - Space kotak untuk video Google Drive (https://drive.google.com/file/d/1UVvqEce4wv-kI17p5VYVAn9-9ihuWHue/view?usp=drive_link)
 * - Video Google Drive dapat berjalan langsung di tampilan dengan rasio ukuran yang dipertahankan
 * - Gambar "button video.png" di-comment
 * - Gambar "whats on previous.png" di bagian atas
 * - Gambar "rumput.png" di bagian bawah sendiri
 */
export default function PreviousEvent() {
    // Google Drive embed preview URL
    const gdriveVideoUrl = 'https://drive.google.com/file/d/1UVvqEce4wv-kI17p5VYVAn9-9ihuWHue/preview'

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

                {/* Space Kotak Video GDrive (Rasio aspect-video dan Ukuran Tetap Dipertahankan) */}
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.8)] border border-white/15 relative bg-black/80 group">
                    <iframe
                        src={gdriveVideoUrl}
                        title="TEDxUA Previous Event Video"
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />

                    {/* Commented Out: Tombol Play Video (buttonVideo) */}
                    {/* 
                    <button className="relative z-10 flex items-center justify-center">
                        <img src={buttonVideo} alt="Play Video Button" />
                    </button> 
                    */}
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