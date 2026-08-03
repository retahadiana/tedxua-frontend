import React from 'react'
import {
    HeroSection,
    MascotMylo,
    WhatIsTedx,
    PreviousEvent,
    GrandThemeMycelium,
    Subthemes,
    SubthemeCarousel,
} from './components'

/**
 * Halaman utama (scroll-down per section), urutan mengikuti Figma:
 * 1. Hero  2. Mylo  3. About (stub)  4. Previous Event (stub)
 * 5. Grand Theme  6. Subtheme  7. Card Carousel (nama sementara)
 */
export default function LandingPage() {
    return (
        <div className="flex flex-col w-full max-w-full overflow-x-clip">
            <HeroSection />
            <MascotMylo />
            <WhatIsTedx />
            <PreviousEvent />
            <GrandThemeMycelium />
            <Subthemes />
            <SubthemeCarousel />
        </div>
    )
}