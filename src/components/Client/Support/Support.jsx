import React from "react";
import { SupportItems } from "../../../Utils/item";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div>
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
        Hỗ trợ khách hàng
      </h3>
      <div className="grid d:grid-cols-2 gap-10 mt-5 p:grid-cols-1">
        {SupportItems.map((items, idx) => (
          <>
            <div className="flex gap-3 border-b pb-5 border-black relative">
              <div>
                <img src={items.image} alt="" />
              </div>
              <h3 className="font-LexendDeca">{items.name}</h3>
              <Link to={`/dich-vu/${items.params}`}>
                {" "}
                <div className="absolute bottom-5 right-5 border  px-3 py-1 text-mainpink border-mainpink  hover:text-white hover:bg-mainpink duration-500">
                  Xem thêm
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Support;
