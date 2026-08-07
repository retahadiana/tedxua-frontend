import React from 'react';
import AkarBwsSection1 from '@/assets/images/subtheme/akar-bws-section1.png';
import BwsTeksSection1 from '@/assets/images/subtheme/bws-tekss-section1.png';
import FireflyAtas from '@/assets/images/subtheme/firefly-bws-section1-atas.png';
import FireflyKanan from '@/assets/images/subtheme/firefly-bws-section1-kanan.png';
import FireflyKiri from '@/assets/images/subtheme/firefly-bws-section1-kiri.png';
import ShadowSection1 from '@/assets/images/subtheme/shadow-section1.png';
import TEDxSection1 from '@/assets/images/subtheme/TEDx-section1.png';
import ThisYearSection1 from '@/assets/images/subtheme/thisyear-section1.png';

// Section 2 (Subtheme 1: Becoming) Assets
import AkarSection2 from '@/assets/images/subtheme/akar-section2.png';
import CahayaSection2 from '@/assets/images/subtheme/cahaya-section2.png';
import MyloBingungSection2 from '@/assets/images/subtheme/mylo-bingung-section2.png';
import ShadowSection2 from '@/assets/images/subtheme/shadow-section2.png';
import SoulSection2 from '@/assets/images/subtheme/soul-section2.png';
import TgobSection2 from '@/assets/images/subtheme/tgob-section2.png';
import TittleSubtheme1Section2 from '@/assets/images/subtheme/tittle-subtheme1-section2.png';
import TittleboxSubtheme1Section2 from '@/assets/images/subtheme/tittlebox-subtheme1-section2.png';

// Section 3 (Subtheme 2: Seeking) Assets
import AwanSection3 from '@/assets/images/subtheme/awan-section3.png';
import MyloSection3 from '@/assets/images/subtheme/mylo-section3.png';
import PelangiSection3 from '@/assets/images/subtheme/pelangi-section3.png';
import ShadowSection3 from '@/assets/images/subtheme/shadow-section3.png';
import StringSection3 from '@/assets/images/subtheme/string-section3.png';
import TittleSubtheme2Section3 from '@/assets/images/subtheme/tittle-subtheme2-section3.png';
import TittleboxSubtheme2Section3 from '@/assets/images/subtheme/tittlebox-subtheme2-section3.png';

