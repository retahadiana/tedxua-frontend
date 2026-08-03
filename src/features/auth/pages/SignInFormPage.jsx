import { useState } from "react";
import tedxLogo from "@/assets/auth/signin-red/tedx-logo.png";
import textureLeft from "@/assets/auth/signin-red/tolong-7.png";
import textureRight from "@/assets/auth/signin-red/tolong-8.png";
import fireflies from "@/assets/auth/signin-red/fireflies.png";
import arrowUp from "@/assets/auth/signin-red/arrow-up.svg";
import iconMail from "@/assets/auth/signin-red/icon-mail-group.svg";
import iconLock from "@/assets/auth/signin-red/icon-lock-vector.svg";
import inputUnderline from "@/assets/auth/signin-red/input-underline.svg";
import footerBg from "@/assets/auth/signup/rectangle8-footer-bg.png";
import grassFarthest from "@/assets/auth/signin-red/tolong-2-grass.png";
import grassBack from "@/assets/auth/signin-red/rectangle39-grass-back.png";
import grassFront from "@/assets/auth/signin-red/rectangle41-grass-front.png";
import cardMerah from "@/assets/auth/signin-red/card merah.png";
import myloSayHai from "@/assets/auth/signin-red/mylo-say-hai.png";
import ellipseGlow from "@/assets/auth/signin-red/ellipse-44.png";
import socialInstagramBase from "@/assets/auth/signin-red/icon-instagram-base.svg";
import socialInstagramDetail1 from "@/assets/auth/signin-red/icon-instagram-detail1.svg";
import socialInstagramDetail2 from "@/assets/auth/signin-red/icon-instagram-detail2.svg";
import socialLinkedin from "@/assets/auth/signin-red/social-icons-3.svg";
import socialTiktok from "@/assets/auth/signin-red/icon-social-4.svg";
import socialX from "@/assets/auth/signin-red/icon-x-twitter.svg";
import socialCorner from "@/assets/auth/signin-red/icon-social-corner.svg";
import AuthTabSwitch from "../components/AuthTabSwitch";
import AuthFormInput from "../components/AuthFormInput";
import MyloIllustration from "../components/MyloIllustration";
import RedAuthNavbar from "../components/RedAuthNavbar";
import RedAuthFooter from "../components/RedAuthFooter";
import RedAuthHeading from "../components/RedAuthHeading";

const NAV_LINKS = [
  { label: "Home" },
  { label: "About", arrow: arrowUp },
  { label: "Events", arrow: arrowUp },
  { label: "LFSS" },
  { label: "Art Showcase" },
  { label: "Shops" },
  { label: "Sponsorship" },
];

const MYLO_ASSETS = { mylo: myloSayHai, glow: ellipseGlow, grassFarthest, grassBack, grassFront, cardMerah };

const SOCIAL_ASSETS = {
  instagramBase: socialInstagramBase,
  instagramDetail1: socialInstagramDetail1,
  instagramDetail2: socialInstagramDetail2,
  linkedin: socialLinkedin,
  tiktok: socialTiktok,
  x: socialX,
  corner: socialCorner,
};

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
        className="pointer-events-none absolute left-[1240px] top-[254px] w-[182.663px] max-w-none rotate-[137.2deg] blur-[3px]"
      />

      {/* Navbar */}
      <RedAuthNavbar logo={tedxLogo} links={NAV_LINKS} ctaLabel="Sign in" />

      {/* Mylo illustration (kiri) */}
      <MyloIllustration assets={MYLO_ASSETS} />

      {/* Heading + Card form (kanan) */}
      <div className="absolute left-[714px] top-[272px] z-10 w-[607px]">
        <RedAuthHeading top={272} />

        <div className="mt-[109px] flex h-[517px] flex-col rounded-[32px] border-8 border-[#ac0003] bg-gradient-to-b from-[rgba(253,42,5,0.3)] to-[rgba(254,248,224,0.3)] p-10">
          <div className="mb-9 flex justify-center">
            <AuthTabSwitch active="sign-in" />
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

      {/* Footer */}
      <RedAuthFooter logo={tedxLogo} bg={footerBg} social={SOCIAL_ASSETS} />
    </div>
  );
}
