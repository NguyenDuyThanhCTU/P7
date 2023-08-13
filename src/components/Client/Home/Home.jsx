import React from "react";
import Section1 from "./Section/Section1";
import Section2 from "./Section/Section2";
import Section3 from "./Section/Section3";
import { useData } from "../../../Context/DataProviders";
import ShopCart from "../../../Layout/ClientLayout/Section/ShopCart";

const Home = () => {
  const { productTypes, Products } = useData();

  return (
    <div className="">
      <Section1 />
      <div className="w-[1350px] mx-auto">
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
      <div className="fixed bottom-36 right-[-52px] z-50">
        <ShopCart />
      </div>
    </div>
  );
};

export default Home;
