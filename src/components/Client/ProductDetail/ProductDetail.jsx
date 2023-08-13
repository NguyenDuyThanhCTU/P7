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
  const { setOpenCart } = useStateProvider();
  const { Products, setCartItems } = useData();
  const [isCombo, setIsCombo] = useState(1);
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
    }
  }, [id, Products]);

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

  return (
    <div className="flex gap-3">
      <Category />
      <div className="w-full">
        <div>
          <div className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
            <h3 className=" bg-[url(http://thegioiphukiennails39.com/assets/images/title_main.png)] bg-no-repeat bg-contain ">
              Chi tiết sản phẩm
            </h3>
          </div>
          <div className="flex mt-5 gap-5 pb-5 border-b">
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
              <p>Mã sản phẩm: </p>
              <p>
                Giá:{" "}
                <span className="text-red-500">
                  {Product?.price} <sup>VNĐ</sup>
                </span>
              </p>
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

              <div className="flex pb-3 mb-5 border-b gap-4">
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
                  onClick={() => HandleOrder(Product.id)}
                >
                  <BsFillCartPlusFill className="text-[23px] " />
                  <p>Mua ngay</p>
                </div>
              </div>
              <div>
                <p>Mô tả:</p>
                <p className="w-[615px]">{Product?.content}</p>
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
          <div className="grid grid-cols-4 grid-rows-2 mt-5">
            {SortProduct?.map((items, idx) => (
              <>
                <Link to={`/san-pham/${items.id}`}>
                  <div className="p-2 cursor-pointer flex flex-col items-center h-[400px] justify-between">
                    <div>
                      <div className="rounded-lg w-full h-[220px]  overflow-hidden  ">
                        <img
                          src={items.image}
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
      <div className="fixed bottom-36 right-[-52px] z-50">
        <ShopCart />
      </div>
    </div>
  );
};

export default ProductDetail;
