import React from "react";
import { BranchItems } from "../../../Utils/temp";
import { useData } from "../../../Context/DataProviders";
import { MdOutlineLocationOn } from "react-icons/md";
import { IconMapping, SocialMediaCustom } from "../../../Utils/item";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  const { TradeMarkData, ContactData, SocialMedia, branches } = useData();
  return (
    <>
      <div className="bg-[url(http://thegioiphukiennails39.com/assets/images/bgf.png)] w-full d:h-[450px]   p:h-auto p:bg-cover">
        <div className="d:w-[1200px] p:w-auto mx-auto py-8 flex flex-col items-center justify-between h-full d:gap-0 p:gap-10">
          <div>
            <img
              src={TradeMarkData.websiteLogo}
              alt="logo"
              className="w-20 h-20"
            />
          </div>
          <div className="flex d:flex-row p:flex-col ">
            <div className="flex flex-col items-center text-white px-[85px] max-w-[399px] gap-2">
              <MdOutlineLocationOn className="text-[50px]" />
              <h3 className="text-[30px] font-bold uppercase">Địa chỉ</h3>
              <p className="text-center">{ContactData.address}</p>
            </div>

            <div className="flex flex-col items-center text-white px-[85px] max-w-[399px] gap-2 border-l border-r">
              <BiPhoneCall className="text-[50px]" />
              <h3 className="text-[30px] font-bold uppercase">Điện thoại</h3>
              <p className="text-center">{ContactData.phone}</p>
            </div>

            <div className="flex flex-col items-center text-white px-[85px] max-w-[399px] gap-2">
              <AiOutlineMail className="text-[50px]" />
              <h3 className="text-[30px] font-bold uppercase">Email</h3>
              <p className="text-center">{ContactData.gmail}</p>
            </div>
            <div></div>
            <div></div>
          </div>

          <div>
            <div className="flex flex-col items-center">
              <h3 className="text-white font-LexendDeca text-[16px] font-semibold">
                Kết nối với chúng tôi
              </h3>
              <div className="flex mt-2 gap-2">
                {SocialMediaCustom.map((items, idx) => {
                  let Icon = IconMapping[items.icon];
                  let Point = SocialMedia[items.id];
                  return (
                    <div
                      key={idx}
                      className={`${items.style} p-2 border rounded-full hover:scale-110 duration-300 border-white text-white`}
                    >
                      {Icon && (
                        <a href={`https://${Point}`} target="_blank">
                          <Icon />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-5 d:flex-row p:flex-col p:gap-10 d:gap-0">
        <div className="d:w-[600px] h-[450px] p:mx-2 p:w-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1561609710657!2d106.61713817580768!3d10.799349158768923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bfa28d721d7%3A0x260e06eb16ceccec!2zVMOibiBRdcO9LCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1691813259669!5m2!1svi!2s"
            className="w-full h-full"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="d:w-[951px] p:w-auto h-full px-5 flex flex-col gap-5 font-NunitoSans justify-between">
          <div className="grid d:grid-cols-2 p:grid-cols-1">
            <div className="bg-mainblue text-white py-3 px-6 uppercase text-center font-bold d:text-[26px] p:text-[22px]">
              Phụ kiện ngành nail
            </div>
          </div>
          <div className="grid d:grid-cols-2 grid-rows-2 gap-7 py-3 p:grid-cols-1">
            {branches.map((items, idx) => (
              <>
                <div>
                  <h3 className="font-bold text-[18px]">
                    {idx === 0 ? "Chi nhánh chính" : `Chi nhánh ${idx}`}
                  </h3>
                  <div className="mt-2 font-thin">
                    <p>
                      <strong>Địa chỉ:</strong> <br /> {items.address}
                    </p>
                    <p>
                      <strong>Hotline:</strong> {items.hotline}
                    </p>
                    <p>
                      <strong>Email:</strong> {items.email}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href="https://thaongonail.com"
                        className="underline text-blue-500 hover:text-blue-600"
                      >
                        ThaoNgoNail.com
                      </a>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <Link to="/lien-he">
            <div className="bg-mainblue text-white py-3 px-6 uppercase text-center font-bold text-[26px] hover:text-red-500 hover:bg-white hover:border-red-500 border cursor-pointer">
              Liên hệ ngay
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
