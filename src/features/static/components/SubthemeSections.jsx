import React from 'react';
import AkarBwsSection1 from '@/assets/images/subtheme/akar-bws-section1.png';
import BwsTeksSection1 from '@/assets/images/subtheme/bws-tekss-section1.png';
import FireflyAtas from '@/assets/images/subtheme/firefly-bws-section1-atas.png';
import FireflyKanan from '@/assets/images/subtheme/firefly-bws-section1-kanan.png';
import FireflyKiri from '@/assets/images/subtheme/firefly-bws-section1-kiri.png';
import ShadowSection1 from '@/assets/images/subtheme/shadow-section1.png';
import TEDxSection1 from '@/assets/images/subtheme/TEDx-section1.png';
import ThisYearSection1 from '@/assets/images/subtheme/thisyear-section1.png';

export function MainThemeSection() {
    return (
        <section className="relative w-full min-h-[105vh] flex flex-col items-center justify-start pt-[120px] pb-24">
            {/* Background Vines */}
            <img 
                src={AkarBwsSection1} 
                alt="Akar Background" 
                className="absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top scale-[1.1] origin-top opacity-90 pointer-events-none" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
            />
            
            {/* Firefly Atas (Top-right subtle accent) */}
            <img 
                src={FireflyAtas} 
                alt="Firefly Top Accent" 
                className="absolute right-[8%] md:right-[14%] top-[5%] md:top-[7%] w-[80px] md:w-[130px] pointer-events-none z-20" 
            />

            {/* Firefly Kiri (Reduced size ~20%, mostly outside left) */}
            <img 
                src={FireflyKiri} 
                alt="Firefly Left" 
                className="absolute -left-16 md:-left-28 top-[30%] md:top-[32%] w-[270px] md:w-[440px] pointer-events-none z-20" 
            />

            {/* Firefly Kanan (Reduced size ~20%, higher than left) */}
            <img 
                src={FireflyKanan} 
                alt="Firefly Right" 
                className="absolute -right-12 md:-right-24 top-[16%] md:top-[18%] w-[250px] md:w-[410px] pointer-events-none z-20" 
            />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 flex flex-col items-center mt-6">
                
                {/* Top Text: This Year Main Theme */}
                <img 
                    src={ThisYearSection1} 
                    alt="This Year Main Theme" 
                    className="w-[200px] md:w-[350px] mt-4 mb-8" 
                />
                
                {/* Center Group: Title, Shadow, and Big X */}
                <div className="relative flex flex-col items-center w-full">
                    
                    {/* Shadow placed vertically BELOW the Big X asset - topmost layer (z-60) */}
                    <img 
                        src={ShadowSection1} 
                        alt="Shadow" 
                        className="absolute top-[520px] md:top-[640px] left-1/2 -translate-x-1/2 w-[150vw] md:w-[120vw] max-w-[1920px] opacity-85 pointer-events-none z-60" 
                        style={{
                            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)',
                            maskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)'
                        }}
                    />

                    {/* Big X - TOPMOST LAYER (z-50) */}
                    <img 
                        src={TEDxSection1} 
                        alt="Big X" 
                        className="absolute top-[80px] md:top-[120px] left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] object-contain opacity-75 pointer-events-none z-50" 
                    />
                    
                    {/* Main Title */}
                    <img 
                        src={BwsTeksSection1} 
                        alt="Beneath What We See The Mycelium" 
                        className="w-[95%] md:w-[940px] relative z-10 drop-shadow-xl" 
                    />

                    {/* Description Paragraphs - in front of Big X (z-50 > z-30) */}
                    <div className="relative z-50 mt-16 md:mt-24 max-w-[850px] text-center px-4 space-y-6 text-[#F0F0F0] text-sm md:text-base lg:text-lg font-medium leading-relaxed drop-shadow-lg">
                        <p>
                            Far beneath the surface, long before a single flower blooms, a network of mycelium is already at work, unseen, unlit, and uncelebrated. Nothing above ground exists without what moves below it. Though often overlooked, the largest change is rarely born in the spotlight. It is born in silence, in roles unnamed, in effort no one thought to trace back to its source.
                        </p>
                        <p>
                            This theme is an invitation to look beyond the surface, to notice that every individual carries a role, that every action leaves a trace, that meaningful change grows slowly from roots no one applauds. It is a reminder that true contribution is not always visible. But it is always felt, in what stands, in what holds, in what keeps quietly growing long after the credit has gone somewhere else.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Subtheme1Section() {
    return (
        <section className="relative w-full min-h-[120vh] flex flex-col items-center justify-center border-b border-dashed border-white/20">
            <h2 className="text-4xl font-bold font-swung drop-shadow-md">SUBTHEME 1: BECOMING</h2>
            <p className="opacity-70 mt-4">Section 2 / 4</p>
        </section>
    );
}

export function Subtheme2Section() {
    return (
        <section className="relative w-full min-h-[120vh] flex flex-col items-center justify-center border-b border-dashed border-white/20">
            <h2 className="text-4xl font-bold font-swung drop-shadow-md">SUBTHEME 2: SEEKING</h2>
            <p className="opacity-70 mt-4">Section 3 / 4</p>
        </section>
    );
}

export function Subtheme3Section() {
    return (
        <section className="relative w-full min-h-[120vh] flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold font-swung drop-shadow-md">SUBTHEME 3: UNFOLDING</h2>
            <p className="opacity-70 mt-4">Section 4 / 4</p>
        </section>
    );
}