export function MainThemeSection() {
    return (
        <section className="relative w-full min-h-[105vh] flex flex-col items-center justify-start pt-[120px] pb-24">
            {/* 1. Root / Vine Overlay (z-0) - reduced opacity for subtle texture */}
            <img
                src={AkarBwsSection1}
                alt="Akar Background"
                className="absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top scale-[1.1] origin-top opacity-65 pointer-events-none z-0"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
            />

            {/* 5. Fireflies (z-40) - Top-right subtle accent */}
            <img
                src={FireflyAtas}
                alt="Firefly Top Accent"
                className="absolute right-[8%] md:right-[14%] top-[5%] md:top-[7%] w-[80px] md:w-[130px] pointer-events-none z-40"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)',
                    maskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)'
                }}
            />

            {/* 5. Fireflies (z-40) - Left */}
            <img
                src={FireflyKiri}
                alt="Firefly Left"
                className="absolute -left-16 md:-left-28 top-[30%] md:top-[32%] w-[270px] md:w-[440px] pointer-events-none z-40"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at 30% 50%, black 45%, transparent 85%)',
                    maskImage: 'radial-gradient(circle at 30% 50%, black 45%, transparent 85%)'
                }}
            />

            {/* 5. Fireflies (z-40) - Right */}
            <img
                src={FireflyKanan}
                alt="Firefly Right"
                className="absolute -right-12 md:-right-24 top-[16%] md:top-[18%] w-[250px] md:w-[410px] pointer-events-none z-40"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 45%, transparent 85%)',
                    maskImage: 'radial-gradient(circle at 70% 50%, black 45%, transparent 85%)'
                }}
            />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 flex flex-col items-center mt-6">

                {/* 6. Text (z-50) - Top Text: This Year Main Theme */}
                <img
                    src={ThisYearSection1}
                    alt="This Year Main Theme"
                    className="w-[200px] md:w-[350px] mt-4 mb-8 relative z-50"
                />

                {/* Center Group: Title, Shadow, and Big X */}
                <div className="relative flex flex-col items-center w-full">

                    {/* 2. Strengthened Brown Atmosphere Shadow (z-10) - radial mask for 360-degree seamless fade */}
                    <img
                        src={ShadowSection1}
                        alt="Shadow"
                        className="absolute top-[520px] md:top-[640px] left-1/2 -translate-x-1/2 w-[155vw] md:w-[125vw] max-w-[1920px] opacity-100 contrast-140 brightness-105 pointer-events-none z-10"
                        style={{
                            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 95%)',
                            maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 95%)'
                        }}
                    />

                    {/* 3. Big X above vines (z-20) - clean rendering without PNG bounding box drop-shadow */}
                    <img
                        src={TEDxSection1}
                        alt="Big X"
                        className="absolute top-[80px] md:top-[120px] left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] object-contain opacity-95 pointer-events-none z-20"
                    />

                    {/* 4. Title (z-30) */}
                    <img
                        src={BwsTeksSection1}
                        alt="Beneath What We See The Mycelium"
                        className="w-[95%] md:w-[940px] relative z-30"
                    />

                    {/* 6. Text (z-50) - Description Paragraphs */}
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
        <section className="relative w-full min-h-[220vh] flex flex-col items-center justify-start pt-44 md:pt-[320px] pb-52 overflow-visible">
            {/* 1. akar-section2.png (Roots - placed at the very back z-5) */}
            <img 
                src={AkarSection2} 
                alt="Akar Subtheme 1" 
                className="absolute top-[210px] md:top-[300px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1350px] object-contain pointer-events-none z-5" 
            />

            {/* 2. soul-section2.png (Soul - layer z-25 placed IN FRONT of root layer z-20, increased opacity) */}
            <img 
                src={SoulSection2} 
                alt="Soul Silhouette" 
                className="absolute top-[380px] md:top-[500px] left-1/2 -translate-x-1/2 w-[650px] md:w-[980px] object-contain opacity-80 brightness-110 contrast-110 pointer-events-none z-25" 
            />

            {/* 3. cahaya-section2.png (Fireflies - layer z-28 behind main content z-30) */}
            <img 
                src={CahayaSection2} 
                alt="Cahaya Subtheme 1" 
                className="absolute top-[290px] md:top-[410px] left-1/2 -translate-x-1/2 w-[100vw] max-w-[1400px] object-contain opacity-80 pointer-events-none z-28" 
                style={{
                    mixBlendMode: 'screen'
                }}
            />

            {/* Main Content Container (Title -> Becoming -> Text) */}
            <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center">
                
                {/* 5, 6, 7. Title Box + Mylo + SUBTHEME 1 */}
                <div className="relative flex items-center justify-center mt-16 md:mt-28">
                    {/* Title Box */}
                    <img 
                        src={TittleboxSubtheme1Section2} 
                        alt="Subtheme 1 Title Box" 
                        className="w-[290px] md:w-[400px] object-contain z-30" 
                    />

                    {/* "SUBTHEME 1" Text */}
                    <img 
                        src={TittleSubtheme1Section2} 
                        alt="SUBTHEME 1" 
                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] md:w-[275px] object-contain z-30" 
                    />

                    {/* Mylo (overlapping top-left corner) */}
                    <img 
                        src={MyloBingungSection2} 
                        alt="Mylo" 
                        className="absolute -top-8 -left-6 md:-top-11 md:-left-8 w-[70px] md:w-[95px] object-contain z-40 drop-shadow-md" 
                    />
                </div>

                {/* 8. "The Gardeners of Becoming" Title */}
                <img 
                    src={TgobSection2} 
                    alt="The Gardeners of Becoming" 
                    className="w-[98%] max-w-[1100px] md:max-w-[1180px] mt-6 md:mt-10 object-contain drop-shadow-xl z-30" 
                />

                {/* 9. Left and Right Text Blocks with generous vertical spacing */}
                <div className="w-full flex flex-col mt-16 md:mt-24 z-30 space-y-16 md:space-y-24">
                    {/* Left Text Block */}
                    <div className="w-full max-w-[560px] md:max-w-[620px] lg:max-w-[660px] self-start ml-2 md:ml-6 lg:ml-12">
                        <p className="text-sm md:text-base leading-relaxed text-[#F0F0F0] font-medium drop-shadow-md">
                            <span className="text-[#FF8A00] font-bold text-lg md:text-xl mr-0.5">D</span>idalam hidup yang fast paced, instan dan things come and go, kita sering kali merasa hal yang kita lakukan itu sia-sia dan tidak berdampak. Melakukan sesuatu ya karna kewajiban, melakukan sesuatu karna just because we want to do it. Melakukan sesuatu tanpa melihat apa hal tanpa melihat kedepannya seperti apa. hal ini membuat kita menjadi lebih terisolasi, tidak percaya diri dan rendah diri.
                        </p>
                    </div>

                    {/* Right Text Block */}
                    <div className="w-full max-w-[560px] md:max-w-[620px] lg:max-w-[660px] self-end mr-2 md:mr-6 lg:mr-12">
                        <p className="text-sm md:text-base leading-relaxed text-[#F0F0F0] font-medium drop-shadow-md">
                            <span className="text-[#FF8A00] font-bold text-lg md:text-xl mr-0.5">P</span>adahal banyak hal kecil yang kita lakukan itu berdampak juga ke orang lain. ketika kita merasa hal yang kita lakukan itu hanya karna kewajiban, atau karna kita kepengen aja- tanpa kita sadari itu berdampak ke orang lain. Sesuatu yang kita anggap remeh terkadang berefek besar.
                        </p>
                    </div>
                </div>

            </div>

            {/* 10. shadow-section2.png (Bottom transition of Section 2 into Section 3 - balanced opacity & smooth gradient) */}
            <img 
                src={ShadowSection2} 
                alt="Shadow Section 2" 
                className="absolute bottom-[-290px] md:bottom-[-420px] left-1/2 -translate-x-1/2 w-[155vw] md:w-[125vw] max-w-[1920px] opacity-95 contrast-150 brightness-105 pointer-events-none z-10" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 95%)',
                    maskImage: 'linear-gradient(to bottom, black 45%, transparent 95%)'
                }}
            />
        </section>
    );
}

