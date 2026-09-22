import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, Footer, ScaledScene } from "@/components/layout";
import { useViewport } from "@/hooks";
import { formatRupiah } from "@/utils/formatters";
import { useProductDetail } from "../hooks/useProductDetail";
import akarDepan from "@/assets/merch/akar depan.webp";
import tanahJamur from "@/assets/merch/tanah jamur.webp";
import redArrow from "@/assets/merch/red arrow.webp";
import buyNow from "@/assets/merch/buy now.webp";
import hoverBuyNow from "@/assets/merch/hover buy now.webp";
import cardDetail from "@/assets/merch/card detail.webp";

const MOBILE_BREAKPOINT = 1024;

function ProductCardView({ gallery, imageIndex, product, id, onPrev, onNext, mobile = false }) {
  const arrowSize = mobile ? 40 : 64;

  return (
    <div className="relative flex items-center justify-center select-none">
      <div className="relative w-full max-w-[480px] aspect-[1150/1571] drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
        <img
          src={cardDetail}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center p-[13%]">
          <img
            src={gallery[imageIndex]}
            alt={product?.name || `Produk ${id}`}
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 0 12px rgba(255, 235, 170, 0.35))",
              transform:
                String(product?.id) === id && product?.id === 3
                  ? "translateX(-80px)"
                  : undefined,
            }}
          />
        </div>

        <button
          onClick={onPrev}
          aria-label="Geser kiri"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          <img
            src={redArrow}
            alt="Geser kiri"
            className="object-contain rotate-180"
            style={{ width: arrowSize, height: arrowSize }}
          />
        </button>

        <button
          onClick={onNext}
          aria-label="Geser kanan"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          <img
            src={redArrow}
            alt="Geser kanan"
            className="object-contain"
            style={{ width: arrowSize, height: arrowSize }}
          />
        </button>
      </div>
    </div>
  );
}

