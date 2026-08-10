import { useNavigate } from "react-router-dom";
import { Navbar, Footer, ScaledScene } from "@/components/layout";
import { useViewport } from "@/hooks";
import HeroSection from "../components/HeroSection";
import BundlesSection from "../components/BundlesSection";
import ProductsSection from "../components/ProductsSection";

const MOBILE_BREAKPOINT = 1024;

export default function MerchPage() {
  const navigate = useNavigate();
  const { w } = useViewport();
  const isMobile = w < MOBILE_BREAKPOINT;

  const handleSelectProduct = (id) => {
    navigate(`/merchandise/${id}`);
  };

  return (
    <div className="w-full bg-[#16220E] text-white">
      <Navbar />
      <main>
        {isMobile ? (
          <>
            <HeroSection variant="mobile" />
            <BundlesSection variant="mobile" onSelectProduct={handleSelectProduct} />
            <ProductsSection variant="mobile" onSelectProduct={handleSelectProduct} />
          </>
        ) : (
          <ScaledScene>
            <HeroSection />
            <BundlesSection onSelectProduct={handleSelectProduct} />
            <ProductsSection onSelectProduct={handleSelectProduct} />
          </ScaledScene>
        )}
      </main>
      <Footer />
    </div>
  );
}