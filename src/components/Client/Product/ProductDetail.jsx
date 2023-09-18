import React, { useEffect, useState } from "react";
import Category from "../../Item/Category";
import { useStateProvider } from "../../../Context/StateProvider";
import { useData } from "../../../Context/DataProviders";
import { Link, useParams } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";
import { Modal, notification } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { RxCross2 } from "react-icons/rx";

const ProductDetail = () => {
  const [SortProduct, setSortProduct] = useState();
  const [Product, SetProduct] = useState();
  const [color, setColor] = useState();
  const [isCombo, setIsCombo] = useState(1);
  const { setOpenCart, OpenCart } = useStateProvider();
  const { Products, setCartItems } = useData();
  const [isImage, setImage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const onMinus = () => {
    if (isCombo > 0) {
      setIsCombo(isCombo - 1);
    }
  };
  useEffect(() => {
    const sort = Products.filter((item) => item.id === id);
    if (sort) {
      SetProduct(sort[0]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, Products]);

  // Similar products
  useEffect(() => {
    if (Product) {
      const sort = Products.filter((item) => item.params === Product?.params);
      if (sort) {
        setSortProduct(sort);
      }
    }
  }, [Product]);

  const HandleOrder = (id) => {
    if (color) {
      const data = {
        id: id,
        color: color,
      };

      const numberOfItems = isCombo;

      const updatedCartItems = Array.from(
        { length: numberOfItems },
        () => data
      );

      setCartItems((prevItems) => [...prevItems, ...updatedCartItems]);
      setOpenCart(true);
    } else {
      notification["warning"]({
        message: "Thao tác không thành công!",
        description: `Vui lòng chọn MÃ MÀU trước khi thêm vào giỏ hàng !`,
      });
    }
  };

  const contentArray = Product?.describe?.split("\n");

  const HandleSelectImage = (id) => {
    const sort = Product?.image.filter((item) => item === id);
    if (sort) {
      setImage(sort[0]);
    }
  };

  const HandleSelectColor = (type, image) => {
    setColor(type);

    setIsModalOpen(true);
    setImage(image);
  };

  return (
    <div className="flex gap-10 d:flex-row p:flex-col d:items-start p:items-center ">
      <div className="w-full flex justify-center">
        <Category />
      </div>
      <div className="w-full flex  items-center flex-col relative">
        <div className="">
          <div className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
            <h3 className=" bg-[url(http://thegioiphukiennails39.com/assets/images/title_main.png)] bg-no-repeat bg-contain ">
              Chi tiết sản phẩm
            </h3>
          </div>
          <div className="flex mt-5 gap-5 pb-5 d:flex-row p:flex-col">
            <div>
              <div
                className="h-[350px] p:w-[90vw] d:w-[400px] overflow-hidden "
                onClick={() => HandleSelectColor("", Product?.image[0])}
              >
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                  {Product?.image?.map((items, idx) => (
                    <>
                      <SwiperSlide>
                        <img
                          src={items}
                          alt="product"
                          className="w-full h-full hover:scale-110 duration-500 object-contain"
                        />
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </div>
              <div className="p:w-[100vw] d:w-[400px] h-[150px]  flex items-center">
                <div className="p-2 w-full border-4 bg-gray-100">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                  >
                    {Product?.color?.map((items, idx) => (
                      <>
                        <SwiperSlide>
                          <div
                            className=" w-[100px] h-[100px] overflow-hidden"
                            onClick={() =>
                              HandleSelectColor(items.type, items.image)
                            }
                          >
                            <img
                              src={items.image}
                              alt="product image"
                              className="w-full h-full hover:scale-110 duration-300"
                            />
                          </div>
                        </SwiperSlide>
                      </>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 font-LexendDeca px-2">
              <h3 className="uppercase text-[22px] font-bold">
                {Product?.title}
              </h3>

              {Product?.sale?.discount === 0 ? (
                <>
                  <p>
                    Giá:{" "}
                    <span className="text-red-500">
                      {Product?.price} <sup>VNĐ</sup>
                    </span>
                  </p>
                </>
              ) : (
                <div>
                  <p>
                    Giá cũ:{" "}
                    <span className="text-[16px] line-through">
                      {Product?.price} <sup>VNĐ</sup>
                    </span>
                  </p>
                  <div className="flex items-end">
                    <p>
                      Giá mới:{" "}
                      <span className="text-red-500 text-[20px]">
                        {Product?.sale?.newPrice} <sup>VNĐ</sup>
                      </span>{" "}
                    </p>
                    <div className="ml-5 border-2 border-red-500 bg-red-500 text-white p-2">
                      Giảm {Product?.sale?.discount} %
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-md font-medium ">Danh sách màu:</label>
                <div className="w-max">
                  <div className={`grid-cols-${Product?.column} grid gap-3 `}>
                    {Product?.color?.map((items, idx) => (
                      <div
                        className={`hover:bg-mainblue hover:text-white ${
                          items.type === color
                            ? "bg-mainblue text-white"
                            : "bg-white text-black"
                        }   cursor-pointer my-2 relative w-[50px] h-[50px] group border flex justify-center items-center`}
                        onClick={() =>
                          HandleSelectColor(items.type, items.image)
                        }
                      >
                        <p>{items.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <>
                  <Modal
                    title={`Hình ảnh màu ${color}`}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    className=""
                  >
                    <div className="w-full flex items-center justify-center border rounded-lg border-mainpink">
                      <div className="w-full h-full overflow-hidden p-3">
                        <img
                          src={isImage}
                          alt="product"
                          className="w-full h-full hover:scale-110 duration-300"
                        />
                      </div>
                    </div>
                  </Modal>
                </>
              </div>

              <p>
                {" "}
                Tình trạng:{" "}
                {Product?.state ? (
                  <>
                    <span className="text-[#6a9701]">Còn hàng</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500"></span>
                  </>
                )}
              </p>

              <div className="flex pb-3  border-b gap-4">
                <div className="flex justify-between items-center h-full  border-blue-500 border rounded-sm ">
                  <BiMinus
                    onClick={() => onMinus()}
                    className="cursor-pointer ml-2"
                  />
                  <input
                    type="text"
                    value={isCombo}
                    className=" focus-visible:outline-none w-full text-center border-0 px-0 py-[8px] h-auto text-13 "
                  />
                  <BiPlus
                    onClick={() => setIsCombo(isCombo + 1)}
                    className="cursor-pointer mr-2"
                  />
                </div>
                <div
                  className="rounded-sm w-full text-[18px] text-primary bg-[#f0edf8] hover:bg-[#e1dbf0] flex items-center  py-2 justify-center cursor-pointer gap-1"
                  onClick={() => HandleOrder(Product?.id)}
                >
                  <BsFillCartPlusFill className="text-[23px] " />
                  <p>Mua ngay</p>
                </div>
              </div>
              <div>
                <div className="">
                  Sỉ số lượng lớn vui lòng inbox shop or gọi qua số ĐT:
                  <div className="flex gap-3">
                    <div
                      className="font-bold text-mainblue cursor-pointer hover:underline"
                      onClick={() => window.open("tel:0909902335")}
                    >
                      0909 902 335
                    </div>{" "}
                    <div>Hoặc</div>
                    <div
                      className="font-bold text-mainpink cursor-pointer hover:underline"
                      onClick={() => window.open("tel:0779741149")}
                    >
                      {" "}
                      0779 741 149
                    </div>
                  </div>
                  <p>Xin cảm ơn!</p>
                </div>
                <p className="italic text-gray-500 mt-2">
                  Lượt xem: <span>{Product?.access}</span>
                </p>
                <p className="p:w-auto d:w-[615px]">{Product?.content}</p>
              </div>
            </div>
          </div>
          <div className="py-5 border-b border-t font-OpenSans">
            <div className="flex flex-col">
              <h3 className="uppercase font-bold">Thông tin sản phẩm:</h3>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: Product?.detail }}
              ></div>
            </div>
            <div className="flex flex-col mt-5">
              <h3 className="uppercase font-bold">Mô tả sản phẩm:</h3>
              <div className="">
                {contentArray?.map((item, index) => (
                  <p key={index} className="mt-3">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {/* {isImage && (
            <div className="d:hidden d:w-screen p:block p:w-full h-screen absolute  p:top-0 d:-top-[166px]  -right-1  z-[9999]">
              <div className="w-full items-center flex bg-[rgba(0,0,0,0.34)] justify-center h-full ">
                <div className="d:w-[500px] d:h-[500px] p:w-[90vw] h-[60vh] relative flex justify-center ">
                  <img src={isImage} className="w-full h-full"></img>
                  <div
                    className="absolute -top-9 right-0 rounded-full border text-[30px] text-black border-white bg-white hover:scale-110 duration-300 cursor-pointer"
                    onClick={() => setImage()}
                  >
                    <RxCross2 className=" p-1" />
                  </div>
                </div>
              </div>
            </div>
          )}{" "} */}
        </div>
        <div className="w-full mt-10">
          <div className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
            <h3 className=" bg-[url(http://thegioiphukiennails39.com/assets/images/title_main.png)] bg-no-repeat bg-contain ">
              Sản phẩm cùng loại
            </h3>
          </div>
          <div className="grid d:grid-cols-4 grid-rows-2 mt-5 p:grid-cols-2">
            {SortProduct?.map((items, idx) => (
              <>
                <Link to={`/san-pham/${items.id}`}>
                  <div className="p-2 cursor-pointer flex flex-col items-center h-[400px] justify-between">
                    <div>
                      <div className="rounded-lg w-full h-[220px]  overflow-hidden  ">
                        <img
                          src={items.image[0]}
                          alt="product"
                          className="w-full h-full hover:scale-110 duration-500 object-cover "
                        />
                      </div>
                      <p className="hover:text-mainblue font-LexendDeca text-center mt-2">
                        {items.title}
                      </p>
                    </div>
                    <div className="px-2 text-center mt-2 flex flex-col gap-2 font-LexendDeca w-full">
                      <div className="text-red-500 ">
                        {items.price ? (
                          <>
                            {" "}
                            {items.price}
                            <sup>VNĐ</sup>
                          </>
                        ) : (
                          <>Liên hệ</>
                        )}
                      </div>
                      <div className="flex items-center gap-2 w-full justify-center border py-2 hover:bg-mainpink hover:text-white">
                        <AiOutlineShoppingCart />
                        <p>Mua ngay</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-36 right-[-300px] ${
          OpenCart ? " z-50" : "z-0"
        }`}
      >
        <ShopCart />
      </div>
    </div>
  );
};

export default ProductDetail;
