import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/productStore";

const ViewSingleProduct = () => {
  const { getProductByIdRequest, getProductById } = ProductStore();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await getProductByIdRequest(id);
    })();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-3 mt-2">
      <div className="flex gap-3 justify-center items-center md:items-start flex-col md:flex-row">
        <div className="w-1/2 md:w-1/3">
          <img className="rounded" src={getProductById?.image} alt="" />
        </div>
        <div className="">
          <p className="md:mt-3 mt-1">
            <span className="font-semibold"> Product Name:</span>{" "}
            {getProductById?.name}
          </p>
          <p className="md:mt-3 mt-1">
            {" "}
            <span className="font-semibold"> Brand Name: </span>
            {getProductById?.brand.brandName}
          </p>
          <p className="md:mt-3 mt-1">
            {" "}
            <span className="font-semibold">
              {" "}
              Category Name: {getProductById?.category.categoryName}
            </span>
          </p>
          <p className="md:mt-3 mt-1">
            {" "}
            <span className="font-semibold">
              {" "}
              Description: {getProductById?.details}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleProduct;
