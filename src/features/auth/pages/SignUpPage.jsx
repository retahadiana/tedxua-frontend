import { useState } from "react";
import textureLeft from "@/assets/auth/signup/tolong-7.png";
import textureRight from "@/assets/auth/signup/tolong-8.png";
import fireflies from "@/assets/auth/signup/fireflies.png";
import iconMail from "@/assets/auth/signup/icon-mail-group.svg";
import iconLock from "@/assets/auth/signup/icon-lock-vector.svg";
import inputUnderline from "@/assets/auth/signup/input-underline.svg";
import grassFarthest from "@/assets/auth/signup/rumput-paling-belakang.png";
import grassBack from "@/assets/auth/signup/rumput-belakang-mylo.png";
import grassFront from "@/assets/auth/signup/rumput-depan-mylo.png";
import myloSayHai from "@/assets/auth/signup/mylo-say-hai.png";
import ellipseGlow from "@/assets/auth/signup/ellipse-44.png";
import { Navbar, Footer } from "@/components/layout";
import AuthTabSwitch from "../components/AuthTabSwitch";
import AuthFormInput from "../components/AuthFormInput";
import MyloIllustration from "../components/MyloIllustration";
import RedAuthHeading from "../components/RedAuthHeading";

const MYLO_ASSETS = { mylo: myloSayHai, glow: ellipseGlow, grassFarthest, grassBack, grassFront };

const TEXTURE_TRANSFORM = "rotate(180deg) scaleY(-1)";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password dan Confirm Password tidak sama.");
      return;
    }
    setError("");
    // TODO: sambungkan ke API sign up
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #2d1e16 0%, #4b2d22 46.754%, #985a27 84.167%)",
      }}
    >
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

      {/* partikel kunang-kunang */}
      <img
        src={fireflies}
        alt=""
        className="pointer-events-none absolute left-[117px] top-[208px] w-[183px] max-w-none rotate-[42.8deg] blur-[3px]"
      />
      <img
        src={fireflies}
        alt=""
        className="pointer-events-none absolute left-[1240px] top-[201px] w-[182.663px] max-w-none rotate-[137.2deg] blur-[3px]"
      />

      {/* Navbar bersama dari components/layout */}
      <Navbar />

      {/* Mylo illustration (kiri) */}
      <MyloIllustration assets={MYLO_ASSETS} />

      {/* Heading + Card form (kanan) */}
      <div className="absolute left-[714px] top-[219px] z-10 w-[607px]">
        <RedAuthHeading top={219} />

        <div className="mt-[109px] flex h-[593px] flex-col rounded-[32px] border-8 border-[#ac0003] bg-gradient-to-b from-[rgba(253,42,5,0.3)] to-[rgba(254,248,224,0.3)] p-10">
          <div className="mb-9 flex justify-center">
            <AuthTabSwitch active="sign-up" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <div className="flex flex-col gap-[36px]">
              <AuthFormInput
                label="Email"
                iconSrc={iconMail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tedxua@gmail.com"
                underlineSrc={inputUnderline}
              />
              <AuthFormInput
                label="Password"
                iconSrc={iconLock}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                underlineSrc={inputUnderline}
              />
              <AuthFormInput
                label="Confirm Password"
                iconSrc={iconLock}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                underlineSrc={inputUnderline}
              />

              {error && <p className="text-sm text-red-300">{error}</p>}
            </div>

            <button
              type="submit"
              className="mt-[60px] h-[37px] w-full rounded-[8px] border-4 border-[#fef8e0] bg-[#fef8e0] px-6 pb-4 pt-3 text-center font-essays font-bold text-[20px] capitalize text-[#4b2d22]"
            >
              continue
            </button>
          </form>
        </div>
      </div>

      {/* Footer bersama dari components/layout */}
      <Footer />
    </div>
  );
}
