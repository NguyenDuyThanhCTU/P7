import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";

import { notification } from "antd";

import Input from "../Input";
import { useStateProvider } from "../../../../Context/StateProvider";
import { updateDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../Utils/item";
import { uploadImage } from "../Handle";

const UpdateProduct = () => {
  const [imageUrl, setImageUrl] = useState();
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState();
  const [isType, setIsType] = useState("");
  const [isTypeParams, setIsTypeParams] = useState("");
  const [isParent, setIsParent] = useState("Danh mục sản phẩm");
  const [isParentParams, setIsParentParams] = useState("danh-muc-san-pham");

  const { setIsUploadProduct, setIsRefetch } = useStateProvider();
  const { productTypes, Products, updateId } = useData();
  //
  const [ProductSort, setProductSort] = useState([]);
  const handleDiscard = () => {
    setContent("");
    setTitle("");
  };

  useEffect(() => {
    const product = Products.filter((item) => item.id === updateId);
    if (product) {
      setProductSort(product[0]);
    }
  }, [Products, updateId]);
  console.log(Products);
  const HandleUpdate = () => {
    const data = {
      title: `${Title ? Title : ProductSort?.title}`,
      content: `${Content ? Content : ProductSort?.content}`,
      image: `${imageUrl ? imageUrl : ProductSort?.image}`,
      typeName: `${isType ? isType : ProductSort?.typeName}`,
      type: `${isTypeParams ? isTypeParams : ProductSort?.type}`,
    };

    updateDocument("products", updateId, data).then(() => {
      notification["success"]({
        message: "Tải lên thành công!",
        description: `Sản phẩm của bạn đã được cập nhật !`,
      });

      setIsRefetch("upload successful");
      handleDiscard();
    });
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
  useEffect(() => {
    const sortType = productTypes?.filter(
      (item) => item.parent === isParentParams
    );
    if (sortType) {
      setIsType(sortType[0]?.name);
      setIsTypeParams(sortType[0]?.params);
    }
  }, [isParent, isParentParams, productTypes]);
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
      <div className="w-auto h-auto bg-white relative p-5  font-LexendDeca cursor-pointer rounded-sm flex flex-col justify-center">
        <p className="text-2xl font-bold text-center text-[30px] mb-5">
          Cập nhật sản phẩm của bạn
        </p>
        <div className="flex">
          <div className="justify-center   w-full flex items-center gap-20">
            <div className="">
              <div className="">
                <p className="text-md text-gray-400 mt-1">
                  Chọn ảnh cho sản phẩm của bạn
                </p>
              </div>
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                {ProductSort?.image ? (
                  <div>
                    <img
                      src={ProductSort?.image}
                      className="w-[100%] h-[300px] object-cover"
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
                      <p className="bg-[#0047AB] hover:bg-[#0000FF] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Chọn từ thiết bị
                      </p>
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
                  <div className="  flex flex-col gap-3">
                    <Input
                      text="Tiêu đề"
                      Value={`${Title ? Title : ProductSort?.title}`}
                      setValue={setTitle}
                    />
                    <Input
                      text="Nội dung"
                      Value={`${Content ? Content : ProductSort?.content}`}
                      setValue={setContent}
                    />
                    <Input
                      text="Liên kết hình ảnh"
                      Value={`${imageUrl ? imageUrl : ProductSort?.image}`}
                      setValue={setImageUrl}
                    />
                  </div>
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
                          ?.filter(
                            (item) => item.parentParams === "nong-nghiep"
                          )
                          .map((item, idx) => (
                            <option
                              key={idx}
                              className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                              value={item.type}
                            >
                              {item.type}
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
                    onClick={() => HandleUpdate()}
                    type="button"
                    className="bg-[#df6cad] hover:bg-red-500 focus:outline-none focus:shadow-outline text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                  >
                    Cập nhật
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

export default UpdateProduct;
