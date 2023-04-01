import React, { useEffect, useState } from "react";
import { addToFavorite, getTopProduct } from "../../../api/api";
import Product from "../../components/product/Product";
import { useMutation, useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { SparklesIcon } from "@heroicons/react/outline";

function TopProducts() {
  const topProductsQuery = useQuery("topproducts", getTopProduct);

  if (topProductsQuery.isLoading) return <Loader />;
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="flex space-x-2 text-gray-800">
          <SparklesIcon className="w-5 h-5" />
          <h2 className="font-semibold">Sản phẩm mới nhất</h2>
        </div>
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {topProductsQuery.data.map((item) => (
            <Product key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopProducts;
