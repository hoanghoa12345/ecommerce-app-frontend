import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ background, currentPage }) => {
  return (
    <section
      className="breadcrumb-section set-bg"
      style={{ backgroundImage: background }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>Organi Shop</h2>
              <div className="breadcrumb__option">
                <Link to="/">Trang chủ</Link>
                <span>{currentPage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
