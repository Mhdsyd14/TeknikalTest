import React from "react";
import { useParams } from "react-router-dom";
import OrderEdit from "../../component/order/OrderEdit";

const EditOrder = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex-1 p-8">
        <OrderEdit orderId={id} />{" "}
      </div>
    </>
  );
};

export default EditOrder;
