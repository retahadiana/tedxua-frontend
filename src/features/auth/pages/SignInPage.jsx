import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import cardLoginBesar from "@/assets/auth/login/card login besar.png";
import cardLoginKecil from "@/assets/auth/login/card login kecil.png";
import elipsPutih from "@/assets/auth/login/elips putih.png";
import elipsOranye from "@/assets/auth/login/elips oranye.png";
import photoroom1 from "@/assets/auth/login/photoroom-1.png";
import photoroom2 from "@/assets/auth/login/photoroom-2.png";
import { Navbar } from "@/components/layout";
import AuthBackgroundDecor from "../components/AuthBackgroundDecor";
import AuthGoogleButton from "../components/AuthGoogleButton";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const MOBILE_BREAKPOINT = 1024;

const BORDER_GRADIENT =
  "linear-gradient(140deg, rgba(255,255,255,0.95) 0%, #f6d78c 28%, #d9a520 46%, #7b3ff2 100%)";

function LoginCard({ onExplore }) {
  return (
    <div
      className="relative h-full rounded-tl-[40px] rounded-br-[40px] p-[2px] shadow-[10px_10px_100px_0px_rgba(0,0,0,0.72)]"
      style={{ background: BORDER_GRADIENT }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-tl-[38px] rounded-br-[38px] bg-[#100645]">
        {/* X kiri atas */}
        <span
          className="pointer-events-none absolute left-[8px] -top-[40px] select-none font-bold text-[150px] leading-none text-white opacity-15 sm:-top-[62px] sm:text-[225px]"
          style={{
            fontFamily: "Poppins, sans-serif",
            WebkitMaskImage: "radial-gradient(140% 140% at 0% 0%, black 20%, transparent 70%)",
            maskImage: "radial-gradient(140% 140% at 0% 0%, black 20%, transparent 70%)",
          }}
        >
          x
        </span>

        {/* X kanan bawah */}
        <span
          className="pointer-events-none absolute right-[8px] -bottom-5 select-none font-bold text-[150px] leading-none text-white opacity-15 sm:-bottom-8 sm:text-[225px]"
          style={{
            fontFamily: "Poppins, sans-serif",
            WebkitMaskImage: "radial-gradient(140% 140% at 100% 100%, black 20%, transparent 70%)",
            maskImage: "radial-gradient(140% 140% at 100% 100%, black 20%, transparent 70%)",
          }}
        >
          x
        </span>

        {/* Konten ter-center */}
        <div className="relative flex h-full w-full flex-col items-center justify-center px-7 sm:px-[54px]">
          <h1 className="text-center font-naughty text-[28px] leading-[1.2] text-white sm:text-[42px] sm:leading-[1.15]">
            Sign in to your account
          </h1>
          <p className="mt-3 w-full max-w-[400px] text-center font-essays text-[15px] leading-6 text-white/90 sm:text-[17px]">
            Welcome to TEDx Universitas Airlangga 2026 – your gateway to inspiration and innovation.
          </p>

          <div className="mt-7 flex w-full max-w-[400px] flex-col items-center gap-4 sm:mt-8">
            <AuthGoogleButton onClick={onExplore} />
          </div>

          <p className="mt-8 font-nadira text-[14px] text-white/70 sm:mt-9">
            Belum punya akun?{" "}
            <Link to="/sign-up" className="font-bold text-white underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  const navigate = useNavigate();

  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH,
    h: typeof window !== "undefined" ? window.innerHeight : DESIGN_HEIGHT,
  }));

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDesktop = viewport.w >= MOBILE_BREAKPOINT;

  const handleStartExplore = () => {
    navigate("/sign-in");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#180b5d]">
      <Navbar />

      {isDesktop && <AuthBackgroundDecor />}

      {isDesktop ? (
        /* ====== Desktop: layout 2 kolom, reflow alami tanpa scaling ====== */
        <main className="relative z-10 flex min-h-screen w-full">
          {/* Kiri: ilustrasi kartu */}
          <div className="flex w-[40%] items-center justify-center pt-28 pb-12">
            <div className="relative">
              <div className="absolute -right-[18%] -top-[26%] translate-y-[15px]">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src={cardLoginKecil}
                    alt="Login card kecil"
                    className="w-[clamp(112px,12vw,220px)]"
                  />
                </motion.div>
              </div>
              <div className="translate-y-[140px]">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src={cardLoginBesar}
                    alt="Login card besar"
                    className="w-[clamp(204px,21vw,380px)]"
                  />
                </motion.div>
              </div>
            </div>

            {/* teks dekoratif blur di bawah ilustrasi */}
            <p className="pointer-events-none absolute bottom-[6%] left-[9%] w-[300px] font-gordita text-[14px] leading-[1.6] text-white/20 blur-[1px]">
              TEDx Universitas Airlangga 2025 — a space for bold thoughts and fresh perspectives.
            </p>
          </div>

          {/* Kanan: kotak login */}
          <div className="relative flex w-[60%] items-center justify-center pt-28 pb-12">
            <div className="h-[566px] w-[min(573px,44vw)] max-w-full">
              <LoginCard onExplore={handleStartExplore} />
            </div>
          </div>
        </main>
      ) : (
        /* ====== Mobile: kartu ilustrasi di atas, kotak login di bawah ====== */
        <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 pb-14 pt-24">
          {/* dekor asli (elips + photoroom) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* elips putih atas */}
            <img
              src={elipsPutih}
              alt=""
              className="absolute -left-[220px] -top-[150px] block w-[700px] max-w-none rotate-[-1.14deg]"
            />
            {/* elips oranye bawah */}
            <img
              src={elipsOranye}
              alt=""
              className="absolute -bottom-[230px] -right-[140px] block w-[900px] max-w-none"
            />
            {/* photoroom-1 (dua sisi) */}
            <img
              src={photoroom1}
              alt=""
              className="absolute -right-[120px] -top-7 size-[280px] rotate-[12deg] opacity-20 mix-blend-luminosity"
            />
            <img
              src={photoroom1}
              alt=""
              className="absolute -left-10 bottom-10 size-[240px] rotate-[10deg] opacity-20 mix-blend-luminosity"
            />
            {/* photoroom-2 (dua sisi) */}
            <img
              src={photoroom2}
              alt=""
              className="absolute left-[-120px] top-16 size-[260px] rotate-[-24deg] opacity-25 mix-blend-luminosity"
            />
            <img
              src={photoroom2}
              alt=""
              className="absolute bottom-[-40px] right-0 size-[230px] rotate-[-12deg] opacity-25 mix-blend-luminosity"
            />
          </div>

          {/* Kartu login besar & kecil (atas) */}
          <div className="relative z-10 mt-[70px] flex justify-center -translate-x-[50px]">
            <div className="relative">
              <motion.div
                className="absolute -right-[74px] -top-[52px]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={cardLoginKecil}
                  alt="Login card kecil"
                  className="w-[100px]"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={cardLoginBesar}
                  alt="Login card besar"
                  className="w-[228px]"
                />
              </motion.div>
            </div>
          </div>

          {/* Kotak login (bawah) */}
          <div className="relative z-10 mt-8 h-[520px] w-full max-w-[420px]">
            <LoginCard onExplore={handleStartExplore} />
          </div>
        </main>
      )}
    </div>
  );
}