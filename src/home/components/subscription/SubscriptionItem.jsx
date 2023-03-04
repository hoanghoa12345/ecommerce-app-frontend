import React from "react";
import PropTypes from "prop-types";
import { formatPrice, slugify } from "../../../utils/formatType";
import _ from "lodash-es";
import { BASE_URL } from "../../../api/api";
import { Link } from "react-router-dom";

export default function SubscriptionItem(props) {
  const { item } = props;

  const itemDetails = _.slice(item.details, 0, 4);

  return (
    <div key={item.id} className="group relative">
      {
        <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 border-1">
          <div className="grid grid-cols-2 gap-1">
            {{
              0: (
                <div className="relative col-span-2">
                  <div className="text-white text-xl absolute inset-0 bg-gray-400/80 flex justify-center items-center">
                    Không có sản phẩm
                  </div>
                </div>
              ),
              1: itemDetails.map((item, index) => (
                <div key={index} className="bg-gray-200 col-span-1 overflow-hidden">
                  <img src={item.product.image} alt="" className="w-full h-1/2 object-center object-cover" />
                </div>
              )),
              2: itemDetails.map((item, index) => (
                <div key={index} className="bg-gray-200 col-span-1 row-span-1 overflow-hidden">
                  <img src={item.product.image} alt="" className="w-full h-1/2 object-center object-cover" />
                </div>
              )),
              3: itemDetails.map((item, index) => (
                <div key={index} className="bg-gray-200 col-span-1 overflow-hidden">
                  <img src={item.product.image} alt="" className="w-full h-full object-center object-cover" />
                </div>
              )),
              4: itemDetails.map((item, index) => (
                <div key={index} className="bg-gray-200 col-span-1 overflow-hidden">
                  <img src={item.product.image} alt="" className="w-full h-full object-center object-cover" />
                </div>
              )),
            }[itemDetails.length] || (
              <React.Fragment>
                <div className="bg-gray-200 col-span-1 overflow-hidden">
                  <img src={itemDetails[0].product.image} alt={item.name} className="w-full h-full object-center object-cover" />
                </div>
                <div className="bg-gray-400 col-span-1 overflow-hidden">
                  <img src={itemDetails[1].product.image} alt={item.name} className="w-full h-full object-center object-cover" />
                </div>
                <div className="bg-gray-400 col-span-1 overflow-hidden">
                  <img src={itemDetails[2].product.image} alt={item.name} className="w-full h-full object-center object-cover" />
                </div>
                <div className="bg-gray-400 col-span-1 overflow-hidden relative">
                  <div className="text-white bg-gray-400/80 text-xl absolute inset-0 flex justify-center items-center">
                    + {itemDetails.length - 3}
                  </div>
                  <img src={itemDetails[3].product.image} alt={item.name} className="w-full h-full object-center object-cover" />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      }
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-semibold">
            <Link to={`/subscriptions/${item.id}?name=${slugify(item.name)}&duration=${item.duration}month`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {item.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{item.duration} tháng</p>
        </div>
        <p className="text-md font-semibold text-gray-900">{formatPrice(item.total_price)}</p>
      </div>
    </div>
  );
}

SubscriptionItem.propTypes = {
  item: PropTypes.object.isRequired,
};
