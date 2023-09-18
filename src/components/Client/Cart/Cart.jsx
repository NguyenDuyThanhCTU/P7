import React, { useEffect, useState } from "react";
import Input from "../../Admin/Item/Input";
import { RxCross2 } from "react-icons/rx";
import { useData } from "../../../Context/DataProviders";
import { useStateProvider } from "../../../Context/StateProvider";
import { notification } from "antd";

const Cart = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState([]);
  const [TotalAmount, setTotalAmount] = useState();
  const { CartItems, Products, setCartItems } = useData();

  const cartMap = {};

  CartItems?.forEach((itemId) => {
    cartMap[itemId.id] = (cartMap[itemId.id] || 0) + 1;
  });

  const cartProducts = [];
  let totalAmount = 0.0;
  let FinalCount = 0;
  Object.keys(cartMap).forEach((itemId) => {
    const product = Products.find((product) => product.id === itemId);
    const listcolor = CartItems.filter((items) => items.id === itemId);
    const colors = listcolor.map((item) => item.color);

    if (product && colors) {
      const itemCount = cartMap[itemId];
      const itemTotal = product.price * itemCount;

      totalAmount += itemTotal;
      FinalCount += itemCount;
      cartProducts.push({
        ...product,
        count: itemCount,
        total: itemTotal,
        ListColor: colors,
      });
    }
  });

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = CartItems.filter(
      (itemId) => itemId.id !== productId
    );
    setCartItems(updatedCartItems);
  };

  const HandleDiscard = () => {
    setAddress("");
    setStreet("");
    setCity("");
    setDescription("");
    setDistrict("");
    setName("");
    setPhone("");
    setEmail("");
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !name || !email || !address || !district || !city) {
      notification["warning"]({
        message: "Thao tác KHÔNG thành công !",
        description: `
           Vui lòng nhập đầy đủ THÔNG TIN !`,
      });
    } else {
      const currentTime = new Date();

      const dataFields = [
        { title: "Họ Tên", value: name },
        { title: "Email", value: email },
        { title: "SĐT", value: phone },
        { title: "ĐC", value: `${address} ${street}, ${district}, ${city}` },
        { title: "Yêu Cầu Khác", value: description },
        { title: "Tổng số lượng sản phẩm", value: `${FinalCount} Sản phẩm` },
        {
          title: "Chi tiết hóa đơn",
          value: `${cartProducts
            .map((items, idx) => {
              return `----------------------------------------------- Sản phẩm ${idx} ------------------------------------------------- \nTên sản phẩm: ${items.title} \n số lượng: ${items.count} \n mã sản phẩm: ${items.ListColor} \n loại: ${items.type} \n Giá: ${items.price} VNĐ \n `;
            })
            .join("")}
        `,
        },
        {
          title: "Tổng Giá trị hóa đơn",
          value: `${totalAmount.toFixed(3)} VNĐ`,
        },
        { title: "Thời gian đặt", value: currentTime },
      ];

      const data = {};

      dataFields.forEach((field) => {
        data[field.title] = field.value;
      });

      const response = await fetch(
        "https://formsubmit.co/ajax/thequyen335853@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // HandleDiscard();
        notification["success"]({
          message: "Thành công !",
          description: `
             Chúng tôi sẽ liên hệ trong thời gian sớm nhất !`,
        });
      } else {
        notification["error"]({
          message: "Lỗi !",
          description: `
             Lỗi không xác định !`,
        });
      }
    }
  };

  useEffect(() => {
    const data = {
      name: "",
      color: [],
    };
    cartProducts.map((items, idx) => {
      data.color.push(items.ListColor);
      data.name = items.title;
    });
    // console.log(data);
  }, []);

  return (
    <div className="grid d:grid-cols-2 gap-5 p:grid-cols-1">
      <div className="border shadow-xl">
        <div className="p-2">
          <h3 className="text-mainblue uppercase text-[18px] font-semibold border-b w-full pb-2">
            giỏ hàng của bạn
          </h3>
          <div className="text-right">
            <div className="h-[420px] overflow-y-auto   ">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col px-2 gap-1 items-start py-4 w-full border-b border-black relative"
                >
                  <div className="flex w-full justify-start gap-2 ">
                    <div className="w-14 h-14 rounded-lg relative">
                      <img
                        src={product.image}
                        alt="product img"
                        className="w-full h-full object-cover hover:scale-110 duration-500"
                      />
                      <div className="absolute w-6 h-6 bg-white rounded-full -top-2 z-20 flex items-center justify-center text-red-500 font-bold  -right-2">
                        <span> {product.count}</span>
                      </div>
                    </div>
                    <div className="flex flex-col text-start ">
                      <h3 className="   w-full">{product.title}</h3>

                      <div className="w-full flex gap-2">
                        {product.ListColor.map((items, idx) => (
                          <>
                            <p>{items}</p>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="w-full text-right">
                    Giá:{" "}
                    <span className="text-mainpink">
                      {" "}
                      {product.price} <sup>VNĐ</sup>
                    </span>
                  </p>
                  <div
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    <RxCross2 />
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4  flex w-full justify-between px-2">
              <div className="font-SVNDancing text-[28px]">Tổng: </div>
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-mainpink">
                    {" "}
                    {totalAmount.toFixed(3)} <sup>VNĐ</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border shadow-xl">
        <div className="p-2">
          <h3 className="text-mainblue uppercase text-[18px] font-semibold border-b w-full pb-2">
            Thông tin giao hàng
          </h3>
          <form onSubmit={HandleSubmit}>
            <div className="flex gap-2 ">
              <Input
                text="Họ tên "
                Value={name}
                setValue={setName}
                Input={true}
              />
              <Input
                text="Số điện thoại "
                Value={phone}
                setValue={setPhone}
                Input={true}
              />
            </div>
            <Input
              text="Email "
              Value={email}
              setValue={setEmail}
              Input={true}
            />
            <div className=" flex gap-2">
              <Input
                text="Tỉnh/Thành phố "
                Value={city}
                setValue={setCity}
                Input={true}
              />
              <Input
                text="Quận/huyện"
                Value={district}
                setValue={setDistrict}
                Input={true}
              />
              <Input
                text="Phường/xã"
                Value={street}
                setValue={setStreet}
                Input={true}
              />
            </div>
            <Input
              text="Địa chỉ"
              Value={address}
              setValue={setAddress}
              Input={true}
            />
            <Input
              text="Yêu cầu khác"
              Value={description}
              setValue={setDescription}
              Input={false}
            />
            <button
              className="py-2 w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer text-center uppercase font-semibold "
              type="submit"
            >
              Đặt hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
