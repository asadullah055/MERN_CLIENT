import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/productStore";
import ProductList from "./ProductList";

const SearchByName = () => {
  const { searchProductRequest } = ProductStore();
  const { name } = useParams();

  useEffect(() => {
    (async () => {
      await searchProductRequest(name);
    })();
  }, [name]);
  return (
    <>
      <ProductList />
    </>
  );
};

export default SearchByName;
