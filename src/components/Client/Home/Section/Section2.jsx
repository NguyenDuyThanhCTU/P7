import React, { useState } from "react";
import { SortProductItems } from "../../../../Utils/item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { useData } from "../../../../Context/DataProviders";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateProvider } from "../../../../Context/StateProvider";
import { Link } from "react-router-dom";

const Section2 = () => {
  const [isSelected, setIsSelected] = useState(0);
  const { Products } = useData();
  const { setOpenCart } = useStateProvider();
  const { setCartItems } = useData();

  const HandleOrder = (id) => {
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };
  return (
    <div className="py-10">
      <div className="w-full flex flex-col items-center">
        <div className="">
          <h3 className="font-SVNDancing text-[32px]">Sản phẩm</h3>
        </div>
        <div className="font-LexendDeca flex gap-5 mt-5">
          {SortProductItems.map((items, idx) => (
            <div
              className={`${
                isSelected === idx &&
                "bg-[url(http://thegioiphukiennails39.com/assets/images/active.png)] text-white"
              } px-5 py-2 cursor-pointer 
              hover:bg-[url(http://thegioiphukiennails39.com/assets/images/active.png)] 
              bg-no-repeat bg-cover hover:text-white text-black`}
              onClick={() => setIsSelected(idx)}
            >
              {items.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {Products.map((items, idx) => (
            <>
              <SwiperSlide>
                <Link to={`/san-pham/${items.id}`}>
                  {" "}
                  <div>
                    <div className="p-2 cursor-pointer">
                      <div className="rounded-lg w-[220px] h-[220px]  overflow-hidden ">
                        <img
                          src={items.image}
                          alt="product image"
                          className="w-full h-full hover:scale-110 duration-500 object-cover "
                        />
                      </div>
                      <div className="px-2 text-center mt-2 flex flex-col gap-2 font-LexendDeca">
                        <p className="hover:text-mainblue">{items.title}</p>
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
                        <div
                          className="flex items-center gap-2 w-full justify-center border py-2 hover:bg-mainpink hover:text-white"
                          onClick={() => HandleOrder(items.id)}
                        >
                          <AiOutlineShoppingCart />
                          <p>Mua ngay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <div className="bg-[url(http://thegioiphukiennails39.com/upload/photo/1366x252x1/phukiennails39_17453004062022.png)] h-[250px]"></div>
    </div>
  );
};

export default Section2;
