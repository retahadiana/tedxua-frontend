export default function MyloIllustration({ assets }) {
  const { mylo, glow, grassFarthest, grassBack, grassFront, cardMerah } = assets;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {/* rumput paling belakang (rumput tolong), mulai dari tengah layar */}
      <img
        src={grassFarthest}
        alt=""
        className="absolute left-[20px] top-[240px] z-[3] h-[700px] w-full max-w-none object-bottom"
      />

      {/* card merah di belakang mylo */}
      {cardMerah && (
        <img
          src={cardMerah}
          alt=""
          className="absolute left-[380px] top-[130px] z-[4] h-[620px] w-[406px] max-w-none object-contain"
        />
      )}

      {/* rumput belakang mylo, posisi lebih ke bawah */}
      <img
        src={grassBack}
        alt=""
        className="absolute inset-x-0 top-[470px] z-[5] h-[540px] w-full max-w-none object-bottom"
      />

      {/* glow di belakang mylo */}
      <img alt="" src={glow} className="absolute left-[113px] top-[790px] z-[6] w-[201px] max-w-none" />

      {/* mascot mylo */}
      <img
        src={mylo}
        alt="Mylo mascot"
        className="absolute left-[230px] top-[360px] z-[7] h-[470px] w-[352px] object-cover"
      />

      {/* rumput depan mylo, paling bawah, paling atas layer-nya */}
      <img
        src={grassFront}
        alt=""
        className="absolute inset-x-0 top-[600px] z-[8] h-[480px] w-full max-w-none object-bottom"
      />
    </div>
  );
}
