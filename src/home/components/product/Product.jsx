import React from "react";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { BASE_URL } from "../../../api/api";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatType";
import useStore from "../../states/cartState";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Product = ({ product, addToWishList }) => {
  const { cartAddItem } = useStore();

  return (
    <div className="relative block border border-gray-100">
      <button
        onClick={() => addToWishList(product.id)}
        type="button"
        name="wishlist"
        className="absolute p-2 text-white bg-black rounded-full right-4 top-4 hover:bg-red-600"
      >
        <HeartIcon className="w-4 h-4" />
      </button>
      <Link to={`/products/${product.slug}`}>
        <img src={`${BASE_URL}/${product.image}`} alt={product.name} className="object-contain w-full h-56 lg:h-72" />
      </Link>
      <div className="p-6">
        <p className="text-sm font-medium text-gray-600"> {formatPrice(product.price)}</p>
        <h5 className="mt-1 text-lg font-bold max-h-14 overflow-hidden"> {product.name}</h5>
        <button
          onClick={() => {
            cartAddItem({ product, qty: 1 });
            toast.success("Đã thêm vào giỏ hàng!");
          }}
          name="add"
          type="button"
          className="flex items-center justify-center w-full px-8 py-4 mt-4 bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 rounded-sm"
        >
          <span className="text-sm font-medium text-white">Thêm vào giỏ hàng</span>
          <ShoppingBagIcon className="w-5 h-5 ml-1.5 text-white" />
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addToWishList: PropTypes.func
};

Product.defaultProps = {
  addToWishList: () => {}
};

export default Product;
