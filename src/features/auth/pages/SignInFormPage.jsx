import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import textureLeft from "@/assets/auth/signin-red/tolong-7.png";
import textureRight from "@/assets/auth/signin-red/tolong-8.png";
import iconMail from "@/assets/auth/signin-red/icon-mail-group.svg";
import iconLock from "@/assets/auth/signin-red/icon-lock-vector.svg";
import inputUnderline from "@/assets/auth/signin-red/input-underline.svg";
import grassFarthest from "@/assets/auth/signin-red/tolong-2-grass.png";
import grassBack from "@/assets/auth/signin-red/rectangle39-grass-back.png";
import grassFront from "@/assets/auth/signin-red/rectangle41-grass-front.png";
import door from "@/assets/auth/signin-red/Door.png";
import myloSayHai from "@/assets/auth/signin-red/mylo-say-hai.png";
import ellipseGlow from "@/assets/auth/signin-red/ellipse-44.png";
import kotakSigin from "@/assets/auth/signin-red/kotak sigin.png";
import continueBtn from "@/assets/auth/signin-red/Continue.png";
import { Navbar, Footer } from "@/components/layout";
import AuthTabSwitch from "../components/AuthTabSwitch";
import AuthFormInput from "../components/AuthFormInput";
import MyloIllustration from "../components/MyloIllustration";

const MYLO_ASSETS = { mylo: myloSayHai, glow: ellipseGlow, grassFarthest, grassBack, grassFront, door };

const TEXTURE_TRANSFORM = "rotate(180deg) scaleY(-1)";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1130;
const MOBILE_BREAKPOINT = 1024;

const BORDER_GRADIENT =
  "linear-gradient(140deg, rgba(255,255,255,0.95) 0%, #f6d78c 28%, #d9a520 46%, #7b3ff2 100%)";

function FormFields({ email, password, onEmail, onPassword, onContinue }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue?.();
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <AuthTabSwitch active="sign-in" compact />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col">
        <div className="flex flex-col gap-3">
          <AuthFormInput
            label="Email"
            iconSrc={iconMail}
            type="email"
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            placeholder="tedxua@gmail.com"
            underlineSrc={inputUnderline}
            compact
            iconClassName="w-[20px] h-[16px] max-w-none"
          />
          <AuthFormInput
            label="Password"
            iconSrc={iconLock}
            type="password"
            value={password}
            onChange={(e) => onPassword(e.target.value)}
            placeholder="********"
            underlineSrc={inputUnderline}
            compact
          />
        </div>

        <button
          type="submit"
          className="relative mt-3 block w-full overflow-hidden transition duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97]"
        >
          <img src={continueBtn} alt="" className="block h-auto w-full max-w-none object-contain" />
          <span className="absolute inset-0 flex items-center justify-center font-essays font-bold text-[13px] uppercase text-[#4b2d22]">
            continue
          </span>
        </button>
      </form>
    </>
  );
}

