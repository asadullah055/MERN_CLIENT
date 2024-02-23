import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ProductStore from "../../store/productStore";
import UserStore from "../../store/userStore";
const MainNav = () => {
  let [open, setOpen] = useState(false);
  const { isLogin, UserLogoutRequest, profile, userProfileRequest } =
    UserStore();
  const { SearchKeyword, SetSearchKeyword } = ProductStore();
  const navigate = useNavigate();
  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      isLogin() && profile === null ? await userProfileRequest() : null;
    })();
  }, []);

  return (
    <div className="shadow-md w-full bg-emerald-600 sticky top-0">
      <div className="md:flex items-center justify-between max-w-6xl mx-auto px-3 py-2">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-poppin 
      text-gray-800"
        >
          <img className="w-[60px]" src="/image/bw.png" alt="" />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <IoMdClose /> : <CiMenuBurger />}
        </div>

        <ul
          className={`md:flex items-center absolute mt-2 w-[250px] min-h-screen md:min-h-0 md:static md:w-auto gap-2 bg-green-200 md:bg-transparent transition-all md:transition-none duration-500 ease-in-out ${
            open ? "left-0" : "left-[-1000px]"
          } `}
        >
          <div className="flex">
            <input
              type="search"
              placeholder="search"
              className="rounded-md bg-gray-100 border-transparent focus:border-gray-500 w-full"
              onChange={(e) => SetSearchKeyword(e.target.value)}
            />
            <Link
              to={
                SearchKeyword?.length > 0 ? `/by-search/${SearchKeyword}` : `/`
              }
              type="submit"
              className="text-white  bg-green-600 rounded-r-lg p-4 uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: 24, height: 24 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
          <li onClick={() => setOpen(!open)} className="p-3 ml-2 md:ml-0">
            <Link to="/" className="md:text-white uppercase">
              Home
            </Link>
          </li>
          <li onClick={() => setOpen(!open)} className="p-3 ml-2 md:ml-0">
            <Link to="/product" className="md:text-white uppercase">
              Product
            </Link>
          </li>
          {isLogin() ? (
            <>
              <li onClick={() => setOpen(!open)} className="p-3 ml-2 md:ml-0">
                <button onClick={onLogout} className="md:text-white uppercase">
                  Logout
                </button>
              </li>

              <li onClick={() => setOpen(!open)} className="p-3 ml-2 md:ml-0">
                <Link to="/profile" className="md:text-white uppercase">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={
                      profile?.image
                        ? profile?.image
                        : "https://res.cloudinary.com/drwk9xxrx/image/upload/v1707924514/avater_euum8j.webp"
                    }
                    alt=""
                  />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={() => setOpen(!open)} className="p-3 ml-2 md:ml-0">
                <Link to="/login" className="md:text-white uppercase">
                  Login
                </Link>
              </li>
              <li onClick={() => setOpen(!open)} className="p-3 ml-2 md:ml-0">
                <Link to="/create-account" className="md:text-white uppercase">
                  Create Account
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainNav;
