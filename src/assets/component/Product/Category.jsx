import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductStore from "../../store/productStore";

const Category = () => {
  const { categoryList, categoryListRequest } = ProductStore();
  useEffect(() => {
    (async () => {
      await categoryListRequest();
    })();
  }, []);
  return (
    <div className="">
      <h2 className="text-xl p-3 font-semibold">Category</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {categoryList &&
          categoryList.map((item, i) => {
            return (
              <div key={i} className="border p-2 text-center">
                <Link to={`/by-category/${item["_id"]}`} className="">
                  <div className="">
                    <img alt="img" className="w-75" src={item["categoryImg"]} />
                    <p className="">{item["categoryName"]}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Category;