function DesktopLayout({ email, password, onEmail, onPassword }) {
  return (
    <>
      {/* tekstur blur kiri & kanan */}
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

      {/* Mylo illustration (kiri) */}
      <MyloIllustration assets={MYLO_ASSETS} />

      {/* Kotak sign in (kanan) */}
      <div className="absolute left-[1032px] top-[110px] z-10 w-[720px]">
        <div className="relative">
          {/* kotak sign in sebagai background form */}
          <div className="relative z-[1]">
            <img src={kotakSigin} alt="" className="h-auto w-full max-w-none" />

            {/* isi form mengikuti posisi kotak */}
            <div className="absolute inset-0 flex flex-col items-center -translate-x-[50px] scale-[0.92] px-[72px] pt-[171px]">
              <div className="mt-[30px]">
                <AuthTabSwitch active="sign-in" />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="mt-[30px] flex w-full flex-col"
              >
                <div className="flex flex-col gap-[28px]">
                  <AuthFormInput
                    label="Email"
                    iconSrc={iconMail}
                    type="email"
                    value={email}
                    onChange={(e) => onEmail(e.target.value)}
                    placeholder="tedxua@gmail.com"
                    underlineSrc={inputUnderline}
                    iconClassName="w-[34px] h-[26px] max-w-none"
                  />
                  <AuthFormInput
                    label="Password"
                    iconSrc={iconLock}
                    type="password"
                    value={password}
                    onChange={(e) => onPassword(e.target.value)}
                    placeholder="********"
                    underlineSrc={inputUnderline}
                  />
                </div>

                <button
                  type="submit"
                  className="relative mt-[48px] h-[48px] w-full overflow-hidden transition duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97]"
                >
                  <img src={continueBtn} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
                  <span className="relative flex h-full w-full items-center justify-center font-essays font-bold text-[20px] uppercase text-[#4b2d22]">
                    continue
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer sebagai overlay di dasar halaman, warna menyatu smooth */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <Footer className="!pt-6 !pb-5 !bg-gradient-to-b !from-transparent !to-black" />
      </div>
    </>
  );
}

function MobileLayout({ email, password, onEmail, onPassword }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* tekstur blur tipis kiri & kanan biar berasa ada kedalaman */}
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

      {/* 1. Kotak form sign in (paling atas) */}
      <section className="relative z-10 flex w-full justify-center px-5 pt-[118px]">
        <div className="relative w-full max-w-[470px] translate-x-[25px]">
          {/* kotak sigin sebagai background form */}
          <img src={kotakSigin} alt="" className="h-auto w-full max-w-none" />

          {/* isi form mengikuti posisi kotak */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[7%] py-[8%]">
            <div className="w-full -translate-x-[25px] translate-y-[40px] scale-[0.85]">
              <FormFields
                email={email}
                password={password}
                onEmail={onEmail}
                onPassword={onPassword}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rumput + door + Mylo (tengah) */}
      <section className="relative z-[5] mt-8 w-full overflow-hidden">
        <div className="relative mx-auto h-[min(120vw,560px)] w-full max-w-[480px]">
          {/* rumput paling belakang (turun ±50px) */}
          <img
            src={grassFarthest}
            alt=""
            className="absolute inset-x-0 top-[11%] z-[3] h-[30%] w-full max-w-none object-cover object-top"
          />

          {/* door di belakang mylo (naik 40px) */}
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

          {/* rumput belakang mylo (turun ±50px) */}
          <img
            src={grassBack}
            alt=""
            className="absolute inset-x-0 top-[53%] z-[5] h-[36%] w-full max-w-none object-cover object-top"
          />

          {/* glow di belakang mylo */}
          <img
            src={ellipseGlow}
            alt=""
            className="absolute bottom-[18%] left-1/2 z-[6] h-[16%] max-w-none -translate-x-1/2 object-contain"
          />

          {/* mascot mylo */}
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

          {/* rumput depan mylo, paling bawah, paling atas layer-nya */}
          <img
            src={grassFront}
            alt=""
            className="absolute inset-x-0 bottom-0 z-[8] h-[32%] w-full max-w-none object-cover object-top"
          />
        </div>
      </section>

      {/* jembatan gradasi: warna bawah rumput (#404B28) → footer agar menyatu */}
      <div className="relative z-[6] h-[70px] w-full bg-gradient-to-b from-[#404B28] via-[#22301a] to-[#050a03]" />

      {/* 3. Footer (paling bawah) */}
      <section className="relative z-[7] mt-auto">
        <Footer className="!bg-black !pt-8 !pb-5" />
      </section>
    </main>
  );
}

export default function SignInFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          password={password}
          onEmail={setEmail}
          onPassword={setPassword}
        />
      ) : (
        /* ====== Desktop / Tablet: scene 1920x1130 di-scale mengikuti lebar viewport ====== */
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
                password={password}
                onEmail={setEmail}
                onPassword={setPassword}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}