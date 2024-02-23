import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductStore from "../../store/productStore";
import UserStore from "../../store/userStore";
import { DeleteAlert, EditAlert } from "../../utility/utility";

const Product = () => {
  const { allProduct, allProductRequest, deleteProductRequest } =
    ProductStore();
  const { userProfileRequest } = UserStore();
  const navigate = useNavigate();
  const [change, setChange] = useState(0);
  useEffect(() => {
    (async () => {
      await allProductRequest();
      await userProfileRequest();
    })();
  }, [change]);
  const handleDelete = async (id) => {
    const res = await DeleteAlert();
    if (res) {
      await deleteProductRequest(id);
      setChange(new Date().getTime());
    }
  };
  const handleEdit = async (id) => {
    const res = await EditAlert();
    if (res) {
      navigate(`/add-product?id=${id}`);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-3">
      <div className="mt-2 text-center">
        <Link to={"/add-product"}>
          <button className="bg-emerald-600 p-2 rounded text-white">
            Add Product
          </button>
        </Link>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-8 my-5">
        {allProduct &&
          allProduct.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl duration-500 hover:shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Product"
                className="rounded-t-xl"
              />
              <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  Brand: {item.brand?.brandName}
                </span>
                <p className="text-md font-semibold text-black capitalize">
                  {item.name}
                </p>
                <div className="flex items-center">
                  <div className="flex justify-between w-full py-2">
                    <Link
                      to={item._id}
                      className="bg-emerald-600 p-2 rounded text-white"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-emerald-400 p-2 rounded text-white"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 p-2 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
