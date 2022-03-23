import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import language from "../../../assets/images/icon_vietnammese.png";
export default function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>
                    <i className="fa fa-envelope"></i> support@ogani.com
                  </li>
                  <li>Miễn phí vận chuyển cho đơn đặt hàng từ 100.000₫</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <a href="/">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-pinterest-p"></i>
                  </a>
                </div>
                <div className="header__top__right__language">
                  <img src={language} alt="language" />
                  <div>Tiếng Việt</div>
                  <span className="arrow_carrot-down"></span>
                  <ul>
                    <li>
                      <a href="/">Tiếng Việt</a>
                    </li>
                    <li>
                      <a href="/">English</a>
                    </li>
                  </ul>
                </div>
                <div className="header__top__right__auth">
                  <Link to="/login">
                    <i className="fa fa-user"></i> Đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="header logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul>
                <li className="active">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <a href="/subscription">Gói đăng ký</a>
                </li>
                <li>
                  <Link to="/shop">Sản phẩm</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li>
                  <Link to="/favorite">
                    <i className="fa fa-heart"></i> <span>1</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag"></i> <span>3</span>
                  </Link>
                </li>
              </ul>
              <div className="header__cart__price">
                Giỏ hàng: <span>150.000₫</span>
              </div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
        {/* TODO: Add humberger sidebar */}
      </div>
    </header>
  );
}
