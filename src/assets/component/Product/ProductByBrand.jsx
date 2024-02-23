import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/productStore";
import ProductList from "./ProductList";

const ProductByBrand = () => {
  const {sortByBrandRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await sortByBrandRequest(id);
    })();
  }, [id]);
  console.log(id);
  return (
    <>
      <ProductList />;
    </>
  );
};

export default ProductByBrand;
