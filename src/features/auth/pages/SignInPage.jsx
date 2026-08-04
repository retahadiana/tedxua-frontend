import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import tedxLogo from "@/assets/auth/login/tedx-logo.png";
import cardLoginBesar from "@/assets/auth/login/card login besar.png";
import cardLoginKecil from "@/assets/auth/login/card login kecil.png";
import { Navbar } from "@/components/layout";
import AuthBackgroundDecor from "../components/AuthBackgroundDecor";
import AuthGoogleButton from "../components/AuthGoogleButton";

const BORDER_GRADIENT =
  "linear-gradient(140deg, rgba(255,255,255,0.95) 0%, #f6d78c 28%, #d9a520 46%, #7b3ff2 100%)";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    // TODO: sambungkan ke OAuth Google (Firebase Auth / backend endpoint)
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#180b5d]">
      <AuthBackgroundDecor />

      {/* Navbar bersama dari components/layout */}
      <Navbar />

      {/* Login cards (kiri) */}
      <div className="absolute left-[240px] top-[220px] z-10">
        <div className="relative">
          <motion.div
            className="absolute -right-[140px] -top-[96px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={cardLoginKecil}
              alt="Login card kecil"
              className="w-[240px]"
            />
          </motion.div>
          <div className="relative translate-x-[40px] translate-y-[180px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={cardLoginBesar}
                alt="Login card besar"
                className="w-[400px]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* teks dekoratif blur samping */}
      <p className="pointer-events-none absolute left-[986px] top-[140px] w-[320px] font-gordita text-[14px] leading-[1.6] text-white/25 blur-[1px]">
        Ideas worth spreading, crafted at the heart of Universitas Airlangga — where conversations begin and
        inspiration takes root.
      </p>
      <p className="pointer-events-none absolute left-[52px] top-[840px] w-[280px] font-gordita text-[14px] leading-[1.6] text-white/20 blur-[1px]">
        TEDx Universitas Airlangga 2025 — a space for bold thoughts and fresh perspectives.
      </p>

      {/* Kotak form utama (kanan) */}
      <main className="relative z-10 flex min-h-screen items-center justify-end pr-[270px]">
        <div
          className="relative h-[566px] w-[573px] max-w-full rounded-tl-[40px] rounded-br-[40px] p-[2px] shadow-[10px_10px_100px_0px_rgba(0,0,0,0.72)]"
          style={{ background: BORDER_GRADIENT }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-tl-[38px] rounded-br-[38px] bg-[#100645]">
            {/* X kiri atas */}
            <span
              className="pointer-events-none absolute left-[8px] -top-[62px] select-none font-bold text-[225px] leading-none text-white opacity-15"
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
              className="pointer-events-none absolute right-[8px] -bottom-8 select-none font-bold text-[225px] leading-none text-white opacity-15"
              style={{
                fontFamily: "Poppins, sans-serif",
                WebkitMaskImage: "radial-gradient(140% 140% at 100% 100%, black 20%, transparent 70%)",
                maskImage: "radial-gradient(140% 140% at 100% 100%, black 20%, transparent 70%)",
              }}
            >
              x
            </span>

            {/* Konten ter-center */}
            <div className="relative flex h-full w-full flex-col items-center justify-center px-[54px]">
              <h1 className="text-center font-naughty text-[42px] leading-[1.15] text-white">
                Sign in to your account
              </h1>
              <p className="mt-3 w-full max-w-[400px] text-center font-gordita text-[17px] leading-6 text-white/90">
                Welcome to TEDx Universitas Airlangga 2025 – your gateway to inspiration and innovation.
              </p>

              <div className="mt-8 flex w-full max-w-[400px] flex-col items-center gap-4">
                <AuthGoogleButton onClick={handleGoogleSignIn} />
              </div>

              <p className="mt-9 font-nadira text-[14px] text-white/70">
                Belum punya akun?{" "}
                <Link to="/sign-up" className="font-bold text-white underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
