import { Link } from "react-router-dom";
import blankButton from "@/assets/auth/signin-red/blank button.webp";
import fillButton from "@/assets/auth/signin-red/fill button.webp";

export default function AuthTabSwitch({ active, compact = false }) {
  return (
    <div className="flex w-full max-w-[440px] items-center gap-[min(20px,4vw)]">
      <Link
        to="/sign-in"
        className="relative block min-w-0 flex-1 transition duration-200 hover:brightness-110 hover:scale-[1.04] active:scale-[0.97]"
      >
        <img
          src={active === "sign-in" ? fillButton : blankButton}
          alt=""
          className={compact ? "h-[32px] w-full max-w-none object-cover" : "h-[48px] w-full max-w-none object-cover"}
        />
        <span
          className={`absolute inset-0 flex items-center justify-center font-essays font-bold uppercase text-[#fef8e0] ${
            compact ? "text-[11px]" : "text-[min(16px,4.2vw)]"
          }`}
        >
          Sign in
        </span>
      </Link>
      <Link
        to="/sign-up"
        className="relative block min-w-0 flex-1 transition-transform duration-200 hover:brightness-110 hover:scale-[1.04] active:scale-[0.97]"
      >
        <img
          src={active === "sign-up" ? fillButton : blankButton}
          alt=""
          className={compact ? "h-[32px] w-full max-w-none object-cover" : "h-[48px] w-full max-w-none object-cover"}
        />
        <span
          className={`absolute inset-0 flex items-center justify-center font-essays font-bold uppercase text-[#fef8e0] ${
            compact ? "text-[11px]" : "text-[min(16px,4.2vw)]"
          }`}
        >
          Sign up
        </span>
      </Link>
    </div>
  );
}
