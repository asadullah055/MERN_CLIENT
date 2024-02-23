import React, { useEffect, useState } from "react";
import ProductStore from "../../store/productStore";

const ProductList = () => {
  const {
    filterProduct,
    filterProductRequest,
    categoryList,
    brandList,
    brandListRequest,
    categoryListRequest,
  } = ProductStore();
  let [Filter, SetFilter] = useState({
    brandID: "",
    categoryID: "",
  });

  const inputOnChange = async (name, value) => {
    SetFilter((data) => ({
      ...data,
      [name]: value,
    }));
  };
  useEffect(() => {
    (async () => {
      brandList === null ? await brandListRequest() : null;
      categoryList === null ? await categoryListRequest() : null;
      let isEveryFilterPropertyEmpty = Object.values(Filter).every(
        (value) => value === ""
      );
      !isEveryFilterPropertyEmpty ? await filterProductRequest(Filter) : null;
    })();
  }, [Filter]);

  return (
    <div className="max-w-6xl mx-auto px-3">
      <div className="w-fit grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-8 my-5">
        <label className="block w-full">
          <span className="text-gray-700">Brand Name</span>
          <select
            value={Filter.brandID}
            onChange={(e) => {
              inputOnChange("brandID", e.target.value);
            }}
            className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          >
            <option>--Select Brand--</option>
            {brandList !== null ? (
              brandList.map((item, i) => {
                return (
                  <option key={i} value={item["_id"]}>
                    {item["brandName"]}
                  </option>
                );
              })
            ) : (
              <option></option>
            )}
          </select>
        </label>
        <label className="block w-full">
          <span className="text-gray-700">Category Name</span>
          <select
            value={Filter.categoryID}
            onChange={(e) => {
              inputOnChange("categoryID", e.target.value);
            }}
            className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          >
            <option>--Select Category--</option>
            {categoryList !== null ? (
              categoryList.map((item, i) => {
                return (
                  <option key={i} value={item["_id"]}>
                    {item["categoryName"]}
                  </option>
                );
              })
            ) : (
              <option></option>
            )}
          </select>
        </label>
        {/* <label className="block w-full">
          <span className="text-gray-700">Search By Name</span>
          <input
            type="text"
            className="rounded w-full"
            value={Filter.name}
            onChange={(e) => {
              inputOnChange("name", e.target.value);
            }}
          />
        </label> */}
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-8 my-5">
        {filterProduct &&
          filterProduct.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl duration-500 hover:scale-100 hover:shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Product"
                className="rounded-t-xl"
              />
              <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  Brand: {item.brand.brandName}
                </span>
                <p className="text-md font-semibold text-black capitalize">
                  {item.name}
                </p>

                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    $149
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      $199
                    </p>
                  </del>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
