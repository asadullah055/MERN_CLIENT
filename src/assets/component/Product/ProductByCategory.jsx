import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/productStore";
import ProductList from "./ProductList";

const ProductByCategory = () => {
  const { sortByCategoryRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await sortByCategoryRequest(id);
    })();
  }, [id]);
  console.log(id);
  return (
    <>
      <ProductList />
    </>
  );
};

export default ProductByCategory;
