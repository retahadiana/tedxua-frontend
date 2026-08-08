import { Link } from "react-router-dom";
import blankButton from "@/assets/auth/signin-red/blank button.png";
import fillButton from "@/assets/auth/signin-red/fill button.png";

export default function AuthTabSwitch({ active }) {
  return (
    <div className="flex items-center gap-5">
      <Link to="/sign-in" className="relative block transition duration-200 hover:brightness-110 hover:scale-[1.04] active:scale-[0.97]">
        <img
          src={active === "sign-in" ? fillButton : blankButton}
          alt=""
          className="h-[48px] w-[210px] max-w-none object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center font-essays font-bold text-[16px] uppercase text-[#fef8e0]">
          Sign in
        </span>
      </Link>
      <Link to="/sign-up" className="relative block transition-transform duration-200 hover:brightness-110 hover:scale-[1.04] active:scale-[0.97]">
        <img
          src={active === "sign-up" ? fillButton : blankButton}
          alt=""
          className="h-[48px] w-[210px] max-w-none object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center font-essays font-bold text-[16px] uppercase text-[#fef8e0]">
          Sign up
        </span>
      </Link>
    </div>
  );
}
