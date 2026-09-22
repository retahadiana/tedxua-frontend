import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import textureLeft from "@/assets/auth/signin-red/tolong-7.webp";
import textureRight from "@/assets/auth/signin-red/tolong-8.webp";
import grassFarthest from "@/assets/auth/signin-red/tolong-2-grass.webp";
import grassBack from "@/assets/auth/signin-red/rectangle39-grass-back.webp";
import grassFront from "@/assets/auth/signin-red/rectangle41-grass-front.webp";
import door from "@/assets/auth/signup/Door.webp";
import myloSayHai from "@/assets/auth/signin-red/mylo-say-hai.webp";
import ellipseGlow from "@/assets/auth/signin-red/ellipse-44.webp";
import kotakForm from "@/assets/auth/signup/kotak signup.webp";
import continueBtn from "@/assets/auth/signin-red/Continue.webp";
import { Navbar, Footer } from "@/components/layout";
import MyloIllustration from "../components/MyloIllustration";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

const MYLO_ASSETS = { mylo: myloSayHai, glow: ellipseGlow, grassFarthest, grassBack, grassFront, door };
const TEXTURE_TRANSFORM = "rotate(180deg) scaleY(-1)";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1130;
const MOBILE_BREAKPOINT = 1024;

function OtpInputGroup({ otp, setOtp, onComplete, disabled }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combined = newOtp.join("");
    if (combined.length === 6) {
      onComplete?.(combined);
    }

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (isNaN(pasteData) || pasteData.length !== 6) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);
    onComplete?.(pasteData);
    if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputRefs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          disabled={disabled}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="h-11 w-9 sm:h-14 sm:w-12 rounded-lg border-2 border-[#d9a520]/50 bg-black/40 text-center font-essays text-lg sm:text-2xl font-bold text-white shadow-inner transition duration-200 focus:border-[#7b3ff2] focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#7b3ff2]/40 disabled:opacity-50"
        />
      ))}
    </div>
  );
}

function VerifyEmailFormFields({
  email,
  otp,
  setOtp,
  error,
  success,
  isLoading,
  cooldown,
  handleSubmit,
  handleResend,
  compact = false,
}) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* Title */}
      <h2 className={`font-essays font-extrabold uppercase text-[#f6d78c] ${compact ? 'text-[18px]' : 'text-[24px]'}`}>
        Verify Email
      </h2>

      <p className={`mt-1 font-gordita text-[#e2d5c3] ${compact ? 'text-[11px] leading-tight' : 'text-[13px]'}`}>
        Masukkan 6-digit kode OTP yang dikirim ke <br />
        <span className="font-semibold text-amber-300">{email || "email Anda"}</span>
      </p>

      <form onSubmit={handleSubmit} className={`w-full ${compact ? 'mt-3' : 'mt-6'}`}>
        <OtpInputGroup
          otp={otp}
          setOtp={setOtp}
          disabled={isLoading}
          onComplete={(code) => handleSubmit(null, code)}
        />

        {error && <p className={`mt-2 font-gordita text-red-300 ${compact ? 'text-[11px]' : 'text-[13px]'}`}>{error}</p>}
        {success && <p className={`mt-2 font-gordita text-emerald-300 ${compact ? 'text-[11px]' : 'text-[13px]'}`}>{success}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`relative block w-full overflow-hidden transition duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97] ${
            compact ? 'mt-3' : 'mt-6 h-[48px]'
          }`}
        >
          <img src={continueBtn} alt="" className="block h-auto w-full max-w-none object-contain" />
          <span
            className={`absolute inset-0 flex items-center justify-center font-essays font-bold uppercase text-[#4b2d22] ${
              compact ? 'text-[13px]' : 'text-[20px]'
            }`}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </span>
        </button>
      </form>

      <div className={`mt-3 flex items-center gap-2 font-gordita ${compact ? 'text-[11px]' : 'text-[13px]'}`}>
        <span className="text-[#c7b9a5]">Tidak menerima kode?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isLoading}
          className="font-semibold text-amber-400 hover:text-amber-300 hover:underline disabled:opacity-40"
        >
          {cooldown > 0 ? `Kirim ulang (${cooldown}s)` : "Kirim Ulang"}
        </button>
      </div>
    </div>
  );
}

