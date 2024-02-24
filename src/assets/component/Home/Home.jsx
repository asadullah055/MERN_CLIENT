import React, { useEffect } from "react";
import ProductStore from "../../store/productStore";
import Brand from "../Product/Brand";
import Category from "../Product/Category";

const Home = () => {
  const { allProductRequest, allProduct } = ProductStore();

  useEffect(() => {
    (async () => {
      allProduct === null ? allProductRequest() : null;
    })();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-3">
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-8 my-5">
        {allProduct &&
          allProduct.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl duration-500 hover:shadow-xl"
            >
              <img src={item.image} alt="Product" className="rounded-t-xl" />
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
      <Brand />
      <Category />
    </div>
  );
};

export default Home;
