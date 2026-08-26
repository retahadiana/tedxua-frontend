import React, { useState, useEffect, useRef } from 'react'
import whatsOnPrevious from '@/assets/images/homepage/whats on previous.png'
import rumput from '@/assets/images/homepage/rumput.png'
import buttonVideo from '@/assets/images/homepage/button video.png'

/**
 * SECTION 4 — Previous Event
 * Memenuhi spesifikasi desain:
 * - Space kotak untuk video YouTube
 * - Video YouTube dapat berjalan langsung di tampilan dengan rasio ukuran yang dipertahankan
 * - Tombol play "button video.png" diaktifkan sebagai pemicu gestur sentuh (User Activation) untuk pemutaran di iPad & Mobile
 * - Gambar "whats on previous.png" di bagian atas
 * - Gambar "rumput.png" di bagian bawah sendiri
 */
export default function PreviousEvent() {
    const youtubeVideoId = 'X4jI0yXn_0k'
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}`
    const youtubePosterUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef(null)

    // Fitur Intersection Observer untuk Autoplay saat di-scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsPlaying(true)
                    setIsMuted(true) // Autoplay via scroll selalu dimulai dengan bisu (muted)
                    observer.disconnect() // Hentikan observasi setelah video dimainkan
                }
            },
            { threshold: 0.5 } // Memicu autoplay saat 50% area kotak video sudah terlihat di layar
        )

        if (videoRef.current) {
            observer.observe(videoRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handlePlay = (e) => {
        if (e) e.stopPropagation()
        setIsPlaying(true)
        setIsMuted(false) // Jika ditekan manual dari awal, langsung putar dengan suara
    }

    return (
        <section className="relative z-10 w-full bg-gradient-to-b from-transparent via-transparent via-25% via-[#444335] via-55% to-[#323124] pt-4 sm:pt-8 md:pt-24 pb-20 sm:pb-28 md:pb-40 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center justify-between">
            {/* Container Utama Konten */}
            <div className="relative z-40 mx-auto w-full max-w-7xl flex flex-col items-center gap-8 md:gap-12 my-auto">

                {/* Gambar "Whats On Previous" */}
                <div className="flex justify-center w-full relative z-20 -mt-6 sm:-mt-10 md:-mt-14 pointer-events-none">
                    <img
                        src={whatsOnPrevious}
                        alt="What's On Previous TEDx Universitas Airlangga"
                        className="w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] select-none"
                    />
                </div>

                {/* Space Kotak Video YouTube (Rasio aspect-video yang Sangat Responsif) */}
                <div 
                    ref={videoRef}
                    className="w-full max-w-3xl mx-auto aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.8)] border border-white/15 relative z-30 bg-black/90 group pointer-events-auto touch-auto cursor-pointer" 
                    onClick={handlePlay}
                >
                    {isPlaying ? (
                        <div className="relative w-full h-full">
                            <iframe
                                src={`${youtubeUrl}?autoplay=1&mute=${isMuted ? '1' : '0'}&rel=0&modestbranding=1`}
                                title="TEDxUA Previous Event Video"
                                className="w-full h-full border-0 pointer-events-auto"
                                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                allowFullScreen
                            />
                            {/* Overlay penangkap klik saat video masih bisu (autoplay) */}
                            {isMuted && (
                                <div 
                                    className="absolute inset-0 z-10 flex items-start justify-end p-4 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMuted(false);
                                    }}
                                >
                                    {/* Indikator visual UI */}
                                    <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-2 hover:bg-black/80 transition-colors shadow-lg animate-pulse">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                                        </svg>
                                        Tap to Unmute
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center bg-black/70">
                            {/* Thumbnail Background Video */}
                            <img
                                src={youtubePosterUrl}
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