import React from "react";
import { Navbar, Footer } from "@/components/layout";
import LfssHero from "./components/Lfsshero";
import LfssAbout from "./components/LfssAbout";
import LfssCTA from "./components/LfssCTA";

export default function Lfss() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2f3d0d] text-white font-gordita">
      <Navbar />

      <main>
        <LfssHero />
        <LfssAbout />
        <LfssCTA />
      </main>

      <div className="bg-[#4D2814]">
        <Footer className="!from-[#4D2814] !via-[#2b160b] !to-black" />
      </div>
    </div>
  );
}
