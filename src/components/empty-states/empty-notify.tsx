import { FC } from "react";

interface Props {
  text: string;
}
const EmptyNotify: FC<Props> = ({ text }) => {
  return (
    <div>
      <div className="flex justify-center">
        <img
          src={
            "https://res.cloudinary.com/greenmouse-tech/image/upload/v1727359108/fantrip/no-message-removebg-preview_dewo4b.png"
          }
          alt="empty-notify"
          className="w-[200px] lg:w-[300px]"
        />
      </div>
      <div className="flex text-center justify-center">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default EmptyNotify;
