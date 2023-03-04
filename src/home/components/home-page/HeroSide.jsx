import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import { getHomeBannersSlider } from "../../../api/api";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";

const HeroSlide = () => {
  const { isLoading, error, isError, data: heroSlide } = useQuery("banners_slider", () => getHomeBannersSlider());

  if (isLoading) return <Loader />;
  if (isError) return <p>{error}</p>;
  return (
    <div className="w-full">
      <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} autoplay={{ delay: 3000 }}>
        {heroSlide.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full bg-center bg-cover h-[32rem]"
              style={{
                backgroundImage: `url(${item})`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
