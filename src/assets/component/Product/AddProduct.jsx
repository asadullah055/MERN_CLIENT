import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductStore from "../../store/productStore";
import { SuccessAlert } from "../../utility/utility";
import SubmitForm from "../Account/SubmitForm";

const AddProduct = () => {
  let navigate = useNavigate();

  const {
    productFormData,
    productFormOnChange,
    createProductRequest,
    updateProductRequest,
    categoryList,
    brandList,
    brandListRequest,
    categoryListRequest,
    singleProductRequest,
  } = ProductStore();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    (async () => {
      await singleProductRequest(id);
      brandList === null ? await brandListRequest() : null;
      categoryList === null ? await categoryListRequest() : null;
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === null) {
      const res = SuccessAlert("Product create success");
      if (res) {
        await createProductRequest(productFormData);
        navigate("/product");
      }
    } else {
      const res = SuccessAlert("update Success");
      if (res) {
        await updateProductRequest(productFormData, id);
        navigate("/product");
      }
    }
  };
  return (
    <div className="max-w-[500px] mx-auto px-3 mt-2 border rounded shadow">
      <h1 className="text-center font-semibold text-3xl p-3">
        Add Your New Product
      </h1>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-gray-700">Product Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Apple 15 Inch MacBook Air"
              value={productFormData.name}
              onChange={(e) => {
                productFormOnChange("name", e.target.value);
              }}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Brand Name</span>
            <select
              value={productFormData.brandID}
              onChange={(e) => {
                productFormOnChange("brandID", e.target.value);
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
          <label className="block">
            <span className="text-gray-700">Category Name</span>
            <select
              value={productFormData.categoryID}
              onChange={(e) => {
                productFormOnChange("categoryID", e.target.value);
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
          <label className="block">
            <span className="text-gray-700">Product Image</span>
            <input
              type="url"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Valid Image Url"
              value={productFormData.image}
              onChange={(e) => {
                productFormOnChange("image", e.target.value);
              }}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              value={productFormData.details}
              onChange={(e) => {
                productFormOnChange("details", e.target.value);
              }}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              rows="3"
            ></textarea>
          </label>
          <SubmitForm
            onClick={handleSubmit}
            className="bg-emerald-600 p-2 rounded text-white"
            type="submit"
            text={id === null ? "Add Product" : "Update Product"}
          ></SubmitForm>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
