import { FC } from "react";
import IndexDisplayUi from "./index-display";

interface Props {
  socket: any;
  setReload: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const MakePostIndex: FC<Props> = ({ socket, setReload }) => {
  return (
    <div>
      <div>
        <IndexDisplayUi socket={socket} setReload={setReload} />
      </div>
    </div>
  );
};

export default MakePostIndex;
