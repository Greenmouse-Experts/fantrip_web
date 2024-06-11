import ReactPlayer from "react-player";

const EmptyStay = () => {
  return (
    <div className="flex justify-center">
      <div className="w-11/12 lg:w-[300px] mx-auto border-2 border-gray-600">
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url="https://res.cloudinary.com/greenmouse-tech/video/upload/v1718117435/fantrip/WhatsApp_Video_2024-06-11_at_14.55.10_nzchab.mp4"
          controls
        />
      </div>
    </div>
  );
};

export default EmptyStay;
