import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import UserStore from "../../store/userStore";
import ValidationHelper from "../../utility/ValidationHelper";
const Profile = () => {
  const {
    imageOnChange,
    userImageRequest,
    imageData,
    userProfileRequest,
    profile,
    passwordData,
    passwordOnChange,
    userPasswordRequest,
  } = UserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageData.image.trim() === "") {
      toast.error("Please Provide your Image URL");
    } else if (!ValidationHelper.IsUrl(imageData.image)) {
      toast.error("please provide valid url");
    } else {
      const res = await userImageRequest(imageData);
      if (res.status === "success") {
        toast.success("Profile picture update success");
        await userProfileRequest();
      } else {
        toast.error("Profile picture not change");
      }
    }
  };
  const handlePassword = async (e) => {
    e.preventDefault();
    if (!ValidationHelper.IsPassword(passwordData.password)) {
      toast.error(
        "Password must be 1 lowercase 1 uppercase 1 special character at least one digit and minimum 6 character"
      );
    } else if (!ValidationHelper.IsPassword(passwordData.confirmPassword)) {
      toast.error(
        "Confirm Password must be 1 lowercase 1 uppercase 1 special character at least one digit and minimum 6 character"
      );
    } else {
      const res = await userPasswordRequest(passwordData);
      if (res.status === "Fail") {
        toast.error(res.message);
      } else {
        passwordOnChange("password", "");
        passwordOnChange("confirmPassword", "");
        toast.success("Password change success");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 mt-3">
      <div className="flex justify-between">
        <h2 className="text-3xl text-black font-semibold">Profile</h2>
        <button className="bg-emerald-600 text-xl p-2 rounded text-white flex items-center">
          <span className="mr-1">Logout</span>{" "}
          <IoMdLogOut className="text-2xl" />
        </button>
      </div>
      <div className="mt-4 flex flex-col md:!flex-row gap-4 items-start">
        <div className=" mb-2 bg-white border box-border shadow-md rounded-lg p-[10px] md:!py-5 md:!px-[30px] flex-1 w-full">
          <h1 className="text-3xl font-semibold">Personal Details</h1>
          <div className="flex flex-col items-center mt-7">
            <img
              className="w-[150px] h-[150px] rounded-full"
              src={
                profile?.image
                  ? profile?.image
                  : "https://res.cloudinary.com/drwk9xxrx/image/upload/v1707924514/avater_euum8j.webp"
              }
              alt=""
            />
            <form className="mt-2 w-full">
              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <span className="text-gray-700">Your Picture Url</span>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="https://www.example.com/dfdf.png"
                    value={imageData.image}
                    onChange={(e) => {
                      imageOnChange("image", e.target.value);
                    }}
                  />
                </label>

                <button
                  className="bg-emerald-600 p-2 rounded text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Change Profile Picture
                </button>
              </div>
            </form>
          </div>
          <h2 className="md:text-xl text-sm  py-2 text-black">
            <span className="font-semibold">Name:</span> {profile?.name}
          </h2>
          <h2 className="md:text-xl text-sm py-2 text-black">
            <span className="font-semibold"> Email:</span> {profile?.email}
          </h2>
          <h2 className="md:text-xl text-sm  py-2 text-black">
            <span className="font-semibold">Phone:</span> {profile?.phone}
          </h2>
        </div>
        <div className=" mb-4 bg-white border box-border shadow-md rounded-lg p-[10px] md:!py-5 md:!px-[30px] flex-1 w-full">
          <h1 className="text-3xl font-semibold">Change Password</h1>
          <form className="mt-2">
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-gray-700">New Password</span>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="*******"
                  value={passwordData.password}
                  onChange={(e) => passwordOnChange("password", e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Confirm Password</span>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="*******"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    passwordOnChange("confirmPassword", e.target.value)
                  }
                />
              </label>

              <button
                className="bg-emerald-600 p-2 rounded text-white"
                type="submit"
                onClick={handlePassword}
              >
                Set Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Profile;
