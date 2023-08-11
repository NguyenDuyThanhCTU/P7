import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { useData } from "../../../Context/DataProviders";

function Hotline() {
  const { ContactData } = useData();
  return (
    <div className="fixed bottom-7 right-10  box-border cursor-pointer">
      <div
        className="flex items-center"
        onClick={() => {
          window.open(`tel:${ContactData.phone}`, "_blank");
        }}
      >
        <div className="text-black font-semibold d:flex p:hidden justify-start items-center rounded-full w-[250px]  h-[60px] bg-white shadow-2xl absolute right-5">
          <span className="ml-5">Liên hệ với chúng tôi</span>
        </div>
        <div className="h-16 w-16   call-animation">
          <BiPhoneCall className="text-white text-[40px]" />
        </div>
      </div>
    </div>
  );
}

export default Hotline;
