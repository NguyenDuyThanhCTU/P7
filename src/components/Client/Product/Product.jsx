import React, { useEffect, useState } from "react";
import Category from "../../Item/Category";
import { Link, useLocation, useParams } from "react-router-dom";
import { useData } from "../../../Context/DataProviders";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateProvider } from "../../../Context/StateProvider";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";
import ProductCard from "../Item/ProductCard";

const Product = () => {
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

  const HandleOrder = (id) => {
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };
  return (
    <div className="flex gap-3 d:flex-row p:flex-col p:items-center d:items-start">
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

        <div className="grid d:grid-cols-4 p:grid-cols-2 grid-rows-5 mt-5">
          {SortProduct?.map((items, idx) => (
            <>
              <ProductCard
                image={items.image[0]}
                price={items.price}
                title={items.title}
                id={items.id}
                newPrice={items.sale.newPrice}
                discount={items.sale.discount}
              />
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

export default Product;
