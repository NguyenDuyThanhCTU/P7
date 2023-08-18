import React from "react";
import { useStateProvider } from "../../../Context/StateProvider";
import AddPost from "./DropDownItem/AddPost";
import AddType from "./DropDownItem/AddType";
import AddProduct from "./DropDownItem/AddProduct";
import ProductDetail from "./DropDownItem/ProductDetail";
import Profile from "./DropDownItem/Profile";
import AddBranch from "./DropDownItem/AddBranch";
import UpdateProduct from "./DropDownItem/UpdateProduct";
import AddChildrenType from "./DropDownItem/AddChildrenType";
import AddColor from "./DropDownItem/AddColor";
import EditProduct from "./DropDownItem/EditProduct";

const AdminDropDown = () => {
  const { isUploadProduct } = useStateProvider();
  return (
    <div
      className={`duration-300 absolute left-0 right-0  ${
        isUploadProduct === "" ? "h-0" : "h-[100vh]"
      }`}
    >
      {isUploadProduct === "add-types" ? (
        <AddType />
      ) : isUploadProduct === "add-children-type" ? (
        <AddChildrenType />
      ) : isUploadProduct === "add-post" ? (
        <AddPost />
      ) : isUploadProduct === "add-product" ? (
        <AddProduct />
      ) : isUploadProduct === "edit-product" ? (
        <EditProduct />
      ) : isUploadProduct === "add-color" ? (
        <AddColor />
      ) : isUploadProduct === "update-product" ? (
        <UpdateProduct />
      ) : isUploadProduct === "add-branch" ? (
        <AddBranch />
      ) : isUploadProduct === "product-detail" ? (
        <ProductDetail />
      ) : isUploadProduct === "profile" ? (
        <Profile type="Home" />
      ) : null}
    </div>
  );
};

export default AdminDropDown;