function DesktopDetail({ product, gallery, id, imageIndex, variantIndex, activeVariant, onPrev, onNext, selectVariant }) {
  return (
    <>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)] gap-12 items-center mb-16">
        <ProductCardView
          gallery={gallery}
          imageIndex={imageIndex}
          product={product}
          id={id}
          onPrev={onPrev}
          onNext={onNext}
        />

        <div className="flex flex-col gap-7">
          <h1
            className="font-essays font-bold italic text-7xl leading-tight -mt-3"
            style={{
              backgroundImage: "linear-gradient(to bottom, #FEF8E0, #DFDD9E)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {product?.name || "Item Name"}
          </h1>

          <div className="flex items-center gap-3 font-gordita flex-wrap">
            <span className="text-white text-3xl font-bold">
              {product ? formatRupiah(product.price) : "IDR 0,00"}
            </span>
            {product?.note && (
              <span className="font-gordita text-base text-white/70 bg-black/40 px-3 py-1 rounded-lg">
                {product.note}
              </span>
            )}
          </div>

          {product?.variants?.length > 1 && (
            <div>
              <p className="font-essays text-[#DFDD9E] font-semibold uppercase tracking-wide mb-4 italic text-2xl">
                Select Variant:
              </p>
              <div className="flex gap-4">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => selectVariant(i)}
                    className={`rounded-xl px-7 py-3 font-essays font-bold italic transition-all duration-200 ${variantIndex === i
                      ? "scale-105 bg-[#FEF8E0] text-[#4B2F22]"
                      : "variant-border opacity-80 hover:opacity-100 text-[#FEF8E0]"
                      }`}
                    style={{ fontSize: "1.625rem" }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product && (product.size || product.material) && (
            <div>
              <p className="font-essays text-[#DFDD9E] font-semibold uppercase tracking-wide mb-4 italic text-2xl">
                Product Details:
              </p>
              <div className="flex flex-col gap-3 font-gordita">
                <div className="flex items-start gap-3">
                  <span className="text-[#DFDD9E] font-semibold uppercase tracking-wide text-lg w-28 shrink-0">
                    Ukuran
                  </span>
                  <span className="text-white/90 text-xl">{product.size || "—"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#DFDD9E] font-semibold uppercase tracking-wide text-lg w-28 shrink-0">
                    Bahan
                  </span>
                  <span className="text-white/90 text-xl">{product.material || "—"}</span>
                </div>
              </div>
            </div>
          )}

          <p className="font-essays text-white/80 text-2xl leading-relaxed max-w-xl">
            {activeVariant?.description ||
              product?.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Deskripsi produk panjang ini menjelaskan detail merchandise dari TEDxUniversitasAirlangga."}
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeLnsV93kVAZnhPBSss6WfNNgzj2tRdCVxUb58evQmW764V4A/viewform?usp=sharing&ouid=114974847708934810629"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative self-start transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] mt-4"
          >
            <img
              src={buyNow}
              alt="Buy Now"
              className="w-full max-w-[320px] object-contain transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src={hoverBuyNow}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full max-w-[320px] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </>
  );
}

function MobileDetail({ product, gallery, id, imageIndex, variantIndex, activeVariant, onPrev, onNext, selectVariant }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="w-full max-w-[340px]">
        <ProductCardView
          gallery={gallery}
          imageIndex={imageIndex}
          product={product}
          id={id}
          onPrev={onPrev}
          onNext={onNext}
          mobile
        />
      </div>

      <div className="w-full flex flex-col gap-6 text-left">
        <h1
          className="font-essays font-bold italic text-4xl leading-tight text-center"
          style={{
            backgroundImage: "linear-gradient(to bottom, #FEF8E0, #DFDD9E)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {product?.name || "Item Name"}
        </h1>

        <div className="flex flex-col items-center gap-2 font-gordita text-center">
          <span className="text-white text-2xl font-bold">
            {product ? formatRupiah(product.price) : "IDR 0,00"}
          </span>
          {product?.note && (
            <span className="font-gordita text-sm text-white/70 bg-black/40 px-3 py-1 rounded-lg">
              {product.note}
            </span>
          )}
        </div>

        {product?.variants?.length > 1 && (
          <div>
            <p className="font-essays text-[#DFDD9E] font-semibold uppercase tracking-wide mb-3 italic text-lg">
              Select Variant:
            </p>
            <div className="flex gap-3 flex-wrap">
              {product.variants.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => selectVariant(i)}
                  className={`rounded-xl px-6 py-2.5 font-essays font-bold italic transition-all duration-200 ${variantIndex === i
                    ? "scale-105 bg-[#FEF8E0] text-[#4B2F22]"
                    : "variant-border opacity-80 hover:opacity-100 text-[#FEF8E0]"
                    }`}
                  style={{ fontSize: "1.25rem" }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {product && (product.size || product.material) && (
          <div>
            <p className="font-essays text-[#DFDD9E] font-semibold uppercase tracking-wide mb-3 italic text-lg">
              Product Details:
            </p>
            <div className="flex flex-col gap-3 font-gordita">
              <div className="flex items-start gap-3">
                <span className="text-[#DFDD9E] font-semibold uppercase tracking-wide text-sm w-20 shrink-0">
                  Ukuran
                </span>
                <span className="text-white/90 text-base">{product.size || "—"}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#DFDD9E] font-semibold uppercase tracking-wide text-sm w-20 shrink-0">
                  Bahan
                </span>
                <span className="text-white/90 text-base">{product.material || "—"}</span>
              </div>
            </div>
          </div>
        )}

        <p className="font-essays text-white/80 text-lg leading-relaxed">
          {activeVariant?.description ||
            product?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Deskripsi produk panjang ini menjelaskan detail merchandise dari TEDxUniversitasAirlangga."}
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeLnsV93kVAZnhPBSss6WfNNgzj2tRdCVxUb58evQmW764V4A/viewform?usp=sharing&ouid=114974847708934810629"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative self-center transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] mt-2 w-full max-w-[260px]"
        >
          <img
            src={buyNow}
            alt="Buy Now"
            className="w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={hoverBuyNow}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </a>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { w } = useViewport();
  const isMobile = w < MOBILE_BREAKPOINT;

  const { product, isLoading, fetchError } = useProductDetail(id);

  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const activeVariant = product?.variants?.[variantIndex];
  const gallery = activeVariant?.gallery?.length
    ? activeVariant.gallery
    : product?.gallery?.length
      ? product.gallery
      : [product?.image, product?.image, product?.image];

  const prevImage = () =>
    setImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  const nextImage = () =>
    setImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));

  const selectVariant = (index) => {
    setVariantIndex(index);
    setImageIndex(0);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#2D1E16] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#d9a520]/30 border-t-[#d9a520] animate-spin" />
          <p className="font-gordita text-sm text-white/50">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (fetchError || !product) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#2D1E16] text-white gap-4">
        <p className="font-essays text-2xl text-[#f6d78c]">Produk tidak ditemukan</p>
        <p className="font-gordita text-sm text-white/50">ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-white bg-[#2D1E16]">
      <Navbar />

      {isMobile ? (
        <main className="relative w-full overflow-hidden bg-gradient-to-b from-[#263A1F] from-40% to-[#2D1E16] pt-24 pb-0">
          <img
            src={akarDepan}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-bottom z-0 opacity-30"
            style={{ transform: "translateY(100px)" }}
          />
          <div className="relative z-10 max-w-[560px] mx-auto px-5 pt-6 pb-4">
            <MobileDetail
              product={product}
              gallery={gallery}
              id={id}
              imageIndex={imageIndex}
              variantIndex={variantIndex}
              activeVariant={activeVariant}
              onPrev={prevImage}
              onNext={nextImage}
              selectVariant={selectVariant}
            />
          </div>
          <div className="relative w-full -mt-20 z-[1]">
            <img
              src={tanahJamur}
              alt=""
              aria-hidden="true"
              className="w-full object-contain object-bottom"
            />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-56 z-[2] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,1) 100%)",
            }}
          />
        </main>
      ) : (
        <main className="relative w-full overflow-hidden bg-gradient-to-b from-[#263A1F] from-80% to-[#2D1E16]">
          <ScaledScene>
            <div className="relative min-h-screen">
              <img
                src={akarDepan}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-bottom z-0 opacity-30"
                style={{ transform: "translateY(100px)" }}
              />

              <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 pt-[calc(4rem+70px)] pb-0">
                <DesktopDetail
                  product={product}
                  gallery={gallery}
                  id={id}
                  imageIndex={imageIndex}
                  variantIndex={variantIndex}
                  activeVariant={activeVariant}
                  onPrev={prevImage}
                  onNext={nextImage}
                  selectVariant={selectVariant}
                />
              </div>

              <div className="relative w-full -mt-72 -mb-40 z-[1] pointer-events-none">
                <img
                  src={tanahJamur}
                  alt=""
                  aria-hidden="true"
                  className="w-full object-contain object-bottom"
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-72 z-[2] pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(0,0,0,1) 100%)",
                }}
              />
            </div>
          </ScaledScene>
        </main>
      )}
      <Footer className="!from-black !via-black/95 !to-black !pointer-events-auto" />
    </div>
  );
}