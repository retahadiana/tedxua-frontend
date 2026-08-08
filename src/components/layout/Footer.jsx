import React from 'react'
import { Instagram, Linkedin, Music2, Twitter, Mail } from 'lucide-react'
import logoTedxUA from '@/assets/images/homepage/tedx navbar.png'
import { cn } from '@/utils/cn'

/**
 * Footer
 * Sumber: Image 8 (screenshot only, belum ada kode Dev Mode).
 * Ikon TikTok & X di lucide-react tidak punya versi resmi brand-nya,
 * jadi sementara pakai Music2 (mirip not/musik, untuk TikTok) & Twitter
 * (bentuk paling dekat untuk "X") — ganti dengan SVG asli kalau ada asetnya.
 */
const SOCIALS = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Music2, href: '#', label: 'TikTok' },
    { icon: Twitter, href: '#', label: 'X' },
    { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer({ className }) {
    return (
        <footer className={cn("relative z-20 w-full bg-gradient-to-b from-black via-black/95 to-black pt-20 pb-8 px-6 sm:px-10 md:px-14 lg:px-20", className)}>
            <div className="mx-auto flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
                {/* Kiri: logo + deskripsi */}
                <div className="max-w-xl">
                    <img src={logoTedxUA} alt="TEDx Universitas Airlangga" className="h-10 sm:h-12 md:h-14 w-auto" />
                    <p className="mt-4 font-gordita text-sm sm:text-base md:text-lg leading-relaxed text-white/80">
                        TEDxUniversitasAirlangga is organized by an independent community
                        within the scope of BEM FEB Universitas Airlangga to spread new
                        ideas and spark conversation at the university level.
                    </p>
                </div>

                {/* Kanan: social + tagline */}
                <div className="flex flex-col items-start gap-4 md:items-end">
                    <span className="font-essays text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide text-ted-accent">
                        Connect With Us
                    </span>
                    <div className="flex gap-5">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-white/80 transition-colors hover:text-ted-accent"
                            >
                                <Icon size={22} />
                            </a>
                        ))}
                    </div>
                    <span className="font-essays text-sm sm:text-base uppercase tracking-widest text-cream/60">
                        Beneath What We See: The Mycelium
                    </span>
                </div>
            </div>

            {/* Bawah: copyright */}
            <div className="mx-auto mt-10 w-full max-w-[1600px] border-t border-white/10 pt-7 text-center font-gordita text-sm sm:text-base text-white/50">
                <p>© 2026 All Rights Reserved</p>
                <p className="mt-1">
                    This independent <span className="text-ted-accent font-medium">TEDx</span> event is operated under license from{' '}
                    <span className="text-ted-accent font-medium">TED</span>
                </p>
            </div>
        </footer>
    )
}