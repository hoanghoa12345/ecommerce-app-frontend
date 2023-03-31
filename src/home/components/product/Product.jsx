import React from "react";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { BASE_URL } from "../../../api/api";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatType";
import useStore from "../../states/cartState";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col justify-items-center">
        <img className="h-52 w-full object-cover" src={`${BASE_URL}/${product.image}`} alt={product.name} />
        <div className="px-4 mt-4">
          <div className="px-2 py-3 h-14">
            <h3 className="text-black text-sm leading-4 overflow-ellipsis overflow-hidden">{product.name}</h3>
          </div>
          <div>
            <div className="px-2 py-2 h-12 overflow-hidden">
              <div className="font-medium text-md text-red-500">{formatPrice(product.price)}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addToWishList: PropTypes.func,
};

Product.defaultProps = {
  addToWishList: () => {},
};

export default Product;
