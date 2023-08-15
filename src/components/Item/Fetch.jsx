import React, { useEffect } from "react";

import { useStateProvider } from "../../Context/StateProvider";
import { useData } from "../../Context/DataProviders";
import {
  getDocuments,
  getProducts,
} from "../../Config/Services/Firebase/FireStoreDB";

const Fetch = () => {
  const {
    //Website
    setSocialMedia,
    setSlides,
    setContactData,
    setTradeMarkData,
    setAccounts,

    //Service
    setProductType,
    setProducts,
    setOrders,
    setBranches,
    setVideos,
    setPosts,
  } = useData();

  const { isRefetch, setIsRefetch } = useStateProvider();
  useEffect(() => {
    setIsRefetch(1);
  }, []);
  useEffect(() => {
    if (isRefetch != "") {
      setIsRefetch("");
    }
    getDocuments("website").then((data) => {
      data.forEach((items) => {
        if (items.id === "Contact") {
          setContactData(items);
        } else if (items.id === "Trademark") {
          setTradeMarkData(items);
        } else if (items.id === "SocialMedia") {
          setSocialMedia(items.Data);
        }
      });
    });

    getDocuments("accounts").then((data) => {
      setAccounts(data[0]);
    });

    getDocuments("slide").then((data) => {
      setSlides(data.reverse());
    });

    getProducts("posts").then((data) => {
      setPosts(data.reverse());
    });

    getProducts("productTypes").then((data) => {
      setProductType(data.reverse());
    });

    getProducts("products").then((data) => {
      setProducts(data.reverse());
    });
    getProducts("orders").then((data) => {
      setOrders(data.reverse());
    });
    getProducts("branches").then((data) => {
      setBranches(data.reverse());
    });
    getProducts("videos").then((data) => {
      setVideos(data.reverse());
    });
  }, [isRefetch]);
  return <></>;
};

export default Fetch;
