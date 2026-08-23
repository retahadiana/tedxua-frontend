import React from 'react';
import { motion } from 'framer-motion';
import AkarBwsSection1 from '@/assets/images/subtheme/akar-bws-section1.webp';
import BwsTeksSection1 from '@/assets/images/subtheme/bws-tekss-section1.webp';
import FireflyAtas from '@/assets/images/subtheme/firefly-bws-section1-atas.webp';
import FireflyKanan from '@/assets/images/subtheme/firefly-bws-section1-kanan.webp';
import FireflyKiri from '@/assets/images/subtheme/firefly-bws-section1-kiri.webp';
import ShadowSection1 from '@/assets/images/subtheme/shadow-section1.webp';
import TEDxSection1 from '@/assets/images/subtheme/TEDx-section1.webp';
import ThisYearSection1 from '@/assets/images/subtheme/thisyear-section1.webp';

// Section 2 (Subtheme 1: Becoming) Assets
import AkarSection2 from '@/assets/images/subtheme/akar-section2.webp';
import CahayaSection2 from '@/assets/images/subtheme/cahaya-section2.webp';
import MyloBingungSection2 from '@/assets/images/subtheme/mylo-bingung-section2.webp';
import ShadowSection2 from '@/assets/images/subtheme/shadow-section2.webp';
import SoulSection2 from '@/assets/images/subtheme/soul-section2.webp';
import TgobSection2 from '@/assets/images/subtheme/tgob-section2.webp';
import TittleSubtheme1Section2 from '@/assets/images/subtheme/tittle-subtheme1-section2.webp';
import TittleboxSubtheme1Section2 from '@/assets/images/subtheme/tittlebox-subtheme1-section2.webp';

// Section 3 (Subtheme 2: Seeking) Assets
import AwanSection3 from '@/assets/images/subtheme/awan-section3.webp';
import MyloSection3 from '@/assets/images/subtheme/mylo-section3.webp';
import PelangiSection3 from '@/assets/images/subtheme/pelangi-section3.webp';
import ShadowSection3 from '@/assets/images/subtheme/shadow-section3.webp';
import StringSection3 from '@/assets/images/subtheme/string-section3.webp';
import TittleSubtheme2Section3 from '@/assets/images/subtheme/tittle-subtheme2-section3.webp';
import TittleboxSubtheme2Section3 from '@/assets/images/subtheme/tittlebox-subtheme2-section3.webp';
// Section 4 (Subtheme 3: Unfolding) Assets
import BorderSection4 from '@/assets/images/subtheme/border-section4.webp';
import CahayaBawahSection4 from '@/assets/images/subtheme/cahayabawah-section4.webp';
import MyloSection4 from '@/assets/images/subtheme/mylo-section4.webp';
import SoulightSection4 from '@/assets/images/subtheme/soulight-section4.webp';
import TittleSubtheme3Section4 from '@/assets/images/subtheme/tittle-subtheme3-section4.webp';
import TittleboxSubtheme3Section4 from '@/assets/images/subtheme/tittlebox-subtheme3-section4.webp';
import TsuSection4 from '@/assets/images/subtheme/tsu-section4.webp';

const smoothEase = [0.22, 1, 0.36, 1];

