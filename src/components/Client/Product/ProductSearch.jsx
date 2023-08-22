import React, { useEffect, useState } from "react";
import Category from "../../Item/Category";
import { Link, useLocation, useParams } from "react-router-dom";
import { useData } from "../../../Context/DataProviders";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateProvider } from "../../../Context/StateProvider";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";

const ProductSearch = () => {
  const [SortProduct, SetSortProduct] = useState([]);
  const { setOpenCart, OpenCart } = useStateProvider();
  const { Products, setCartItems } = useData();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    let sort = [];
    if (location.pathname === "/cua-hang") {
      SetSortProduct(Products);
    } else {
      sort = Products.filter((item) => item.params === id);
      if (sort) {
        SetSortProduct(sort);
      }
    }
  }, [id, Products]);

  // const HandleOrder = (id) => {
  //   setCartItems((prevItems) => [...prevItems, id]);
  //   setOpenCart(true);
  // };
  return (
    <div className="flex gap-3 d:flex-row p:flex-col p:items-center d:items-start">
      <div>
        <Category />
      </div>
      <div className="w-full">
        <div className="w-full h-[74px] bg-mainblue text-white px-3 flex justify-between items-center font-LexendDeca text-[20px] font-bold">
          <h3>Kết quả tìm kiếm cho từ khóa: {id}</h3>
          <p>0 Kết quả</p>
        </div>
        <div className="grid d:grid-cols-4 p:grid-cols-2 grid-rows-5 mt-5">
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

export default ProductSearch;
