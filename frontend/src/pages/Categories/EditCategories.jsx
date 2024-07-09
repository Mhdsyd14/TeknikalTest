import React from "react";
import Barside from "../../component/Barside";
import CategoryEdit from "../../component/categories/CategoryEdit";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex">
        <Barside />
        <div className="flex-1 p-8">
          <CategoryEdit categoryId={id} />
        </div>
      </div>
    </>
  );
};

export default Categories;
