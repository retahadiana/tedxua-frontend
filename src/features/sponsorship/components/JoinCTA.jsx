import React, { useState } from 'react';
import tedxTitleImage from '@/assets/images/sponsorship/Group 1000004927.png';
import mushroomImage  from '@/assets/images/sponsorship/Group 1000004926.png';
import fireflies8     from '@/assets/images/sponsorship/RIE_FIREFLIES 8.png';
import objectImage    from '@/assets/images/sponsorship/Object.png';
import tolong21Image  from '@/assets/images/sponsorship/Tolong 21.png';

// ─── Style tokens (sesuai referensi Figma) ────────────────────────────────────

const FONT_ESSAYS = 'Essays1743, "Essays 1743", Georgia, serif';

const S_JOIN = {
    color:       '#FEF8E0',
    fontFamily:  FONT_ESSAYS,
    fontWeight:  '600',
    wordWrap:    'break-word',
    display:     'inline',
    whiteSpace:  'nowrap',
};

const S_BODY = {
    color:      '#F6EBE7',
    fontFamily: FONT_ESSAYS,
    fontWeight: '400',
    wordWrap:   'break-word',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function JoinCTA() {
    const [emailHovered, setEmailHovered] = useState(false);

    return (
        <section className="relative w-full z-20 py-2 md:py-32 mt-[-80px] md:mt-[-250px]">

            <div className="relative z-10 w-full px-6 md:px-16">

                {/* Row 1: "Join The" + TEDx Universitas Airlangga logo */}
                <div
                    style={{
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        gap:            '10px',
                        flexWrap:       'nowrap'
                    }}
                >
                    <div className="relative flex items-center">
                        {/* RIE_FIREFLIES 8 — absolut di samping kiri Join The */}
                        <img
                            src={fireflies8}
                            alt="Fireflies left"
                            className="absolute w-[50%] md:w-[100px]"
                            style={{
                                right:         '100%',     
                                marginRight:   '10px',
                                top:           '-50%',
                                zIndex:        10,
                                pointerEvents: 'none',
                            }}
                        />
                        <span className="text-[19px] md:text-[60px] leading-none whitespace-nowrap" style={{ ...S_JOIN, flexShrink: 0 }}>Join The</span>
                    </div>
                    
                    <img
                        src={tedxTitleImage}
                        alt="TEDx Universitas Airlangga"
                        className="h-[5vh] md:h-[150px] w-auto shrink-0 -translate-y-[20%] md:-translate-y-8"
                        style={{
                            pointerEvents: 'none',
                        }}
                    />
                </div>

                {/* Body text combined */}
                <p className="text-[16px] md:text-[40px] leading-normal md:leading-[55px] text-center mb-[50px] md:mb-[100px]" style={S_BODY}>
                    Let's collaborate Sponsor or partner with TEDxUniversitasAirlangga by contacting us at
                    <a
                        href="mailto:financetedxunair@gmail.com"
                        className="ml-3 md:ml-3"
                        style={{
                            ...S_BODY,
                            background:           emailHovered ? 'none' : 'linear-gradient(to right, #680202ff 0%, #FF2B06 70%)',
                            WebkitBackgroundClip: emailHovered ? 'border-box' : 'text',
                            WebkitTextFillColor:  emailHovered ? 'initial' : 'transparent',
                            color:                emailHovered ? '#F6EBE7' : '#FF2B06',
                            textDecoration:       emailHovered ? 'underline' : 'none',
                            cursor:               'pointer',
                            display:              'inline-block', // ensures padding/margins apply correctly if needed
                        }}
                        onMouseEnter={() => setEmailHovered(true)}
                        onMouseLeave={() => setEmailHovered(false)}
                    >
                        financetedxunair@gmail.com
                    </a>
                </p>
            </div>

            {/* ── Object Decoration (Pojok Kiri Bawah) ── */}
            <img
                src={objectImage}
                alt="Decoration Object"
                className="w-[12%] md:w-[150px] bottom-[10%] md:bottom-[300px]"
                style={{
                    position:      'absolute',
                    left:          '0px',    // ← GESER KANAN KIRI (makin besar angkanya, makin ke kanan)
                    zIndex:        -1,         // Posisi di atas jamur (z-index: -1)
                    pointerEvents: 'none',
                }}
            />

            {/* ── Tolong 21 Decoration (Pojok Kanan Bawah) ── */}
            <img
                src={tolong21Image}
                alt="Tolong 21 Decoration"
                className="w-[30%] md:w-[400px] bottom-[10%] md:bottom-[350px]"
                style={{
                    position:      'absolute',
                    right:         '0px',     // ← GESER KANAN KIRI (makin besar angkanya, makin menjauh ke kiri)
                    zIndex:        10,        // Posisi sejajar/di atas jamur
                    pointerEvents: 'none',
                }}
            />

            {/* ── Mushroom / grass decoration ── */}
            {/* z-index dibuat -1 agar posisinya di belakang footer, dan 
                margin bawah negatif berfungsi "menarik" footer ke atas menimpa gambar ini. */}
            <div
                className="relative w-full mt-[1%] mb-[-44%] md:mb-[-33%]"
                style={{ zIndex: -1 }}
            >
                <img
                    src={mushroomImage}
                    alt=""
                    aria-hidden="true"
                    style={{
                        width:                '100%',
                        display:              'block',
                        pointerEvents:        'none',
                        WebkitMaskImage:      'linear-gradient(to bottom, black 70%, transparent 100%)',
                        maskImage:            'linear-gradient(to bottom, black 70%, transparent 100%)',
                    }}
                />
            </div>

        </section>
    );
}
