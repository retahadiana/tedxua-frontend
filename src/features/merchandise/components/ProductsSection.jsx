import productTitle from "@/assets/merch/product.png";
import cardProduct from "@/assets/merch/card product.png";
import hoverProduct from "@/assets/merch/hover product.png";
import cartIcon from "@/assets/merch/cart icon.png";
import akarProduct from "@/assets/merch/akar product.png";
import { PRODUCTS } from "../data/products";
import { formatRupiah } from "@/utils/formatters";
import Reveal from "./Reveal";

const getImageStyle = (id, isMobile = false) => {
  const base = {
    width: "calc(100% * 0.6)",
    height: "calc(100% * 0.6)",
  };

  switch (id) {
    case 1: // Sticker — perkecil
      return { ...base, width: "calc(100% * 0.45)", height: "calc(100% * 0.45)" };
    case 2: // Keychain — miringkan 45 derajat
      return {
        ...base,
        top: isMobile ? "calc(25% + 15px)" : "calc(25% + 20px + 15px)",
        transform: "translate(-50%, -50%) rotate(45deg)",
      };
    case 3: // Phone Strap — miringkan 45 derajat, geser kiri & atas 15px
      return {
        ...base,
        top: "calc(25% + 20px - 15px)",
        left: "calc(50% - 15px)",
        transform: "translate(-50%, -50%) rotate(45deg)",
      };
    case 4: // Foldable Bag — besarin, geser bawah 20px
      return {
        ...base,
        width: "calc(100% * 0.75)",
        height: "calc(100% * 0.75)",
        top: isMobile ? "calc(25% + 25px)" : "calc(25% + 20px + 20px)",
      };
    case 5: // Cardholder — geser bawah 10px
      return {
        ...base,
        top: isMobile ? "calc(25% + 20px)" : "calc(25% + 20px + 10px)",
      };
    default:
      return base;
  }
};

function ProductCard({ product, index, onSelectProduct }) {
  return (
    <Reveal className="w-full max-w-[440px]" delay={(index % 3) * 0.12}>
      <button
        onClick={() => onSelectProduct?.(product.id)}
        className="relative group w-full aspect-[890/1170] text-left cursor-pointer"
      >
        <img
          src={cardProduct}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        />

        <img
          src={hoverProduct}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute object-contain transition-all duration-300 drop-shadow-[0_0_14px_rgba(255,235,170,0.65)] group-hover:opacity-70 group-hover:brightness-[0.85]"
            style={{
              top: "calc(25% + 20px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 15,
              ...getImageStyle(product.id),
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-gordita text-sm text-white/60 bg-black/40 px-4 py-2 rounded-lg">
              Foto belum tersedia
            </span>
          </div>
        )}

        <span
          className="absolute bottom-[6%] right-[8%]"
          style={{ transform: "translate(-20px, -20px)" }}
        >
          <img
            src={cartIcon}
            alt="Add to cart"
            className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </span>

        {product.note && (
          <span
            className="absolute font-gordita text-xs text-white/90 bg-black/50 px-3 py-1.5 rounded-lg left-[calc(6%+15px)] top-[calc(4%+15px)] max-w-[70%]"
          >
            {product.note}
          </span>
        )}

        <div className="absolute left-[calc(5.45%+15px)] right-[5.45%] p-4 bottom-[calc(5.5%+30px)]">
          <p className="font-gordita font-bold text-[#16220E] text-3xl leading-tight">
            {product.name}
          </p>
          <p className="font-gordita italic text-[#16220E] text-lg mt-1 truncate">
            {product.subtitle || "—"}
          </p>
          <p className="font-gordita font-bold text-[#16220E] text-2xl mt-2">
            {formatRupiah(product.price)}
          </p>
        </div>
      </button>
    </Reveal>
  );
}

function MobileProductCard({ product, index, onSelectProduct }) {
  return (
    <Reveal className="w-full" delay={(index % 2) * 0.1}>
      <button
        onClick={() => onSelectProduct?.(product.id)}
        className="relative group w-full aspect-[890/1170] text-left cursor-pointer"
      >
        <img
          src={cardProduct}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
        />

        <img
          src={hoverProduct}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute object-contain transition-all duration-300 drop-shadow-[0_0_14px_rgba(255,235,170,0.65)] group-hover:opacity-70 group-hover:brightness-[0.85]"
            style={{
              top: "calc(25% + 12px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 8,
              ...getImageStyle(product.id, true),
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-gordita text-[10px] text-white/60 bg-black/40 px-2 py-1 rounded-md">
              Foto belum tersedia
            </span>
          </div>
        )}

        {product.note && (
          <span
            className="absolute font-gordita text-[10px] text-white/90 bg-black/50 px-2 py-1 rounded-md left-[calc(6%+8px)] top-[calc(4%+8px)] max-w-[70%]"
          >
            {product.note}
          </span>
        )}

        <div className="absolute left-[calc(5.45%+8px)] right-[5.45%] p-2 bottom-[calc(5.5%+4px)]">
          <p className="font-gordita font-bold text-[#16220E] text-base sm:text-lg leading-tight">
            {product.name}
          </p>
          <p className="font-gordita italic text-[#16220E] text-[11px] sm:text-xs mt-0.5 truncate">
            {product.subtitle || "—"}
          </p>
          <p className="font-gordita font-bold text-[#16220E] text-sm sm:text-base mt-1">
            {formatRupiah(product.price)}
          </p>
        </div>
      </button>
    </Reveal>
  );
}

function DesktopProducts({ onSelectProduct }) {
  return (
    <section className="relative w-full bg-[#2D1E16] pt-20 pb-[calc(530px+6rem)] overflow-hidden z-[6] -mt-[240px]">
      <img
        src={akarProduct}
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-0 w-[35%] object-contain object-top"
      />

      <img
        src={akarProduct}
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-0 w-[35%] object-contain object-bottom"
        style={{ transform: "scaleX(-1)" }}
      />

      <div className="relative z-10" style={{ transform: "translateY(530px)" }}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <Reveal>
            <h2 className="flex justify-end mb-16 mt-[30px]">
              <img
                src={productTitle}
                alt="Products"
                className="w-[60%] max-w-[600px] h-auto object-contain"
              />
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-items-center -mt-[30px]">
            {PRODUCTS.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-72 z-[5]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,1) 100%)" }}
      />
    </section>
  );
}

function MobileProducts({ onSelectProduct }) {
  return (
    <section className="relative w-full bg-[#2D1E16] pt-12 pb-24 overflow-hidden z-[6]">
      <img
        src={akarProduct}
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-0 w-[45%] object-contain object-top opacity-70"
      />

      <div className="relative z-10 max-w-[560px] mx-auto px-5">
        <Reveal>
          <h2 className="flex justify-end mb-8">
            <img
              src={productTitle}
              alt="Products"
              className="w-[65%] max-w-[260px] h-auto object-contain"
            />
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 justify-items-center">
          {PRODUCTS.map((product, index) => (
            <MobileProductCard
              key={product.id}
              product={product}
              index={index}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-72 z-[5]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,1) 100%)" }}
      />
    </section>
  );
}

export default function ProductsSection({ onSelectProduct, variant = "desktop" }) {
  return variant === "mobile" ? (
    <MobileProducts onSelectProduct={onSelectProduct} />
  ) : (
    <DesktopProducts onSelectProduct={onSelectProduct} />
  );
}