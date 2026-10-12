import React from 'react';
import LogoItem    from './LogoItem';
import titleImage  from '@/assets/images/sponsorship/Group 1000004931.png';
import sponsorImage from '@/assets/images/sponsorship/Tolong 2.png';
import rootImage   from '@/assets/images/sponsorship/image.png';
import light1      from '@/assets/images/sponsorship/Ellipse 1.png';
import light2      from '@/assets/images/sponsorship/Tolong 16.png';
import light3      from '@/assets/images/sponsorship/Ellipse 4.png';

// ─── Component ────────────────────────────────────────────────────────────────

export default function SponsorsSection() {
    return (
        <section className="relative w-full flex flex-col items-center justify-start md:justify-center py-2 md:py-32 px-6 z-10 md:min-h-[900px]">

            {/* Background Image Akar */}
            <div
                className="absolute top-[-5%] md:top-[-200px] left-0 w-full h-[120%] pointer-events-none z-0 md:z-10"
                style={{
                    backgroundImage:    `url(${rootImage})`,
                    backgroundSize:     '100% auto',
                    backgroundPosition: 'center top',
                    backgroundRepeat:   'no-repeat',
                }}
            />

            {/* Ambient Background Lights */}
            <img
                src={light1}
                alt=""
                className="absolute top-[30%] left-0 pointer-events-none z-10"
                style={{ width: '100%', height: 'auto', transformOrigin: 'top left' }}
            />
            <img
                src={light2}
                alt=""
                className="absolute top-[-5%] left-1/2 pointer-events-none z-15 w-[60%] max-w-none opacity-70 mix-blend-screen"
                style={{ transform: 'translateX(-50%)', transformOrigin: 'center' }}
            />
            <img
                src={light3}
                alt=""
                className="absolute top-[35%] left-0 pointer-events-none z-0"
                style={{ width: '100%', height: 'auto', transformOrigin: 'top left' }}
            />

            {/* Judul sebagai gambar asset */}
            <img
                src={titleImage}
                alt="Sponsors"
                // ← UBAH `translate-x-[5%]` (geser kanan) atau `translate-x-[-5%]` (geser kiri) UNTUK MOBILE DI SINI
                className="relative z-30 mb-[10%] md:mb-[200px] mt-[5%] md:mt-[90px] translate-x-[5%] md:translate-x-10"
                style={{
                    display:   'block',
                    width:     '90%',
                    maxWidth:  '800px',
                }}
            />

            {/* Logo grid */}
            <div className="relative flex flex-wrap justify-center gap-0 md:gap-1 z-30">
                <LogoItem src={sponsorImage} alt="Sponsor 1" />
                <LogoItem src={sponsorImage} alt="Sponsor 2" />
                <LogoItem src={sponsorImage} alt="Sponsor 3" />
            </div>
        </section>
    );
}
