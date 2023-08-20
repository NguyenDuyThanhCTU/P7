import React, { useEffect, useState } from "react";
import { SortProductItems } from "../../../../Utils/item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { useData } from "../../../../Context/DataProviders";
import { useStateProvider } from "../../../../Context/StateProvider";
import ProductCard from "../../Item/ProductCard";

const Section2 = () => {
  const { Products, setCartItems } = useData();
  const { setOpenCart } = useStateProvider();
  const [isSelected, setIsSelected] = useState(0);

  const [sortProduct, setSortProduct] = useState([]);

  const HandleOrder = (id) => {
    setCartItems((prevItems) => [...prevItems, id]);
    setOpenCart(true);
  };

  useEffect(() => {
    const HandleChange = (idx) => {
      if (idx === 0) {
        const sort = Products;
        if (sort) {
          setSortProduct(Products);
        }
      } else if (idx === 1) {
        const sort = Products.reverse();
        if (sort) {
          setSortProduct(sort);
        }
      } else if (idx === 2) {
        const sort = Products.filter((item) => item?.sale?.discount !== 0);
        if (sort) {
          setSortProduct(sort);
        }
      } else if (idx === 3) {
        const sort = Products.sort((a, b) => b.access - a.access);
        if (sort) {
          setSortProduct(sort);
        }
      }
    };
    HandleChange(isSelected);
  }, [isSelected, Products, sortProduct]);

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
      <div className="mt-10 d:hidden p:flex items-center justify-center">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {sortProduct?.map((items, idx) => (
            <>
              <SwiperSlide>
                <div className="px-2">
                  <ProductCard
                    image={items.image[0]}
                    price={items.price}
                    title={items.title}
                    id={items.id}
                    newPrice={items.sale.newPrice}
                    discount={items.sale.discount}
                  />
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <div className="mt-10 d:block p:hidden">
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
          {sortProduct?.map((items, idx) => (
            <>
              <SwiperSlide>
                <div className="pb-5">
                  <ProductCard
                    image={items.image[0]}
                    price={items.price}
                    title={items.title}
                    id={items.id}
                    newPrice={items.sale.newPrice}
                    discount={items.sale.discount}
                  />
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
      <div className="bg-[url(http://thegioiphukiennails39.com/upload/photo/1366x252x1/phukiennails39_17453004062022.png)] h-[250px] d:w-auto p:w-screen bg-contain bg-no-repeat"></div>
    </div>
  );
};

export default Section2;
