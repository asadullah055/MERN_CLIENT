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
      <Brand />
      <Category />
    </div>
  );
};

export default Home;
