import Category from "../components/layout/CategoryRow";
import HeroSection from "../components/layout/HeroSection";
import FeaturesSection from "../components/layout/FeaturesSection";
import ProductCatalog from "../components/layout/ProductCatalog";
import ReviewSection from "../components/layout/ReviewSection";

const Home = () => {
  return (
    <>
      <Category />
      <HeroSection />
      <FeaturesSection />
      <ProductCatalog />
      <ReviewSection />
    </>
  );
};

export default Home;