import Category from "../components/layout/CategoryRow";
import HeroSection from "../components/layout/HeroSection";
import FeaturesSection from "../components/layout/FeaturesSection";
import ProductCatalog from "../components/layout/ProductCatalog";
import ReviewSection from "../components/layout/ReviewSection";
import CustomProductSection from "../components/layout/CustomProductSection";
import UpcomingPremiumRow from "../components/layout/UpcomingPremiumRow";

const Home = () => {
  return (
    <>
      <Category />
      <HeroSection />
      <FeaturesSection />
      <ProductCatalog />
      <CustomProductSection />
      <UpcomingPremiumRow />
      <ReviewSection />
    </>
  );
};

export default Home;