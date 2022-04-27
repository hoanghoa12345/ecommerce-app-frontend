import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const CreateSubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  const handleDeleteSubscription = (index) => {
    subscriptions.splice(index, 1);
    setSubscriptions([...subscriptions]);
  };
  console.log(subscriptions);
  return (
    <div className="w-full mt-10 container max-w-6xl mx-auto">
      <div className="mt-10 sm:mt-0">
        <div className="mt-2">
          <button
            onClick={() =>
              setSubscriptions([...subscriptions, { id: subscriptions.length > 0 ? subscriptions[subscriptions.length - 1].id + 1 : 1 }])
            }
            className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
          >
            Tạo gói mới
          </button>
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
          {subscriptions.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer group bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl h-40 rounded-md flex relative overflow-hidden"
            >
              <button
                type="button"
                className="hidden group-hover:block z-10 absolute top-2 right-2 p-0.5 text-white hover:bg-gray-500/80 rounded-full"
                onClick={() => handleDeleteSubscription(i)}
              >
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <span className="text-white w-full h-full flex justify-center items-center text-center absolute font-semibold text-md max-w-xs hover:scale-110 transition duration-300 ease-in-out">
                Gói sản phẩm {item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSubscriptionPage;
