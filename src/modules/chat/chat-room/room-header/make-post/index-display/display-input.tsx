import Button from "@/components/Button";
import React, { FC, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  handlePost: () => void;
  isBusy: boolean;
  photos: File[];
}
const DisplayInput: FC<Props> = ({
  setText,
  text,
  setImage,
  handlePost,
  isBusy,
  photos,
}) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  return (
    <div>
      <div>
        <textarea
          placeholder="write here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 h-24 shadow-sm border-none outline-none"
        />
      </div>
      {!!photos.length && (
        <div className="flex py-2 gap-x-2">
          {photos?.map((item, i) => (
            <div className="relative" key={i}>
              <FcCancel
                className="absolute -top-3 -right-3 cursor-pointer "
                // onClick={() => handleRemove(item)}
              />
              <img
                src={URL.createObjectURL(item)}
                alt="room"
                className="lg:w-16 lg:h-12 object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-x-3">
            <div className="relative">
              <BsEmojiSmile
                onClick={() => setOpenEmoji(!openEmoji)}
                className="text-[#8C8C8C] cursor-pointer text-[22px] relative top-[1px]"
              />
            </div>
            <div className="relative overflow-hidden">
              <IoImageOutline className="text-[#8C8C8C] cursor-pointer text-2xl" />
              <input
                type="file"
                accept="image/*, .heic"
                className="absolute top-0 left-0 opacity-0"
                onChange={(e: any) => {
                  if (e.target.files) {
                    setImage([...photos, ...e.target.files]);
                  }
                }}
              />
            </div>
            <IoVideocamOutline className="text-[#8C8C8C] cursor-pointer text-2xl" />
          </div>
        </div>
        <div>
          <Button
            title={isBusy ? <BeatLoader color="white" /> : "Add Post"}
            onClick={handlePost}
            altClassName="btn-int px-4 py-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayInput;
