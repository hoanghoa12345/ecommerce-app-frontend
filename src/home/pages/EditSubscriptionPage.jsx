import React from "react";
import { useParams } from "react-router-dom";
const EditSubscriptionPage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>EditSubscriptionPage</div>;
};

export default EditSubscriptionPage;
