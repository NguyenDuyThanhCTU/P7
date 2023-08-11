import React, { useEffect, useState } from "react";
import { HeaderItems } from "../../../Utils/item";
import { Link } from "react-router-dom";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useData } from "../../../Context/DataProviders";
import DropDown from "../Item/DropDown";

const Header = () => {
  const [isSelected, setIsSelected] = useState(0);
  const [Hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementTop, setElementTop] = useState(95);
  const [IsTranslate, setTranslate] = useState(false);
  const targetPosition = 1;
  const { TradeMarkData, ContactData } = useData();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > targetPosition) {
      setElementTop(0);
      setTranslate(true);
    } else {
      setElementTop(95);
      setTranslate(false);
    }
  }, [scrollPosition]);

  return (
    <div className="d:h-[126px] font-LexendDeca  p:h-auto">
      <div className="bg-white ">
        <div className=" bg-none h-full relative  bg-white ">
          <div className=" w-full    text-[#1b365d] h-[92px] z-50 p:hidden d:flex justify-center">
            <div className="flex justify-be  items-center w-[1100px] gap-10">
              <div className="flex items-center gap-2">
                <Link to="/">
                  <img
                    src={TradeMarkData.websiteLogo}
                    alt="img"
                    className="w-[110px]"
                  />
                </Link>
              </div>
              <div className="flex gap-36 text-[#2d94c4]">
                <div className="flex items-center flex-col">
                  <h3 className="uppercase text-[24px] font-bold">
                    CƠ KHÍ TRUNG HIẾU
                  </h3>
                  <span className="text-redPrimmary">
                    Uy tín - Chất lượng - Giá rẻ
                  </span>
                </div>
                <div>
                  <p className="text-[#1d5f7e]"> Điện thoại</p>
                  <span className="text-redPrimmary">{ContactData.phone}</span>
                </div>
                <div>
                  <p className="text-[#1d5f7e]"> Email</p>
                  <span className="text-redPrimmary">{ContactData.gmail}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p:block d:hidden w-full  ">
            <div className="flex justify-between  items-center ">
              <img
                src={TradeMarkData.websiteLogo}
                alt="logo"
                className="h-[50px] m-5 "
              />
              <div className="flex items-center text-[60px]">
                {Hidden ? (
                  <RxCross1
                    className="bg-redPrimmary text-white p-2 "
                    onClick={() => setHidden(!Hidden)}
                  />
                ) : (
                  <MdOutlineFormatListBulleted
                    className="bg-redPrimmary text-white p-2 "
                    onClick={() => setHidden(!Hidden)}
                  />
                )}
              </div>
            </div>
            <div
              className={`${
                Hidden ? "h-screen" : "h-0 "
              } w-full duration-700 bg-[rgba(253,253,253,0.9)] overflow-hidden`}
            >
              {HeaderItems.map((items, idx) => (
                <DropDown
                  key={idx}
                  content={items.name}
                  link={items.link}
                  setHidden={setHidden}
                  idx={idx}
                />
              ))}
              {/* <div className="mt-10">
                <div className="border-2 rounded-md flex gap-1 items-center justify-center py-3 mx-5 text-[18px] italic text-[#1b365d] font-semibold">
                  <BiUserCircle className="text-[25px]" />
                  <p>Đăng nhập</p>
                </div>
              </div> */}
            </div>
          </div>

          <div className="d:flex flex-col p:hidden w-full  items-center">
            <div
              className={`fixed z-50 ${
                IsTranslate
                  ? `w-full bg-white text-black `
                  : " w-[1600px] bg-mainblue text-white  "
              }   duration-300 h-[69px] rounded-lg flex justify-center px-5  items-center text-normal font-semibold gap-16`}
              style={{ top: `${elementTop}px` }}
            >
              {/* <div
            className="scrollable-element h-[200px] w-[200px] bg-red-500 absolute top-[0] left-[0] transform transition-transform duration-300"
            style={{ top: `${elementTop}px` }}
          > */}
              {HeaderItems.map((items, idx) => (
                <div className="relative" key={idx}>
                  <Link to={items.link}>
                    <button
                      className={`uppercase text-[18px] ${
                        IsTranslate
                          ? ` ${
                              isSelected === idx
                                ? "text-mainpink"
                                : "text-black"
                            }`
                          : `text-white`
                      }

                       `}
                      onClick={() => {
                        setIsSelected(idx);
                      }}
                    >
                      {items.name}
                    </button>
                  </Link>
                  <div
                    className={` ${
                      isSelected === idx
                        ? IsTranslate
                          ? "w-full bg-mainpink"
                          : "w-full bg-white"
                        : "w-0"
                    }  duration-500 h-2 rounded-3xl absolute -bottom-[23px]`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
