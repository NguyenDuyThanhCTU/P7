import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Drawer, notification } from "antd";

import Input from "../Input";
import { useStateProvider } from "../../../../Context/StateProvider";
import { addDocument } from "../../../../Config/Services/Firebase/FireStoreDB";
import { useData } from "../../../../Context/DataProviders";
import { TypeProductItems } from "../../../../Utils/item";
import { uploadImage } from "../Handle";
import TextEditor from "../../../Item/TextEditor";

const AddProduct = ({}) => {
  const [Title, setTitle] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listUrl, setListUrl] = useState([]);
  const [Content, setContent] = useState();
  const [Price, setPrice] = useState();
  const [isType, setIsType] = useState("");
  const [isTypeParams, setIsTypeParams] = useState("");
  const [isParent, setIsParent] = useState("Cửa Hàng");
  const [isParentParams, setIsParentParams] = useState("cua-hang");
  const [color, setColor] = useState("");
  const [colorImage, setColorImage] = useState();
  const [listColor, setListColor] = useState([]);
  const [column, setColumn] = useState();
  const [describe, setDescribe] = useState();
  const { setIsUploadProduct, setIsRefetch } = useStateProvider();
  const { productTypes, Color } = useData();
  const [open, setOpen] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  useEffect(() => {
    const sort = productTypes.filter(
      (item) => item.parentParams === isParentParams
    );

    if (sort) {
      setIsType(sort[0]?.name);
      setIsTypeParams(sort[0]?.params);
    }
  }, [isParentParams, productTypes, Title]);

  const handleDiscard = () => {
    setImageUrl("");
    setTitle("");
    setContent("");
    setPrice("");
  };

  const HandleSubmit = () => {
    if (!Title || !column) {
      notification["error"]({
        message: "Lỗi !!!",
        description: `Vui lòng bổ sung đầy đủ thông tin !`,
      });
    } else {
      const data = {
        title: Title,
        describe: Content,
        price: Price,
        image: listUrl,
        type: isType,
        params: isTypeParams,
        parent: isParent,
        parentParams: isParentParams,
        state: "Còn hàng",
        detail: "",
        column: column,
        sale: {
          discount: 0,
          newPrice: "0.000",
        },
        access: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
        color: listColor,
        describe: describe,
      };

      addDocument("products", data).then(() => {
        notification["success"]({
          message: "Tải lên thành công!",
          description: `Sản phẩm của bạn đã được tải lên !`,
        });

        setIsRefetch("upload successful");
        // handleDiscard();
      });
    }
  };

  const HandleUploadImage = (e, locate, type) => {
    if (type === "image") {
      uploadImage(e, locate).then((data) => {
        setListUrl((prevUrls) => [...prevUrls, data]);
      });
    } else if (type === "color") {
      uploadImage(e, locate).then((data) => {
        setColorImage(data);
      });
    }
  };

  const pushValue = (type) => {
    if (type === "image") {
      setListUrl((prevUrls) => [...prevUrls, imageUrl]);
      setImageUrl("");
    } else if (type === "color") {
      const data = {
        type: color,
        image: colorImage,
      };

      setListColor((prevUrls) => [...prevUrls, data]);
      setColor("");
      setColorImage("");
      // for (let i = 0; i <= 555; i++) {
      //   let formattedNumber = i.toString().padStart(0, "0");
      //   setListColor((prevUrls) => [...prevUrls, formattedNumber]);
      // }

      // console.log(listColor);
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
  const initial1 =
    "<p>Chất liệu: </p> <br/> <p>Màu sắc: </p> <br/> <p>Size: </p> <br/> <p>Chiều dài: </p> <br/> <p>Chiều rộng: </p> <br/> <p>Chiều cao: </p> <br/> <p>Trọng lượng: </p> <br/> <p>Thương hiệu: </p> <br/> <p>Xuất xứ: </p> <br/> <p>Chất liệu";
  const initDescribe = "<p> mô tả sản phẩm </p>";
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
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col  items-center">
                      <label>
                        <p className="bg-[#0047AB] hover:bg-[#0000FF]  text-center rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Chọn từ thiết bị
                        </p>
                        <input
                          type="file"
                          onChange={(e) =>
                            HandleUploadImage(e, "products", "image")
                          }
                          className="w-0 h-0"
                          id="fileInput"
                        />
                      </label>
                      <p className="text-red-500 italic">Hoặc</p>
                      <div className="">
                        <Input
                          text="Liên kết hình ảnh"
                          setValue={setImageUrl}
                          Value={imageUrl}
                          Input={true}
                        />
                      </div>
                    </div>
                  </div>
                </label>
                {imageUrl ? (
                  <>
                    <div
                      className="p-2 px-5 bg-red-500 text-white rounded-lg "
                      onClick={() => pushValue("image")}
                    >
                      Thêm
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 px-5 bg-red-300 text-white rounded-lg ">
                      Thêm
                    </div>
                  </>
                )}
                <div className="overflow-y-auto border rounded-xl w-full  h-[200px] mt-5">
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
                        <div className="">
                          <label>Thông tin sản phẩm</label>
                          <div
                            className="bg-red-400 hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                            onClick={() => setOpen(true)}
                          >
                            Thêm thông tin sản phẩm
                          </div>
                        </div>
                        <div className="">
                          <label>Mô tả sản phẩm</label>
                          <div
                            className="bg-red-400 hover:bg-red-600 duration-300 mt-2 py-3 text-center hover:text-white cursor-pointer"
                            onClick={() => setOpenDescription(true)}
                          >
                            Thêm mô tả sản phẩm
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="  flex flex-col gap-3">
                    <div className="flex gap-2 w-full">
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
                      <div className="flex flex-col gap-2 w-[190px]">
                        <label className="text-md font-medium ">
                          Loại bài viết
                        </label>
                        <select
                          className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                          onChange={HandleTypeChange}
                        >
                          {productTypes
                            ?.filter(
                              (item) => item.parentParams === isParentParams
                            )
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
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2  items-end">
                        <div>
                          <Input
                            Value={color}
                            setValue={setColor}
                            text="Mã màu"
                            Input={true}
                          />
                        </div>
                        <label>
                          <p className="bg-[#0047AB] hover:bg-[#0000FF]  text-center rounded text-white text-md font-medium p-2  outline-none">
                            Chọn từ thiết bị
                          </p>
                          <input
                            type="file"
                            onChange={(e) =>
                              HandleUploadImage(e, "color", "color")
                            }
                            className="w-0 h-0"
                            id="fileInput"
                          />
                        </label>
                      </div>
                      <Input
                        Value={column}
                        setValue={setColumn}
                        text="Số cột"
                        Input={true}
                      />
                      <div className="text-center">
                        {color && colorImage ? (
                          <>
                            {" "}
                            <div
                              className="p-2 bg-red-600 text-white rounded-lg "
                              onClick={() => pushValue("color")}
                            >
                              Thêm
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div
                              className="p-2 bg-red-300 hover:bg-red-600 text-white rounded-lg "
                              onClick={() => {
                                notification["error"]({
                                  message: "Lỗi !!!",
                                  description: `Vui lòng bổ sung đầy đủ thông tin !`,
                                });
                              }}
                            >
                              Thêm
                            </div>
                          </>
                        )}
                      </div>
                      <div className="overflow-y-auto border rounded-xl w-full  h-[100px] mt-5">
                        <div className="p-1 grid grid-cols-4 ">
                          {listColor.map((items, idx) => {
                            return (
                              <div className="my-2 relative w-[50px] h-[50px] group border flex justify-center items-center">
                                <img src={items.image} alt="" />
                                <div className="w-full h-full flex justify-center items-center ] text-[25px] absolute top-0  z-10 text-redPrimmary ">
                                  <p>{items.type}</p>
                                </div>
                                <div
                                  className="w-full h-full  group-hover:flex justify-center items-center bg-[rgba(0,0,0,0.3)] text-[40px] absolute top-0  z-10 text-redPrimmary hidden"
                                  onClick={() => popValue(idx, "color")}
                                >
                                  <AiOutlineDelete className="" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* <p className="italic text-gray-600 ml-2">
                        không có màu bạn cần?{" "}
                        <span
                          className="hover:text-blue-500 hover:underline underline"
                          onClick={() => setIsUploadProduct("add-color")}
                        >
                          thêm màu
                        </span>
                      </p> */}
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
      <>
        <Drawer
          title="Thêm thông tin sản phẩm"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          width={800}
        >
          <TextEditor onChange={setContent} initialValue={initial1} />
        </Drawer>
      </>
      <>
        <Drawer
          title="Thêm mô tả sản phẩm"
          placement="right"
          onClose={() => setOpenDescription(false)}
          open={openDescription}
          width={800}
        >
          <TextEditor onChange={setDescribe} initialValue={initDescribe} />
        </Drawer>
      </>
    </div>
  );
};

export default AddProduct;
