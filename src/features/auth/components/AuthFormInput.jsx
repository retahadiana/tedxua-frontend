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
  iconClassName = "size-[26px] shrink-0 max-w-none",
  compact = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex w-full flex-col">
      <label className={`font-essays text-[#fef8e0] ${compact ? "text-[11px]" : "text-[16px]"}`}>
        {label}
      </label>
      <div
        className={`flex items-center gap-[14px] ${
          compact ? "mt-[2px] h-[22px]" : "mt-[4px] h-[36px]"
        }`}
      >
        <img src={iconSrc} alt="" className={compact ? "size-[16px] shrink-0 max-w-none" : iconClassName} />
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-transparent font-gordita font-medium text-[#fef8e0] placeholder:text-[#fef8e0]/60 outline-none ${
            compact ? "text-[13px]" : "text-[20px]"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            className="shrink-0 text-[#fef8e0]/70 transition-colors hover:text-[#fef8e0]"
          >
            {showPassword ? <EyeOff size={compact ? 14 : 22} /> : <Eye size={compact ? 14 : 22} />}
          </button>
        )}
      </div>
      {underlineSrc && <img src={underlineSrc} alt="" className="mt-[1px] w-full max-w-none" />}
    </div>
  );
}
