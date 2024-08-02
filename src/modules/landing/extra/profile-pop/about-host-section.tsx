import { FC } from "react";

interface Props{
  name: string;
  location: string;
  bio: string;
}
const AboutHostSection:FC<Props> = ({name, location, bio}) => {
  return (
    <div>
      <p className="monts fw-600 text-lg">About</p>
      <div className="monts grid gap-2 mt-3">
        <div className="flex gap-x-2">
          <p>Name:</p>
          <p>{name}</p>
        </div>
        <div className="flex gap-x-2">
          <p>Location:</p>
          <p>{location}</p>
        </div>
      </div>
      <div className="mt-3 monts">
        <p className="fw-500 mb-2">Bio:</p>
        <p>
         {bio}
        </p>
      </div>
    </div>
  );
};

export default AboutHostSection;
