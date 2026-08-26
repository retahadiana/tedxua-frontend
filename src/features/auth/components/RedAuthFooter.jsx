export default function RedAuthFooter({ logo, bg, social }) {
  return (
    <footer className="relative z-10 w-full">
      <img src={bg} alt="" className="absolute inset-0 size-full object-cover" />

      <div className="relative flex flex-wrap items-start justify-between gap-8 px-12 pb-10 pt-16 text-[#fef8e0]">
        <div className="max-w-[666px]">
          <img src={logo} alt="" className="mb-4 h-[45.675px] w-[400px] object-contain" />
          <p className="font-gordita text-[16px]">
            TEDxUniversitasAirlangga is organized by an independent community within the scope of BEM FEB
            Universitas Airlangga to spread new ideas and spark conversation at the university level.
          </p>
        </div>
        <div>
          <p className="mb-4 text-right font-essays text-[18px] uppercase text-[#fd2a05]">
            Connect with us
          </p>
          <div className="flex items-center gap-[48px]">
            <span className="relative block size-[23px]">
              <img src={social.instagramBase} alt="" className="absolute inset-0 size-full max-w-none" />
              <img
                src={social.instagramDetail1}
                alt=""
                className="absolute left-1/2 top-1/2 size-[12px] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
              <img
                src={social.instagramDetail2}
                alt=""
                className="absolute left-1/2 top-1/2 size-[3px] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
            </span>
            <img src={social.linkedin} alt="" className="size-[23px] max-w-none" />
            <img src={social.tiktok} alt="" className="size-[23px] max-w-none" />
            <img src={social.x} alt="" className="size-[23px] max-w-none" />
          </div>
        </div>
      </div>

      <p className="relative px-12 text-center font-gordita text-[12px] uppercase">
        ©2024 All Rights Reserved
        <br />
        This independent <span className="font-gordita font-black text-[#fd2a05]">TEDx</span> event is operated
        under license from <span className="font-gordita font-black text-[#fd2a05]">TED</span>
      </p>

      <p className="relative px-12 pb-10 pt-2 text-right font-swung text-[15px] uppercase">
        Beneath what we see: The Mycelium
      </p>

      {social.corner && (
        <img src={social.corner} alt="" className="absolute bottom-[11%] right-[3.33%] size-[14px] max-w-none" />
      )}
    </footer>
  );
}
