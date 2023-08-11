import React from "react";

import UploadVideo from "./UploadVideo/UploadVideo";
import ListVideo from "./ListVideo/ListVideo";

const Video = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full relative ">
      <div className="ml-3 mb-2 bg-[#353535] shadow-gray-700 p-5 rounded-xl">
        <h3 className=" text-[35px] text-center font-bold mb-2 uppercase">
          Danh sách Video
        </h3>
        <div className="flex">
          <UploadVideo />
          <ListVideo />
        </div>
      </div>
    </div>
  );
};

export default Video;
