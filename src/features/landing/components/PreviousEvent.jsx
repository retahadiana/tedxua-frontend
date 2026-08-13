import React from 'react'
import whatsOnPrevious from '@/assets/images/homepage/whats on previous.png'
import rumput from '@/assets/images/homepage/rumput.png'

export default function PreviousEvent() {
    const gdriveVideoUrl = 'https://drive.google.com/file/d/1UVvqEce4wv-kI17p5VYVAn9-9ihuWHue/preview'

    return (
        <section className="relative z-10 w-full bg-gradient-to-b from-transparent via-transparent via-25% via-[#444335] via-55% to-[#323124] pt-4 sm:pt-8 md:pt-24 pb-20 sm:pb-28 md:pb-40 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center justify-between">
            {/* Container Utama Konten */}
            <div className="relative z-40 mx-auto w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12 my-auto">

                {/* Gambar "Whats On Previous" */}
                <div className="flex justify-center w-full relative z-20 -mt-6 sm:-mt-10 md:-mt-14 pointer-events-none">
                    <img
                        src={whatsOnPrevious}
                        alt="What's On Previous TEDx Universitas Airlangga"
                        className="w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                    />
                </div>

                {/* Space Kotak Video GDrive */}
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl aspect-video min-h-[260px] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.8)] border border-white/15 relative bg-black/80 group z-50 flex items-center justify-center">
                    <iframe
                        src={gdriveVideoUrl}
                        title="TEDxUA Previous Event Video"
                        className="absolute top-0 left-0 w-full h-full border-0 pointer-events-auto"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
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