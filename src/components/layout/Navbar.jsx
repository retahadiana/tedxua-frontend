import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import logoTedxUA from '@/assets/images/homepage/tedx navbar.png'
import { NAV_LINKS } from '@/utils/constants'
import { cn } from '@/utils/cn'

/**
 * Navbar utama TEDxUA (Responsive & Mobile-friendly).
 * - Desktop: Navigasi horizontal + Dropdown Hover + Sign In Tekstur Organik
 * - Mobile (< md): Tombol Hamburger + Dropdown Animasi Kebawah + Submenu Accordion Anak saat dipencet
 */
export default function Navbar() {
    const location = useLocation()

    // Otomatis scroll ke paling atas layar setiap kali pengguna berpindah halaman
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    const [openMenu, setOpenMenu] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [mobileSubmenus, setMobileSubmenus] = useState({})

    const handleEnter = (label) => setOpenMenu(label)
    const handleLeave = () => setOpenMenu(null)

    const isActivePath = (path) => {
        if (!path) return false
        if (path === '/') return location.pathname === '/'
        if (path === '/events/pre-event-1' && (location.pathname === '/pre-event-1' || location.pathname === '/events/pre-event-1')) return true
        if (path === '/events/pre-event-2' && (location.pathname === '/pre-event-2' || location.pathname === '/events/pre-event-2')) return true
        if (path === '/events/main-event' && (location.pathname === '/main-event' || location.pathname === '/events/main-event')) return true
        return location.pathname === path || location.pathname.startsWith(path + '/')
    }

    const isDropdownActive = (item) => {
        if (isActivePath(item.path)) return true
        return item.dropdown?.some((sub) => isActivePath(sub.path))
    }

    const toggleMobileSubmenu = (label) => {
        setMobileSubmenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }))
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setMobileSubmenus({})
    }

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-[#111111]/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            {/* SVG Filter untuk Efek Tekstur Garis Tepi Organik / Kasar */}
            <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
                <defs>
                    <filter id="rough-border" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* Bar Utama Header */}
            <div className="flex w-full items-center justify-between gap-4 md:gap-12 px-5 sm:px-8 md:px-14 lg:px-20 py-4 md:py-5">
                {/* Logo */}
                <Link to="/" onClick={closeMobileMenu} className="shrink-0">
                    <img
                        src={logoTedxUA}
                        alt="TEDx Universitas Airlangga"
                        className="h-[26px] sm:h-[30px] md:h-[32px] w-auto object-contain"
                    />
                </Link>

                {/* Navigasi Desktop (Tampil di layar md ke atas) */}
                <nav className="hidden md:flex w-full max-w-[760px] items-center justify-between font-essays text-sm md:text-base font-medium tracking-wide">
                    {/* Home */}
                    <Link
                        to="/"
                        className={cn(
                            "flex items-center gap-1 transition-colors hover:text-ted-red [text-shadow:0px_1px_2px_rgba(0,0,0,0.30)]",
                            isActivePath('/') ? "text-ted-red font-bold" : "text-white/95"
                        )}
                    >
                        <span className="text-lg leading-none font-bold">X</span>
                        <span>Home</span>
                    </Link>

                    {/* Item dengan dropdown: About & Events */}
                    {NAV_LINKS.filter((item) => item.dropdown).map((item) => {
                        const active = isDropdownActive(item)
                        return (
                            <div
                                key={item.label}
                                className="relative flex items-center"
                                onMouseEnter={() => handleEnter(item.label)}
                                onMouseLeave={handleLeave}
                            >
                                <button
                                    type="button"
                                    className={cn(
                                        "flex items-center gap-1.5 transition-colors hover:text-ted-red cursor-pointer",
                                        active ? "text-ted-red font-bold" : "text-white/95"
                                    )}
                                >
                                    <span>{item.label}</span>
                                    <ChevronDown
                                        size={12}
                                        className={cn(
                                            'transition-transform duration-200',
                                            (openMenu === item.label || active) && 'text-ted-red',
                                            openMenu === item.label && 'rotate-180'
                                        )}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openMenu === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-1/2 top-full mt-3 flex w-max -translate-x-1/2 flex-col gap-3 rounded-xl bg-[#0A0A0A]/95 px-6 py-4 shadow-[0_10px_25px_rgba(235,0,40,0.25)] backdrop-blur-md"
                                        >
                                            {/* Layer Garis Tepi Tekstur Merah untuk Dropdown */}
                                            <span
                                                className="absolute inset-0 rounded-xl border-[4px] border-ted-red pointer-events-none"
                                                style={{ filter: 'url(#rough-border)' }}
                                            />

                                            {/* Item Submenu */}
                                            <div className="relative z-10 flex flex-col gap-3">
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        to={sub.path}
                                                        className={cn(
                                                            "whitespace-nowrap text-sm transition-colors hover:text-ted-red",
                                                            isActivePath(sub.path) ? "text-ted-red font-bold" : "text-white/90"
                                                        )}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}

                    {/* Item tanpa dropdown */}
                    {NAV_LINKS.filter((item) => !item.dropdown).map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={cn(
                                "transition-colors hover:text-ted-red",
                                isActivePath(item.path) ? "text-ted-red font-bold" : "text-white/95"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Tombol Sign In Desktop (Tampil di md ke atas) */}
                <Link
                    to="/sign-in"
                    className="hidden md:inline-flex group relative shrink-0 items-center justify-center px-5 py-2.5 font-essays text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                    {/* Layer Garis Tepi Tekstur Merah */}
                    <span
                        className="absolute inset-0 rounded-xl border-[4px] border-ted-red group-hover:border-white transition-colors duration-300 pointer-events-none"
                        style={{ filter: 'url(#rough-border)' }}
                    />
                    <span className="relative z-10 text-white group-hover:text-ted-red transition-colors duration-300">
                        SIGN IN
                    </span>
                </Link>

                {/* Tombol Hamburger Mobile (Tampil khusus di layar HP / < md) */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle Mobile Menu"
                    className="flex md:hidden p-2 text-white hover:text-ted-red focus:outline-none transition-colors cursor-pointer"
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Menu Dropdown Mobile (Tampil meluncur ke bawah saat Hamburger dipencet) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/10 md:hidden flex flex-col px-6 py-5 gap-3 font-essays text-base font-medium tracking-wide shadow-2xl"
                    >
                        {/* 1. Home */}
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className={cn(
                                "flex items-center gap-1.5 py-1.5 transition-colors hover:text-ted-red",
                                isActivePath('/') ? "text-ted-red font-bold" : "text-white/95"
                            )}
                        >
                            <span className="text-lg leading-none font-bold">X</span>
                            <span>Home</span>
                        </Link>

                        {/* 2. Menu Item dengan Submenu Anak (About & Events) */}
                        {NAV_LINKS.filter((item) => item.dropdown).map((item) => {
                            const isSubOpen = !!mobileSubmenus[item.label]
                            const active = isDropdownActive(item)
                            return (
                                <div key={item.label} className="flex flex-col border-b border-white/5 pb-1">
                                    <button
                                        type="button"
                                        onClick={() => toggleMobileSubmenu(item.label)}
                                        className={cn(
                                            "flex items-center justify-between w-full py-2 hover:text-ted-red transition-colors text-left font-medium cursor-pointer",
                                            active ? "text-ted-red font-bold" : "text-white/95"
                                        )}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDown
                                            size={18}
                                            className={cn(
                                                'transition-transform duration-300 text-white/70',
                                                isSubOpen && 'rotate-180 text-ted-red',
                                                active && 'text-ted-red'
                                            )}
                                        />
                                    </button>

                                    {/* Anak Submenu yang muncul di bawahnya saat dipencet */}
                                    <AnimatePresence>
                                        {isSubOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden flex flex-col gap-2 pl-4 pt-1 pb-2 border-l-2 border-ted-red/40 ml-2 mt-1"
                                            >
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        to={sub.path}
                                                        onClick={closeMobileMenu}
                                                        className={cn(
                                                            "text-sm hover:text-ted-red transition-colors py-1",
                                                            isActivePath(sub.path) ? "text-ted-red font-bold" : "text-white/80"
                                                        )}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}

                        {/* 3. Menu Item tanpa Submenu */}
                        {NAV_LINKS.filter((item) => !item.dropdown).map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={closeMobileMenu}
                                className={cn(
                                    "hover:text-ted-red transition-colors py-2 border-b border-white/5",
                                    isActivePath(item.path) ? "text-ted-red font-bold" : "text-white/95"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* 4. Tombol Sign In Mobile */}
                        <div className="pt-3 pb-1 flex justify-center w-full">
                            <Link
                                to="/sign-in"
                                onClick={closeMobileMenu}
                                className="group relative w-full flex items-center justify-center px-6 py-3 font-essays text-sm font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
                            >
                                <span
                                    className="absolute inset-0 rounded-xl border-[4px] border-ted-red group-hover:border-white transition-colors duration-300 pointer-events-none"
                                    style={{ filter: 'url(#rough-border)' }}
                                />
                                <span className="relative z-10 text-white group-hover:text-ted-red transition-colors duration-300">
                                    SIGN IN
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}