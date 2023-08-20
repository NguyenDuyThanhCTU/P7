import React, { useEffect, useState } from "react";
import Category from "../../Item/Category";
import { useStateProvider } from "../../../Context/StateProvider";
import { useData } from "../../../Context/DataProviders";
import { Link, useParams } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";

const ProductDetail = () => {
  const [SortProduct, setSortProduct] = useState();
  const [Product, SetProduct] = useState([]);
  const { setOpenCart, OpenCart } = useStateProvider();
  const { Products, setCartItems } = useData();
  const [isCombo, setIsCombo] = useState(1);
  const { id } = useParams();

  console.log(Product);
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
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };

  const contentArray = Product?.describe?.split("\n");

  return (
    <div className="flex gap-3 d:flex-row p:flex-col d:items-start p:items-center">
      <Category />
      <div className="w-full">
        <div>
          <div className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
            <h3 className=" bg-[url(http://thegioiphukiennails39.com/assets/images/title_main.png)] bg-no-repeat bg-contain ">
              Chi tiết sản phẩm
            </h3>
          </div>
          <div className="flex mt-5 gap-5 pb-5 d:flex-row p:flex-col">
            <div className="h-[360px] w-[360px] overflow-hidden">
              <img
                src={Product?.image}
                alt="product image"
                className="w-full h-full hover:scale-110 duration-500"
              />
            </div>
            <div className="flex flex-col gap-5 font-LexendDeca">
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
                <label className="text-md font-medium ">Mã màu:</label>
                <select
                  className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                  // onChange={HandleParentChange}
                >
                  {Product?.color.map((item, idx) => (
                    <option
                      key={idx}
                      className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 "
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
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
                    className=" focus-visible:outline-none w-full text-center border-0 px-0 py-[9px] h-auto text-13 "
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
                          alt="product image"
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
                      <div
                        className="flex items-center gap-2 w-full justify-center border py-2 hover:bg-mainpink hover:text-white"
                        onClick={() => HandleOrder(items.id)}
                      >
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
