import React from "react";

import { useData } from "../../Context/DataProviders";
import { Helmet } from "react-helmet";
import Loading from "../../components/Item/Loading";
import Header from "./Section/Header";
import Hotline from "./Section/Hotline";
import OnTop from "./Section/OnTop";
import Copyright from "./Section/Copyright";
import Footer from "./Section/Footer";

const ClientLayout = ({ children }) => {
  const { TradeMarkData } = useData();

  return (
    <>
      <Helmet>
        <title>Thảo Ngô - Chuyên Sỉ & Lẻ Sơn Móng Tay Toàn Quốc</title>
        <link rel="icon" href={TradeMarkData.websiteIco} />
        <meta
          name="description"
          content="Thảo Ngô - Chuyên sỉ lẻ Sơn móng tay số lượng lớn - phụ kiện nail mi Toàn Quốc"
        />
        {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
      </Helmet>
      <Loading />

      <div>
        <Header />
        <div className=" ">{children}</div>
        <Footer />
      </div>
      <div>
        <OnTop />
        <Hotline />
      </div>
      <Copyright />
    </>
  );
};

export default ClientLayout;
