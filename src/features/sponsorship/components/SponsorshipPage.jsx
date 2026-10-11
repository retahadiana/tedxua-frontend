import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SponsorsSection from './SponsorsSection';
import MediaPartnersSection from './MediaPartnersSection';
import JoinCTA from './JoinCTA';

export default function SponsorshipPage() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ position: 'relative' }}>
            {/* Fixed background that stays while scrolling */}
            <div 
                className="fixed inset-0 -z-10"
                style={{
                    background: 'linear-gradient(356deg, var(--Light-Brown, #DE9B55) 32%, var(--Brown, #4B2D22) 61%, #161312 80%)',
                }} 
            />

            <Navbar />
            
            <main className="flex-1 flex flex-col relative w-full pt-16"> 
                {/* Ambient glow in the background */}
                <div className="fixed inset-0 pointer-events-none z-0 flex justify-center items-center opacity-30">
                     <div className="w-[80vw] h-[80vh] bg-[#4B2D22] rounded-full blur-[120px]"></div>
                </div>

                <SponsorsSection />
                <MediaPartnersSection />
                <JoinCTA />
            </main>

            <Footer />
        </div>
    );
}
