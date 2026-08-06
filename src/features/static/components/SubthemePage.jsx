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

    // Exact gradient from Figma export
    const backgroundGradient = {
        background: `linear-gradient(0deg, rgba(150, 206, 162, 1) 1%, rgba(239, 206, 173, 1) 5%, rgba(204, 135, 63, 1) 19%, rgba(54, 121, 75, 1) 34%, rgba(115, 145, 106, 1) 38%, rgba(186, 195, 151, 1) 41%, rgba(38, 58, 31, 1) 56%, rgba(58, 91, 47, 1) 68%, rgba(162, 156, 35, 1) 78%, rgba(203, 196, 41, 1) 87%, rgba(64, 94, 49, 1) 94%)`
    };

    return (
        <div 
            className="w-full min-h-screen relative text-white font-gordita overflow-x-hidden" 
            style={backgroundGradient}
        >
            {/* Nav */}
            <div className="absolute top-0 w-full z-50">
                <Navbar />
            </div>

            {/* Content Container */}
            <div className="w-full relative pb-12 flex flex-col items-center">
                <MainThemeSection />
                <Subtheme1Section />
                <Subtheme2Section />
                <Subtheme3Section />
            </div>
            
            <Footer />
        </div>
    );
}
