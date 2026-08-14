import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, LogOut } from 'lucide-react'
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
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "")
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    // Otomatis scroll ke paling atas layar setiap kali pengguna berpindah halaman & update auth state
    useEffect(() => {
        window.scrollTo(0, 0)
        setUserEmail(localStorage.getItem("userEmail") || "")
    }, [location.pathname])

    useEffect(() => {
        const updateAuth = () => {
            setUserEmail(localStorage.getItem("userEmail") || "")
        }
        window.addEventListener("auth-change", updateAuth)
        window.addEventListener("storage", updateAuth)
        return () => {
            window.removeEventListener("auth-change", updateAuth)
            window.removeEventListener("storage", updateAuth)
        }
    }, [])

    const confirmLogout = () => {
        localStorage.removeItem("userEmail")
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setUserEmail("")
        setIsLogoutModalOpen(false)
        window.dispatchEvent(new Event("auth-change"))
    }

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
            <div className="flex w-full items-center justify-between gap-3 lg:gap-6 xl:gap-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 py-3.5 md:py-4">
                {/* Logo */}
                <Link to="/" onClick={closeMobileMenu} className="shrink-0">
                    <img
                        src={logoTedxUA}
                        alt="TEDx Universitas Airlangga"
                        className="h-6 sm:h-7 md:h-7 lg:h-7 xl:h-8 w-auto object-contain"
                    />
                </Link>

                {/* Navigasi Desktop / Tablet Wide (Tampil di layar lg ke atas) */}
                <nav className="hidden lg:flex items-center justify-center gap-3 lg:gap-4 xl:gap-7 font-essays text-xs lg:text-[13.5px] xl:text-base font-medium tracking-wide shrink">
                    {/* Home */}
                    <Link
                        to="/"
                        className={cn(
                            "flex items-center gap-1 transition-colors hover:text-ted-red whitespace-nowrap shrink-0 [text-shadow:0px_1px_2px_rgba(0,0,0,0.30)]",
                            isActivePath('/') ? "text-ted-red font-bold" : "text-white/95"
                        )}
                    >
                        <span className="text-base lg:text-lg leading-none font-bold">X</span>
                        <span>Home</span>
                    </Link>

                    {/* Item dengan dropdown: About & Events */}
                    {NAV_LINKS.filter((item) => item.dropdown).map((item) => {
                        const active = isDropdownActive(item)
                        return (
                            <div
                                key={item.label}
                                className="relative flex items-center shrink-0"
                                onMouseEnter={() => handleEnter(item.label)}
                                onMouseLeave={handleLeave}
                            >
                                <button
                                    type="button"
                                    className={cn(
                                        "flex items-center gap-1 xl:gap-1.5 transition-colors hover:text-ted-red cursor-pointer whitespace-nowrap",
                                        active ? "text-ted-red font-bold" : "text-white/95"
                                    )}
                                >
                                    <span>{item.label}</span>
                                    <ChevronDown
                                        size={12}
                                        className={cn(
                                            'transition-transform duration-200 shrink-0',
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
                                "transition-colors hover:text-ted-red whitespace-nowrap shrink-0",
                                isActivePath(item.path) ? "text-ted-red font-bold" : "text-white/95"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Tombol Sign In / User Email Desktop (Tampil di lg ke atas) */}
                {userEmail ? (
                    <div className="hidden lg:inline-block relative shrink-0">
                        <button
                            type="button"
                            onClick={() => setIsLogoutModalOpen((prev) => !prev)}
                            title="Klik untuk opsi logout"
                            className="group relative inline-flex items-center justify-center px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 font-essays text-xs lg:text-xs xl:text-sm font-bold tracking-wider transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer max-w-[160px] lg:max-w-[190px] xl:max-w-[220px]"
                        >
                            <span
                                className="absolute inset-0 rounded-xl border-[4px] border-amber-500 group-hover:border-ted-red transition-colors duration-300 pointer-events-none"
                                style={{ filter: 'url(#rough-border)' }}
                            />
                            <span className="relative z-10 text-amber-300 group-hover:text-ted-red transition-colors duration-300 truncate">
                                {userEmail}
                            </span>
                        </button>

                        {/* Popover Pop Up Kecil di Bawah Card User Desktop */}
                        <AnimatePresence>
                            {isLogoutModalOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsLogoutModalOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-3 z-50 w-72 rounded-xl bg-[#0A0A0A]/95 p-5 text-center shadow-[0_10px_25px_rgba(235,0,40,0.25)] backdrop-blur-md"
                                    >
                                        {/* Layer Garis Tepi Tekstur Merah Organik (Persis seperti Dropdown Navbar) */}
                                        <span
                                            className="absolute inset-0 rounded-xl border-[4px] border-ted-red pointer-events-none"
                                            style={{ filter: 'url(#rough-border)' }}
                                        />

                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-ted-red/20 text-ted-red mb-2">
                                                <LogOut size={18} />
                                            </div>
                                            <h4 className="font-essays text-sm font-bold uppercase text-white tracking-wide">
                                                Konfirmasi Logout
                                            </h4>
                                            <p className="mt-1 font-gordita text-[11px] text-white/90 truncate w-full">
                                                Ingin keluar dari <span className="font-semibold text-amber-300">{userEmail}</span>?
                                            </p>

                                            <div className="mt-4 flex items-center gap-2 w-full">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLogoutModalOpen(false)}
                                                    className="w-1/2 rounded-lg border border-white/20 bg-white/5 py-1.5 font-essays text-[11px] font-semibold uppercase text-white transition hover:bg-white/10 active:scale-95 cursor-pointer"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={confirmLogout}
                                                    className="w-1/2 rounded-lg bg-ted-red py-1.5 font-essays text-[11px] font-bold uppercase text-white shadow-md transition hover:bg-red-700 active:scale-95 cursor-pointer"
                                                >
                                                    Ya, Logout
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>

                                </>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="hidden lg:inline-flex group relative shrink-0 items-center justify-center px-3.5 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 font-essays text-xs lg:text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                        <span
                            className="absolute inset-0 rounded-xl border-[4px] border-ted-red group-hover:border-white transition-colors duration-300 pointer-events-none"
                            style={{ filter: 'url(#rough-border)' }}
                        />
                        <span className="relative z-10 text-white group-hover:text-ted-red transition-colors duration-300 whitespace-nowrap">
                            SIGN IN
                        </span>
                    </Link>
                )}

                {/* Tombol Hamburger Mobile & Tablet (Tampil khusus di layar < lg) */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle Mobile & Tablet Menu"
                    className="flex lg:hidden p-2 text-white hover:text-ted-red focus:outline-none transition-colors cursor-pointer shrink-0"
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Menu Dropdown Mobile & Tablet (Tampil meluncur ke bawah saat Hamburger dipencet di layar < lg) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/10 lg:hidden flex flex-col px-6 md:px-10 py-5 md:py-6 gap-3 font-essays text-base md:text-lg font-medium tracking-wide shadow-2xl max-h-[85vh] overflow-y-auto"
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
                                                            "text-sm md:text-base hover:text-ted-red transition-colors py-1",
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

                        {/* 4. Tombol Sign In / User Email Mobile & Tablet */}
                        <div className="pt-3 pb-1 flex flex-col items-center justify-center w-full gap-2">
                            {userEmail ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsLogoutModalOpen((prev) => !prev)}
                                        className="group relative w-full flex items-center justify-center px-6 py-3 font-essays text-sm md:text-base font-bold tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
                                    >
                                        <span
                                            className="absolute inset-0 rounded-xl border-[4px] border-amber-500 group-hover:border-ted-red transition-colors duration-300 pointer-events-none"
                                            style={{ filter: 'url(#rough-border)' }}
                                        />
                                        <span className="relative z-10 text-amber-300 group-hover:text-ted-red transition-colors duration-300 truncate">
                                            {userEmail}
                                        </span>
                                    </button>

                                    {isLogoutModalOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="w-full rounded-xl bg-[#140b07] p-3 text-center border border-ted-red/60 flex flex-col gap-2"
                                        >
                                            <p className="font-gordita text-xs text-[#e2d5c3]">
                                                Konfirmasi Logout untuk akun ini?
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsLogoutModalOpen(false)}
                                                    className="w-1/2 rounded-lg border border-white/20 bg-white/5 py-1.5 font-essays text-xs font-semibold text-white"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        closeMobileMenu();
                                                        confirmLogout();
                                                    }}
                                                    className="w-1/2 rounded-lg bg-ted-red py-1.5 font-essays text-xs font-bold text-white"
                                                >
                                                    Ya, Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="group relative w-full flex items-center justify-center px-6 py-3 font-essays text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer text-center"
                                >
                                    <span
                                        className="absolute inset-0 rounded-xl border-[4px] border-ted-red group-hover:border-white transition-colors duration-300 pointer-events-none"
                                        style={{ filter: 'url(#rough-border)' }}
                                    />
                                    <span className="relative z-10 text-white group-hover:text-ted-red transition-colors duration-300">
                                        SIGN IN
                                    </span>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

