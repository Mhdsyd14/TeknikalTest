import React from "react";
import Barside from "../../component/Barside";
import Views from "../../component/categories/View";
const Categories = () => {
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

export default Categories;
