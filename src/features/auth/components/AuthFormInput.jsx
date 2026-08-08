import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthFormInput({
  label,
  iconSrc,
  type = "text",
  value,
  onChange,
  placeholder,
  underlineSrc,
  iconClassName = "size-[21px] shrink-0 max-w-none",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex w-full flex-col">
      <label className="font-essays text-[13px] text-[#fef8e0]">{label}</label>
      <div className="mt-[3px] flex h-[29px] items-center gap-[11px]">
        <img src={iconSrc} alt="" className={iconClassName} />
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent font-gordita font-medium text-[16px] text-[#fef8e0] placeholder:text-[#fef8e0]/60 outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            className="shrink-0 text-[#fef8e0]/70 transition-colors hover:text-[#fef8e0]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {underlineSrc && <img src={underlineSrc} alt="" className="mt-[1px] w-full max-w-none" />}
    </div>
  );
}
