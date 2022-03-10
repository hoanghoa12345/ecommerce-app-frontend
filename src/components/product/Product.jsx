import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import "./product.css";
const Product = () => {
  return (
    <Card className="product__item">
      <CardBody>
        <Link to="/products">
          <div className="box__img">
            <img
              width="160"
              height="160"
              src="https://cdn.tgdd.vn/Products/Images/2463/196448/bhx/bot-giat-ariel-huong-nang-mai-55kg-202203042240212822_300x300.jpg"
              alt="Bột giặt Ariel hương nắng mai 5.5kg"
            />
          </div>
          <CardTitle className="product__name">
            Bột giặt Ariel hương nắng mai 5.5kg
          </CardTitle>
          <div className="price">
            <strong
              style={{
                color: "#b10e0e",
                fontWeight: "normal",
                fontSize: "13px",
                verticalAlign: "middle",
              }}
            >
              173.000₫
            </strong>{" "}
            <span
              style={{
                fontSize: "13px",
                color: "#757575",
                textDecoration: "line-through",
                verticalAlign: "middle",
              }}
            >
              40.000₫
            </span>{" "}
            <label
              style={{
                color: "#fff",
                fontWeight: 600,
                borderRadius: "3px",
                backgroundColor: "#de2000",
                width: "32px",
                height: "20px",
                lineHeight: "20px",
                textAlign: "center",
                fontSize: "12px",
                verticalAlign: "middle",
              }}
            >
              -30%
            </label>
          </div>
        </Link>
        <Button
          color="success"
          outline
          block
          className="mt-3"
          style={{ textTransform: "uppercase", fontSize: "14px" }}
        >
          Chọn mua
        </Button>
      </CardBody>
    </Card>
  );
};

export default Product;
