import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  item: any;
  i: number;
}
const MeetComponent: FC<Props> = ({ item, i }) => {
  const navigate = useNavigate()
  return (
    <div
      className="border-with-gradient rounded-[13px] p-5 bg-black grid grid-cols-2 gap-5"
      key={i}
    >
      <div>
        <img src={item.img} alt="fan_image" className="h-full object-cover" />
      </div>
      <div className="row-span-2 h-full grid content-between gap-3 bg-white rounded-[13px] px-3 py-4">
        <div className="">
          <div>
            <p className="text-xl fw-600 syne">Meet</p>
            <p className="h-[2px] bg-gradient w-full mt-2"></p>
          </div>
          <div className="mt-2">
            <p className="fs-500">
              {item.intro}{" "}
              <Link to={`/find-stay/${i}`} className="fw-500 fs-500 text-[#9847FE]">
                Read More
              </Link>
            </p>
            <p className="h-[2px] bg-gradient w-full mt-2"></p>
          </div>
          <div className="grid gap-1 mt-2">
            {item.perks.map((item: string, i: number) => (
              <div className="flex gap-x-2" key={i}>
                <p className="w-[5px] h-[5px] relative top-[10px] circle bg-black"></p>
                <p className="fs-400">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white bg-gradient cursor-pointer text-center rounded-[13px] w-full py-3" onClick={() => navigate(`/find-stay/67`)}>
            <p className="fs-500 fw-500">Liverpool</p>
            <p className="fw-500">€ 25/ night</p>
          </div>
        </div>
      </div>
      <div>
        <img
          src={item.room_img}
          alt="room_img"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MeetComponent;