export function MainThemeSection() {
    return (
        <section className="relative w-full min-h-[90vh] md:min-h-[105vh] flex flex-col items-center justify-start pt-[90px] md:pt-[120px] pb-16 md:pb-24">
            {/* 1. Root / Vine Overlay (z-0) */}
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                transition={{ duration: 1, ease: smoothEase }}
                src={AkarBwsSection1}
                alt="Akar Background"
                className="absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top scale-[1.1] origin-top opacity-65 pointer-events-none z-0"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
            />

            {/* 5. Fireflies (z-40) - Top-right subtle floating */}
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: 1,
                    y: [-4, 4, -4],
                    x: [-2, 2, -2]
                }}
                transition={{ 
                    opacity: { duration: 0.8, delay: 0.2 },
                    y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                    x: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                src={FireflyAtas}
                alt="Firefly Top Accent"
                className="absolute right-[4%] md:right-[14%] top-[5%] md:top-[7%] w-[60px] md:w-[130px] pointer-events-none z-40"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
                    maskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)'
                }}
            />

            {/* 5. Fireflies (z-40) - Left subtle floating */}
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: 1,
                    y: [5, -5, 5],
                    x: [3, -3, 3]
                }}
                transition={{ 
                    opacity: { duration: 0.8, delay: 0.25 },
                    y: { repeat: Infinity, duration: 7.5, ease: "easeInOut" },
                    x: { repeat: Infinity, duration: 7.5, ease: "easeInOut" }
                }}
                src={FireflyKiri}
                alt="Firefly Left"
                className="absolute -left-10 md:-left-28 top-[30%] md:top-[32%] w-[180px] md:w-[440px] pointer-events-none z-40"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at 30% 50%, black 45%, transparent 85%)',
                    maskImage: 'radial-gradient(circle at 30% 50%, black 45%, transparent 85%)'
                }}
            />

            {/* 5. Fireflies (z-40) - Right subtle floating */}
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: 1,
                    y: [-5, 5, -5],
                    x: [-2, 2, -2]
                }}
                transition={{ 
                    opacity: { duration: 0.8, delay: 0.3 },
                    y: { repeat: Infinity, duration: 5.5, ease: "easeInOut" },
                    x: { repeat: Infinity, duration: 5.5, ease: "easeInOut" }
                }}
                src={FireflyKanan}
                alt="Firefly Right"
                className="absolute -right-8 md:-right-24 top-[16%] md:top-[18%] w-[170px] md:w-[410px] pointer-events-none z-40"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 45%, transparent 85%)',
                    maskImage: 'radial-gradient(circle at 70% 50%, black 45%, transparent 85%)'
                }}
            />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 flex flex-col items-center mt-2 md:mt-6">

                {/* 6. Text (z-50) - Top Text: This Year Main Theme */}
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                    src={ThisYearSection1}
                    alt="This Year Main Theme"
                    className="w-[170px] md:w-[350px] mt-2 md:mt-4 mb-4 md:mb-8 relative z-50"
                />

                {/* Center Group: Title, Shadow, and Big X */}
                <div className="relative flex flex-col items-center w-full">

                    {/* 2. Strengthened Brown Atmosphere Shadow (z-10) */}
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.1 }}
                        src={ShadowSection1}
                        alt="Shadow"
                        className="absolute top-[420px] md:top-[640px] left-1/2 -translate-x-1/2 w-[140vw] md:w-[125vw] max-w-[1920px] opacity-100 contrast-140 brightness-105 pointer-events-none z-10"
                        style={{
                            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 95%)',
                            maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 95%)'
                        }}
                    />

                    {/* 3. Big X above vines (z-20) - perfectly centered */}
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
                        src={TEDxSection1}
                        alt="Big X"
                        className="absolute top-[60px] md:top-[120px] left-1/2 -translate-x-1/2 w-[220px] md:w-[500px] object-contain opacity-95 pointer-events-none z-20"
                    />

                    {/* 4. Title (z-30) */}
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.45, ease: smoothEase }}
                        src={BwsTeksSection1}
                        alt="Beneath What We See The Mycelium"
                        className="w-[88%] md:w-[940px] relative z-30"
                    />

                    {/* 6. Text (z-50) - Description Paragraphs */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: smoothEase }}
                        className="relative z-50 mt-10 md:mt-24 max-w-[340px] md:max-w-[850px] text-center px-2 md:px-4 space-y-4 md:space-y-6 text-[#F0F0F0] text-xs md:text-base lg:text-lg font-medium leading-relaxed drop-shadow-lg"
                    >
                        <p>
                            Far beneath the surface, long before a single flower blooms, a network of mycelium is already at work, unseen, unlit, and uncelebrated. Nothing above ground exists without what moves below it. Though often overlooked, the largest change is rarely born in the spotlight. It is born in silence, in roles unnamed, in effort no one thought to trace back to its source.
                        </p>
                        <p>
                            This theme is an invitation to look beyond the surface, to notice that every individual carries a role, that every action leaves a trace, that meaningful change grows slowly from roots no one applauds. It is a reminder that true contribution is not always visible. But it is always felt, in what stands, in what holds, in what keeps quietly growing long after the credit has gone somewhere else.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function Subtheme1Section() {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="relative w-full min-h-[105vh] md:min-h-[220vh] flex flex-col items-center justify-start pt-28 md:pt-[320px] pb-28 md:pb-52 overflow-visible"
        >
            {/* 1. akar-section2.webp (Roots - placed at the very back z-5) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                src={AkarSection2} 
                alt="Akar Subtheme 1" 
                className="absolute top-[130px] md:top-[300px] left-1/2 -translate-x-1/2 w-[98vw] md:w-[95vw] max-w-[1350px] object-contain pointer-events-none z-5" 
            />

            {/* 2. soul-section2.webp (Soul - layer z-25) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                src={SoulSection2} 
                alt="Soul Silhouette" 
                className="absolute top-[240px] md:top-[500px] left-1/2 -translate-x-1/2 w-[340px] md:w-[980px] object-contain opacity-80 brightness-110 contrast-110 pointer-events-none z-25" 
            />

            {/* 3. cahaya-section2.webp (Fireflies - layer z-28) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                animate={{ opacity: [0.7, 0.9, 0.7] }}
                transition={{ 
                    duration: 1,
                    delay: 0.3,
                    opacity: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                src={CahayaSection2} 
                alt="Cahaya Subtheme 1" 
                className="absolute top-[190px] md:top-[410px] left-1/2 -translate-x-1/2 w-[100vw] md:w-[100vw] max-w-[1400px] object-contain opacity-80 pointer-events-none z-28" 
                style={{
                    mixBlendMode: 'screen'
                }}
            />

            {/* Main Content Container (Title -> Becoming -> Text) */}
            <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center">
                
                {/* 5, 6, 7. Title Box + Mylo + SUBTHEME 1 */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                    className="relative flex items-center justify-center mt-4 md:mt-28"
                >
                    {/* Title Box */}
                    <img 
                        src={TittleboxSubtheme1Section2} 
                        alt="Subtheme 1 Title Box" 
                        className="w-[230px] md:w-[400px] object-contain z-30" 
                    />

                    {/* "SUBTHEME 1" Text */}
                    <img 
                        src={TittleSubtheme1Section2} 
                        alt="SUBTHEME 1" 
                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150px] md:w-[275px] object-contain z-30" 
                    />

                    {/* Mylo (overlapping top-left corner) */}
                    <img 
                        src={MyloBingungSection2} 
                        alt="Mylo" 
                        className="absolute -top-6 -left-4 md:-top-11 md:-left-8 w-[55px] md:w-[95px] object-contain z-40 drop-shadow-md" 
                    />
                </motion.div>

                {/* 8. "The Gardeners of Becoming" Title */}
                <motion.img 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: smoothEase }}
                    src={TgobSection2} 
                    alt="The Gardeners of Becoming" 
                    className="w-[92%] md:w-[98%] max-w-[1100px] md:max-w-[1180px] mt-4 md:mt-10 object-contain drop-shadow-xl z-30" 
                />

                {/* 9. Left and Right Text Blocks */}
                <div className="w-full flex flex-col mt-8 md:mt-24 z-30 space-y-8 md:space-y-24 items-center md:items-stretch">
                    {/* Left Text Block */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
                        className="w-full max-w-[340px] md:max-w-[620px] lg:max-w-[660px] self-center md:self-start ml-0 md:ml-6 lg:ml-12 px-2 md:px-0"
                    >
                        <p className="text-xs md:text-base leading-relaxed text-[#F0F0F0] font-medium drop-shadow-md">
                            <span className="text-[#FF8A00] font-bold text-base md:text-xl mr-0.5">E</span>very role carries its own necessary note. Some are instantly loud, others hum quietly beneath the surface. But a frequency doesn't stop mattering just because no one has tuned in yet. Somewhere in the noise of comparison, we begin to measure worth by volume instead of presence. Yet, each note was written into the whole on purpose. It resonates steadily, whether it is recognized or not. Because value never needed permission to exist.
                        </p>
                    </motion.div>

                    {/* Right Text Block */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.65, ease: smoothEase }}
                        className="w-full max-w-[340px] md:max-w-[620px] lg:max-w-[660px] self-center md:self-end mr-0 md:mr-6 lg:mr-12 px-2 md:px-0"
                    >
                        <p className="text-xs md:text-base leading-relaxed text-[#F0F0F0] font-medium drop-shadow-md">
                            <span className="text-[#FF8A00] font-bold text-base md:text-xl mr-0.5">N</span>othing complex is held up by a single hand. Behind every system that works, there are countless roles never meant to be seen directly. Applause tends to land only on what's in front, never on the layers beneath, the ones actually keeping the whole thing standing. But a complex system is only as strong as its most overlooked piece. Every unseen architect and every quiet contribution is still load-bearing. The system remembers, even when the applause forgets.
                        </p>
                    </motion.div>
                </div>

            </div>

            {/* 10. shadow-section2.webp (Bottom transition of Section 2 into Section 3) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.95 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                src={ShadowSection2} 
                alt="Shadow Section 2" 
                className="absolute bottom-[-160px] md:bottom-[-420px] left-1/2 -translate-x-1/2 w-[150vw] md:w-[125vw] max-w-[1920px] opacity-95 contrast-150 brightness-105 pointer-events-none z-10" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 95%)',
                    maskImage: 'linear-gradient(to bottom, black 45%, transparent 95%)'
                }}
            />
        </motion.section>
    );
}

export function Subtheme2Section() {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="relative w-full min-h-[105vh] md:min-h-[220vh] flex flex-col items-center justify-start pt-0 md:pt-2 pb-36 md:pb-64 overflow-visible"
        >
            {/* 1. pelangi-section3.webp (Rainbow - slowly fades into visibility) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ 
                    duration: 1.2, 
                    delay: 0.1, 
                    ease: smoothEase,
                    opacity: { repeat: Infinity, duration: 7, ease: "easeInOut" }
                }}
                src={PelangiSection3} 
                alt="Pelangi Subtheme 2" 
                className="absolute top-[-60px] md:top-[-150px] left-[-2%] md:left-[-2%] w-[96vw] md:w-[88vw] max-w-[1300px] object-contain pointer-events-none z-5" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 98%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 98%)'
                }}
            />

            {/* 2. awan-section3.webp (Clouds - z-8) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                src={AwanSection3} 
                alt="Awan Subtheme 2" 
                className="absolute top-[-90px] md:top-[-160px] left-1/2 -translate-x-1/2 w-[125vw] md:w-[108vw] max-w-[1920px] object-contain pointer-events-none z-8" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 62%, transparent 85%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 62%, transparent 85%)'
                }}
            />

            {/* Main Content Container (Title Box -> Mylo -> Subtheme 2 -> STRING -> Left Text) */}
            <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center">
                
                {/* 3, 4, 5. Title Box + Mylo + SUBTHEME 2 */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                    className="relative flex items-center justify-center mt-6 md:mt-1"
                >
                    {/* Title Box (z-30) */}
                    <img 
                        src={TittleboxSubtheme2Section3} 
                        alt="Subtheme 2 Title Box" 
                        className="w-[230px] md:w-[400px] object-contain z-30" 
                    />

                    {/* "SUBTHEME 2" Text (z-30) */}
                    <img 
                        src={TittleSubtheme2Section3} 
                        alt="SUBTHEME 2" 
                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150px] md:w-[275px] object-contain z-30" 
                    />

                    {/* Mylo (z-40) */}
                    <img 
                        src={MyloSection3} 
                        alt="Mylo Seeking" 
                        className="absolute -top-6 -right-4 md:-top-11 md:-right-8 w-[55px] md:w-[100px] object-contain z-40" 
                    />
                </motion.div>

                {/* 6. "THE INVISIBLE STRING" Title (z-30) */}
                <motion.img 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: smoothEase }}
                    src={StringSection3} 
                    alt="The Invisible String" 
                    className="w-[88%] md:w-[84%] max-w-[900px] md:max-w-[980px] mt-4 md:mt-10 object-contain z-30" 
                />

                {/* 7. Text Block on Left Side (z-30) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
                    className="w-full flex flex-col mt-12 md:mt-36 z-30 items-center md:items-start"
                >
                    <div className="w-full max-w-[340px] md:max-w-[620px] lg:max-w-[660px] self-center md:self-start ml-0 md:ml-6 lg:ml-12 space-y-4 md:space-y-8 px-2 md:px-0">
                        <p className="text-xs md:text-base leading-relaxed text-[#FFFFFF] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                            <span className="text-[#6BB6FF] font-bold text-base md:text-xl mr-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">B</span>eneath every forest floor runs a network invisible from above; roots trading nutrients, keeping distant trees alive through connections. This is proximity in its truest sense; not distance, but dependency. Every part of the network needs every other part to hold its shape, the way a human mycelium spreads unseen beneath the surface, feeding what looks separate from something shared. Connection here is not optional scenery, it is the structure itself, and with it comes a responsibility that belongs to no one alone. Because it was never held alone to begin with.
                        </p>
                        <p className="text-xs md:text-base leading-relaxed text-[#FFFFFF] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                            <span className="text-[#6BB6FF] font-bold text-base md:text-xl mr-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">N</span>othing moves through it without consequence. Every action carries its own gravity, pulling outcomes toward lives unexpectedly. This interconnectedness is a pull cannot be contained to just one point. A small kindness bends further than intended. So does a small carelessness. Neither one stays where it started. Connection does not just mean support, it means exposure, where every choice, good or careless, is sent out into a system built to carry it further than expected.
                        </p>
                    </div>
                </motion.div>

            </div>

            {/* 8. shadow-section3.webp */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.95 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                src={ShadowSection3} 
                alt="Shadow Section 3" 
                className="absolute bottom-[-160px] md:bottom-[-420px] left-1/2 -translate-x-1/2 w-[150vw] md:w-[130vw] max-w-[1920px] object-contain opacity-95 pointer-events-none z-25" 
            />
        </motion.section>
    );
}

