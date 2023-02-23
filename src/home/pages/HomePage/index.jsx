import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";
import { addToFavorite, getHomeBannersSlider, getHomeCategory, getTopProduct } from "../../../api/api";
import Product from "../../components/product/Product";
import { useMutation, useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { useUserContext } from "../../../context/user";
import { toast } from "react-toastify";
const HomePage = () => {
  return (
    <div>
      <HeroSlide />
      <BannerBrand />
      <TopProducts />
    </div>
  );
};

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
                backgroundImage: `url(${item})`
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const BannerBrand = () => {
  const { data: categoryList, isLoading, isError, error } = useQuery("category_home", () => getHomeCategory());
  if (isLoading) return <Loader />;
  if (isError) return <p>{error}</p>;
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-6xl px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((cat, index) => (
            <div
              key={index}
              className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700 bg-cover relative h-[14rem]"
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className="absolute bottom-0 left-0 text-center bg-gray-800 text-white opacity-80 w-full py-4 rounded-lg">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TopProducts = () => {
  const { user } = useUserContext();

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const data = await getTopProduct();
      setTopProducts(data);
    };

    fetchTopProducts();
  }, []);

  const topProductsQuery = useQuery("topproducts", getTopProduct);

  const addToWishListMutation = useMutation(addToFavorite);

  const handleAddToWishList = productId => {
    if (user.token.length > 0)
      addToWishListMutation.mutate(
        {
          formData: {
            user_id: user.id,
            product_id: productId
          },
          token: user.token
        },
        {
          onSuccess: wish => {
            toast.success(wish.message);
          },
          onError: err => toast.error(err.message)
        }
      );
  };

  if (topProductsQuery.isLoading) return <Loader />;
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="absolute inset-x-0 h-px -translate-y-1/2 bg-black/10 top-1/2"></span>
          <h2 className="relative inline-block px-4 text-2xl font-bold text-center bg-white">Sản phẩm mới nhất</h2>
        </div>
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {topProducts.map(item => (
            <Product key={item.id} product={item} addToWishList={handleAddToWishList} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
