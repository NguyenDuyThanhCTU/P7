import React, { useEffect, useState } from "react";

import { useData } from "../../../Context/DataProviders";
import { IconMapping, SocialMediaCustom } from "../../../Utils/item";
import Input from "../../Admin/Item/Input";
import { notification } from "antd";
import { useStateProvider } from "../../../Context/StateProvider";
import { addDocument } from "../../../Config/Services/Firebase/FireStoreDB";

const Contact = () => {
  const { ContactData, SocialMedia } = useData();
  const { setIsRefetch } = useStateProvider();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const HandleDiscard = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setTitle("");
    setDescription("");
  };
  const HandleUpload = () => {
    if (!name || !phone || !address || !description) {
      notification["warning"]({
        message: "Thao tác không thành công !",
        description: `
            Vui lòng nhập đầy đủ thông tin!`,
      });
    } else {
      const data = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        title: title,
        description: description,
      };
      addDocument("orders", data).then(() => {
        notification["success"]({
          message: "Thành công!",
          description: `
        Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất !`,
        });
        setIsRefetch("add order");
        HandleDiscard();
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <div>
        {ContactData.location ? (
          <>
            {" "}
            <iframe
              src={ContactData.location}
              className="w-screen h-[50vh]"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </>
        ) : (
          <>
            <img
              src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/312755810_503545928456727_6996694448340822390_n.jpg?_nc_cat=109&cb=99be929b-3346023f&ccb=1-7&_nc_sid=300f58&_nc_ohc=02zKygIhm28AX-j48zj&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDz-7LBZKK22TB_Hlobkn42QOpSdainTkM6HcElMfLw-Q&oe=64DDE07F"
              alt="banner"
              className="w-screen h-[50vh] object-cover"
            />
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-5 py-5 mx-2 ">
        <h3 className="uppercase text-maincontent text-[40px] font-semibold text-center">
          Liên hệ để được tư vấn
        </h3>
        <div className="flex justify-center d:gap-32 d:flex-row p:flex-col p:gap-2">
          <div className="flex flex-col items-center">
            <p className="text-center text-[20px] font-normal text-maincontent">
              Hotline
            </p>
            <p> {ContactData.phone}</p>
          </div>
          <div>
            <p className="text-center text-[20px] font-normal text-maincontent">
              Email
            </p>
            <p className=" text-center">{ContactData.gmail} </p>
          </div>

          <div className="flex flex-col items-center">
            <h3>Kết nối với chúng tôi</h3>
            <div className="flex mt-2 gap-2">
              {SocialMediaCustom.map((items, idx) => {
                let Icon = IconMapping[items.icon];
                let Point = SocialMedia[items.id];

                return (
                  <div
                    key={idx}
                    className={`${items.style} p-2 border rounded-full hover:scale-110 duration-300 border-black hover:border-white`}
                  >
                    {Icon && (
                      <a href={`https://${Point}`} target="_blank">
                        <Icon />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f5f5f5] w-full">
        <div className=" py-10 ">
          <h3 className="uppercase text-maincontent text-[40px] font-semibold text-center py-3 font-SVNDancing">
            Liên hệ nhanh
          </h3>
          <div className="p-2 flex  justify-center gap-5 p:flex-col d:flex-row">
            <div>
              <div className="flex flex-col gap-3 my-3">
                <p>
                  <strong>Văn phòng:</strong> {""}
                  {ContactData.address}
                </p>

                <p>
                  <strong>Hotline:</strong> {ContactData.phone}
                </p>

                <p>Để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất !</p>
              </div>
              <img
                src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/312755810_503545928456727_6996694448340822390_n.jpg?_nc_cat=109&cb=99be929b-3346023f&ccb=1-7&_nc_sid=300f58&_nc_ohc=02zKygIhm28AX-j48zj&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDz-7LBZKK22TB_Hlobkn42QOpSdainTkM6HcElMfLw-Q&oe=64DDE07F"
                alt="img"
                className="w-[600px]"
              />
            </div>
            <div className="border w-[400px]  ">
              <div className="flex flex-col gap-3 mb-5 p-3 w-full bg-white h-full shadow-xl">
                <Input
                  text="Họ Tên(*)"
                  Value={name}
                  setValue={setName}
                  Input={true}
                />
                <Input
                  text="Email"
                  Value={email}
                  setValue={setEmail}
                  Input={true}
                />
                <Input
                  text="Điện thoại(*)"
                  Value={phone}
                  setValue={setPhone}
                  Input={true}
                />
                <Input
                  text="Địa chỉ(*)"
                  Value={address}
                  setValue={setAddress}
                  Input={true}
                />
                <Input
                  text="Chủ đề"
                  Value={title}
                  setValue={setTitle}
                  Input={true}
                />
                <Input
                  text="Nội dung(*)"
                  Value={description}
                  setValue={setDescription}
                  Input={false}
                />
                <div
                  onClick={() => {
                    HandleUpload();
                  }}
                  className=" "
                >
                  <span className="uppercase py-2 px-6 bg-maincontent text-white cursor-pointer hover:bg-main bg-green-500 hover:bg-green-600">
                    gửi đi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
