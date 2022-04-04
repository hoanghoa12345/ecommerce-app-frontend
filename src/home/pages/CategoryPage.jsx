import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { BASE_URL, getAllCategory, getCategoryBySlug, getProductsByCategory } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
const CategoryPage = () => {
  const { categorySlug } = useParams();
  console.log(categorySlug);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryProducts, setCategoryProducts] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryBySlug = async () => {
      const data = await getCategoryBySlug(categorySlug);
      setCategory(data);
    };
    fetchCategoryBySlug();
  }, [categorySlug]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const data = await getProductsByCategory(categorySlug);
      setCategoryProducts(data);
    };
    fetchProductsByCategory();
  }, [categorySlug]);
  return (
    <div>
      <div className="mb-4 pt-4 border-t">
        <div className="container px-4 mx-auto">
          <ul className="flex items-center">
            <li className="mr-2">
              <a href="/" className="text-xs font-medium text-slate-600 hover:text-slate-800 flex items-center">
                <span className="mr-2">Trang chủ</span>
                <ChevronRightIcon className="w-4 h-6" />
              </a>
            </li>
            <li className="mr-2">
              <Link to="/shop" className="text-xs font-medium text-slate-600 hover:text-slate-800 flex items-center">
                <span className="mr-2">{`${category.name ? category.name : "Danh mục sản phẩm"}`}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/4 px-4 mb-12">
            <div className="max-h-64 overflow-x-auto">
              <h4 className="px-4 text-sm font-semibold uppercase mb-4">Danh mục</h4>
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="px-4 py-2 flex items-center justify-between hover:bg-brand-section-dashboard rounded-xl"
                    >
                      <span className="text-secondary text-sm font-semibold">{category.name}</span>
                      <span className="flex justify-center items-center h-6 w-6 text-xs text-secondary bg-gray-200 rounded">
                        {category.products_count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-3/4 px-4 mb-20">
            <div className="mb-7">
              <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
                {categoryProducts.map((item) => (
                  <Product key={item.id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

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
          <span className="text-sm font-medium"> Thêm vào giỏ hàng</span>
          <ShoppingBagIcon className="w-5 h-5 ml-1.5" />
        </button>
      </div>
    </Link>
  );
};
