import React, { useEffect, useState } from "react";
import { addToFavorite, getTopProduct } from "../../../api/api";
import Product from "../../components/product/Product";
import { useMutation, useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { useUserContext } from "../../../context/user";
import { toast } from "react-toastify";

function TopProducts() {
  const { user } = useUserContext();

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const data = await getTopProduct();
      setTopProducts(data);
    };

    fetchTopProducts();
  }, []);

  const topProductsQuery = useQuery("topproducts", getTopProduct);

  const addToWishListMutation = useMutation(addToFavorite);

  const handleAddToWishList = (productId) => {
    if (user.token.length > 0)
      addToWishListMutation.mutate(
        {
          formData: {
            user_id: user.id,
            product_id: productId,
          },
          token: user.token,
        },
        {
          onSuccess: (wish) => {
            toast.success(wish.message);
          },
          onError: (err) => toast.error(err.message),
        }
      );
  };

  if (topProductsQuery.isLoading) return <Loader />;
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="absolute inset-x-0 h-px -translate-y-1/2 bg-black/10 top-1/2"></span>
          <h2 className="relative inline-block px-4 text-2xl font-bold text-center bg-white">Sản phẩm mới nhất</h2>
        </div>
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {topProducts.map((item) => (
            <Product key={item.id} product={item} addToWishList={handleAddToWishList} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopProducts;
