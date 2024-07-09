import React from "react";
import Barside from "../../component/Barside";
import Views from "../../component/order/View";
const Orders = () => {
  return (
    <>
      <div className="flex">
        <Barside />
        <div className="flex-1 p-8">
          <Views />
        </div>
      </div>
    </>
  );
};

export default Orders;
