import React from "react";

const Product = ({ product }) => {
  const { name, price, image } = product;
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mix">
      <div className="featured__item">
        <div
          className="featured__item__pic set-bg"
          style={{ backgroundImage: `url(${image})` }}
        >
          <ul className="featured__item__pic__hover">
            <li>
              <a href="/">
                <i className="fa fa-heart"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-retweet"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="featured__item__text">
          <h6>
            <a href="/">{name}</a>
          </h6>
          <h5>
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Product;
