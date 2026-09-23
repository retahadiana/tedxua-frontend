const X_STYLE = {
  backgroundImage: "linear-gradient(180deg, #ff2b06 0%, #991a04 100%)",
  textShadow: "0px 0px 20px #fd2a05, 0px 4px 4px rgba(0,0,0,0.5)",
};

export default function RedAuthHeading({ top }) {
  return (
    <>
      <span
        className="absolute left-[751px] font-swung text-[80px] leading-none text-[#fef8e0] blur-[2px]"
        style={{ top }}
      >
        Get in on
      </span>
      <span
        className="absolute left-[1097px] font-swung text-[80px] leading-none text-[#fef8e0] blur-[2px]"
        style={{ top }}
      >
        CLUB!
      </span>
      <span
        className="absolute left-[1068.5px] w-[135px] bg-clip-text text-center font-swung text-[200px] leading-none text-transparent"
        style={{ top: top - 5, ...X_STYLE }}
      >
        X
      </span>
    </>
  );
}
