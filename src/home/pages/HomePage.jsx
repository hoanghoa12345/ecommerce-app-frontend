import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/hero-section/HeroSection";
import Product from "../components/products/Product";
const HomePage = () => {
  const sliderCategory = [
    {
      image:
        "https://th.bing.com/th/id/R.51af508fea8cb333fb92a97231f24971?rik=ZaXuQeqV3gtLIA&pid=ImgRaw&r=0",
      name: "Bột giặt",
      link: "/products",
    },
    {
      image:
        "https://th.bing.com/th/id/R.51af508fea8cb333fb92a97231f24971?rik=ZaXuQeqV3gtLIA&pid=ImgRaw&r=0",
      name: "Bột giặt",
      link: "/products",
    },
    {
      image:
        "https://th.bing.com/th/id/R.51af508fea8cb333fb92a97231f24971?rik=ZaXuQeqV3gtLIA&pid=ImgRaw&r=0",
      name: "Bột giặt",
      link: "/products",
    },
    {
      image:
        "https://th.bing.com/th/id/R.51af508fea8cb333fb92a97231f24971?rik=ZaXuQeqV3gtLIA&pid=ImgRaw&r=0",
      name: "Bột giặt",
      link: "/products",
    },
  ];
  const featuredProduct = [
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Nước xả vải",
      price: 225000,
      image:
        "https://th.bing.com/th/id/OIP.SZs4Fo5kkKXc7FvfLgMiPgAAAA?pid=ImgDet&rs=1",
    },
  ];
  return (
    <>
      <HeroSection isExpand={true}>
        <div
          className="hero__item set-bg"
          style={{
            backgroundImage:
              "url(https://theorganisedhousewife.com.au/wp-content/uploads/2018/09/Essential-Supplies-for-a-Basic-Home-Cleaning-Kit-4.jpg)",
          }}
        >
          <div className="hero__text">
            <span>SẢN PHẨM MỚI</span>
            <h2>Đăng ký ngay</h2>
            <p>Gói dịch vụ vệ sinh dành cho gia đình</p>
            <a href="/" className="primary-btn">
              MUA NGAY
            </a>
          </div>
        </div>
      </HeroSection>
      <section className="categories">
        <div className="container">
          <div className="row">
            {sliderCategory.map(({ image, name, link }, index) => (
              <div className="col-lg-3" key={index}>
                <div
                  className="categories__item set-bg"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                >
                  <h5>
                    <Link to={link}>{name}</Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Sản phẩm nổi bật</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className="active">Tất cả</li>
                  <li>Vệ sinh nhà cửa</li>
                  <li>Nhà bếp</li>
                  <li>Phòng tắm</li>
                  <li>Phòng khách</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {featuredProduct.map((item, index) => (
              <Product key={index} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
