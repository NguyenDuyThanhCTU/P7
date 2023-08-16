import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";

import { notification } from "antd";

import Input from "../Input";
import { useStateProvider } from "../../../../Context/StateProvider";
import { addDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../Utils/item";
import { uploadImage } from "../Handle";

const AddProduct = ({}) => {
  const [Title, setTitle] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [Content, setContent] = useState();
  const [Price, setPrice] = useState();
  const [isType, setIsType] = useState("");
  const [isTypeParams, setIsTypeParams] = useState("");
  const [isParent, setIsParent] = useState("Cửa Hàng");
  const [isParentParams, setIsParentParams] = useState("cua-hang");

  const { setIsUploadProduct, setIsRefetch } = useStateProvider();
  const { productTypes } = useData();

  useEffect(() => {
    const sort = productTypes.filter((item) => item.parent === isParentParams);

    if (sort) {
      setIsType(sort[0]?.name);
      setIsTypeParams(sort[0]?.params);
    }
  }, [isParentParams, productTypes]);

  const handleDiscard = () => {
    setImageUrl("");
    setTitle("");
    setContent("");
    setPrice("");
  };

  const HandleSubmit = () => {
    if (!imageUrl || !isParentParams || !isTypeParams) {
      notification["error"]({
        message: "Lỗi !!!",
        description: `Vui lòng bổ sung đầy đủ thông tin !`,
      });
    } else {
      const data = {
        title: Title,
        content: Content,
        price: Price,
        type: isType,
        image: imageUrl,
        params: isTypeParams,
        parent: isParent,
        parentParams: isParentParams,
        state: true,
        sale: {},
      };

      addDocument("products", data).then(() => {
        notification["success"]({
          message: "Tải lên thành công!",
          description: `Sản phẩm của bạn đã được tải lên !`,
        });

        setIsRefetch("upload successful");
        handleDiscard();
      });
    }
  };

  const HandleUploadImage = (e, locate) => {
    uploadImage(e, locate).then((data) => {
      setImageUrl(data);
    });
  };

  const HandleParentChange = (e) => {
    const selectedName = e.target.value;
    setIsParent(selectedName);
    const selectedItem = TypeProductItems.find(
      (item) => item.name === selectedName
    );
    if (selectedItem) {
      setIsParentParams(selectedItem.params);
    }
  };
  const HandleTypeChange = (e) => {
    const selectedName = e.target.value;
    setIsType(selectedName);
    const selectedItem = productTypes.find(
      (item) => item.name === selectedName
    );
    if (selectedItem) {
      setIsTypeParams(selectedItem.params);
    }
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full 
       h-full
      z-50 absolute rounded-md duration-300 flex items-center justify-center`}
    >
      <div className="w-auto h-auto bg-white relative p-10  font-LexendDeca cursor-pointer rounded-sm flex flex-col justify-center">
        <p className="text-2xl font-bold text-center text-[30px] mb-5">
          Tải lên sản phẩm của bạn
        </p>
        <div className="flex d:flex-row p:flex-col">
          <div className="justify-center w-full flex items-center gap-20">
            <div className="">
              <div className="">
                <p className="text-md text-gray-400 mt-1">
                  Chọn ảnh cho sản phẩm của bạn
                </p>
              </div>
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                {imageUrl ? (
                  <div>
                    <img
                      src={imageUrl}
                      className="w-[100%] h-[100%] object-cover"
                      alt=""
                    />
                    <label>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Chọn lại
                      </p>
                      <input
                        id="fileInput"
                        type="file"
                        onChange={(e) => uploadImage(e)}
                        className="w-0 h-0"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Chọn hình ảnh để tải lên
                        </p>
                      </div>
                      <p className="text-gray-400  text-center mt-10 text-sm leading-10">
                        Định dạng jpg hoặc png <br />
                      </p>
                      <div className="flex flex-col gap-2 items-center">
                        <label>
                          <p className="bg-[#0047AB] hover:bg-[#0000FF] mt-8  text-center rounded text-white text-md font-medium p-2 w-52 outline-none">
                            Chọn từ thiết bị
                          </p>
                          <input
                            type="file"
                            onChange={(e) => HandleUploadImage(e, "products")}
                            className="w-0 h-0"
                            id="fileInput"
                          />
                        </label>
                        <p className="text-red-500 italic">Hoặc</p>
                        <div className="">
                          <Input
                            text="Liên kết hình ảnh"
                            Value={imageUrl}
                            setValue={setImageUrl}
                            Input={true}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => HandleUploadImage(e, "products")}
                      className="w-0 h-0"
                      id="fileInput"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div class=" w-[700px] flex flex-col  items-center">
                <div className="grid grid-cols-2 gap-5 w-full">
                  {isParentParams === "album-anh" ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <div className="  flex flex-col gap-3">
                        <Input
                          text="Tên sản phẩm"
                          Value={Title}
                          setValue={setTitle}
                        />
                        <Input
                          text="Giá sản phẩm"
                          Value={Price}
                          setValue={setPrice}
                          Input={true}
                        />
                        <Input
                          text="Mô tả sản phẩm"
                          Value={Content}
                          setValue={setContent}
                        />
                      </div>
                    </>
                  )}

                  <div className="  flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-md font-medium ">
                        Mục bài viết:
                      </label>
                      <select
                        className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                        onChange={HandleParentChange}
                      >
                        {TypeProductItems.map((item, idx) => (
                          <option
                            key={idx}
                            className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-md font-medium ">
                        Loại bài viết
                      </label>
                      <select
                        className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                        onChange={HandleTypeChange}
                      >
                        {productTypes
                          ?.filter((item) => item.parent === isParentParams)
                          .map((item, idx) => (
                            <option
                              key={idx}
                              className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-10 ">
                  <button
                    onClick={() => handleDiscard()}
                    type="button"
                    className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Xóa
                  </button>
                  <button
                    //disabled={videoAsset?.url ? false : true}
                    onClick={() => HandleSubmit()}
                    type="button"
                    className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Tải lên
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AiFillCloseCircle
          className="absolute -top-5 -right-5 text-[40px] border-white border-4 bg-black rounded-3xl text-white "
          onClick={() => {
            setIsUploadProduct("");
          }}
        />
      </div>
    </div>
  );
};

export default AddProduct;
