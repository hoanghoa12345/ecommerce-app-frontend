import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { getTopProduct } from "../../../api/api";
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { formatPrice } from "../../../utils/formatType";
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
  const heroSlide = [
    "https://www.bigc.vn/files/banners/2022/mar/blog-website-c-1.jpg",
    "https://www.bigc.vn/files/banners/2021/oct-21/unilever-big-c-cover-blog.jpg",
    "https://www.bigc.vn/files/banners/2022/mar/blog-c-100.jpg",
    "https://www.bigc.vn/files/banners/2022/feb/1080-x-540-cover-1.png",
  ];

  return (
    <div className="container w-full">
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

const BannerBrand = () => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div className="container max-w-6xl px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700 bg-cover relative h-[14rem]"
            style={{ backgroundImage: "url(https://cdn.tgdd.vn/bachhoaxanh/banners/3174/banner-landingpage-3174-2903202292754.jpg)" }}
          >
            <div className="absolute bottom-0 left-0 text-center bg-gray-800 text-white opacity-80 w-full py-4 rounded-lg">Bột giặt</div>
          </div>
          <div
            className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700 bg-cover relative h-[14rem]"
            style={{ backgroundImage: "url(https://cdn.tgdd.vn/bachhoaxanh/banners/3095/banner-landingpage-3095-1003202210747.jpg)" }}
          >
            <div className="absolute bottom-0 left-0 text-center bg-gray-800 text-white opacity-80 w-full py-4 rounded-lg">Dầu gội</div>
          </div>
          <div
            className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700 bg-cover relative h-[14rem]"
            style={{ backgroundImage: "url(https://cdn.tgdd.vn/bachhoaxanh/banners/3032/banner-landingpage-3032-23032022205023.jpg)" }}
          >
            <div className="absolute bottom-0 left-0 text-center bg-gray-800 text-white opacity-80 w-full py-4 rounded-lg">
              Nước lau sàn
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    const fetchTopProducts = async () => {
      const data = await getTopProduct();
      setTopProducts(data);
    };

    fetchTopProducts();
  }, []);

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="absolute inset-x-0 h-px -translate-y-1/2 bg-black/10 top-1/2"></span>
          <h2 className="relative inline-block px-4 text-2xl font-bold text-center bg-white">Sản phẩm bán chạy</h2>
        </div>
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {topProducts.map((item) => (
            <Product key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`} className="relative block border border-gray-100">
      <button type="button" name="wishlist" className="absolute p-2 text-white bg-black rounded-full right-4 top-4">
        <HeartIcon className="w-4 h-4" />
      </button>
      <img src={`${product.image}`} alt={product.name} />
      <div className="p-6">
        <p className="text-sm font-medium text-gray-600"> {formatPrice(product.price)}</p>
        <h5 className="mt-1 text-lg font-bold max-h-14 overflow-hidden"> {product.name}</h5>
        <button name="add" type="button" className="flex items-center justify-center w-full px-8 py-4 mt-4 bg-orange-500 rounded-sm">
          <span className="text-sm font-medium"> Thêm vào giỏ hàng</span>
          <ShoppingBagIcon className="w-5 h-5 ml-1.5" />
        </button>
      </div>
    </Link>
  );
};

export default HomePage;