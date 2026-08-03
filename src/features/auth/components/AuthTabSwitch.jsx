import { Link } from "react-router-dom";

export default function AuthTabSwitch({ active }) {
  const base =
    "flex h-[37px] w-[200px] items-center justify-center rounded-[8px] border-4 border-[#ff2b06] px-6 pb-4 pt-3 font-essays font-bold text-[16px] uppercase text-[#fef8e0] text-center";

  return (
    <div className="flex items-center gap-5">
      <Link
        to="/sign-in"
        className={`${base} ${active === "sign-in" ? "bg-gradient-to-l from-[#ff2b06] to-[#991a04]" : "bg-transparent"}`}
      >
        Sign in
      </Link>
      <Link
        to="/sign-up"
        className={`${base} ${active === "sign-up" ? "bg-gradient-to-l from-[#ff2b06] to-[#991a04]" : "bg-transparent"}`}
      >
        Sign up
      </Link>
    </div>
  );
}
