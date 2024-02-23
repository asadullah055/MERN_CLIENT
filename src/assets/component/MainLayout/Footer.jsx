import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="shadow-md w-full bg-green-200 mt-3">
        <div className="max-w-6xl mx-auto px-3 py-2 ">
          <div className="grid-cols-2 sm:grid-cols-3 gap-3 grid">
            <div>
              <h1 className="font-semibold text-xl">Legals</h1>
              <p className="my-2">
                <Link to="#">About</Link>
              </p>
              <p className="my-2">
                <Link to="#">Refund Policy</Link>
              </p>
              <p className="my-2">
                <Link to="#">Privacy Policy</Link>
              </p>
              <p className="my-2">
                <Link to="#">Terms</Link>
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-xl">Information</h1>
              <p className="my-2">
                <Link to="#">How to buy</Link>
              </p>
              <p className="my-2">
                <Link to="#">Contact</Link>
              </p>
              <p className="my-2">
                <Link to="#">Complain</Link>
              </p>
            </div>
            <div className="col-span-2 sm:col-auto">
              <h1 className="font-semibold text-xl">About</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum{" "}
              </p>
              <img
                className="w-75"
                src="https://www.uiu.ac.bd/wp-content/uploads/2023/11/Card-Logo-Pay-With-01-1-2048x338-1-1536x254.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-emerald-600 py-3 text-center">
        <p className="text-white bodySmal">All Rights Reserved </p>
      </div>
    </>
  );
};

export default Footer;
