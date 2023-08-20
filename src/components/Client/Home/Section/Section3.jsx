import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useData } from "../../../../Context/DataProviders";
import { useStateProvider } from "../../../../Context/StateProvider";
import { Link } from "react-router-dom";
import ProductCard from "../../Item/ProductCard";

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
          <div className=" p:w-auto d:w-[500px] bg-[#89cde2] overflow-hidden text-ellipsis rounded-l-md text-white  flex justify-between rounded-r-full z-10 ">
            <div className="bg-[#89cde2] border-l-2 border-r-4 border-white h-[53px] w-3 ml-4"></div>

            <div className=" flex items-center justify-center">
              <h3 className="font-SVNDancing p:text-[20px] d:text-[30px] truncate text-ellipsis d:w-[400px] p:w-   overflow-hidden">
                {title}
              </h3>
            </div>
            <div className="w-[53px] h-[53px] bg-white rounded-full  text-[#89cde2] flex items-center justify-center font-LexendDeca text-[20px] ml-5">
              <span> {idx}</span>
            </div>
          </div>
          <div className=" w-[75%] bg-white h-[53px] absolute right-0 top-1 z-0"></div>
        </div>
      </div>
      <div>
        <div className=" grid d:grid-cols-5 grid-rows-2  p:grid-cols-2 pb-10 ">
          {Data.map((items, idx) => (
            <div className="p-2 cursor-pointer flex flex-col items-center d:h-[400px] justify-between p:h-[420px]">
              <ProductCard
                image={items.image[0]}
                price={items.price}
                title={items.title}
                id={items.id}
                newPrice={items.sale.newPrice}
                discount={items.sale.discount}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Section3;
