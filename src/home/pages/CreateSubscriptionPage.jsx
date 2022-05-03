import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import useStore from "../states/subscriptionState";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewSubscription, deleteSubcription, getListSubscriptionByUser } from "../../api/api";
import { useUserContext } from "../../context/user";
import Loader from "../components/loader/Loader";
import { TrashIcon } from "@heroicons/react/solid";

const CreateSubscriptionPage = () => {
  const [isConfirmed, setIsConfirmed] = useState({
    confirm: false,
    id: 0,
  });
  const { user } = useUserContext();
  const { isLoading } = useQuery("subscriptions", () => getListSubscriptionByUser(user.id), {
    onSuccess: (data) => {
      setSubscriptions(data);
    },
  });
  const queryClient = useQueryClient();
  const { subscriptions, setSubscriptions } = useStore();

  const navigate = useNavigate();

  const { mutateAsync: createMutateAsync } = useMutation(createNewSubscription, {
    onSuccess: (data) => setSubscriptions([...subscriptions, data]),
  });

  const { mutateAsync: deleteMutateAsync } = useMutation(deleteSubcription, {
    onSuccess: () => {
      queryClient.invalidateQueries("subscriptions");
    },
  });

  const createSubscription = async () => {
    //Get lastest subId
    let subId = subscriptions.length > 0 ? subscriptions[0].id + 1 : 1;
    await createMutateAsync({
      name: `Gói sản phẩm ${subId}`,
      duration: 1,
      total_price: 0,
    });
    queryClient.invalidateQueries("subscriptions");
  };

  const handleDeleteSubscription = async (id) => {
    // subscriptions.splice(index, 1);
    // setSubscriptions([...subscriptions]);

    if (isConfirmed.confirm) {
      await deleteMutateAsync(id);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className="w-full mt-10 container max-w-6xl mx-auto">
      <div className="mt-10 sm:mt-0">
        <div className="mt-2">
          <button
            onClick={createSubscription}
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
              >
                {isConfirmed.confirm && isConfirmed.id === item.id ? (
                  <TrashIcon onClick={() => handleDeleteSubscription(item.id)} className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <XIcon
                    onClick={() =>
                      setIsConfirmed({
                        confirm: true,
                        id: item.id,
                      })
                    }
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button>
              <button
                onClick={() => navigate("/create-subscription/" + item.id)}
                className="text-white w-full h-full flex justify-center items-center text-center absolute font-semibold text-md max-w-xs hover:scale-110 transition duration-300 ease-in-out"
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSubscriptionPage;
