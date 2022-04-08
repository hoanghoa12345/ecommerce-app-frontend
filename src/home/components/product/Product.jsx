import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { BASE_URL } from "../../../api/api";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatType";
const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`} className="relative block border border-gray-100">
      <button type="button" name="wishlist" className="absolute p-2 text-white bg-black rounded-full right-4 top-4">
        <HeartIcon className="w-4 h-4" />
      </button>
      <img src={`${BASE_URL}/${product.image}`} alt={product.name} />
      <div className="p-6">
        <p className="text-sm font-medium text-gray-600"> {formatPrice(product.price)}</p>
        <h5 className="mt-1 text-lg font-bold max-h-14 overflow-hidden"> {product.name}</h5>
        <button name="add" type="button" className="flex items-center justify-center w-full px-8 py-4 mt-4 bg-orange-500 rounded-sm">
          <span className="text-sm font-medium text-black"> Thêm vào giỏ hàng</span>
          <ShoppingBagIcon className="w-5 h-5 ml-1.5 text-black" />
        </button>
      </div>
    </Link>
  );
};

export default Product;