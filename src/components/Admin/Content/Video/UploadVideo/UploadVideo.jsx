import React, { useState } from "react";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { notification } from "antd";
import { useStateProvider } from "../../../../../Context/StateProvider";
import { addDocument } from "../../../../../Config/Services/Firebase/FireStoreDB";
import Input from "../../../Item/Input";

const UploadVideo = () => {
  const [isSelected, setSelected] = useState(false);
  const [videoUrl, setVideoUrl] = useState();
  const { setIsRefetch } = useStateProvider();

  const HandleUpload = () => {};
  return (
    <div className=" border">
      <div className="flex flex-col p-3">
        <div className="flex flex-row gap-3 mt-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-5 text-white">
              <Input
                text="Liên kết video"
                Value={videoUrl}
                setValue={setVideoUrl}
              />

              <div>
                {isSelected ? (
                  <button
                    className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                    onClick={() => HandleUpload()}
                  >
                    Cập nhật
                  </button>
                ) : (
                  <button className="text-white bg-gray-400 px-3 py-2 rounded-xl cursor-default">
                    Cập nhật
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
