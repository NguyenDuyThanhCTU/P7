import React from "react";
import { useData } from "../../../Context/DataProviders";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const News = () => {
  const { Posts } = useData();

  return (
    <div className="mt-5">
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
        Tin làm đẹp
      </h3>
      <div className="grid d:grid-cols-2 gap-10 font-Montserrat p:grid-cols-1">
        {Posts.map((items, idx) => {
          const formattedDate = moment
            .unix(items.createdAt.seconds)
            .format("MMMM DD, YYYY");
          return (
            <Link to={`/tin-lam-dep/${items.title}`} className="cursor-pointer">
              <div className="flex gap-5 border-b pb-4">
                <div className="w-20 h-20 overflow-hidden">
                  <img
                    src={items.image}
                    alt=""
                    className="w-full h-full hover:scale-110 duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-[18px] hover:text-mainpink">
                    {items.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-400">
                    <AiOutlineClockCircle />
                    <p className="">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default News;
