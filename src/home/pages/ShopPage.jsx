import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import HeroSection from "../components/hero-section/HeroSection";
import Product from "../components/products/Product";
import ShopSlidebar from "../components/shop-sidebar/ShopSlidebar";

const ShopPage = () => {
  const shopProduct = [
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
    <React.Fragment>
      <HeroSection />
      <Breadcrumb
        background="url(https://homefixituae.com/wp-content/uploads/2018/04/cleaning-services-banner.jpg)"
        currentPage="Shop"
      />
      <section className="product spad">
        <div className="container">
          <div className="row">
            <ShopSlidebar />
            <div className="col-lg-9 col-md-7">
              <div className="row">
                {shopProduct.map((item, index) => (
                  <Product key={index} product={item} />
                ))}
              </div>
              <div className="product__pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">
                  <i className="fa fa-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ShopPage;
