import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductStore from "../../store/productStore";

const Brand = () => {
  const { brandList, brandListRequest } = ProductStore();
  useEffect(() => {
    (async () => {
      await brandListRequest();
    })();
  }, []);
  return (
    <div className="">
      <h2 className="text-xl p-3 font-semibold">Brand</h2>
      <div className="flex flex-wrap gap-2">
        {brandList &&
          brandList.map((item, i) => {
            return (
              <div key={i} className="border p-2 text-center">
                <Link to={`/by-brand/${item["_id"]}`} className="">
                  <div className="">
                    <img alt="img" className="w-75" src={item["brandImg"]} />
                    <p className="">{item["brandName"]}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Brand;
