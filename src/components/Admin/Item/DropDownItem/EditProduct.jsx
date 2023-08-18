import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";

import { notification } from "antd";

import Input from "../Input";
import { useStateProvider } from "../../../../Context/StateProvider";
import { addDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../Utils/item";
import { uploadImage } from "../Handle";
import TextEditor from "../../../Item/TextEditor";

const EditProduct = ({}) => {
  const [Title, setTitle] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listUrl, setListUrl] = useState([]);
  const [Content, setContent] = useState();
  const [Price, setPrice] = useState();
  const [isType, setIsType] = useState("");
  const [isTypeParams, setIsTypeParams] = useState("");
  const [isParent, setIsParent] = useState("Cửa Hàng");
  const [isParentParams, setIsParentParams] = useState("cua-hang");
  const [color, setColor] = useState({
    name: "",
    image: "",
  });

  //

  const [productStatus, setProductStatus] = useState("Còn hàng");

  const [listColor, setListColor] = useState([]);

  const { setIsUploadProduct, setIsRefetch } = useStateProvider();
  const { productTypes, Color } = useData();

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
    if (!listUrl || !Title || !Content) {
      notification["error"]({
        message: "Lỗi !!!",
        description: `Vui lòng bổ sung đầy đủ thông tin !`,
      });
    } else {
      const data = {
        title: Title,
        content: Content,
        price: Price,
        image: listUrl,
        type: isType,
        params: isTypeParams,
        parent: isParent,
        parentParams: isParentParams,
        state: true,
        sale: {},
        sold: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
        access: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
        color: listColor,
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
      setListUrl((prevUrls) => [...prevUrls, data]);
    });
  };

  const pushValue = (type) => {
    if (type === "image") {
      setListUrl((prevUrls) => [...prevUrls, imageUrl]);
      setImageUrl("");
    } else if (type === "color") {
      setListColor((prevUrls) => [...prevUrls, color]);
    }
  };

  const popValue = (indexToRemove, type) => {
    if (type === "image") {
      setListUrl((prevUrls) =>
        prevUrls.filter((_, index) => index !== indexToRemove)
      );
    } else if (type === "color") {
      setListColor((prevUrls) =>
        prevUrls.filter((_, index) => index !== indexToRemove)
      );
    }
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
  const HandleColorChange = (e) => {
    const selectedName = e.target.value;
    const selectedItem = Color.find((item) => item.name === selectedName);
    if (selectedItem) {
      setColor({
        name: selectedItem.name,
        image: selectedItem.image,
      });
    }
  };

  useEffect(() => {
    pushValue("color");
  }, [color, Color]);

  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] w-full 
       h-full
      z-50 absolute rounded-md duration-300 flex items-center justify-center`}
    >
      <div className="w-auto h-auto bg-white relative p-10  font-LexendDeca cursor-pointer rounded-sm flex flex-col justify-center">
        <p className="text-2xl font-bold text-center text-[30px] mb-5">
          Cập nhật sản phẩm của bạn
        </p>
        <div className="flex d:flex-row p:flex-col">
          <div className="justify-center w-full flex items-center gap-20">
            <div className="">
              <div className=""></div>
              <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                <div className="overflow-y-auto border rounded-xl w-full  h-[400px] mt-5">
                  <div className="p-1">
                    {listUrl.map((items, idx) => (
                      <div className=" ">
                        <div className="my-2 relative w-[145px] h-[90px] group">
                          <img
                            src={items}
                            alt="product img"
                            className="w-full h-full object-cover "
                          />
                          <div
                            className="w-full h-full  group-hover:flex justify-center items-center bg-[rgba(0,0,0,0.3)] text-[40px] absolute top-0  z-10 text-redPrimmary hidden"
                            onClick={() => popValue(idx, "image")}
                          >
                            <AiOutlineDelete className="" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                        <div className="border">
                          <Input
                            text="Phần trăm giảm giá"
                            Value={Title}
                            setValue={setTitle}
                            Input={true}
                          />
                          <div className="flex flex-col">
                            <span>giá gốc : 125125đ</span>
                            <span>giá mới : 125125đ</span>
                          </div>
                        </div>
                        <div>
                          <label>Trạng thái sản phẩm:</label>
                          {["Còn hàng", "Hết hàng", "Đang cập nhật"].map(
                            (status) => (
                              <div key={status}>
                                <input
                                  type="radio"
                                  value={status}
                                  checked={productStatus === status}
                                  onChange={(e) =>
                                    setProductStatus(e.target.value)
                                  }
                                />
                                <label className="ml-3">{status}</label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="  flex flex-col gap-3">
                    <h3>Chi tiết sản phẩm</h3>
                    <TextEditor />
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

export default EditProduct;
