import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ children, isExpand }) => {
  const [expand, setExpand] = useState(isExpand || false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };
  return (
    <section className={`hero ${expand ? "" : "hero-normal"}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div
                className="hero__categories__all"
                onClick={() => setExpand(!expand)}
              >
                <i className="fa fa-bars"></i>
                <span>Danh mục sản phẩm</span>
              </div>
              <ul>
                {category.map(({ link, text }, index) => (
                  <li key={index}>
                    <Link to={link}>{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form onSubmit={submitHandler}>
                  <div className="hero__search__categories">
                    Tất cả sản phẩm
                    <span className="arrow_carrot-down"></span>
                  </div>
                  <input
                    type="text"
                    placeholder="Bạn đang cần tìm gì?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="site-btn">
                    Tìm
                  </button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="hero__search__phone__text">
                  <h5>0925 675 234</h5>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
