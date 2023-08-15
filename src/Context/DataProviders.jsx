import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext();

export const DataProviders = ({ children }) => {
  //Website
  const [ContactData, setContactData] = useState("");

  const [TradeMarkData, setTradeMarkData] = useState("");

  const [Slides, setSlides] = useState([]);

  const [SocialMedia, setSocialMedia] = useState("");
  const [Videos, setVideos] = useState([]);
  const [Posts, setPosts] = useState([]);

  const [HeaderAdmin, setHeaderAdmin] = useState();

  const [accounts, setAccounts] = useState("");
  const [updateId, setUpdateId] = useState("");

  //Services
  const [Products, setProducts] = useState([]);
  const [productTypes, setProductType] = useState([]);
  const [branches, setBranches] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <DataContext.Provider
      value={{
        updateId,
        setUpdateId,
        setVideos,
        Videos,
        branches,
        setBranches,

        orders,

        setOrders,
        Posts,
        setPosts,
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
