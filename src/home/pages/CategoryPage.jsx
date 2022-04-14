import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { getAllCategory, getCategoryBySlug, getProductsByCategory } from "../../api/api";
import Product from "../components/product/Product";
import { useQueries } from "react-query";
import Loader from "../components/loader/Loader";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [categoriesQuery, categoryQuery, categoryProductsQuery] = useQueries([
    { queryKey: "categories", queryFn: getAllCategory },
    { queryKey: `category_${categorySlug}`, queryFn: () => getCategoryBySlug(categorySlug) },
    { queryKey: `categoryProducts_${categorySlug}`, queryFn: () => getProductsByCategory(categorySlug) },
  ]);

  const { data: categories } = categoriesQuery;
  const { data: category } = categoryQuery;
  const { data: categoryProducts } = categoryProductsQuery;

  if (categoriesQuery.isLoading || categoryQuery.isLoading || categoryProductsQuery.isLoading) return <Loader />;
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
