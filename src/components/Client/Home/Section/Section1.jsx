import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper";
import { useData } from "../../../../Context/DataProviders";
import { suggestItems } from "../../../../Utils/temp";

const Section1 = () => {
  const { Slides } = useData();
  return (
    <div className="flex flex-col">
      <div className="relative w-full   ">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper -z-10"
        >
          {Slides.map((items) => (
            <>
              <SwiperSlide>
                <img
                  src={items.image}
                  alt="banner"
                  className="object-cover  w-full z-0 cursor-pointer max-h-[655px]"
                  onClick={() => {
                    window.open("http://thaongonail.com/", "_self");
                  }}
                />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <div className="bg-[url(http://thegioiphukiennails39.com/assets/images/glist.png)] w-full justify-center flex py-10">
        {suggestItems.map((items, idx) => (
          <>
            <div className="p-4 group cursor-pointer">
              <div className="w-[273px] h-[268px] overflow-hidden relative flex flex-col items-center">
                <img
                  src={items.image}
                  alt="suggest Item"
                  className="h-full w-full object-cover group-hover:scale-110 duration-500 "
                />
                <div className="absolute -bottom-3 bg-white text-black  w-[247px] h-[60px] text-center font-SVNDancing text-[24px]  group-hover:text-mainpink ">
                  {items.name}
                </div>
              </div>
              <div className="text-center bg-gray-600 py-3 text-white text-[18px] mt-5 cursor-pointer  group-hover:bg-mainblue duration-500">
                Chi tiết
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Section1;
