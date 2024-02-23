import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserStore from "../../store/userStore";
import ValidationHelper from "../../utility/ValidationHelper";
import SubmitForm from "./SubmitForm";

const CreateAccount = () => {
  let navigate = useNavigate();
  const {
    accountFormData,
    accountFormOnChange,
    isFormSubmit,
    createAccountRequest,
  } = UserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accountFormData.name.trim() === "") {
      toast.error("Name is required");
    } else if (!ValidationHelper.IsLater(accountFormData.name)) {
      toast.error("Number not allowed");
    } else if (accountFormData.name.length <= 2) {
      toast.error("Name at least 3 character");
    } else if (!ValidationHelper.IsEmail(accountFormData.email)) {
      toast.error("Valid Email Address Required");
    } else if (!ValidationHelper.IsMobile(accountFormData.phone)) {
      toast.error("Invalid Bangladesh phon number");
    } else if (!ValidationHelper.IsPassword(accountFormData.password)) {
      toast.error(
        "Password must be 1 lowercase 1 uppercase 1 special character at least one digit and minimum 6 character"
      );
    } else {
      const res = await createAccountRequest(accountFormData);

      if (res.status === "Fail") {
        toast.error(res.message);
      } else if (res.status === "success") {
        toast.success(res.message);
        navigate("/otp");
      }
    }
  };
  return (
    <div className="max-w-[500px] mx-auto p-3 mt-2 border rounded shadow">
      <h1 className="text-center font-semibold text-3xl p-3">Create Account</h1>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-gray-700">Full Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Jon Dou"
              value={accountFormData.name}
              onChange={(e) => {
                accountFormOnChange("name", e.target.value);
              }}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="abc@gmail.com"
              value={accountFormData.email}
              onChange={(e) => {
                accountFormOnChange("email", e.target.value);
              }}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Mobile</span>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Bangladeshi Mobile Number"
              value={accountFormData.phone}
              onChange={(e) => {
                accountFormOnChange("phone", e.target.value);
              }}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
              value={accountFormData.password}
              onChange={(e) => {
                accountFormOnChange("password", e.target.value);
              }}
            />
          </label>

          <SubmitForm
            className="bg-emerald-600 p-2 rounded text-white"
            type="submit"
            text="Submit"
            onClick={handleSubmit}
          ></SubmitForm>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default CreateAccount;
