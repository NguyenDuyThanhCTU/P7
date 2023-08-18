import React, { useState } from "react";
import { useData } from "../../../Context/DataProviders";
import { RxCross2 } from "react-icons/rx";

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
    <div className="relative d:mt-10 p:mt-0 ">
      <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] d:py-5 p:py-2 ">
        Video
      </h3>
      <div className="grid d:grid-cols-4 p:grid-cols-1 grid-rows-4 gap-5 w-[1250px] mx-auto">
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
      {isVideo && (
        <div className="w-full h-screen absolute -top-[126px] bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-[9999]">
          <>
            <div className="w-[50vw] h-[50vh] relative">
              <iframe
                src={isVideo.embedurl}
                className="w-full h-full"
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
          </>

          <div
            className="absolute top-2 right-2 rounded-full border text-[30px] text-black border-white bg-white hover:scale-110 duration-300 cursor-pointer"
            onClick={() => setVideo()}
          >
            <RxCross2 className=" p-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
