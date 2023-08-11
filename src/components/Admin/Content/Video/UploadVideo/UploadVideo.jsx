import React, { useState } from "react";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { notification } from "antd";
import { useStateProvider } from "../../../../../Context/StateProvider";
import { addDocument } from "../../../../../Config/Services/Firebase/FireStoreDB";

const UploadVideo = () => {
  const [isSelected, setSelected] = useState(false);
  const [Data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const { setIsRefetch } = useStateProvider();

  const uploadImage = async (e, type) => {
    let selectImage = e.target.files[0];
    const filetypes = ["image/jpeg", "image/jpg", "image/png"];

    if (filetypes.includes(selectImage.type)) {
      const storage = getStorage();
      const storageRef = ref(storage, `img/logo`);

      uploadBytes(storageRef, selectImage)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");

          getDownloadURL(snapshot.ref)
            .then((url) => {
              setImageUrl(url);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      notification["error"]({
        message: "Lỗi !",
        description: `
        Vui lòng chọn đúng ĐỊNH DẠNG !`,
      });
    }
  };

  const HandleUpdate = () => {
    if (!imageUrl && !Data) {
      notification["error"]({
        message: "Lỗi !",
        description: `
        Vui lòng nhập thông tin trước khi CẬP NHẬT !`,
      });
    } else {
      const newData = {
        video: `${imageUrl ? imageUrl : Data}`,
      };

      addDocument("video", newData).then(() => {
        notification["success"]({
          message: "Thành công !",
          description: `
          Thông tin đã được CẬP NHẬT !`,
        });
        setData([]);
        setImageUrl();
        setIsRefetch("upload video");
      });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3 mt-5">
        <div className="flex flex-col gap-3">
          <label>Nhập liên kết video</label>
          <div className="flex gap-5">
            <div onClick={() => setSelected(true)}>
              <input
                type="text"
                className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-[240px] "
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div>
              {isSelected ? (
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                  onClick={() => HandleUpdate()}
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

      <div>
        <label>
          <div className="flex justify-center mt-10  h-[300px] w-[350px] border rounded-lg cursor-pointer">
            <img src={imageUrl} alt="logo" className="object-contain p-2" />

            <input
              type="file"
              className="w-0 h-0"
              onChange={(e) => uploadImage(e)}
            />
          </div>
        </label>

        {imageUrl ? (
          <div className="w-full justify-center flex">
            <button
              className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#fc7474] bg-[#fc747443] px-3 py-2 rounded-xl mt-3 "
              onClick={() => HandleUpdate(3)}
            >
              Cập nhật
            </button>
          </div>
        ) : (
          <p className="text-white italic text-[13px] mt-2">
            Nhấp vào logo để tải hình ảnh lên{" "}
            <strong className="text-redPrimmary">(*)</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
