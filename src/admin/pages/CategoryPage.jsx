import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createCategory, getAllCategory } from "../../api/api";
import { slugify } from "../../utils/formatType";
import Loader from "../components/Loader";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const { data, error, loading } = useQuery("categories", getAllCategory);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });
  const { mutateAsync: mutateAsyncCreate } = useMutation(createCategory);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.name !== "") {
      setFormData({ ...formData, slug: slugify(formData.name) });
      await mutateAsyncCreate(formData);
      queryClient.invalidateQueries("categories");
      setFormData({ name: "", slug: "" });
    }
  };

  return (
    <div className="container px-6 mx-auto">
      <div className="px-4 sm:px-0">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Categories</h2>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 dark:text-gray-400 uppercase border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : data ? (
              <tbody className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
                {data.map(({ id, name, slug }) => (
                  <tr key={id} className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{slug}</td>
                  </tr>
                ))}
              </tbody>
            ) : error ? (
              <p>{error.message}</p>
            ) : null}
          </table>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 px-4 py-6">
          <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={submitHandler}>
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400 ">
                  Category name
                </label>
                <input
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  value={formData.name}
                  type="text"
                  name="category_name"
                  id="category_name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="category_slug" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Category slug
                </label>
                <input
                  value={slugify(formData.name)}
                  readOnly
                  type="text"
                  name="category_slug"
                  id="category_slug"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-md"
                />
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
