import React from 'react';
import LogoItem from './LogoItem';
import sponsorImage from '@/assets/images/sponsorship/Tolong 2.png';

export default function MediaPartnersSection() {
    return (
        <section className="relative w-full flex flex-col items-center justify-center py-20 px-6 z-10">
            <div className="relative flex flex-col items-center mb-16">
                {/* Mascot / Title Placeholder */}
                <h2 className="font-essays text-5xl md:text-6xl font-bold text-[#F3EEDC] drop-shadow-lg text-center uppercase tracking-wider">
                    Media <br /> Partners
                </h2>
                {/* Akar decoration bisa ditambahkan di sekitar sini */}
            </div>

            <div className="flex flex-wrap justify-center gap-10 md:gap-16 z-10">
                <LogoItem />
                <LogoItem />
                <LogoItem />
            </div>
        </section>
    );
}
