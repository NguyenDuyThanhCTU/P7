import React, { useEffect } from "react";
import Section1 from "./Section/Section1";
import Section2 from "./Section/Section2";
import Section3 from "./Section/Section3";
import { useData } from "../../../Context/DataProviders";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";
import { useStateProvider } from "../../../Context/StateProvider";
import ScrollTop from "../../Item/ScrollTop";

const Home = () => {
  const { productTypes, Products } = useData();
  const { OpenCart } = useStateProvider();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="">
      <Section1 />
      <div className="d:w-[1350px] mx-auto p:w-auto relative">
        <Section2 />
        {productTypes.map((items, idx) => {
          const sort = Products.filter((item) => item.params === items.params);

          return (
            <>
              <Section3
                title={items.name}
                params={items.params}
                idx={idx}
                Data={sort}
              />
            </>
          );
        })}
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

export default Home;
