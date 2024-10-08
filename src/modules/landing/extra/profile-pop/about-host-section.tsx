import { FC } from "react";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  location: string;
  bio: string;
  id: string;
}
const AboutHostSection: FC<Props> = ({ name, location, bio, id }) => {
  const navigate = useNavigate();
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
        <p>{bio}</p>
      </div>
      <button
        onClick={() => navigate(`/find-stay/${id}`)}
        className="mt-3 flex items-center gap-x-1"
      >
        <BsFillHouseCheckFill className="dark:text-white text-lg shink-0" />
        <p>View {name} fan stay listing</p>
      </button>
    </div>
  );
};

export default AboutHostSection;
