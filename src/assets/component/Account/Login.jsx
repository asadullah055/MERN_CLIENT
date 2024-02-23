import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserStore from "../../store/userStore";
import ValidationHelper from "../../utility/ValidationHelper";
import SubmitForm from "./SubmitForm";

const Login = () => {
  let navigate = useNavigate();
  const location = useLocation();
  let { LoginFormData, LoginFormOnChange, UserLoginRequest } = UserStore();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!ValidationHelper.IsEmail(LoginFormData.email)) {
      toast.error("Valid Email Address Required");
    } else if (!ValidationHelper.IsPassword(LoginFormData.password)) {
      toast.error(
        "Password must be 1 lowercase 1 uppercase 1 special character at least one digit and minimum 6 character"
      );
    } else {
      let res = await UserLoginRequest(
        LoginFormData.email,
        LoginFormData.password
      );
      if (res.status === "success") {
        navigate(location?.state ? location.state : "/");
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <div className="max-w-[500px] mx-auto p-3 mt-2  border rounded shadow">
      <h1 className="text-center font-semibold text-3xl p-3">Please Login</h1>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-gray-700">Your Email</span>
            <input
              type="email"
              value={LoginFormData.email}
              onChange={(e) => {
                LoginFormOnChange("email", e.target.value);
              }}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="abc@gmail.com"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Your Password</span>
            <input
              type="password"
              value={LoginFormData.password}
              onChange={(e) => {
                LoginFormOnChange("password", e.target.value);
              }}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="*******"
            />
          </label>

          <SubmitForm
            onClick={onFormSubmit}
            className="bg-emerald-600 p-2 rounded text-white"
            text="Login"
          ></SubmitForm>
        </div>
      </form>
      <p className="py-2">
        {`Don't have an account`}{" "}
        <Link to="/create-account" className="text-emerald-600">
          Create Account
        </Link>{" "}
      </p>
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
