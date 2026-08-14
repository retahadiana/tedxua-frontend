import cartIcon from "@/assets/merch/icon-cart.svg";
import cardTexture from "@/assets/merch/card-torn-mask.svg";

export default function ProductCard({ name = "Item Name", price = "IDR 0,00", image, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-[422/564] rounded-[22px] border-8 border-[#4B2D22] bg-[rgba(152,90,39,0.32)] overflow-hidden text-left cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
    >
      {image && (
        <img src={image} alt={name} className="absolute inset-0 w-full h-[60%] object-cover" />
      )}

      <div
        className="absolute bottom-[5.5%] left-[5.45%] right-[5.45%] h-[35%] bg-[#FEF8E0] rounded-[11px] p-4 flex flex-col justify-center"
        style={{ maskImage: `url(${cardTexture})`, maskSize: "cover" }}
      >
        <p className="font-gordita font-bold text-[#16220E] text-2xl">{name}</p>
        <p className="font-gordita font-bold text-[#16220E] text-xl mt-1">{price}</p>

        <span className="absolute bottom-4 right-4">
          <img src={cartIcon} alt="Add to cart" className="w-6 h-6" />
        </span>
      </div>
    </button>
  );
}