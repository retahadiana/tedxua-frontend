import React from 'react'
import iconInstagram from '@/assets/icons/Social Icons.svg'
import iconLinkedin from '@/assets/icons/Social Icons (1).svg'
import iconTiktok from '@/assets/icons/Social Icons (2).svg'
import iconX from '@/assets/icons/Social Icons (3).svg'
import iconEmail from '@/assets/icons/Vector.svg'
import logoTedxUA from '@/assets/icons/tedx unair putih (1) 2.svg'
import { cn } from '@/utils/cn'

/**
 * Footer
 * Sumber: Image 8 (screenshot only, belum ada kode Dev Mode).
 */
const SOCIALS = [
    { src: iconInstagram, href: '#', label: 'Instagram' },
    { src: iconLinkedin, href: '#', label: 'LinkedIn' },
    { src: iconTiktok, href: '#', label: 'TikTok' },
    { src: iconX, href: '#', label: 'X' },
    { src: iconEmail, href: '#', label: 'Email' },
]

export default function Footer({ className }) {
    return (
        <footer className={cn("relative z-20 w-full pointer-events-none bg-gradient-to-b from-transparent via-black/80 to-black pt-20 pb-8 px-6 sm:px-10 md:px-14 lg:px-20", className)}>
            <div className="mx-auto flex max-w-7xl flex-col-reverse gap-12 md:flex-row md:items-start md:justify-between">
                {/* Kiri: logo + deskripsi */}
                <div className="max-w-lg pointer-events-auto flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
                    <img src={logoTedxUA} alt="TEDx Universitas Airlangga" className="h-7 sm:h-8 md:h-10 w-auto mb-2 md:mb-0" />
                    <p className="mt-4 max-w-[244px] md:max-w-none font-gordita text-[9px] text-white font-normal break-words md:text-[16px]">
                        TEDxUniversitasAirlangga is organized by an independent community within the scope of 
                        BEM FEB Universitas Airlangga to spread new ideas and spark conversation at the 
                        university level.
                    </p>
                </div>

                {/* Kanan: social + tagline */}
                <div className="flex flex-col items-center gap-4 md:items-end pointer-events-auto w-full md:w-auto">
                    <span className="font-essays text-[10px] font-medium uppercase text-[#FD2A05] break-words md:text-[18px]">
                        Connect With Us
                    </span>
                    <div className="flex gap-3 md:gap-3.5">
                        {SOCIALS.map(({ src, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="opacity-100 md:opacity-80 transition-all hover:opacity-100 hover:scale-110"
                            >
                                <img src={src} alt={label} className="w-6 h-6 md:w-[18px] md:h-[18px] object-contain" />
                            </a>
                        ))}
                    </div>
                    <span className="font-swungnote text-[15px] font-normal uppercase text-white break-words mt-2 md:mt-0">
                        Beneath What We See: The Mycelium
                    </span>
                </div>
            </div>

            {/* Bawah: copyright */}
            <div className="mx-auto mt-10 max-w-7xl border-transparent md:border-white/10 md:border-t md:pt-5 text-center font-gordita text-[10px] leading-[23px] text-white uppercase break-words md:text-[12px] pointer-events-auto">
                <p>©2026 All Rights Reserved</p>
                <p className="mt-1">
                    This independent <span className="text-[#FD2A05] font-black">TEDx</span> event is operated <br className="md:hidden" />
                    <span className="italic md:not-italic">under license from</span>{' '}
                    <span className="text-[#FD2A05] font-black">TED</span>
                </p>
            </div>
        </footer>
    )
}