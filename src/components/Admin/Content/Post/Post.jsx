import React from "react";

import { message, notification } from "antd";
import { useStateProvider } from "../../../../Context/StateProvider";
import { delDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import Section from "./Section/Section";
import { useData } from "../../../../Context/DataProviders";

const Post = () => {
  const { setIsUploadProduct, setIsRefetch } = useStateProvider();
  const { PostOther, PostCompany } = useData();

  const HandleDelete = (id) => {
    delDocument("posts", id).then(() => {
      notification["success"]({
        message: "Thành công!",
        description: `Yêu cầu của bạn đã được thực hiện thành công !`,
      });
    });
    setIsRefetch("deleted");
  };

  return (
    <div className="flex flex-col justify-between h-full w-full relative ">
      <div className="ml-3 mb-2 bg-[#353535] shadow-gray-700 p-5 rounded-xl">
        <h3 className=" text-[44px] text-center font-bold mb-2 uppercase">
          Danh sách các bài viết
        </h3>
        <div className="mt-5 border rounded-xl flex flex-col gap-10">
          <Section
            title="Tin Tức công ty"
            Data={PostCompany}
            HandleDelete={HandleDelete}
            setIsUploadProduct={setIsUploadProduct}
          />
          <span className="h-[2px]  bg-gradient-to-r from-cyan-400 to-blue-300"></span>
          <Section
            title="Tin tức Thiết kế - thi công nội thất"
            Data={PostOther}
            HandleDelete={HandleDelete}
            setIsUploadProduct={setIsUploadProduct}
          />
          <Section
            title="Thi công xây dựng"
            Data={PostCompany}
            HandleDelete={HandleDelete}
            setIsUploadProduct={setIsUploadProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
