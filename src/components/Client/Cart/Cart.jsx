import React, { useEffect, useState } from "react";
import Input from "../../Admin/Item/Input";
import { RxCross2 } from "react-icons/rx";
import { useData } from "../../../Context/DataProviders";
import { useStateProvider } from "../../../Context/StateProvider";

const Cart = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const { OpenCart, setOpenCart } = useStateProvider();

  const { CartItems, Products, setCartItems } = useData();

  useEffect(() => {
    console.log(CartItems);
  }, [CartItems]);

  const cartMap = {};
  CartItems.forEach((itemId) => {
    cartMap[itemId] = (cartMap[itemId] || 0) + 1;
  });

  const cartProducts = [];
  let totalAmount = 0.0; // Tổng tiền hóa đơn (số thực)

  Object.keys(cartMap).forEach((itemId) => {
    const product = Products.find((product) => product.id === itemId);
    if (product) {
      const itemCount = cartMap[itemId];
      const itemTotal = product.price * itemCount;
      totalAmount += itemTotal;

      cartProducts.push({
        ...product,
        count: itemCount,
        total: itemTotal,
      });
    }
  });

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = CartItems.filter((itemId) => itemId !== productId);
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

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
                  <div className="flex w-full justify-between gap-2 ">
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
                    <h3 className=" text-start   w-full">{product.title}</h3>
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
          <div>
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
            <div className="py-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer text-center uppercase font-semibold ">
              Đặt hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
