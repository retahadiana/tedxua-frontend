export default function AuthGoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[59px] w-full max-w-[420px] rounded-[4px] border border-[#f0806e] bg-[#891e0d]
                 text-center font-nadira text-[18px] font-bold leading-6 text-white
                 transition-[filter] hover:brightness-110"
    >
      Start Explore Now
    </button>
  );
}
