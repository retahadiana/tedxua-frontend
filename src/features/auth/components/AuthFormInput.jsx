export default function AuthFormInput({ label, iconSrc, type = "text", value, onChange, placeholder, underlineSrc }) {
  return (
    <div className="flex w-full flex-col">
      <label className="font-essays text-[16px] text-[#fef8e0]">{label}</label>
      <div className="mt-[4px] flex h-[36px] items-center gap-[14px]">
        <img src={iconSrc} alt="" className="size-[32px] max-w-none" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent font-gordita font-medium text-[20px] text-[#fef8e0] placeholder:text-[#fef8e0]/60 outline-none"
        />
      </div>
      {underlineSrc && <img src={underlineSrc} alt="" className="mt-[1px] w-full max-w-none" />}
    </div>
  );
}
