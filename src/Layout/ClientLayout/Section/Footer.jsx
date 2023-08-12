import React from "react";
import { BranchItems } from "../../../Utils/temp";
import { useData } from "../../../Context/DataProviders";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  const { TradeMarkData } = useData();
  return (
    <>
      <div className="bg-[url(http://thegioiphukiennails39.com/assets/images/bgf.png)] w-full h-[450px] ">
        <div className="w-[1200px] mx-auto py-4 flex flex-col items-center">
          <div>
            <img
              src={TradeMarkData.websiteLogo}
              alt="logo"
              className="w-20 h-20"
            />
          </div>
          <div className="flex">
            <div>
              <CiLocationOn className="text-[50px]" />
              <h3 className="text-[40px]">Địa chỉ</h3>
              <p>19/1 Tổ 4, ấp 4, Xã Phú Xuân, Huyện Nhà Bè, TpHCM</p>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-5">
        <div className="w-[600px] h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1561609710657!2d106.61713817580768!3d10.799349158768923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bfa28d721d7%3A0x260e06eb16ceccec!2zVMOibiBRdcO9LCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1691813259669!5m2!1svi!2s"
            className="w-full h-full"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="w-[951px] h-full px-5 flex flex-col gap-5 font-NunitoSans justify-between">
          <div className="grid grid-cols-2">
            <div className="bg-mainblue text-white py-3 px-6 uppercase text-center font-bold text-[26px]">
              Phụ kiện ngành nail
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-7 py-3">
            {BranchItems.map((items, idx) => (
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
                      <span className="underline text-blue-500">
                        {" "}
                        {items.website}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="bg-mainblue text-white py-3 px-6 uppercase text-center font-bold text-[26px] hover:text-red-500 hover:bg-white hover:border-red-500 border cursor-pointer">
            Liên hệ ngay
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
