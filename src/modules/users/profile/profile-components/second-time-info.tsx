import { Link } from "react-router-dom";

const SecondTimeInfo = () => {
  return (
    <div className="text-center">
      <p className="fw-500 text-xl">Welcome to fantrip! 🏆</p>
      <p className="px-5 pt-4">
        You&apos;re officially part of the fantrip family. Ready to host fellow
        fans? Click{" "}
        <Link to={"/user/host-setup"} className="fw-500 text-prima">
          Host a Fan
        </Link>{" "}
        to create your listing and start the fun!
      </p>
      <p className="px-5 pt-4">
        Not hosting? Explore{" "}
        <Link to={"/area-guide"} className="fw-500 text-prima">
          Area Guide
        </Link>{" "}
        to discover fan-recommended spots or jump into the{" "}
        <Link to={"/chat-room"} className="fw-500 text-prima">
          Chat Room
        </Link>{" "}
        and connect with the community.
      </p>
    </div>
  );
};

export default SecondTimeInfo;
