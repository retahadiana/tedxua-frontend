export default function MyloIllustration({ assets }) {
  const { mylo, glow, grassFarthest, grassBack, grassFront, cardMerah } = assets;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {/* rumput paling belakang (rumput tolong), full width */}
      <img
        src={grassFarthest}
        alt=""
        className="absolute left-1/2 top-[381px] ml-[17px] z-[3] h-[567px] w-[1496px] max-w-none -translate-x-1/2 object-bottom"
      />

      {/* card merah di belakang mylo */}
      <img
        src={cardMerah}
        alt=""
        className="absolute left-[214px] top-[179px] z-[4] h-[617px] w-[404px] max-w-none object-contain"
      />

      {/* rumput belakang mylo */}
      <img
        src={grassBack}
        alt=""
        className="absolute left-1/2 top-[665px] ml-[-10.5px] z-[5] h-[294px] w-[1551px] max-w-none -translate-x-1/2 object-bottom"
      />

      {/* glow di belakang mylo */}
      <img alt="" src={glow} className="absolute left-[113px] top-[790px] z-[6] w-[201px] max-w-none" />

      {/* mascot mylo */}
      <img
        src={mylo}
        alt="Mylo mascot"
        className="absolute left-[45px] top-[423px] z-[7] h-[449px] w-[337px] object-cover"
      />

      {/* rumput depan mylo, paling atas layer-nya */}
      <img
        src={grassFront}
        alt=""
        className="absolute left-1/2 top-[768px] ml-[-6.5px] z-[8] h-[273px] w-[1465px] max-w-none -translate-x-1/2 object-bottom"
      />
    </div>
  );
}
