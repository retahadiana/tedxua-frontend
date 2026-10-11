import React from 'react';
import LogoItem from './LogoItem';
import titleImage from '@/assets/images/sponsorship/Group 1000004929.png';
import mascotImage from '@/assets/images/sponsorship/Group 1000004920.png';
import fireflies6 from '@/assets/images/sponsorship/RIE_FIREFLIES 6.png';
import akarImage from '@/assets/images/sponsorship/Group 1000004928.png';
import logoImage from '@/assets/images/sponsorship/Tolong 2.png';
import tolong7Image from '@/assets/images/sponsorship/Tolong 7.png';
import tolong16Image from '@/assets/images/sponsorship/Tolong 16.png';

// ─── Layout Config ────────────────────────────────────────────────────────────
// ✏️  Ubah nilai di sini untuk mengatur posisi akar & logo tanpa menyentuh JSX.

const LAYOUT_CONFIG = {

    akar: {
        marginTop: '-200px', // jarak akar dari judul (negatif = naik, positif = turun)
        translateX: '100px',  // geser kiri/kanan akar: positif = kanan, negatif = kiri
        maxWidth: '1000px', // lebar maksimum gambar akar
    },

    // Posisi setiap LogoItem relatif terhadap container akar.
    // Gunakan top/bottom/left/right dalam string CSS (mis. '10%', '80px').
    // translateX / translateY opsional untuk fine-tuning.
    logos: [
        {
            label: 'kiri',
            bottom: '30%',  // ← jarak dari bawah container akar
            left: '5%',   // ← jarak dari kiri container akar
            translateX: '0px',
            translateY: '0px',
        },
        {
            label: 'tengah',
            bottom: '40%',
            left: '50%',
            translateX: '-50%', // center horizontal
            translateY: '0px',
        },
        {
            label: 'kanan',
            bottom: '30%',
            right: '5%',   // ← jarak dari kanan container akar
            translateX: '0px',
            translateY: '0px',
        },
    ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function MediaPartnerTitle() {
    return (
        <div
            className="relative w-full flex justify-center"
            style={{ zIndex: 2 }}
        >
            <div className="relative inline-block w-[65%] md:w-[60%] max-w-[600px]">
                {/* Mascot — absolut di pojok kiri atas title */}
                <img
                    src={mascotImage}
                    alt="Media Partner mascot"
                    className="absolute w-[65%] md:w-[420px] top-[-40%] md:top-[-50%] left-[-25%] md:left-[-30%] z-10 pointer-events-none"
                />

                <img
                    src={fireflies6}
                    alt="Fireflies right"
                    className="absolute w-[20%] md:w-[150px] top-[50%] md:top-[50%] right-[-30%] md:right-[-45%] z-10 pointer-events-none"
                />

                {/* Judul sebagai gambar asset */}
                <img
                    src={titleImage}
                    alt="Media Partner"
                    style={{
                        display: 'block',
                        width: '100%',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
}

/**
 * Gambar akar + LogoItem di atasnya.
 * LogoItem diposisikan absolute dalam container akar — atur di LAYOUT_CONFIG.logos.
 */
function AkarWithLogos() {
    const { akar, logos } = LAYOUT_CONFIG;

    return (
        <div
            className="relative w-full flex justify-center mt-[-80px] md:mt-[-200px]"
        >
            {/* ── Tolong 16 Decoration (Di Tengah, Belakang Akar) ── */}
            <img
                src={tolong16Image}
                alt="Tolong 16 Decoration"
                className="absolute w-[120%] md:w-[1500px] left-[65%] md:left-[60%] top-[10%] md:top-[30%] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
            />

            {/* Akar image — zIndex 0, menjadi dasar stacking */}
            <img
                src={akarImage}
                alt=""
                aria-hidden="true"
                className="block relative z-0 w-full pointer-events-none translate-x-[5%] md:translate-x-[100px]"
                style={{
                    maxWidth: akar.maxWidth,
                }}
            />

            {/* LogoItem di atas akar — zIndex 2 */}
            {logos.map((logo) => (
                <div
                    key={logo.label}
                    style={{
                        position: 'absolute',
                        bottom: logo.bottom ?? 'auto',
                        top: logo.top ?? 'auto',
                        left: logo.left ?? 'auto',
                        right: logo.right ?? 'auto',
                        transform: `translateX(${logo.translateX ?? '0px'}) translateY(${logo.translateY ?? '0px'})`,
                        zIndex: 2,
                    }}
                >
                    <LogoItem src={logoImage} alt={`Media partner — ${logo.label}`} />
                </div>
            ))}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaPartnersSection() {
    return (
        <section className="relative z-10 flex w-full flex-col items-center justify-center px-6 pt-16 pb-2 md:py-32">
            {/* ── Tolong 7 Decoration (Pojok Kiri Section) ── */}
            <img
                src={tolong7Image}
                alt="Tolong 7 Decoration"
                className="absolute w-[15%] md:w-[200px]"
                style={{
                    left: '0px',
                    top: '0px',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <div className="relative flex w-full flex-col items-center">
                <MediaPartnerTitle />
                <AkarWithLogos />
            </div>
        </section>
    );
}
