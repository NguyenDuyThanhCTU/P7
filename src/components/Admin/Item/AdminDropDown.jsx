import React from "react";
import { useStateProvider } from "../../../Context/StateProvider";
import AddPost from "./DropDownItem/AddPost";
import AddType from "./DropDownItem/AddType";
import AddProduct from "./DropDownItem/AddProduct";
import ProductDetail from "./DropDownItem/ProductDetail";
import Profile from "./DropDownItem/Profile";

const AdminDropDown = () => {
  const { isUploadProduct } = useStateProvider();
  return (
    <div
      className={`duration-300 absolute left-0 right-0  ${
        isUploadProduct === "" ? "h-0" : "h-[100vh]"
      }`}
    >
      {isUploadProduct === "Tin Tức Khác" ? (
        <AddPost type="Other" />
      ) : isUploadProduct === "Tin tức công ty" ? (
        <AddPost type="Company" />
      ) : isUploadProduct === "add-types" ? (
        <AddType />
      ) : isUploadProduct === "add-product" ? (
        <AddProduct />
      ) : isUploadProduct === "product-detail" ? (
        <ProductDetail />
      ) : isUploadProduct === "profile" ? (
        <Profile type="Home" />
      ) : null}
    </div>
  );
};

export default AdminDropDown;
