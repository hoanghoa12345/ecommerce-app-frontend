import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import useStore from "../states/subscriptionState";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewSubscription, deleteSubcription, getSubsByUserId } from "../../api/api";
import { useUserContext } from "../../context/user";
import Loader from "../components/loader/Loader";
import { TrashIcon } from "@heroicons/react/solid";
import Modal from "../components/modal/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatPrice } from "../../utils/formatType";
const CreateSubscriptionPage = () => {
  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập tên gói đăng ký"),
    duration: yup
      .number()
      .integer("Vui lòng nhập số nguyên")
      .positive("Vui lòng nhập số dương")
      .required("Vui lòng nhập chu kỳ gói đăng ký"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState({
    confirm: false,
    id: 0,
  });
  const { user } = useUserContext();

  const { isLoading } = useQuery("subscriptions", () => getSubsByUserId(user.id), {
    onSuccess: (data) => {
      setSubscriptions(data);
    },
  });
  const queryClient = useQueryClient();
  const { subscriptions, setSubscriptions } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.token === "") {
      navigate("/login");
    }
  }, [user, navigate]);

  const { mutateAsync: createMutateAsync } = useMutation(createNewSubscription, {
    onSuccess: (data) => setSubscriptions([...subscriptions, data]),
  });

  const { mutateAsync: deleteMutateAsync } = useMutation(deleteSubcription, {
    onSuccess: () => {
      queryClient.invalidateQueries("subscriptions");
    },
  });

  const createSubscription = () => {
    setOpenModalCreate(true);
  };

  const submitCreateSubscription = async (data) => {
    //Get lastest subId
    //let subId = subscriptions.length > 0 ? subscriptions[0].id + 1 : 1;
    await createMutateAsync({
      name: data.name,
      duration: data.duration,
      total_price: 0,
      token: user.token,
    })
      .then((value) => {
        toast.success("Đã tạo gói đăng ký mới!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    queryClient.invalidateQueries("subscriptions");
    setOpenModalCreate(false);
  };

  const handleDeleteSubscription = async (id) => {
    // subscriptions.splice(index, 1);
    // setSubscriptions([...subscriptions]);

    if (isConfirmed.confirm) {
      await deleteMutateAsync({ id, token: user.token });
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className="w-full my-10 container max-w-6xl mx-auto min-h-[80vh]">
      {/* Modal add subscriptions */}
      <Modal isOpen={openModalCreate} setIsClose={() => setOpenModalCreate(!openModalCreate)} title="Tạo gói đăng ký mới">
        <form onSubmit={handleSubmit(submitCreateSubscription)} className="space-y-4">
          <div className="mt-4">
            <label htmlFor="subscriptionName" className="block text-sm font-medium text-gray-700">
              Tên gói đăng ký
            </label>
            <input
              type="text"
              name="susbcriptionName"
              className="block w-8/12 shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 mt-2"
              autoComplete="off"
              placeholder="Tên gói đăng ký"
              {...register("name")}
            />
            <span className="text-red-500 text-sm">{errors.name?.message}</span>
          </div>
          <div className="mt-4">
            <label htmlFor="subscriptionDuration" className="block text-sm font-medium text-gray-700">
              Chu kỳ giao hàng (tháng)
            </label>
            <input
              type="number"
              name="subscriptionDuration"
              max={10}
              min={1}
              defaultValue={1}
              className="w-28 block shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 mt-2"
              placeholder="Chu kỳ"
              {...register("duration")}
            />
            <span className="text-red-500 text-sm">{errors.duration?.message}</span>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
            >
              Lưu lại
            </button>
          </div>
        </form>
      </Modal>
      <div className="mt-10 sm:mt-0">
        <div className="mt-2 px-10 lg:px-0">
          <button
            onClick={createSubscription}
            className="text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
          >
            Tạo gói mới
          </button>
        </div>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 px-10 lg:px-0 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6 w-full mt-6">
          {subscriptions.map((item, i) => (
            <div key={i} className="cursor-pointer group bg-orange-400 h-64 rounded-md flex relative overflow-hidden bg-cover">
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
                {item.name} <br /> {item.duration} tháng <br /> {formatPrice(item.total_price)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSubscriptionPage;
