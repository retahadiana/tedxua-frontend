import elipsPutih from "@/assets/auth/login/elips putih.png";
import elipsOranye from "@/assets/auth/login/elips oranye.png";
import maskLeft from "@/assets/auth/login/mask-left.svg";
import maskRight from "@/assets/auth/login/mask-right.svg";
import photoroom1 from "@/assets/auth/login/photoroom-1.png";
import photoroom2 from "@/assets/auth/login/photoroom-2.png";

const LEFT_LINES = [
  { left: 2390, top: 611.18, maskPos: "0px -99.184px" },
  { left: 2492.86, top: 544.74, maskPos: "-102.857px -32.74px" },
  { left: 2595.71, top: 512, maskPos: "-205.714px 0px" },
  { left: 2698.57, top: 527.41, maskPos: "-308.571px -15.407px" },
  { left: 2801.43, top: 564.96, maskPos: "-411.429px -52.962px" },
  { left: 2904.29, top: 628.52, maskPos: "-514.286px -116.517px" },
  { left: 3007.14, top: 745.03, maskPos: "-617.143px -233.035px" },
];

const RIGHT_LINES = [
  { left: 3793.14, top: 611.18, maskPos: "-617.143px -99.184px" },
  { left: 3690.29, top: 544.74, maskPos: "-514.286px -32.74px" },
  { left: 3587.43, top: 512, maskPos: "-411.429px 0px" },
  { left: 3484.57, top: 527.41, maskPos: "-308.572px -15.407px" },
  { left: 3381.71, top: 564.96, maskPos: "-205.714px -52.962px" },
  { left: 3278.86, top: 628.52, maskPos: "-102.857px -116.517px" },
  { left: 3176, top: 745.03, maskPos: "0px -233.035px" },
];

const GRADIENT_BG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 102.86 1066.1' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.3'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(5.843e-7 -196.94 30.689 2.4025e-7 102.86 758.69)'><stop stop-color='rgba(255,255,255,0)' offset='0.16'/><stop stop-color='rgba(128,128,128,0.375)' offset='0.45'/><stop stop-color='rgba(0,0,0,0.75)' offset='0.74'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>\")";

function LineGroup({ lines, mask, flip }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((l, i) => (
        <div
          key={i}
          className="absolute h-[1066.122px] w-[102.857px] border-l-[1.6px] border-white/0 mix-blend-screen mask-alpha mask-intersect mask-no-clip mask-no-repeat"
          style={{
            left: l.left,
            top: l.top,
            backgroundImage: GRADIENT_BG,
            maskImage: `url("${mask}")`,
            maskPosition: l.maskPos,
            maskSize: "720px 1299.156px",
            transform: flip ? "rotate(180deg) scaleY(-1)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

export default function AuthBackgroundDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-[-142px] top-[-76px] rotate-[-1.14deg]">
        <img src={elipsPutih} alt="" className="block h-auto w-[1100px] max-w-none" />
      </div>

      <div className="absolute bottom-[-410px] right-0">
        <img src={elipsOranye} alt="" className="block w-[1600px] max-w-none" />
      </div>

      <LineGroup lines={LEFT_LINES} mask={maskLeft} />
      <LineGroup lines={RIGHT_LINES} mask={maskRight} flip />

      <div className="absolute left-[374px] top-[280px] h-[821px] w-[693px] mix-blend-luminosity">
        <img src={photoroom1} alt="" className="size-full object-cover opacity-30 rotate-[10.06deg]" />
      </div>
      <div className="absolute left-[1182px] top-[-93px] h-[731px] w-[639px] mix-blend-luminosity">
        <img src={photoroom1} alt="" className="size-full object-cover opacity-20 rotate-[15.96deg]" />
      </div>
      <div className="absolute left-[-249px] top-[43px] size-[547px] mix-blend-luminosity">
        <img src={photoroom2} alt="" className="size-full object-cover opacity-30 rotate-[-28.32deg]" />
      </div>
      <div className="absolute left-[1120px] top-[650px] size-[482px] mix-blend-luminosity">
        <img src={photoroom2} alt="" className="size-full object-cover opacity-30 rotate-[-12.51deg]" />
      </div>
    </div>
  );
}
