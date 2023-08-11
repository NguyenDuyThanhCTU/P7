import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProviders";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";

import Sidebar from "./Sidebar/Sidebar";

import Content from "../Admin/Content/Content";
import AdminDropDown from "./Item/AdminDropDown";

const Admin = () => {
  const { verify } = useAuth();

  const [Hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!verify) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="grid grid-flow-col font-LexendDeca relative ">
      <AdminDropDown />

      <div className="flex w-full">
        <div
          className={`overflow-hidden ${
            Hidden ? "flex-[0]" : "flex-[30%]"
          } duration-500 `}
        >
          <Sidebar />
        </div>
        <div className="flex-[80%]  bg-[#292929] ">
          <Header setHidden={setHidden} Hidden={Hidden} />
          <div>{/* <Content /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
