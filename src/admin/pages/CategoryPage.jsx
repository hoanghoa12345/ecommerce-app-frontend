import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createCategory, getAllCategory } from "../../api/api";
import { slugify } from "../../utils/formatType";
const CategoryPage = () => {
  const queryClient = useQueryClient();
  const { data, loading } = useQuery("categories", getAllCategory);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  })
  const slugInputRef = useRef()
  const {mutateAsync: mutateAsyncCreate} = useMutation(createCategory)
  const submitHandler = async (e) => {
    e.preventDefault()
    // console.log(formData);
    if(formData.slug === '') {
      setFormData({...formData, slug: slugInputRef.current.value})
    }else {
      await mutateAsyncCreate(formData)
      queryClient.invalidateQueries('categories')
      setFormData({name:'', slug: ''})
    }
  }

  return (
    <div className="container px-6 mx-auto">
      <div className="px-4 sm:px-0">
        <h2 className="my-6 text-2xl font-semibold text-gray-700">Categories</h2>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
              </tr>
            </thead>
            {loading && <p>Loading...</p>}
            {data && (
              <tbody className="bg-white divide-y">
                {data.map(({ id, name, slug }) => (
                  <tr key={id} className="text-gray-700">
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">{slug}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1 px-4 py-6">
          <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form onSubmit={submitHandler}>
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                Category name
              </label>
              <input
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                value={formData.name}
                type="text"
                name="category_name"
                id="category_name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label htmlFor="category_slug" className="block text-sm font-medium text-gray-700">
                Category slug
              </label>
              <input
                ref={slugInputRef}
                value={slugify(formData.name)}
                onChange={(e) => setFormData({formData, slug: e.target.value})}
                type="text"
                name="category_slug"
                id="category_slug"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
