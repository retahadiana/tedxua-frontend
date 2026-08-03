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
        <footer className={cn("w-full border-t border-white/10 bg-[#1A100B] px-6 sm:px-10 md:px-14 lg:px-20 py-8", className)}>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Kiri: logo + deskripsi */}
                <div className="max-w-md">
                    <img src={logoTedxUA} alt="TEDx Universitas Airlangga" className="h-7 sm:h-8 w-auto" />
                    <p className="mt-3 font-gordita text-xs sm:text-sm leading-relaxed text-white/70">
                        TEDxUniversitasAirlangga is organized by an independent community
                        within the scope of BEM FEB Universitas Airlangga to spread new
                        ideas and spark conversation at the university level.
                    </p>
                </div>

                {/* Kanan: social + tagline */}
                <div className="flex flex-col items-start gap-3 md:items-end">
                    <span className="font-essays text-xs sm:text-sm font-semibold uppercase tracking-wide text-ted-accent">
                        Connect With Us
                    </span>
                    <div className="flex gap-3.5">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-white/80 transition-colors hover:text-ted-accent"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                    <span className="font-essays text-[11px] sm:text-xs uppercase tracking-widest text-cream/60">
                        Beneath What We See: The Mycelium
                    </span>
                </div>
            </div>

            {/* Bawah: copyright */}
            <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-center font-gordita text-[11px] sm:text-xs text-white/50">
                <p>© 2026 All Rights Reserved</p>
                <p className="mt-1">
                    This independent <span className="text-ted-accent font-medium">TEDx</span> event is operated under license from{' '}
                    <span className="text-ted-accent font-medium">TED</span>
                </p>
            </div>
        </footer>
    )
}