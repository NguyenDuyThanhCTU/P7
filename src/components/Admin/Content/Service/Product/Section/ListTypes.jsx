import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { IconMapping, ProductOptionItems } from "../../../../../../Utils/item";
import { useStateProvider } from "../../../../../../Context/StateProvider";
import { useData } from "../../../../../../Context/DataProviders";

const ListProduct = () => {
  const { setIsUploadProduct } = useStateProvider();
  const { productTypes } = useData();

  return (
    <div className="d:w-[400px] shadow-2xl bg-[#353535] p:w-auto">
      <div className="p-3">
        <div className="flex justify-between items-center text-[25px] p-3 flex-col gap-3">
          <p className="uppercase  text-center w-full from-yellow-400">
            Tùy chọn sản phẩm
          </p>
          <div className="h-[400px] p:w-[60vw] d:w-[370px] border  rounded-2xl overflow-y-scroll ">
            <div className="flex flex-col cursor-pointer">
              {productTypes.map((items, idx) => (
                <div className="flex gap-2 p-2 items-center">
                  <div>{idx + 1}</div>

                  <div className="p-1 truncate">{items.type}</div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="bg-white text-redPrimmary px-4 py-1 rounded-lg uppercase cursor-pointer hover:scale-110 duration-300"
            onClick={() => setIsUploadProduct("add-types")}
          >
            Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
