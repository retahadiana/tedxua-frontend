import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SponsorsSection from './SponsorsSection';
import MediaPartnersSection from './MediaPartnersSection';
import JoinCTA from './JoinCTA';

export default function SponsorshipPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(359deg, #AC0003 -5.39%, #161312 93.88%)'}}>
            <Navbar />
            
            <main className="flex-1 flex flex-col relative w-full pt-16"> 
                {/* Ambient glow in the background */}
                <div className="fixed inset-0 pointer-events-none z-0 flex justify-center items-center opacity-30">
                     <div className="w-[80vw] h-[80vh] bg-red-900/50 rounded-full blur-[120px]"></div>
                </div>

                <SponsorsSection />
                <MediaPartnersSection />
                <JoinCTA />
            </main>

            <Footer />
        </div>
    );
}
