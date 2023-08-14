import React from "react";
import { useData } from "../../../Context/DataProviders";

const Video = () => {
  const { Videos } = useData();
  return (
    <div>
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
        Video
      </h3>
      <div className="flex justify-between mt-5 d:gap-0 p:gap-5 d:flex-row p:flex-col items-center">
        {Videos.map((items) => (
          <>
            <iframe
              src={items.embedurl}
              className="w-60 h-60"
              title="YouTube Video"
              allowFullScreen
            ></iframe>
          </>
        ))}
      </div>
    </div>
  );
};

export default Video;
