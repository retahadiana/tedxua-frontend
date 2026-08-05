import React from 'react';
import LogoItem from './LogoItem';
import rootImage from '@/assets/images/sponsorship/image.png';
import sponsorImage from '@/assets/images/sponsorship/Tolong 2.png';
import light1 from '@/assets/images/sponsorship/Ellipse 1.png';
import light2 from '@/assets/images/sponsorship/Tolong 16.png';
import light3 from '@/assets/images/sponsorship/Ellipse 4.png';

export default function SponsorsSection() {
    return (
        <section className="relative w-full flex flex-col items-center justify-center pt-[100px] pb-16 px-6 z-10 min-h-[900px]">
            {/* Background Image Akar */}
            <div 
                className="absolute top-[-100px] md:top-[-250px] left-0 w-full h-[120%] pointer-events-none z-[5]"
                style={{
                    backgroundImage: `url(${rootImage})`,
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Ambient Background Lights */}
            <img 
                src={light1} 
                alt="" 
                className="absolute top-0 left-0 pointer-events-none z-0" 
                style={{ width: '100%', height: '100%', transform: 'rotate(9deg)', transformOrigin: 'top left'}} 
            />
            <img 
                src={light2} 
                alt="" 
                className="absolute top-[-80px] left-1/2 pointer-events-none z-0 w-[949px] max-w-[150vw] opacity-70 mix-blend-screen" 
                style={{ transform: 'translateX(-50%) rotate(180deg)', transformOrigin: 'center' }} 
            />
            <img 
                src={light3} 
                alt="" 
                className="absolute top-[300px] left-0 pointer-events-none z-0" 
                style={{ width: '100%', height: '100%', transform: 'rotate(-13deg)', transformOrigin: 'top left'}} 
            />
            
            <h2 
                className="relative z-10 text-center mb-[80px] drop-shadow-xl"
                style={{
                    color: 'var(--Light-Beige, #FEF8E0)',
                    fontSize: 'clamp(80px, 12vw, 150px)', 
                    fontFamily: '"Swung Note", cursive, sans-serif',
                    fontWeight: '350',
                    lineHeight: '350px',
                    wordWrap: 'break-word',
                }}
            >
                SPONSORS
            </h2>

            <div className="relative flex flex-wrap justify-center gap-1 md:gap-1 z-10">
                <LogoItem src={sponsorImage} alt="Sponsor 1" />
                <LogoItem src={sponsorImage} alt="Sponsor 2" />
                <LogoItem src={sponsorImage} alt="Sponsor 3" />
            </div>
        </section>
    );
}
