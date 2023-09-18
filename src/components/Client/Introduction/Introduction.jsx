// import React from "react";
// import { useData } from "../../../Context/DataProviders";

// export default Introduction;

import React from "react";
import { useData } from "../../../Context/DataProviders";

const Introduction = () => {
  const { TradeMarkData, ContactData, Slides } = useData();
  return (
    <div>
      <div>
        <h3 className="w-full flex justify-center items-center font-SVNDancing text-[50px] text-center">
          {TradeMarkData.websiteName}
        </h3>
        <div className="mt-5 font-LexendDeca font-light text-[18px] gap-5 flex flex-col">
          <div className="flex flex-col gap-2 indent-5">
            <p className="">
              Nghề nails không còn xa lạ gì với Việt Nam và ngày càng có những
              bước tiến hiện đại và chuyên nghiệp hơn. Đầu tư ít, sinh lợi nhiều
              khiến nghề nails đang dần trở thành nghề “hot” trong giới trẻ hiện
              nay. Với sự phát triển này, có thể nói nghề nails đang ngày càng
              lớn mạnh và dần khẳng định được vị trí của mình trong làng nghề.{" "}
            </p>
            <p>
              {" "}
              Để tạo được một tác phẩm nails ấn tượng, đặc sắc, làm hài lòng mọi
              khách hàng thì ngoài kỹ năng, tay nghề của người thợ, rất cần đến
              các phụ kiện nails chất lượng, bền đẹp. Điều này chưa bao giờ là
              sai, bởi thế nếu bạn đang có ý định học nails hay mở cửa hàng
              nails cho riêng mình thì việc tìm một cửa hàng bán phụ kiện nail
              uy tín và chất lượng nhất TP. HCM, chưa bao giờ là điều không cần
              thiết. Vậy đâu mới là cái tên đáng để bạn tin tưởng lựa chọn?
              Không nằm ngoài danh sách này,{" "}
              <span className="text-mainblue">
                {TradeMarkData.websiteName}
              </span>{" "}
              chính là câu trả lời mà bạn đang tìm kiếm.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fir-d82f9.appspot.com/o/Nail%2F75625260_101967804608195_9061722863836332032_n.jpg?alt=media&token=29cd616f-86b8-4bad-9ddd-e9991b12affe"
                alt="intro1"
              />
              <p className="text-center italic">
                Cửa hàng Phụ kiện <span>{TradeMarkData.websiteName}</span>{" "}
              </p>
            </div>
          </div>
          <p className="indent-5">
            {" "}
            Và để đáp ứng cho sự phát triển ấy của nails, các cửa hàng cung cấp
            dụng cụ, phụ kiện nail cũng đua nhau mọc lên tại TP. HCM, trong đó
            để tìm kiếm được một cái tên đáng tin cậy quả thật không phải là
            chuyện dễ dàng nhất là đối với những ai mới vào nghề hay đang học
            nghề, vẫn chưa có kinh nghiệm.{" "}
          </p>
          <div className="ml-5">
            <li>
              Và bạn cũng là một người yêu thích nails, yêu thích nghệ thuật vẽ
              móng?
            </li>
            <li>Bạn chọn nail là nghề sẽ nuôi sống mình?</li>
            <li>Bạn đang lên kế hoạch học nails, mở tiệm nails?</li>
            <li>
              Bạn cũng đang có chung thắc mắc nên tìm mua phụ kiện nails ở đâu
              tại TP. HCM?
            </li>
          </div>
          <div className="w-full flex justify-center">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fir-d82f9.appspot.com/o/Nail%2F312273554_502869175191069_4208497842372560474_n.jpg?alt=media&token=920cbb57-2496-4ec3-bb43-03566947c40c"
                alt="intro1"
              />
              <p className="text-center italic">
                Thông tin liên hệ - <span>{TradeMarkData.websiteName}</span>{" "}
              </p>
            </div>
          </div>
          <div className="indent-5 flex flex-col gap-4">
            <p>
              {" "}
              <span className="text-mainblue">
                {TradeMarkData.websiteName}
              </span>{" "}
              là nơi chuyên cung cấp đầy đủ đồ nghề, phụ liệu ngành Nail chuyên
              nghiệp từ A-Z. Tại đây hàng luôn có sẵn và cập nhật mẫu mới hàng
              ngày để phân phối sỉ lẻ trên khắp cả nước.
            </p>
            <p>
              Cửa hàng lớn, đầy đủ thiết bị, dụng cụ, nguyên liệu với nhiều chi
              nhánh giúp việc mua sắm của bạn dễ dàng hơn và "UY TÍN, CHẤT
              LƯỢNG, GIÁ RẺ" chính là 3 tiêu chí mà{" "}
              <span className="text-mainblue">{TradeMarkData.websiteName}</span>{" "}
              luôn đặt lên hàng đầu.
            </p>
            <p>
              {" "}
              Vì sao bạn nên chọn mua phụ kiện nails tại{" "}
              <span className="text-mainblue">{TradeMarkData.websiteName}</span>
            </p>
            <p>
              Tất cả các mẫu sơn gel, gel đắp luôn được nhập khẩu từ nhiều nước
              trên thế giới, sản phẩm không có hóa chất độc hại, đảm bảo sức
              khỏe cho cả phụ nữ mang thai và trẻ em.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fir-d82f9.appspot.com/o/Nail%2F312755810_503545928456727_6996694448340822390_n.jpg?alt=media&token=ee7f7a7f-516d-4b39-a0d4-e6d57fdd47ec"
                alt="intro1"
              />
              <p className="text-center italic">
                Sơn móng tay <span>{TradeMarkData.websiteName}</span>{" "}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="uppercase font-bold py-5">
              MỌI CHI TIẾT XIN LIÊN HỆ:
            </h3>
            <p>
              <strong className="font-bold">Địa chỉ: </strong>
              {ContactData.address}
            </p>
            <p>
              <strong className="font-bold">Điện thoại: </strong>
              {ContactData.phone}
            </p>
            <p>
              <strong className="font-bold">Web: www.ThaoNgoNail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
