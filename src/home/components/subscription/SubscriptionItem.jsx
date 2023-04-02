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
    <div>
      <Link to={`/subscriptions/${item.id}?name=${slugify(item.name)}&duration=${item.duration}month`}>
        <div className="grid grid-cols-2 grid-rows-2 rounded-md overflow-hidden">
          {itemDetails.map((item, index) => (
            <div key={index} className="col-span-1 row-span-1">
              <img src={`${BASE_URL}/${item.product.image}`} alt="w-16 h-16" className="object-cover" />
            </div>
          ))}
        </div>
      </Link>
      <div>
        <Link to={`/subscriptions/${item.id}?name=${slugify(item.name)}&duration=${item.duration}month`} className="text-sm">
          {item.name}
        </Link>
        <p className="text-gray-500 text-sm">{item.duration} tháng</p>
        <p className="text-base text-red-500 font-semibold">{formatPrice(item.total_price)}</p>
      </div>
    </div>
  );
}

SubscriptionItem.propTypes = {
  item: PropTypes.object.isRequired,
};
