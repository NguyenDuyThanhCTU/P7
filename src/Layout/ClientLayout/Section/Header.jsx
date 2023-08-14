import React, { useEffect, useState } from "react";
import { HeaderItems } from "../../../Utils/item";
import { Link } from "react-router-dom";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useData } from "../../../Context/DataProviders";
import DropDown from "../Item/DropDown";
import { AiFillCaretRight, AiOutlineSearch } from "react-icons/ai";

import { BsCart3 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [isSelected, setIsSelected] = useState(0);
  const [Hidden, setHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementTop, setElementTop] = useState(95);
  const [IsTranslate, setTranslate] = useState(false);
  const [Search, setSearch] = useState("");
  const targetPosition = 1;
  const { TradeMarkData, ContactData, productTypes } = useData();

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
            <div className="flex justify-between first-letter: items-center w-[1100px] ">
              <div className="flex items-center gap-10">
                <Link to="/">
                  <img
                    src={TradeMarkData.websiteLogo}
                    alt="img"
                    className="w-[110px]"
                  />
                </Link>
                <div className=" text-[#2d94c4]">
                  <div className="flex items-center flex-col">
                    <h3 className="uppercase text-[24px] font-bold">
                      THẢO NGÔ NAIL
                    </h3>
                    <span className="text-redPrimmary">
                      Uy tín - Chất lượng - Giá rẻ
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-14 items-center">
                <div className="relative text-black group  cursor-pointer">
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 px-4 outline-none rounded-full bg-white border-mainpink border w-[300px]"
                  />
                  <Link to={`/loai-san-pham/${Search}`}>
                    <FiSearch className="inline-block bg-white w-[36px] h-[36px] p-2 font-bold rounded-full text-[#F67D08] absolute right-[4px] bottom-[3px] group-hover:-right-10 duration-300" />
                  </Link>
                  <div className="bg-white absolute top-2 left-4 group-hover:-top-3 group-hover:left-5 px-2 duration-300">
                    Tìm kiếm
                  </div>
                </div>
                <BsCart3 className="text-[22px] " />
              </div>
            </div>
          </div>

          <div className="p:block d:hidden w-full  ">
            <div className="flex justify-between  items-center ">
              <Link to="/">
                <img
                  src={TradeMarkData.websiteLogo}
                  alt="logo"
                  className="h-[50px] m-5 "
                />
              </Link>
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
              {HeaderItems.map((items, idx) => {
                const sort = productTypes.filter(
                  (item) => item.parent === items.link
                );
                return (
                  <DropDown
                    idx={idx}
                    dropdown={sort}
                    content={items.name}
                    link={items.link}
                    setHidden={setHidden}
                  />
                );
              })}
            </div>
          </div>

          <div className="d:flex flex-col p:hidden w-full  items-center">
            <div
              className={`fixed z-10 ${
                IsTranslate
                  ? `w-full bg-white text-black `
                  : " w-[1600px] bg-mainblue text-white  "
              }   duration-300 h-[69px] rounded-lg flex justify-center px-5  items-center text-normal font-semibold gap-16`}
              style={{ top: `${elementTop}px` }}
            >
              {HeaderItems.map((items, idx) => {
                const sort = productTypes.filter(
                  (item) => item.parent === items.link
                );

                return (
                  <div className="relative" key={idx}>
                    <Link
                      to={`${
                        items.params ? `/${items.params}` : `/${items.link}`
                      }`}
                    >
                      <div className="group">
                        <div
                          className={`uppercase text-[18px] flex items-center justify-between  gap-2  hover:text-mainpink duration-500  ${
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
                          <p> {items.name}</p>
                          {sort.length > 0 && (
                            <AiFillCaretRight className="group-hover:rotate-90 duration-500" />
                          )}
                        </div>
                        {sort.length > 0 && (
                          <div className="group-hover:block hidden relative z-20">
                            <div className="absolute h-10 w-full bg-none"></div>
                            <div className="absolute  mt-5 w-max max-h-[300px]  shadow-xl rounded-b-lg bg-white  overflow-y-auto">
                              {sort.map((items, idx) => (
                                <div>
                                  <Link
                                    to={`${
                                      items.parent === "album-anh"
                                        ? `/album-anh/${items.params}`
                                        : `/loai-san-pham/${items.params}`
                                    }`}
                                  >
                                    <div className="py-4 px-8 font-light text-black hover:text-white hover:bg-mainpink">
                                      {items.name}
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
