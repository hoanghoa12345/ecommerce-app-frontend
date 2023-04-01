import React, { useEffect, useState } from "react";
import { useQuery, useQueries } from "react-query";
import BannerBrand from "../components/home-page/BannerBrand";
import HeroSlide from "../components/home-page/HeroSide";
import TopProducts from "../components/home-page/TopProducts";
import { Tab } from "@headlessui/react";
import { BASE_URL, getAllCategory } from "../../api/api";
import { TagIcon } from "@heroicons/react/outline";
import ShoppingItems from "../../assets/images/shopping_items.svg";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HomePage = () => {
  const { data: categories, error: errorCategories, isLoading: isLoadingCategories } = useQuery("categories", getAllCategory);
  const handleTabGroupChange = (index) => {
    console.log("Changed selected tab to:", index);
    console.log(categories);
  };

  return (
    <div>
      <div className="">
        {categories ? (
          <Tab.Group onChange={handleTabGroupChange}>
            <div className="bg-orange-500">
              <div className="container mx-auto max-w-6xl">
                <Tab.List className="flex bg-orange-500 px-1">
                  {categories.slice(0, 3).map((category) => (
                    <Tab
                      key={category.name}
                      className={({ selected }) =>
                        classNames(
                          "w-full py-2 text-base leading-5 text-white",
                          selected
                            ? "bg-orange-500 font-bold border-b-4 border-white"
                            : "font-thin border-b-2 border-orange-300 hover:bg-orange-200"
                        )
                      }
                    >
                      {category.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>

            <Tab.Panels className="mt-2">
              {categories.map((category, idx) => (
                <Tab.Panel key={idx}>
                  <div className="my-4">
                    <div className="max-w-6xl mx-auto flex space-x-2 justify-center">
                      {categories.slice(0, 6).map((item, idx) => (
                        <div key={idx}>
                          <Link to={`/category/${item.slug}`}>
                            <div className="flex flex-col items-center space-y-2">
                              <img className="w-10 h-10" src={item.image ? item.image : ShoppingItems} alt={item.name} />
                              <span className="text-base">{item.name}</span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="max-w-6xl mx-auto my-4">
                      <img className="w-full h-auto" src={`${BASE_URL}/assets/images/banner_home.png`} alt="" />
                    </div>
                    <div className="max-w-6xl mx-auto bg-gray-50">
                      <TopProducts />
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        ) : null}
      </div>

      {/* <HeroSlide />
      <BannerBrand /> 
      <TopProducts />*/}
    </div>
  );
};

export default HomePage;