function DesktopLayout({ email, otp, setOtp, error, success, isLoading, cooldown, handleSubmit, handleResend }) {
  return (
    <>
      <img
        src={textureLeft}
        alt=""
        className="pointer-events-none absolute left-[-276px] top-[137px] w-[996px] max-w-none opacity-50"
        style={{ transform: TEXTURE_TRANSFORM }}
      />
      <img
        src={textureRight}
        alt=""
        className="pointer-events-none absolute left-[973px] top-[-48px] w-[996px] max-w-none opacity-30"
        style={{ transform: TEXTURE_TRANSFORM }}
      />

      <MyloIllustration assets={MYLO_ASSETS} />

      <div className="absolute left-[1032px] top-[110px] z-10 w-[720px]">
        <div className="relative">
          <div className="relative z-[1]">
            <img src={kotakForm} alt="" className="h-auto w-full max-w-none" />

            <div className="absolute inset-0 flex flex-col items-center -translate-x-[50px] scale-[0.92] px-[72px] pt-[170px]">
              <VerifyEmailFormFields
                email={email}
                otp={otp}
                setOtp={setOtp}
                error={error}
                success={success}
                isLoading={isLoading}
                cooldown={cooldown}
                handleSubmit={handleSubmit}
                handleResend={handleResend}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileLayout({ email, otp, setOtp, error, success, isLoading, cooldown, handleSubmit, handleResend }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <img
        src={textureLeft}
        alt=""
        className="pointer-events-none absolute -left-[140px] top-[130px] z-[1] w-[460px] max-w-none opacity-20"
        style={{ transform: TEXTURE_TRANSFORM }}
      />
      <img
        src={textureRight}
        alt=""
        className="pointer-events-none absolute -right-[140px] top-[52%] z-[1] w-[460px] max-w-none opacity-15"
        style={{ transform: TEXTURE_TRANSFORM }}
      />

      <section className="relative z-10 flex w-full justify-center px-5 pt-[118px]">
        <div className="relative w-full max-w-[470px] translate-x-[25px]">
          <img src={kotakForm} alt="" className="h-auto w-full max-w-none" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-[7%] py-[8%]">
            <div className="w-full -translate-x-[25px] translate-y-[30px] scale-[0.85]">
              <VerifyEmailFormFields
                email={email}
                otp={otp}
                setOtp={setOtp}
                error={error}
                success={success}
                isLoading={isLoading}
                cooldown={cooldown}
                handleSubmit={handleSubmit}
                handleResend={handleResend}
                compact
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-[5] mt-8 w-full overflow-hidden">
        <div className="relative mx-auto h-[min(120vw,560px)] w-full max-w-[480px]">
          <img
            src={grassFarthest}
            alt=""
            className="absolute inset-x-0 top-[11%] z-[3] h-[30%] w-full max-w-none object-cover object-top"
          />

          <div className="absolute left-1/2 top-[calc(9%-40px)] z-[4] h-[72%] -translate-x-1/2">
            <motion.img
              src={door}
              alt=""
              initial={{ y: "70vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "tween",
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.6,
              }}
              className="h-full w-auto max-w-none object-contain"
            />
          </div>

          <img
            src={grassBack}
            alt=""
            className="absolute inset-x-0 top-[53%] z-[5] h-[36%] w-full max-w-none object-cover object-top"
          />

          <img
            src={ellipseGlow}
            alt=""
            className="absolute bottom-[18%] left-1/2 z-[6] h-[16%] max-w-none -translate-x-1/2 object-contain"
          />

          <div className="absolute left-1/2 top-[calc(15%+60px)] z-[7] h-[52%] translate-x-[calc(-50%-50px)]">
            <motion.img
              src={myloSayHai}
              alt="Mylo mascot"
              initial={{ x: "-120vw" }}
              animate={{ x: 0 }}
              transition={{
                type: "tween",
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-auto max-w-none object-contain"
            />
          </div>

          <img
            src={grassFront}
            alt=""
            className="absolute inset-x-0 bottom-0 z-[8] h-[32%] w-full max-w-none object-cover object-top"
          />
        </div>
      </section>

      <div className="relative z-20 w-full -mt-20">
        <div className="h-20 w-full bg-gradient-to-b from-transparent to-black pointer-events-none" />
        <div className="w-full bg-black">
          <Footer className="!bg-black !pt-2 !pb-6" />
        </div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  const {
    email,
    otp,
    setOtp,
    error,
    success,
    isLoading,
    cooldown,
    handleSubmit,
    handleResend
  } = useVerifyEmail();

  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH,
    h: typeof window !== "undefined" ? window.innerHeight : DESIGN_HEIGHT,
  }));

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = viewport.w < MOBILE_BREAKPOINT;
  const scale = viewport.w / DESIGN_WIDTH;

  return (
    <div
      className="w-full"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #2d1e16 0%, #4b2d22 46.754%, #985a27 84.167%)",
      }}
    >
      <Navbar />

      {isMobile ? (
        <MobileLayout
          email={email}
          otp={otp}
          setOtp={setOtp}
          error={error}
          success={success}
          isLoading={isLoading}
          cooldown={cooldown}
          handleSubmit={handleSubmit}
          handleResend={handleResend}
        />
      ) : (
        <div className="relative w-full">
          <div
            className="relative flex w-full justify-center overflow-hidden"
            style={{ height: DESIGN_HEIGHT * scale }}
          >
            <div
              className="relative shrink-0 overflow-hidden"
              style={{
                width: DESIGN_WIDTH * scale,
                height: DESIGN_HEIGHT * scale,
              }}
            >
              <div
                className="relative"
                style={{
                  width: DESIGN_WIDTH,
                  height: DESIGN_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <DesktopLayout
                  email={email}
                  otp={otp}
                  setOtp={setOtp}
                  error={error}
                  success={success}
                  isLoading={isLoading}
                  cooldown={cooldown}
                  handleSubmit={handleSubmit}
                  handleResend={handleResend}
                />
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full -mt-28">
            <div className="h-28 w-full bg-gradient-to-b from-transparent to-black pointer-events-none" />
            <div className="w-full bg-black">
              <Footer className="!bg-black !pt-4 !pb-8" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