export function Subtheme3Section() {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="relative z-20 w-full min-h-[90vh] md:min-h-[105vh] flex flex-col items-center justify-start pt-0 md:pt-2 pb-0 overflow-visible"
        >
            {/* ABSOLUTE DECORATIVE ASSETS (Background & Framing Layers) */}

            {/* 1. border-section4.webp (Wide decorative frame z-5) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.95 }}
                transition={{ duration: 1, delay: 0.1 }}
                src={BorderSection4} 
                alt="Border Roots Section 4" 
                className="absolute top-[45px] md:top-[105px] left-1/2 -translate-x-1/2 w-[100vw] md:w-[106vw] max-w-[1720px] h-auto object-contain pointer-events-none z-5 opacity-95" 
            />

            {/* 2. cahayabawah-section4.webp (Soft bottom light pulse z-10) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ 
                    duration: 1, 
                    delay: 0.3,
                    opacity: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                src={CahayaBawahSection4} 
                alt="Cahaya Bawah Section 4" 
                className="absolute bottom-[-120px] md:bottom-[-200px] left-1/2 -translate-x-1/2 w-[88vw] md:w-[135vw] max-w-[1920px] object-contain opacity-35 md:opacity-95 brightness-85 md:brightness-110 pointer-events-none z-10" 
            />

            {/* 3. soulight-section4.webp (Soul light hero background z-20) */}
            <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.75 }}
                animate={{ opacity: [0.65, 0.8, 0.65] }}
                transition={{ 
                    duration: 1.2, 
                    delay: 0.2,
                    opacity: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                src={SoulightSection4} 
                alt="Soul Light Section 4" 
                className="absolute top-[125px] md:top-[185px] left-1/2 -translate-x-1/2 w-[210px] md:w-[530px] object-contain opacity-75 brightness-105 contrast-105 pointer-events-none z-20" 
            />

            {/* FLEX COLUMN MAIN CONTENT CONTAINER (Title Box -> Main Heading -> Paragraphs) */}
            <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center">
                
                {/* 1. Title Box Group (Subtheme 3 + Titlebox + Mylo) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                    className="relative flex items-center justify-center mt-6 md:mt-2"
                >
                    {/* Title Box */}
                    <img 
                        src={TittleboxSubtheme3Section4} 
                        alt="Subtheme 3 Title Box" 
                        className="w-[230px] md:w-[380px] object-contain z-30" 
                    />

                    {/* "SUBTHEME 3" Text */}
                    <img 
                        src={TittleSubtheme3Section4} 
                        alt="SUBTHEME 3" 
                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150px] md:w-[260px] object-contain z-30" 
                    />

                    {/* Mylo (overlapping top-left corner) */}
                    <img 
                        src={MyloSection4} 
                        alt="Mylo Unfolding" 
                        className="absolute -top-5 -left-4 md:-top-10 md:-left-7 w-[50px] md:w-[90px] object-contain z-40 drop-shadow-md" 
                    />
                </motion.div>

                {/* 2. Main Heading ("THE SLOW UNFOLDING" - Flex Flow Item) */}
                <motion.img 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: smoothEase }}
                    src={TsuSection4} 
                    alt="The Slow Unfolding" 
                    className="w-[88%] md:w-[92%] max-w-[920px] md:max-w-[1020px] mt-4 md:mt-10 object-contain drop-shadow-xl z-40" 
                />

                {/* 3. Paragraph Content Container (Flex Flow Item sitting over Soul Light) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
                    className="mt-10 md:mt-28 max-w-[340px] md:max-w-[720px] text-center px-3 md:px-4 space-y-4 md:space-y-6 text-[#F0F0F0] text-[13px] leading-relaxed md:text-base lg:text-lg font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.9)] z-40"
                >
                    <p>
                        <span className="text-[#FFB356] font-bold text-base md:text-xl mr-0.5">T</span>he largest impact, good or harmful, is rarely visible while it's happening. It moves underground, slow, unannounced, and easy to dismiss simply because nothing seems to be changing yet. But absence of visible proof is not absence of movement. Real change asks for patience, and patience asks for attention. Notice what is being planted, not just what is hoped for. Because what takes root in silence, whether it was tended with care or neglect, is precisely what will eventually bloom.
                    </p>
                    <p>
                        <span className="text-[#FFB356] font-bold text-base md:text-xl mr-0.5">W</span>ith patience comes a clearer question: patient toward what, exactly? Somewhere along the way, a definition of success was inherited rather than chosen. Picturized as a podium, a single shape everyone is measured against, decided by a crowd that never asked what would actually matter here. But if change truly unfolds on its own timeline, then so does meaning. Success was never something to be handed down or agreed upon by consensus. It is something deeper and more particular than any tradition could define, unique to whoever is doing the growing.
                    </p>
                </motion.div>

            </div>
        </motion.section>
    );
}