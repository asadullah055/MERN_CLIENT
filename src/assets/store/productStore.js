import axios from "axios";
import { create } from "zustand";

const ProductStore = create((set) => ({
  isFormSubmit: false,
  productFormData: {
    name: "",
    categoryID: "",
    brandID: "",
    details: "",
    image: "",
  },
  productFormOnChange: (name, value) => {
    set((state) => ({
      productFormData: {
        ...state.productFormData,
        [name]: value,
      },
    }));
  },
  createProductRequest: async (body) => {
    set({ isFormSubmit: true });
    const result = await axios.post(`http://localhost:4000/add-product`, body, {
      withCredentials: true,
    });
    set({ isFormSubmit: false });
    return result.data["status"] === "success";
  },
  singleProduct: null,
  singleProductRequest: async (id) => {
    set({ singleProduct: null });
    let res = await axios.get(`http://localhost:4000/single-product/${id}`, {
      withCredentials: true,
    });
    
    if (res.data["status"] === "success") {
      set({ productFormData: res.data["data"][0] });
    }
  },
  allProduct: null,
  allProductRequest: async () => {
    set({ allProduct: null });
    let res = await axios.get(`http://localhost:4000/all-product`, {
      withCredentials: true,
    });
    if (res.data["status"] === "success") {
      set({ allProduct: res.data["data"] });
    }
  },
  // update product
  updateProductFormData: (name, value) => {
    set((state) => ({
      productFormData: {
        ...state.productFormData,
        [name]: value,
      },
    }));
  },
  updateProduct: null,
  updateProductRequest: async (body, id) => {
    set({ updateProduct: null });
    let res = await axios.put(
      `http://localhost:4000/update-product/${id}`,
      body,
      {
        withCredentials: true,
      }
    );
    if (res.data["status"] === "success") {
      set({ updateProduct: res.data["data"] });
    }
  },
  deleteProduct: null,
  deleteProductRequest: async (id) => {
    set({ deleteProduct: null });
    let res = await axios.delete(`http://localhost:4000/delete-product/${id}`, {
      withCredentials: true,
    });
    if (res.data["status"] === "success") {
      set({ deleteProduct: res.data["data"] });
    }
  },
  sortedProduct: null,
  filterProduct: null,
  sortByBrandRequest: async (brandId) => {
    set({ filterProduct: null });
    let res = await axios.get(`http://localhost:4000/sort-by-brand/${brandId}`, {
      withCredentials: true,
    });

    if (res.data["status"] === "success") {
      set({ filterProduct: res.data["data"] });
    }
  },
  sortByCategory: null,
  sortByCategoryRequest: async (categoryID) => {
    set({ filterProduct: null });
    let res = await axios.get(
      `http://localhost:4000/sort-by-category/${categoryID}`,
      {
        withCredentials: true,
      }
    );
    if (res.data["status"] === "success") {
      set({ filterProduct: res.data["data"] });
    }
  },
  
  filterProductRequest: async (body) => {
    set({ filterProduct: null });
    let res = await axios.post(`http://localhost:4000/filter-product`, body, {
      withCredentials: true,
    });
  
    if (res.data["status"] === "success") {
      set({ filterProduct: res.data["data"] });
    }
  },
  searchProduct: null,
  searchProductRequest: async (name) => {
    set({ filterProduct: null });
    let res = await axios.get(`http://localhost:4000/search/${name}`, {
      withCredentials: true,
    });
   
    if (res.data["status"] === "success") {
      set({ filterProduct: res.data["data"] });
    }
  },

  brandList: null,
  brandListRequest: async () => {
    let res = await axios.get(`http://localhost:4000/brand-list`);
    if (res.data["status"] === "success") {
      set({ brandList: res.data["data"] });
    }
  },

  categoryList: null,
  categoryListRequest: async () => {
    let res = await axios.get(`http://localhost:4000/categories-list`);
    if (res.data["status"] === "success") {
      set({ categoryList: res.data["data"] });
    }
  },
  SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
        set({SearchKeyword:keyword})
    },
}));

export default ProductStore;
