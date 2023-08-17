import React, { useState } from "react";
import { useData } from "../../../Context/DataProviders";

const Video = () => {
  const { Videos } = useData();
  const [isVideo, setVideo] = useState();
  const [isOpen, setOpen] = useState(false);

  const HandleSelectVideo = (id) => {
    const sort = Videos.filter((item) => item.id === id);
    if (sort) {
      setVideo(sort[0]);
    }
  };

  return (
    <div className="relative">
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] ">
        Video
      </h3>
      <div className="flex justify-between mt-5 d:gap-0 p:gap-5 d:flex-row p:flex-col items-center">
        {Videos.map((items) => (
          <div className=" w-60 h-60 relative">
            <iframe
              src={items.embedurl}
              className="w-full h-full"
              title="YouTube Video"
              allowFullScreen
            ></iframe>
            <div
              className="bg-none w-full h-full absolute top-0 cursor-pointer"
              onClick={() => HandleSelectVideo(items.id)}
            ></div>
          </div>
        ))}
      </div>
      <div className="w-full h-full absolute">
        {isVideo && (
          <>
            <div className="w-[50vw] h-[50vh]">
              <iframe
                src={isVideo.embedurl}
                className="w-full h-full"
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Video;
