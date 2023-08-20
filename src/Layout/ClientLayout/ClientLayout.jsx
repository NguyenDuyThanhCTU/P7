import React, { useEffect } from "react";

import { useData } from "../../Context/DataProviders";
import { Helmet } from "react-helmet";
import Loading from "../../components/Item/Loading";
import Header from "./Section/Header";
import Hotline from "./Section/Hotline";
import OnTop from "./Section/OnTop";
import Copyright from "./Section/Copyright";
import Footer from "./Section/Footer";
import ShopCart from "./Section/ShopCart";
import { useLocation } from "react-router-dom";

const ClientLayout = ({ children }) => {
  const { TradeMarkData } = useData();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <Helmet>
        <title>{TradeMarkData.websiteName}</title>
        <link rel="icon" href={TradeMarkData.websiteIco} />
        <meta
          name="description"
          content="Thảo Ngô nail - Chuyên sỉ lẻ Sơn móng tay số lượng lớn - phụ kiện nail mi Toàn Quốc"
        />
        {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
      </Helmet>
      <Loading />
      <Header />
      {location.pathname === "/" ||
      location.pathname === "/lien-he" ||
      location.pathname === "/video" ? (
        <>
          {" "}
          <div className=" ">{children}</div>
        </>
      ) : (
        <>
          <div className="d:w-[1250px] p:w-auto p:mx-2 d:mx-auto my-16 ">
            {children}
          </div>
        </>
      )}

      <Footer />
      <div className="relative z-50">
        <OnTop />
        <Hotline />
      </div>
      <Copyright />
    </>
  );
};

export default ClientLayout;
