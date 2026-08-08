import { useState } from "react";
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

export default function SignInFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: sambungkan ke API sign in
  };

  return (
    <div
      className="relative min-h-[912px] w-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #2d1e16 0%, #4b2d22 46.754%, #985a27 84.167%)",
      }}
    >
      {/* Navbar bersama dari components/layout */}
      <Navbar />

      {/* Wrapper konten */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {/* tekstur blur kiri & kanan */}
          <img
            src={textureLeft}
            alt=""
            className="pointer-events-none absolute left-[-221px] top-[110px] w-[797px] max-w-none opacity-50"
            style={{ transform: TEXTURE_TRANSFORM }}
          />
          <img
            src={textureRight}
            alt=""
            className="pointer-events-none absolute left-[778px] top-[-38px] w-[797px] max-w-none opacity-30"
            style={{ transform: TEXTURE_TRANSFORM }}
          />

          {/* Mylo illustration (kiri) */}
          <MyloIllustration assets={MYLO_ASSETS} />

          {/* Kotak sign in (kanan) */}
          <div className="absolute top-[88px] z-10 w-[576px]" style={{ left: "calc(50% - 31px)" }}>
            <div className="relative">
              {/* kotak sign in sebagai background form */}
              <div className="relative z-[1]">
                <img src={kotakSigin} alt="" className="h-auto w-full max-w-none" />

                {/* isi form mengikuti posisi kotak */}
                <div className="absolute inset-0 flex flex-col items-center -translate-x-[40px] scale-[0.92] px-[58px] pt-[137px]">
                  <div className="mt-[24px]">
                    <AuthTabSwitch active="sign-in" />
                  </div>

                  <form onSubmit={handleSubmit} className="mt-[24px] flex w-full flex-col">
                    <div className="flex flex-col gap-[22px]">
                      <AuthFormInput
                        label="Email"
                        iconSrc={iconMail}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tedxua@gmail.com"
                        underlineSrc={inputUnderline}
                        iconClassName="w-[27px] h-[21px] max-w-none"
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
                    </div>

                    <button
                      type="submit"
                      className="relative mt-[38px] h-[38px] w-full overflow-hidden transition duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97]"
                    >
                      <img src={continueBtn} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
                      <span className="relative flex h-full w-full items-center justify-center font-essays font-bold text-[16px] uppercase text-[#4b2d22]">
                        continue
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer sebagai overlay di dasar halaman */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <Footer className="!pt-6 !pb-5" />
      </div>
    </div>
  );
}
