import React, { useState } from 'react';
import logoTedxUa from '../../assets/images/tedx_unair_putih.png';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#111111]/70 backdrop-blur-md px-4 md:px-12 py-3 md:py-4 border-b border-white/10">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logoTedxUa} 
            alt="TEDx Universitas Airlangga" 
            className="h-6 md:h-9 object-contain" 
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[#FEF8E0] text-base font-gordita">
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>
          
          {/* Active Link: About */}
          <a href="#about" className="flex items-center gap-1 text-[#FF2B06] font-semibold transition-colors">
            <span className="font-bold text-lg leading-none">X</span>
            <span>About</span>
            <span className="text-[10px] text-[#FF2B06] ml-0.5">▲</span>
          </a>

          {/* Events Link with Arrow */}
          <a href="#events" className="flex items-center gap-1 hover:text-white transition-colors">
            <span>Events</span>
            <span className="text-[10px] text-[#FEF8E0] ml-0.5">▼</span>
          </a>

          <a href="#lfss" className="hover:text-white transition-colors">
            LFSS
          </a>

          <a href="#art-showcase" className="hover:text-white transition-colors capitalize">
            Art Showcase
          </a>

          <a href="#shops" className="hover:text-white transition-colors">
            Shops
          </a>

          <a href="#sponsorship" className="hover:text-white transition-colors">
            Sponsorship
          </a>
        </div>

        {/* Right Section: Sign In Button & Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-block px-5 py-1.5 md:px-6 md:py-2 rounded-lg border border-[#FF2B06] text-[#FEF8E0] text-xs md:text-sm font-bold uppercase tracking-wider font-gordita hover:bg-[#FF2B06]/20 transition-all shadow-[0_0_10px_rgba(255,43,6,0.3)]">
            Log in
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#FEF8E0] p-1.5 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 pb-6 px-4 border-t border-white/10 flex flex-col gap-4 bg-[#111111]/95 rounded-b-2xl font-gordita text-[#FEF8E0]">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#FF2B06] font-semibold py-1">About</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Events</a>
          <a href="#lfss" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">LFSS</a>
          <a href="#art-showcase" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Art Showcase</a>
          <a href="#shops" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Shops</a>
          <a href="#sponsorship" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Sponsorship</a>
          <button className="sm:hidden mt-2 w-full py-2 rounded-lg border border-[#FF2B06] text-[#FEF8E0] text-xs font-bold uppercase tracking-wider bg-[#FF2B06]/10">
            Log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
