import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#111111] text-gray-400 py-12 px-6 border-t border-white/10 text-sm relative z-30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div className="max-w-md">
          <h4 className="text-white font-bold text-lg mb-2">TEDx<span className="text-xs text-gray-400 font-normal ml-1">UniversitasAirlangga</span></h4>
          <p className="text-xs leading-relaxed text-gray-400">
            TEDxUniversitasAirlangga is organized by an independent community within the scope of BEM FEB Universitas Airlangga to spread new ideas and spark conversation at the university level.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <h5 className="text-red-500 font-bold uppercase text-xs tracking-wider mb-2">Connect with us</h5>
          <div className="flex gap-4 text-white">
            <a href="#" className="hover:text-red-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-red-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-red-500 transition-colors">TikTok</a>
            <a href="#" className="hover:text-red-500 transition-colors">X (Twitter)</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© 2024 All Rights Reserved. This independent TEDx event is operated under license from TED.</p>
        <p className="uppercase tracking-widest text-[10px]">Beneath what we see: The Mycelium</p>
      </div>
    </footer>
  );
};

export default Footer;
