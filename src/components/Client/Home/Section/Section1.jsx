import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { useData } from "../../../../Context/DataProviders";
import { Link } from "react-router-dom";

const Section1 = () => {
  const { Slides, productTypes } = useData();
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
      <div className="bg-[url(http://thegioiphukiennails39.com/assets/images/glist.png)] w-full  py-10">
        <div className="w-[1350px] mx-auto d:block p:hidden">
          <Swiper
            // spaceBetween={20}
            centeredSlides={true}
            slidesPerView={4}
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
            className="mySwiper "
          >
            {productTypes.map((items, idx) => (
              <SwiperSlide>
                <Link to={`/loai-san-pham/${items.params}`}>
                  <div className="p-4 group cursor-pointer w-[310px] mb-5 ">
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
                    <div className="text-center bg-gray-600 py-3 text-white text-[18px] mt-5 cursor-pointer  group-hover:bg-mainblue duration-500 mx-3">
                      Chi tiết
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-[310px] mx-auto  d:hidden p:block">
          <Swiper
            centeredSlides={true}
            slidesPerView={1}
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
            className="mySwiper "
          >
            {productTypes.map((items, idx) => (
              <SwiperSlide>
                <div
                  className="p-4 group cursor-pointer w-[310px] mb-5 "
                  onClick={() =>
                    window.open(`/loai-san-pham/${items.params}`, "_self")
                  }
                >
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
                  <div className="text-center bg-gray-600 py-3 text-white text-[18px] mt-5 cursor-pointer  group-hover:bg-mainblue duration-500 mx-3">
                    Chi tiết
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Section1;
