import React, { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { motion } from 'framer-motion';
import akarCahayaKanan from '@/assets/images/akarcahaya-kanan.png';
import akarCahayaKiri from '@/assets/images/akarcahaya-kiri.png';
import bgTransisi from '@/assets/images/background-themepagetransisi.png';
import pintu2 from '@/assets/images/pintu-2.png';

export default function ThemePage() {
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [isZooming, setIsZooming] = useState(false);

    const handleDoorClick = () => {
        if (isDoorOpen) return;
        setIsDoorOpen(true);
        // Wait briefly for the door to "open" before zooming in
        setTimeout(() => {
            setIsZooming(true);
        }, 800);
    };

    return (
        <div
            className={`relative w-full min-h-screen md:h-screen bg-black flex flex-col justify-between ${isZooming ? 'overflow-hidden' : 'overflow-y-auto md:overflow-hidden'}`}
            style={{
                background: 'linear-gradient(180deg, #4E0000 33%, #000000 100%)'
            }}
        >
            {/* Navbar Overlay */}
            <motion.div 
                animate={{ opacity: isZooming ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 right-0 z-30 pointer-events-auto"
            >
                <Navbar />
            </motion.div>

            {/* Full-Screen Target Background Overlay (Focus ke area Pink-Merah terang di tengah) */}
            <motion.img
                src={bgTransisi}
                alt="Background Theme Transisi Full"
                initial={{ opacity: 0, scale: 1.3 }}
                animate={{ 
                    opacity: isZooming ? 1 : 0,
                    scale: isZooming ? 2.2 : 1.3
                }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="fixed inset-0 w-full h-full object-cover object-center z-40 pointer-events-none origin-center"
            />

            {/* Hero Section (Full 1 Screen di Mobile & Desktop) */}
            <div className="relative w-full min-h-[115vh] md:min-h-0 md:h-screen shrink-0 overflow-hidden flex flex-col justify-end">
                {/* Background Image Layer */}
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isZooming ? 0 : 1 }}
                    transition={{ duration: 1.5 }}
                    src="/assets/theme/theme-page.png"
                    alt="Theme Scene"
                    className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
                />

                {/* Akar Cahaya Top Corners (Mobile Only - Di Paling Atas Layar) */}
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isZooming ? 0 : [0.7, 1, 0.7], y: isZooming ? -50 : [0, 8, 0] }}
                    transition={{ duration: isZooming ? 4 : 4, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                    src={akarCahayaKiri}
                    alt="Akar Cahaya Kiri"
                    className="absolute top-4 left-0 w-[70vw] max-w-[340px] object-contain md:hidden z-10 pointer-events-none drop-shadow-[0_0_20px_rgba(254,248,224,0.4)]"
                />
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isZooming ? 0 : [0.7, 1, 0.7], y: isZooming ? -50 : [0, 8, 0] }}
                    transition={{ duration: isZooming ? 4 : 5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut", delay: isZooming ? 0 : 0.5 }}
                    src={akarCahayaKanan}
                    alt="Akar Cahaya Kanan"
                    className="absolute top-4 right-0 w-[70vw] max-w-[340px] object-contain md:hidden z-10 pointer-events-none drop-shadow-[0_0_20px_rgba(254,248,224,0.4)]"
                />

                {/* Door & Text Container */}
                <div className="relative z-10 flex flex-col items-center justify-end h-full w-full max-w-[700px] mx-auto pointer-events-none pb-40 md:pb-2">
                    <motion.div 
                        className="relative flex flex-col items-center justify-end w-full h-full origin-[50%_80%]"
                        animate={{
                            scale: isZooming ? 40 : 1, // Keseluruhan scene membesar
                            y: isZooming ? '20vh' : 0, // Titik fokus kamera ke arah pintu
                            zIndex: isZooming ? 50 : 10
                        }}
                        transition={{ duration: 5.5, ease: "easeInOut" }}
                    >
                        {/* Background Roots (Mobile Only for richer scene) */}
                        <motion.img
                            animate={{ opacity: isZooming ? 0 : [0.2, 0.4, 0.2] }}
                            transition={{ duration: isZooming ? 4 : 6, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/bg-roots-left.png"
                            alt="Background Roots Left"
                            className="absolute top-[20%] -left-[20%] w-[60%] md:hidden z-0 pointer-events-none"
                        />
                        <motion.img
                            animate={{ opacity: isZooming ? 0 : [0.2, 0.5, 0.2] }}
                            transition={{ duration: isZooming ? 4 : 7, repeat: isZooming ? 0 : Infinity, ease: "easeInOut", delay: isZooming ? 0 : 1 }}
                            src="/assets/theme/bg-roots-right.png"
                            alt="Background Roots Right"
                            className="absolute top-[30%] -right-[20%] w-[70%] md:hidden z-0 pointer-events-none"
                        />

                        {/* Fireflies (Mobile Only for magic) */}
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isZooming ? 0 : 0.7 }}
                            transition={{ duration: isZooming ? 4 : 2 }}
                            src="/assets/theme/fireflies.png"
                            alt="Fireflies"
                            className="absolute inset-0 w-full h-full object-cover z-25 md:hidden pointer-events-none animate-pulse"
                        />

                        {/* Teks "DISCOVER Our Themes" */}
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: isZooming ? 0 : 1, scale: isZooming ? 1.2 : 1, y: isZooming ? -50 : [0, -12, 0] }}
                            transition={{ duration: isZooming ? 4 : 5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/discover-ourteams.png"
                            alt="Discover Our Themes"
                            className="absolute top-[9vh] md:top-32 z-20 w-[88%] max-w-[340px] md:w-[80%] md:max-w-[650px] object-contain drop-shadow-[0_0_20px_rgba(254,248,224,0.4)]"
                        />

                        {/* Zooming Door Container: Tidak lagi membesar sendiri, tapi ikut parent */}
                        <div className="relative z-10 w-[45vw] max-w-[210px] md:w-[315px] md:max-w-[90vw] origin-center flex justify-center items-end">
                            {/* Pintu 1 (Tertutup) - Menentukan tinggi container */}
                            <motion.img
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: isDoorOpen ? 0 : 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                src="/assets/theme/pintu-1.png"
                                alt="Door Closed"
                                onClick={handleDoorClick}
                                className={`relative z-10 w-full h-auto object-contain origin-bottom ${!isDoorOpen ? 'cursor-pointer pointer-events-auto hover:drop-shadow-[0_0_20px_rgba(255,50,50,0.6)]' : 'pointer-events-none'}`}
                            />
                            
                            {/* Pintu 2 (Terbuka) - Absolute, mengikuti tinggi pintu 1 tapi bisa mekar ke samping */}
                            <motion.img
                                animate={{ opacity: isDoorOpen ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                src={pintu2}
                                alt="Door Open"
                                className="absolute bottom-0 z-10 h-full w-auto max-w-none object-contain pointer-events-none"
                            />

                            {/* Background Transisi (Preview di DALAM pintu 2 - Terkunci rapat di dalam lubang pintu) */}
                            <div className="absolute bottom-[4%] z-0 w-[80%] h-[85%] overflow-hidden flex items-center justify-center pointer-events-none">
                                <motion.img
                                    src={bgTransisi}
                                    alt="Background Transisi Preview"
                                    animate={{ 
                                        opacity: isDoorOpen ? 1 : 0, 
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover object-center scale-[2] origin-center"
                                />
                            </div>
                        </div>

                        {/* Akar Bawah Merambat di bagian bawah pintu */}
                        <motion.img 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isZooming ? 0 : 1 }}
                            transition={{ duration: isZooming ? 1 : 1, delay: isZooming ? 0 : 0.8 }}
                            src="/assets/theme/akar-bawah.png" 
                            alt="Akar Bawah" 
                            className="absolute -bottom-40 md:-bottom-24 z-20 w-[75vw] max-w-[320px] md:w-[340px] md:max-w-[95vw] h-auto object-contain pointer-events-none origin-bottom" 
                        />

                        {/* Jamur Kiri (Mendekat lebih masuk ke pintu) */}
                        <motion.img 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: isZooming ? 0 : 1, x: isZooming ? -100 : 0, y: isZooming ? 50 : [0, -6, 0], rotate: isZooming ? -10 : [0, -2, 0] }}
                            transition={{ duration: isZooming ? 2 : 4, repeat: isZooming ? 0 : Infinity, ease: "easeInOut", delay: isZooming ? 0 : 0.5 }}
                            src="/assets/theme/mushroom-kiri.png" 
                            alt="Left Mushrooms" 
                            className="absolute bottom-0 left-[2%] md:left-20 z-20 w-[35vw] max-w-[140px] md:w-[177px] md:max-w-[40vw] h-auto md:h-[303px] md:max-h-[40vh] object-contain pointer-events-none origin-bottom" 
                        />

                        {/* Jamur Kanan (Geser kiri dikit lagi) */}
                        <motion.img 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: isZooming ? 0 : 1, x: isZooming ? 100 : 0, y: isZooming ? 50 : [0, -8, 0], rotate: isZooming ? 10 : [0, 2, 0] }}
                            transition={{ duration: isZooming ? 2 : 4.5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut", delay: isZooming ? 0 : 0.7 }}
                            src="/assets/theme/mushroom-kanan.png" 
                            alt="Right Mushrooms" 
                            className="absolute -bottom-8 md:bottom-0 right-[-2%] md:right-10 z-20 w-[40vw] max-w-[170px] md:w-[220.43px] md:max-w-[45vw] h-auto md:h-[298.59px] md:max-h-[40vh] object-contain pointer-events-none origin-bottom" 
                        />

                        {/* Teks Quote di bawah 'X' pintu */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isZooming ? 0 : [0.4, 1, 0.4] }}
                            transition={{ duration: isZooming ? 1 : 3.5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut", delay: isZooming ? 0 : 1 }}
                            className="absolute bottom-20 md:bottom-48 z-20 font-essays italic text-sm md:text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)] tracking-wide pointer-events-auto text-center px-4 w-full"
                        >
                            {isDoorOpen ? "Entering..." : "\"Knock to uncover what lies behind.\""}
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Footer Section: Di HP di bawah layar (scroll), di Desktop melayang di bawah layar */}
            <motion.div 
                animate={{ opacity: isZooming ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="relative md:absolute md:-bottom-2 translate-y-0 left-0 right-0 z-30 pointer-events-auto bg-black md:bg-transparent pt-16 pb-8 md:pt-0 md:pb-0"
            >
                <Footer />
            </motion.div>
        </div>
    );
}
