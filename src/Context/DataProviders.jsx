import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext();

export const DataProviders = ({ children }) => {
  //Website
  const [ContactData, setContactData] = useState("");

  const [TradeMarkData, setTradeMarkData] = useState("");

  const [Slides, setSlides] = useState([]);

  const [SocialMedia, setSocialMedia] = useState("");

  const [PostOther, setPostOther] = useState([]);
  const [PostCompany, setPostCompany] = useState([]);

  const [HeaderAdmin, setHeaderAdmin] = useState();

  const [accounts, setAccounts] = useState("");

  //Services
  const [Products, setProducts] = useState([]);
  const [productTypes, setProductType] = useState([]);
  const [orders, setOrders] = useState([]);
  const [detailOrders, setDetailOrders] = useState([]);

  return (
    <DataContext.Provider
      value={{
        detailOrders,
        orders,
        setDetailOrders,
        setOrders,
        PostOther,
        setPostOther,
        PostCompany,
        setPostCompany,
        accounts,
        setAccounts,
        setHeaderAdmin,

        HeaderAdmin,
        TradeMarkData,
        setTradeMarkData,
        ContactData,
        setContactData,

        productTypes,
        setProductType,

        Slides,
        setSlides,

        Products,
        setProducts,

        SocialMedia,
        setSocialMedia,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
