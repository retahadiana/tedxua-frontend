import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { motion } from 'framer-motion';
import akarCahayaKanan from '@/assets/images/akarcahaya-kanan.webp';
import akarCahayaKiri from '@/assets/images/akarcahaya-kiri.webp';
import bgTransisi from '@/assets/images/background-themepagetransisi.webp';
import pintu2 from '@/assets/images/pintu-2.webp';

export default function ThemePage() {
    const navigate = useNavigate();
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [isZooming, setIsZooming] = useState(false);

    const handleDoorClick = () => {
        if (isDoorOpen) return;
        setIsDoorOpen(true);
        // Wait briefly for the door to "open" before zooming in
        setTimeout(() => {
            setIsZooming(true);
        }, 800);

        // Redirect to /subthemes after 2 seconds of zooming animation
        setTimeout(() => {
            navigate('/subthemes');
        }, 2800);
    };

    return (
        <div
            className={`relative w-full min-h-screen flex flex-col justify-between ${isZooming ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}
            style={{
                background: 'linear-gradient(180deg, #4E0000 0%, #2A0000 100%)'
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
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="fixed inset-0 w-full h-full object-cover object-center z-40 pointer-events-none origin-center"
            />

            {/* Hero Section (Responsive viewport fitting on Mobile & Desktop) */}
            <div className="relative w-full min-h-[88vh] sm:min-h-[92vh] md:min-h-screen shrink-0 overflow-hidden flex flex-col justify-center items-center pt-16 md:pt-0 pb-6 md:pb-2">
                {/* Background Image Layer */}
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isZooming ? 0 : 1 }}
                    transition={{ duration: 1.5 }}
                    src="/assets/theme/theme-page.webp"
                    alt="Theme Scene"
                    className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
                    style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)', maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
                />

                {/* Akar Cahaya Top Corners (Mobile Only - Framing Top Below Navbar) */}
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isZooming ? 0 : [0.7, 1, 1, 1, 0.7], y: isZooming ? -50 : [0, 6, 0] }}
                    transition={{ duration: isZooming ? 4 : 7, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                    src={akarCahayaKiri}
                    alt="Akar Cahaya Kiri"
                    className="absolute top-0 left-0 w-[62vw] max-w-[290px] object-contain md:hidden z-10 pointer-events-none drop-shadow-[0_0_22px_rgba(254,248,224,0.45)]"
                />
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isZooming ? 0 : [0.7, 1, 1, 1, 0.7], y: isZooming ? -50 : [0, 6, 0] }}
                    transition={{ duration: isZooming ? 4 : 7, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                    src={akarCahayaKanan}
                    alt="Akar Cahaya Kanan"
                    className="absolute top-0 right-0 w-[62vw] max-w-[290px] object-contain md:hidden z-10 pointer-events-none drop-shadow-[0_0_22px_rgba(254,248,224,0.45)]"
                />

                {/* Floating Spores / Embers for Magical Atmosphere on Mobile */}
                <motion.div
                    animate={{ y: [-10, 10, -10], opacity: [0.3, 0.85, 0.3], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[22%] left-[18%] w-2 h-2 rounded-full bg-[#FFE5A3] blur-[1px] shadow-[0_0_10px_#FF9A3C] md:hidden z-15 pointer-events-none"
                />
                <motion.div
                    animate={{ y: [8, -12, 8], opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[32%] right-[16%] w-2.5 h-2.5 rounded-full bg-[#FFD180] blur-[1px] shadow-[0_0_12px_#FF6D00] md:hidden z-15 pointer-events-none"
                />
                <motion.div
                    animate={{ y: [-6, 12, -6], opacity: [0.2, 0.7, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[48%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#FFF3E0] blur-[0.5px] shadow-[0_0_8px_#FFAB40] md:hidden z-15 pointer-events-none"
                />

                {/* Door & Text Container */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-[700px] mx-auto pointer-events-none pt-12 md:pt-0 pb-4 md:pb-2">
                    <motion.div
                        className="relative flex flex-col items-center justify-center md:justify-end w-full h-full origin-[50%_80%]"
                        animate={{
                            scale: isZooming ? 40 : 1,
                            y: isZooming ? '20vh' : 0,
                            zIndex: isZooming ? 50 : 10
                        }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                    >
                        {/* Background Roots (Mobile Only for richer scene) */}
                        <motion.img
                            animate={{ opacity: isZooming ? 0 : [0.3, 0.55, 0.55, 0.55, 0.3] }}
                            transition={{ duration: isZooming ? 4 : 8, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/bg-roots-left.webp"
                            alt="Background Roots Left"
                            className="absolute top-[10%] -left-[15%] w-[65%] md:hidden z-0 pointer-events-none"
                        />
                        <motion.img
                            animate={{ opacity: isZooming ? 0 : [0.3, 0.55, 0.55, 0.55, 0.3] }}
                            transition={{ duration: isZooming ? 4 : 8, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/bg-roots-right.webp"
                            alt="Background Roots Right"
                            className="absolute top-[18%] -right-[15%] w-[72%] md:hidden z-0 pointer-events-none"
                        />

                        {/* Subtle Mystical Door Glow Backdrop */}
                        <div className="absolute top-[18%] md:top-[120px] left-1/2 -translate-x-1/2 w-[60vw] max-w-[260px] md:w-[320px] h-[55vw] max-h-[260px] md:h-[320px] rounded-full bg-gradient-to-t from-[#FF3300]/25 via-[#FF6600]/15 to-transparent blur-2xl z-0 pointer-events-none" />

                        {/* Teks "DISCOVER Our Themes" (Mobile: Diberi posisi lebih turun pas di atas lengkungan pintu, Desktop: md:top-[102px] terkunci) */}
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: isZooming ? 0 : 1, scale: isZooming ? 1.2 : 1, y: isZooming ? -50 : [0, -8, 0] }}
                            transition={{ duration: isZooming ? 1.5 : 5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/discover-ourteams.webp"
                            alt="Discover Our Themes"
                            className="absolute top-[8px] sm:top-[16px] md:top-[102px] z-20 w-[84vw] max-w-[310px] sm:max-w-[340px] md:w-[64%] md:max-w-[520px] object-contain drop-shadow-[0_0_25px_rgba(254,248,224,0.5)]"
                        />

                        {/* Zooming Door Container */}
                        <div className="relative z-10 w-[48vw] max-w-[205px] sm:max-w-[225px] md:w-[252px] md:max-w-[72vw] origin-center flex justify-center items-end mt-8 md:mt-0">
                            {/* Pintu 1 (Tertutup) - Menentukan tinggi container */}
                            <motion.img
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: isDoorOpen ? 0 : 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                src="/assets/theme/pintu-1.webp"
                                alt="Door Closed"
                                onClick={handleDoorClick}
                                className={`relative z-10 w-full h-auto object-contain origin-bottom drop-shadow-[0_0_16px_rgba(255,40,20,0.35)] active:scale-95 transition-transform duration-200 ${!isDoorOpen ? 'cursor-pointer pointer-events-auto hover:drop-shadow-[0_0_25px_rgba(255,80,60,0.8)]' : 'pointer-events-none'}`}
                            />

                            {/* Pintu 2 (Terbuka) - Absolute, mengikuti tinggi pintu 1 tapi bisa mekar ke samping */}
                            <motion.img
                                animate={{ opacity: isDoorOpen ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                src={pintu2}
                                alt="Door Open"
                                className="absolute bottom-0 z-10 h-full w-auto max-w-none object-contain pointer-events-none"
                            />

                            {/* Background Transisi (Preview di DALAM pintu 2) */}
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
                        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none flex justify-center">
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isZooming ? 0 : 1 }}
                                transition={{ duration: isZooming ? 1.5 : 1, delay: isZooming ? 0 : 0.8 }}
                                src="/assets/theme/akar-bawah.webp"
                                alt="Akar Bawah"
                                className="absolute -bottom-[92px] md:-bottom-[77px] w-[75vw] max-w-[310px] md:w-[272px] md:max-w-[76vw] h-auto object-contain origin-bottom"
                            />
                        </div>

                        {/* Jamur Kiri (Mendekat lebih masuk ke pintu) */}
                        <motion.img
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: isZooming ? 0 : 1, x: isZooming ? -40 : 0, y: isZooming ? 30 : [0, -6, 0], rotate: isZooming ? -5 : [0, -2, 0] }}
                            transition={{ duration: isZooming ? 1.5 : 5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/mushroom-kiri.webp"
                            alt="Left Mushrooms"
                            className="absolute -bottom-[12px] md:-bottom-[20px] left-[3%] sm:left-[8%] md:left-[125px] z-20 w-[35vw] max-w-[140px] sm:max-w-[150px] md:w-[142px] md:max-w-[32vw] h-auto md:h-[242px] md:max-h-[32vh] object-contain pointer-events-none origin-bottom drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        />

                        {/* Jamur Kanan (Posisi pas & simetris) */}
                        <motion.img
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: isZooming ? 0 : 1, x: isZooming ? 40 : 0, y: isZooming ? 30 : [0, -8, 0], rotate: isZooming ? 5 : [0, 2, 0] }}
                            transition={{ duration: isZooming ? 1.5 : 5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            src="/assets/theme/mushroom-kanan.webp"
                            alt="Right Mushrooms"
                            className="absolute -bottom-[28px] md:-bottom-[36px] right-[1%] sm:right-[6%] md:right-[90px] z-20 w-[40vw] max-w-[162px] sm:max-w-[175px] md:w-[176px] md:max-w-[36vw] h-auto md:h-[239px] md:max-h-[32vh] object-contain pointer-events-none origin-bottom drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        />

                        {/* Teks Quote di bawah 'X' pintu */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isZooming ? 0 : [0.6, 1, 1, 1, 0.6] }}
                            transition={{ duration: isZooming ? 1.5 : 5, repeat: isZooming ? 0 : Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[66px] sm:bottom-[74px] md:bottom-[154px] z-20 font-essays italic text-[11.5px] sm:text-[13px] md:text-[19px] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] tracking-wide pointer-events-auto text-center px-4 w-full"
                        >
                            {isDoorOpen ? "Entering..." : "\"Knock to uncover what lies behind.\""}
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Footer Section */}
            <motion.div
                animate={{ opacity: isZooming ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="relative translate-y-0 left-0 right-0 z-20 pointer-events-auto mt-auto"
            >
                <Footer className="pt-6 md:pt-20" />
            </motion.div>
        </div>
    );
}