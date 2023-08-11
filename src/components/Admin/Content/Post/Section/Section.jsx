import React from "react";
import { FcViewDetails } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Popconfirm, message } from "antd";

const Section = ({ title, Data, HandleDelete, setIsUploadProduct }) => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-start gap-2 ">
        <div className="h-1 w-[70px] bg-[#40b2b5] d:block p:hidden"></div>
        <h3 className="text-[24px] font-normal uppercase text-center">
          {title}
        </h3>
      </div>
      {/* h-270px */}
      <div className="border border-gray-500 rounded-xl mx-5 mt-5 h-[500px] overflow-y-scroll">
        {Data?.map((data, idx) => (
          <div
            key={data.id}
            className="grid  cols-5 items-center my-2  ml-1 justify-start px-5 "
          >
            <div className="group relative ">
              <FiEdit className="text-red-600 hover:scale-125 duration-300 " />
              <div className="w-[120px] bg-white opacity-90 absolute -top-2 h-8 left-5 rounded-lg hidden group-hover:block ">
                <div className="mx-3 flex  justify-between text-[24px] h-full items-center ">
                  <FcViewDetails className="hover:scale-125 duration-300" />
                  <FiEdit className="text-green-600 hover:scale-125 duration-300" />
                  <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn muốn xóa sản phẩm này?"
                    onConfirm={() => {
                      HandleDelete(data.id);
                    }}
                    onCancel={() => {
                      message.error("Sản phẩm chưa được xóa!");
                    }}
                    okText="Yes"
                    okType="danger"
                    cancelText="No"
                  >
                    <MdDeleteForever className="text-red-600 hover:scale-125 duration-300" />
                  </Popconfirm>
                </div>
                <div className="absolute bg-none w-3 h-8 top-0 -left-2"></div>
              </div>
            </div>
            <p className="truncate w-[300px]">{data.title}</p>

            <img
              src={data.image}
              alt="product"
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              {data.daysSinceCreation > 0 ? (
                <div>
                  {" "}
                  <p className="text-[12px] w-[85px] truncate  py-1 border px-2 rounded-3xl text-orange-300 border-orange-300">
                    {data.daysSinceCreation} ngày trước
                  </p>
                </div>
              ) : (
                <>
                  {" "}
                  <p className="text-[12px] w-[65px] truncate  border px-2 py-1 rounded-3xl text-green-300 border-green-300">
                    Bây giờ
                  </p>
                </>
              )}
            </div>
            <p className=" truncate ">{data.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex w-full  justify-center gap-5">
        <button
          className="py-3 px-5 bg-BlueFF  rounded-sm hover:bg-BlueFFhover"
          onClick={() => {
            setIsUploadProduct(title);
          }}
        >
          Thêm bài viết
        </button>
      </div>
    </div>
  );
};

export default Section;
