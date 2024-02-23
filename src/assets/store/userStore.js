import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";
import { getEmail, setEmail } from "../utility/utility";

const UserStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },
  isFormSubmit: false,
  LoginFormData: { email: "", password: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },
  accountFormData: {
    name: "",
    email: "",
    password: "",
    image:
      "https://res.cloudinary.com/drwk9xxrx/image/upload/v1707924514/avater_euum8j.webp",
    phone: "",
  },
  accountFormOnChange: (name, value) => {
    set((state) => ({
      accountFormData: {
        ...state.accountFormData,
        [name]: value,
      },
    }));
  },
  createAccountRequest: async (body) => {
    set({ isFormSubmit: true });
    setEmail(body.email);
    const result = await axios.post(`http://localhost:4000/create-user`, body);
    if(result){
      set({ isFormSubmit: false });
    }
    return result.data;
  },

  UserLoginRequest: async (email, password) => {
    set({ isFormSubmit: true });
    let res = await axios.post(
      `http://localhost:4000/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    set({ isFormSubmit: false });
    return res.data;
  },
  imageData: {
    image: "",
  },
  imageOnChange: (name, value) => {
    set((state) => ({
      imageData: {
        ...state.imageData,
        [name]: value,
      },
    }));
  },

  userImageRequest: async (image) => {
    set({ isFormSubmit: true });
    let res = await axios.put(`http://localhost:4000/update-image`, image, {
      withCredentials: true,
    });
    set({ isFormSubmit: false });
    return res.data["status"];
  },
  passwordData: {
    password: "",
    confirmPassword: "",
  },
  passwordOnChange: (name, value) => {
    set((state) => ({
      passwordData: {
        ...state.passwordData,
        [name]: value,
      },
    }));
  },
  userPasswordRequest: async (body) => {
    set({ isFormSubmit: true });
    let res = await axios.put(`http://localhost:4000/update-password`, body, {
      withCredentials: true,
    });
    set({ isFormSubmit: false });
    return res.data;
  },

  UserLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get(`http://localhost:4000/logout`, {
      withCredentials: true,
    });
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },
  profile: null,
  userProfileRequest: async () => {
    set({ profile: null });
    let res = await axios.get(`http://localhost:4000/profile`, {
      withCredentials: true,
    });
    if (res.data["status"] === "success") {
      set({ profile: res.data["data"][0] });
    }
  },

  otpFormData: {
    otp: "",
    email: "",
  },
  otpFormOnChange: (name, value) => {
    set((state) => ({
      otpFormData: {
        ...state.otpFormData,
        [name]: value,
      },
    }));
  },
  otpRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    const result = await axios.post(
      `http://localhost:4000/verify/${email}/${otp}`
    );
    set({ isFormSubmit: result.data });
    set({ isFormSubmit: false });
    return result.data;
  },
}));

export default UserStore;
