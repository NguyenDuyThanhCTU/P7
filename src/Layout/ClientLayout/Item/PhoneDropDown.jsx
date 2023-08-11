import React from "react";
import { Link } from "react-router-dom";
const PhoneDropDown = ({ name, link, Icon }) => {
  console.log(name);
  return (
    // <Link to={link}>
    <div className="flex items-center text-black text-[15px] gap-2">
      {/* <Icon className="text-colortopdownBlue" /> */}
      <p>{name}</p>
    </div>
    // </Link>
  );
};

export default PhoneDropDown;
