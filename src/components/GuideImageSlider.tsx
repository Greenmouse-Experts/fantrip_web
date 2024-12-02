import { FC } from "react";
import ImageSlider from "./ImageSlider";

interface Props {
  images: string;
}
const GuideImageSlider: FC<Props> = ({ images }) => {
  const photos = JSON.parse(images);

  return (
    <div className="w-full h-full overflow-hidden">
      <ImageSlider images={photos} interval={4000} />{" "}
    </div>
  );
};

export default GuideImageSlider;