export function Subtheme2Section() {
    return (
        <section className="relative w-full min-h-[220vh] flex flex-col items-center justify-start pt-0 md:pt-2 pb-64 overflow-visible">
            {/* 1. pelangi-section3.png (Rainbow - z-5, gradient masked so top arc and bottom tip fade out smoothly with no offset line) */}
            <img 
                src={PelangiSection3} 
                alt="Pelangi Subtheme 2" 
                className="absolute top-[-110px] md:top-[-150px] left-[-5%] md:left-[-2%] w-[88vw] max-w-[1300px] object-contain pointer-events-none z-5" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 98%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 98%)'
                }}
            />

            {/* 2. awan-section3.png (Clouds - z-8, both top & bottom edges cropped cleanly with maskImage so it stays inside Section 3) */}
            <img 
                src={AwanSection3} 
                alt="Awan Subtheme 2" 
                className="absolute top-[-180px] md:top-[-160px] left-1/2 -translate-x-1/2 w-[115vw] md:w-[108vw] max-w-[1920px] object-contain pointer-events-none z-8" 
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 62%, transparent 85%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 62%, transparent 85%)'
                }}
            />

            {/* Main Content Container (Title Box -> Mylo -> Subtheme 2 -> STRING -> Left Text) */}
            <div className="relative z-30 w-full max-w-[1320px] mx-auto px-4 md:px-8 flex flex-col items-center">
                
                {/* 3, 4, 5. Title Box + Mylo + SUBTHEME 2 (starts right underneath shadow-section2 transition) */}
                <div className="relative flex items-center justify-center mt-0 md:mt-1">
                    {/* Title Box (z-30) */}
                    <img 
                        src={TittleboxSubtheme2Section3} 
                        alt="Subtheme 2 Title Box" 
                        className="w-[290px] md:w-[400px] object-contain z-30" 
                    />

                    {/* "SUBTHEME 2" Text (z-30) */}
                    <img 
                        src={TittleSubtheme2Section3} 
                        alt="SUBTHEME 2" 
                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[200px] md:w-[275px] object-contain z-30" 
                    />

                    {/* Mylo (z-40 - ~100px desktop overlapping top-right corner of title box) */}
                    <img 
                        src={MyloSection3} 
                        alt="Mylo Seeking" 
                        className="absolute -top-8 -right-6 md:-top-11 md:-right-8 w-[75px] md:w-[100px] object-contain z-40" 
                    />
                </div>

                {/* 6. "THE INVISIBLE STRING" Title (z-30 - 82-85% width) */}
                <img 
                    src={StringSection3} 
                    alt="The Invisible String" 
                    className="w-[84%] max-w-[900px] md:max-w-[980px] mt-6 md:mt-10 object-contain z-30" 
                />

                {/* 7. Text Block on Left Side (z-30 - shifted slightly lower with distinct drop shadow) */}
                <div className="w-full flex flex-col mt-22 md:mt-36 z-30">
                    <div className="w-full max-w-[560px] md:max-w-[620px] lg:max-w-[660px] self-start ml-2 md:ml-6 lg:ml-12 space-y-6 md:space-y-8">
                        <p className="text-sm md:text-base leading-relaxed text-[#FFFFFF] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                            <span className="text-[#6BB6FF] font-bold text-lg md:text-xl mr-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">S</span>esuatu saat kita sadar bahwa hal kecil yang kita lakukan itu sebenarnya tidak se remeh itu. Hal yang kita lakukan itu bisa sangat berdampak kepada orang lain. Membuat kita sadar bahwa sebagai manusia kita dapat mendapatkan kebaikan, memberi kebaikan bahkan menjadi kebaikan itu sendiri.
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-[#FFFFFF] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                            <span className="text-[#6BB6FF] font-bold text-lg md:text-xl mr-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">M</span>elihat manusia bukan lagi sebagai individu kecil tetapi sebagai makhluk sosial yang setiap pilihan kita itu berdampak kepada orang lain. Rasa sadar bahwa kita itu berdampak membuat kita menjadi lebih percaya diri dan memboost kita untuk berbuat dan mengajak orang lain untuk melakukan kebaikan, baik secara sadar maupun tidak sadar.
                        </p>
                    </div>
                </div>

            </div>

            {/* 8. shadow-section3.png (Rendered in front of clouds z-25 > z-20 to hide bottom part of clouds cleanly into Section 4) */}
            <img 
                src={ShadowSection3} 
                alt="Shadow Section 3" 
                className="absolute bottom-[-290px] md:bottom-[-420px] left-1/2 -translate-x-1/2 w-[160vw] md:w-[130vw] max-w-[1920px] object-contain opacity-95 pointer-events-none z-25" 
            />
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