import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStateProvider } from "../../../Context/StateProvider";
import { useData } from "../../../Context/DataProviders";

const ProductCard = ({ image, title, price, id, newPrice, discount }) => {
  const { setOpenCart } = useStateProvider();
  const { setCartItems } = useData();
  const HandleOrder = (id) => {
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };
  return (
    <div>
      <div className="p-2 cursor-pointer flex flex-col items-center">
        <Link to={`/san-pham/${id}`}>
          <div className="rounded-lg p:w-auto  d:w-[220px] h-[220px]  overflow-hidden relative">
            <img
              src={image}
              alt="product image"
              className="w-full h-full hover:scale-110 duration-500 object-cover "
            />
            {discount !== 0 && (
              <>
                {" "}
                <div className="absolute top-0 -right-2">
                  <img
                    src="https://ntd.vieclam24h.vn/img/price-list/label-discount.png"
                    alt="discount"
                    className="p:w-auto d:w-[100px] h-[40px]"
                  />
                  <p className="absolute top-1 right-3 text-white text-[13px]">
                    giảm {discount} %
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="px-2 text-center mt-2 flex flex-col gap-2 font-LexendDeca justify-between h-[150px]">
            <p className="hover:text-mainblue truncate2 text-[18px]">{title}</p>

            <div>
              {discount === 0 ? (
                <div className="text-red-500 font-bold text-[20px] mt-2">
                  {" "}
                  {price ? (
                    <>
                      {" "}
                      {price}
                      <sup>VNĐ</sup>
                    </>
                  ) : (
                    <>Liên hệ</>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-[14px] line-through text-gray-400">
                    {" "}
                    {price}
                    <sup>VNĐ</sup>
                  </p>
                  <p className="text-red-500  font-bold text-[20px] mt-2">
                    {newPrice}
                    <sup>VNĐ</sup>
                  </p>
                </div>
              )}
            </div>
            <div
              className="flex items-center gap-2 w-full justify-center border py-2 hover:bg-mainpink hover:text-white px-2"
              // onClick={() => HandleOrder(id)}
            >
              <AiOutlineShoppingCart />
              <p>Mua ngay</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
