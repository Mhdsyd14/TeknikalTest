import React from "react";
import CategoryEdit from "../../component/categories/CategoryEdit";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex-1 p-8">
        <CategoryEdit categoryId={id} />
      </div>
    </>
  );
};

export default Categories;
