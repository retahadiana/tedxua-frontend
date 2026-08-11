import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    MainThemeSection,
    Subtheme1Section,
    Subtheme2Section,
    Subtheme3Section
} from './SubthemeSections';

export default function SubthemePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Seamless gradient flow matching original Figma transition
    const backgroundGradient = {
        background: `linear-gradient(0deg, #96CEA2 0%, #EFCEAD 4%, #CC873F 19%, #36794B 35%, #73916A 39%, #BAC397 43%, #263A1F 59%, #3A5B2F 72%, #A29C23 82%, #CBC429 88%, #386131 92%, #2C4F26 96%, #23411D 100%)`
    };

    return (
        <div
            className="w-full min-h-screen relative text-white font-gordita overflow-clip"
            style={backgroundGradient}
        >
            {/* Nav */}
            <div className="absolute top-0 w-full z-[100]">
                <Navbar />
            </div>

            {/* Content Container */}
            <div className="w-full relative flex flex-col items-center">
                <MainThemeSection />
                <Subtheme1Section />
                <Subtheme2Section />
                <Subtheme3Section />
            </div>

            <Footer />
        </div>
    );
}
