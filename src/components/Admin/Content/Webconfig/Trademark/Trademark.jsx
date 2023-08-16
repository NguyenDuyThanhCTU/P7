import React, { useState } from "react";
import { useData } from "../../../../../Context/DataProviders";
import { notification } from "antd";
import { useStateProvider } from "../../../../../Context/StateProvider";
import { updateDocument } from "../../../../../Config/Services/Firebase/FireStoreDB";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Trademark = () => {
  const { TradeMarkData } = useData();
  const { setIsRefetch } = useStateProvider();
  const [Data, setData] = useState("");
  const [isSelected, setSelected] = useState(false);
  const [error, setError] = useState(false);
  const [LogoUrl, setLogoUrl] = useState();
  const [IcoUrl, setIcoUrl] = useState();

  const HandleDiscard = () => {
    setData("");
    setLogoUrl();
    setIcoUrl();
  };

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
              if (type === "ico") {
                setIcoUrl(url);
              } else {
                setLogoUrl(url);
              }
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      setError(true);
    }
  };

  const ContactTrademark = [
    {
      name: "Logo Website",
      type: "input",
      placeholder: TradeMarkData.websiteLogo,
    },
    {
      name: "Icon Trang",
      type: "input",
      placeholder: TradeMarkData.websiteIco,
    },
  ];

  const HandleUpdate = (idx) => {
    if (!Data && !LogoUrl && !IcoUrl) {
      notification["error"]({
        message: "Lỗi !",
        description: `
        Vui lòng nhập thông tin trước khi CẬP NHẬT !`,
      });
    } else {
      let newData;
      if (idx === 0) {
        newData = { websiteLogo: Data };
      } else if (idx === 1) {
        newData = { websiteIco: Data };
      } else if (idx === 3) {
        newData = { websiteLogo: LogoUrl };
      } else if (idx === 4) {
        newData = { websiteIco: IcoUrl };
      } else if (idx === 5) {
        newData = { websiteName: Data };
      }
      updateDocument("website", "Trademark", newData).then(() => {
        notification["success"]({
          message: "Thành công !",
          description: `
          Thông tin đã được CẬP NHẬT !`,
        });
        HandleDiscard();
        setIsRefetch("trademark");
      });
    }
  };

  return (
    <div className="bg-[#353535] text-white rounded-xl shadow-xl w-auto">
      <div className="p-4 ">
        <h3 className="text-[25px] text-center ">Thương hiệu website</h3>

        <div className="flex flex-col gap-3 w-full">
          <label>Tên website</label>
          <div className="flex gap-5 d:flex-row p:flex-col w-auto justify-between">
            <div onClick={() => setSelected(5)} className="w-full">
              <input
                placeholder={TradeMarkData.websiteName}
                type="text"
                className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-full"
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div>
              {isSelected === 5 ? (
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl w-[95px]"
                  onClick={() => HandleUpdate(5)}
                >
                  Cập nhật
                </button>
              ) : (
                <button className="text-white bg-gray-400 px-3 py-2 rounded-xl cursor-default w-[95px]">
                  Cập nhật
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex d:flex-row gap-3 mt-5 p:flex-col">
          {ContactTrademark.map((items, idx) => {
            let Type = items.type;
            return (
              <div className="flex flex-col gap-3">
                <label>{items.name}</label>
                <div className="flex gap-5 d:flex-row p:flex-col">
                  {Type && (
                    <div
                      onClick={() => setSelected(idx)}
                      className="p:w-full d:w-auto"
                    >
                      <Type
                        placeholder={items.placeholder}
                        type="text"
                        className="px-4 py-2 text-black outline-none rounded-2xl bg-gray-300 w-full"
                        onChange={(e) => setData(e.target.value)}
                      />
                    </div>
                  )}
                  <div>
                    {isSelected === idx ? (
                      <button
                        className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#74affc] bg-[#74affc43] px-3 py-2 rounded-xl"
                        onClick={() => HandleUpdate(idx)}
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
            );
          })}
        </div>
        <div className="flex gap-5 d:flex-row p:flex-col">
          <div>
            <label>
              <div className="flex justify-center mt-10  h-[300px] d:w-[350px] border rounded-lg cursor-pointer p:w-auto">
                <img
                  src={`${LogoUrl ? LogoUrl : TradeMarkData.websiteLogo}`}
                  alt="logo"
                  className="object-contain p-2"
                />

                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={(e) => uploadImage(e)}
                />
              </div>
            </label>
            {error && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Vui lòng chọn đúng định dạng
              </p>
            )}
            {LogoUrl ? (
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

          <div>
            <label>
              <div className="flex justify-center mt-10  h-[300px] d:w-[350px] border rounded-lg cursor-pointer p:w-auto">
                <img
                  src={`${IcoUrl ? IcoUrl : TradeMarkData.websiteIco}`}
                  alt="logo"
                  className="object-contain p-2"
                />

                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={(e) => uploadImage(e, "ico")}
                />
              </div>
            </label>
            {error && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Vui lòng chọn đúng định dạng
              </p>
            )}
            {IcoUrl ? (
              <div className="w-full justify-center flex">
                <button
                  className="hover:bg-[#bb86fc37] hover:text-[#BB86FC] text-[#fc7474] bg-[#fc747443] px-3 py-2 rounded-xl mt-3 "
                  onClick={() => HandleUpdate(4)}
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
      </div>
    </div>
  );
};

export default Trademark;
