import React from "react";
import { getHomeCategory } from "../../../api/api";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";

function BannerBrand() {
  const { data: categoryList, isLoading, isError, error } = useQuery("category_home", () => getHomeCategory());
  if (isLoading) return <Loader />;
  if (isError) return <p>{error}</p>;
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-6xl px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((cat, index) => (
            <div
              key={index}
              className="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700 bg-cover relative h-[14rem]"
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className="absolute bottom-0 left-0 text-center bg-gray-800 text-white opacity-80 w-full py-4 rounded-lg">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerBrand;
