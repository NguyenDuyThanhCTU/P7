import React, { useEffect, useState } from "react";
import { useData } from "../../../Context/DataProviders";
import { useParams } from "react-router-dom";

const Album = () => {
  const [Sort, setSort] = useState([]);
  const { Products } = useData();
  const { id } = useParams();

  useEffect(() => {
    let sort = [];
    if (id === "tat-ca") {
      sort = Products.filter((item) => item.parentParams === "album-anh");
    } else {
      sort = Products.filter((item) => item.params === id);
    }
    if (sort) {
      setSort(sort);
    }
  }, [Products]);

  return (
    <div>
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
        {id === "tat-ca" ? "Album Ảnh" : <> {Sort[0]?.type}</>}
      </h3>
      <div className="grid grid-cols-5 justify-between mt-5 gap-5 d:flex-row p:flex-col items-center">
        {Sort?.map((items) => (
          <div className="w-60 h-60 overflow-hidden shadow-xl">
            <img
              src={items.image}
              className="w-full h-full hover:scale-110 duration-500 "
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
