import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateProvider } from "../../../Context/StateProvider";
import { IconMapping } from "../../../Utils/item";
import {
  delDocument,
  updateDocument,
} from "../../../Config/Services/Firebase/FireStoreDB";
import { Popconfirm, message, notification } from "antd";
import { useData } from "../../../Context/DataProviders";

const HeaderDropDown = ({ ItemDropDown, id }) => {
  const { setIsUploadProduct, setIsRefetch } = useStateProvider();
  const { setDetailOrders } = useData();
  const navigate = useNavigate();

  const HandleDelete = () => {
    delDocument("orders", id).then(() => {
      notification["success"]({
        message: "Thành công!",
        description: `Xóa đơn hàng thành công!`,
      });
    });
    setIsRefetch("deleted");
  };

  const HandleClick = (event) => {
    if (event === "Thoát") {
      navigate("/");
    } else if (event === "Hồ sơ") {
      setIsUploadProduct("profile");
    } else if (event === "Chi tiết đơn hàng") {
      setIsUploadProduct("product-detail");
      setDetailOrders(id);
    } else {
      let Icon = "";
      if (event === "Mới") {
        Icon = "BsFillSendExclamationFill";
      } else if (event === "Đã phản hồi") {
        Icon = "BsFillSendCheckFill";
      } else if (event === "Đã thanh toán") {
        Icon = "TbCubeSend";
      } else if (event === "Hủy đơn") {
        Icon = "BsFillSendXFill";
      }
      const newData = {
        state: Icon,
      };

      updateDocument("orders", id, newData).then(() => {
        notification["success"]({
          message: "Thành công !!!",
          description: `Trạng thái đơn hàng đã được thay đổi`,
        });
        setIsRefetch("update state order");
      });
    }
  };

  return (
    <>
      <div className="p-3 min-w-[240px] border-colortopdownBlue border border-solid rounded bg-white relative  cursor-pointer z-50">
        <ul className="text-colortopdownGray leading-6 font-semibold">
          {ItemDropDown.map((items, idx) => {
            let Icon = IconMapping[items.icon];
            return (
              <>
                <li
                  className={`hover:text-white hover:scale-105 duration-300 element-dropdown flex items-center text-[18px] hover:bg-red-500
                  ${
                    items.name === "Thoát"
                      ? "text-red-500"
                      : items.name === "Mới"
                      ? "text-green-500"
                      : items.name === "Đã phản hồi"
                      ? "text-sky-500"
                      : items.name === "Đã thanh toán"
                      ? "text-teal-500"
                      : items.name === "Hủy đơn"
                      ? "text-red-500"
                      : ""
                  }
                  `}
                  onClick={() => HandleClick(items.name)}
                >
                  {items.name === "Đã thanh toán" ||
                  items.name === "Hủy đơn" ? (
                    <>
                      {" "}
                      <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn muốn xóa sản phẩm này?"
                        onConfirm={() => {
                          HandleDelete();
                        }}
                        onCancel={() => {
                          message.error("Sản phẩm chưa được xóa!");
                        }}
                        okText="Yes"
                        okType="danger"
                        cancelText="No"
                        className="flex items-center"
                      >
                        {Icon && <Icon className="inline-block  mr-2" />}
                        <p>{items.name}</p>
                      </Popconfirm>
                    </>
                  ) : (
                    <>
                      {Icon && <Icon className="inline-block  mr-2" />}
                      <p>{items.name}</p>
                    </>
                  )}
                </li>
              </>
            );
          })}
        </ul>

        <div className="absolute w-4 h-4 border border-b-0 border-r-0 bg-white border-solid border-colortopdownBlue -top-2 right-[45%] transform rotate-45 z-0"></div>
        <div className="w-full h-10  bg-none absolute -top-10"> </div>
      </div>
    </>
  );
};

export default HeaderDropDown;
