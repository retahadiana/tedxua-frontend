import { Link } from "react-router-dom";

export default function RedAuthNavbar({ logo, links, ctaLabel, ctaHref }) {
  const ctaClasses =
    "flex h-[37px] w-[110px] items-center justify-center rounded-[8px] border-4 border-[#ff2b06] px-6 pb-4 pt-3 font-essays font-bold text-[14px] uppercase text-[#fef8e0]";

  return (
    <header className="absolute top-0 left-0 z-20 flex h-[96px] w-full items-center justify-between gap-[80px] bg-[rgba(17,17,17,0.32)] px-12 backdrop-blur-[8px]">
      <img src={logo} alt="TEDx Universitas Airlangga" className="h-[31px] w-[270px] shrink-0 object-contain" />
      <nav className="flex items-center gap-[40px]">
        {links.map((l) => (
          <span key={l.label} className="flex items-center gap-[6px] font-essays text-[16px] text-[#fef8e0]">
            {l.label}
            {l.arrow && <img src={l.arrow} alt="" className="h-[10px] w-[13px]" />}
          </span>
        ))}
      </nav>
      {ctaHref ? (
        <Link to={ctaHref} className={ctaClasses}>
          {ctaLabel}
        </Link>
      ) : (
        <span className={ctaClasses}>{ctaLabel}</span>
      )}
    </header>
  );
}
