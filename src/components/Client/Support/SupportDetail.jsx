import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SupportItems } from "../../../Utils/item";

const SupportDetail = () => {
  const [title, setTitle] = useState();
  const { id } = useParams();
  useEffect(() => {
    const sort = SupportItems.filter((item) => item.params === id);
    if (sort) {
      setTitle(sort[0]);
    }
  }, [id, SupportItems]);
  return (
    <div>
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[40px] ">
        {title?.name}
      </h3>
      <div className="bg-gray-200 rounded-lg mt-5">
        <div className="p-3">
          <h3 className="text-[24px] font-bold">Bài viết khác :</h3>
          <div className="ml-5">
            {SupportItems.map((items, idx) => (
              <Link to={`/dich-vu/${items.params}`}>
                <div className="font-LexendDeca">
                  <li className="hover:underline">{items.name}</li>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDetail;
