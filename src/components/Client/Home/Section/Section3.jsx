import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useData } from "../../../../Context/DataProviders";
import { useStateProvider } from "../../../../Context/StateProvider";
import { Link } from "react-router-dom";

const Section3 = ({ title, idx, Data }) => {
  const { setOpenCart } = useStateProvider();
  const { setCartItems } = useData();

  const HandleOrder = (id) => {
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };
  return (
    <>
      {" "}
      <div className="py-10 d:mx-10 p:mx-2">
        <div className=" flex items-center justify-start bg-[#89cde2] rounded-md relative">
          <div className="w-[500px] bg-[#89cde2]  rounded-l-md text-white  flex justify-between rounded-r-full z-10 ">
            <div className="bg-[#89cde2] border-l-2 border-r-4 border-white h-[53px] w-3 ml-4"></div>

            <div className=" ">
              <h3 className="font-SVNDancing text-[30px]">{title}</h3>
            </div>
            <div className="w-[53px] h-[53px] bg-white rounded-full  text-[#89cde2] flex items-center justify-center font-LexendDeca text-[20px] ml-5">
              <span> {idx}</span>
            </div>
          </div>
          <div className=" w-[75%] bg-white h-[53px] absolute right-0 top-1 z-0"></div>
        </div>
      </div>
      <div>
        <div className=" grid d:grid-cols-5 grid-rows-2 gap-2 p:grid-cols-2 pb-10">
          {Data.map((items, idx) => (
            <div className="p-2 cursor-pointer flex flex-col items-center d:h-[400px] justify-between p:h-[420px]">
              <Link to={`/san-pham/${items.id}`}>
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
              </Link>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Section3;
