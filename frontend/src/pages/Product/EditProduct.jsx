import React from "react";
import { useParams } from "react-router-dom";
import Barside from "../../component/Barside";
import ProductEdit from "../../component/product/ProductEdit";

const EditProduct = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex">
        <Barside />
        <div className="flex-1 p-8">
          <ProductEdit productId={id} />{" "}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
