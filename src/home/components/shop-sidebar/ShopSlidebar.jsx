import React from "react";
import { Link } from "react-router-dom";

const ShopSlidebar = () => {
  const category = [
    {
      text: "Bột giặt, nước giặt",
      link: "/bot-giat",
    },
    {
      text: "Nước xả, nước tẩy",
      link: "/nuoc-xa",
    },
    {
      text: "Nước rửa chén",
      link: "/nuoc-rua-chen",
    },
    {
      text: "Tẩy rửa nhà tắm",
      link: "/tay-rua-nha-tam",
    },
    {
      text: "Nước lau kính",
      link: "/nuoc-lau-kink",
    },
    {
      text: "Nước lau sàn",
      link: "/nuoc-lau-san",
    },
    {
      text: "Xịt phòng, sáp thơm",
      link: "/xit-phong",
    },
    {
      text: "Bình xịt côn trùng",
      link: "/xit-con-trung",
    },
    {
      text: "Túi đựng rác",
      link: "/tui-dung-rac",
    },
  ];
  return (
    <div className="col-lg-3 col-md-5">
      <div className="sidebar">
        <div className="sidebar__item">
          <h4>Danh mục</h4>
          <ul>
            {category.map(({ link, text }, index) => (
              <li key={index}>
                <Link to={link}>{text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar__item">
          <h4>Price</h4>
          <div className="price-range-wrap">Price Slider</div>
        </div>
        <div className="sidebar__item">
          <div className="latest-product__text">
            <h4>Latest Products</h4>
            <div className="latest-product__slider">Last Product Item</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSlidebar;
