import React from "react";
import BannerBrand from "../components/home-page/BannerBrand";
import HeroSlide from "../components/home-page/HeroSide";
import TopProducts from "../components/home-page/TopProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSlide />
      <BannerBrand />
      <TopProducts />
    </div>
  );
};

export default HomePage;
