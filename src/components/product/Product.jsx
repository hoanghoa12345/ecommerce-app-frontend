import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import "./product.css";
const Product = ({ product }) => {
  const navigate = useNavigate();
  const handleBuyProduct = () => {
    navigate(`/product/${product.slug}`);
  };
  return (
    <Card className="product__item">
      <CardBody>
        <Link to={`/product/${product.slug}`}>
          <div className="box__img">
            <img
              width="160"
              height="160"
              src={product.image}
              alt={product.name}
            />
          </div>
          <CardTitle className="product__name">{product.name}</CardTitle>
          <div className="price">
            <strong>{product.price}₫</strong> <span>{product.old_price}₫</span>{" "}
            <label>-{product.discount}%</label>
          </div>
        </Link>
        <Button
          color="success"
          outline
          block
          className="mt-3"
          style={{ textTransform: "uppercase", fontSize: "14px" }}
          onClick={() => handleBuyProduct()}
        >
          Chọn mua
        </Button>
      </CardBody>
    </Card>
  );
};

export default Product;
