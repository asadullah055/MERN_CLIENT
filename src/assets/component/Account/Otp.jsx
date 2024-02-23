import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserStore from "../../store/userStore";
import ValidationHelper from "../../utility/ValidationHelper";
import SubmitForm from "./SubmitForm";

const Otp = () => {
  let navigate = useNavigate();
  const { otpFormData, otpFormOnChange, otpRequest } = UserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ValidationHelper.IsEmpty(otpFormData.otp)) {
        toast.error("Valid PIN Required");
      } else {
        const data = await otpRequest(otpFormData.otp);
        if (data.status === "success") {
          toast.error(data.message);
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[500px] mx-auto p-3 mt-2  border rounded shadow">
      <h4 className="text-center font-semibold text-2xl p-3">
        Enter Verification Code
      </h4>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <p>
              A verification code has been sent to the email address you
              provide.
            </p>
            <input
              type="number"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="123456"
              value={otpFormData.otp}
              onChange={(e) => {
                otpFormOnChange("otp", e.target.value);
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

export default Otp;
