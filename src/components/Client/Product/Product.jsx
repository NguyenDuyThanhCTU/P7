import React, { useEffect, useState } from "react";
import Category from "../../Item/Category";
import { Link, useParams } from "react-router-dom";
import { useData } from "../../../Context/DataProviders";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateProvider } from "../../../Context/StateProvider";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";

const Product = () => {
  const [SortProduct, SetSortProduct] = useState([]);
  const { setOpenCart } = useStateProvider();
  const { Products, setCartItems } = useData();
  const { id } = useParams();

  useEffect(() => {
    const sort = Products.filter((item) => item.params === id);
    if (sort) {
      SetSortProduct(sort);
    }
  }, [id, Products]);

  useEffect(() => {
    SetSortProduct(Products);
  }, []);
  console.log(id);
  const HandleOrder = (id) => {
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };
  return (
    <div className="flex gap-3 ">
      <div>
        <Category />
      </div>
      <div className="w-full">
        <div className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
          <h3 className="  ">
            {!id ? "Cửa hàng " : <> {SortProduct[0]?.type}</>}

            <div className="bg-[url(http://thegioiphukiennails39.com/assets/images/title_main.png)] w-full h-14 bg-no-repeat bg-contain"></div>
          </h3>
        </div>
        <div className="grid grid-cols-4 grid-rows-5 mt-5">
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
      <div className="fixed bottom-36 right-[-52px] z-50">
        <ShopCart />
      </div>
    </div>
  );
};

export default Product;
