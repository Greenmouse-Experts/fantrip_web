import Button from "@/components/Button";
import useAuth from "@/hooks/authUser";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";

interface Props {
  socket: any;
  userId: string;
  close: () => void;
}
const ReportUser: FC<Props> = ({ socket, userId, close }) => {
  const [text, setText] = useState<string>("");
  const { token } = useAuth();
  const toast = useToast();

  const handleSend = () => {
    const payload = {
      token: token,
      userId: userId,
      reason: text,
    };

    socket.emit("createComment", payload);
    setText("");
    toast({
      render: () => (
        <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
          Submitted successfully
        </div>
      ),
      position: "top",
    });
    close();
  };

  return (
    <div className="">
      <div>
        <p className="mb-1 fs-500">Reason for Reporting</p>
        <textarea
          placeholder="write here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 h-24 border rounded-lg shadow-sm outline-none"
        />
      </div>
      <div className="mt-4">
        <Button
          title={"Submit"}
          onClick={handleSend}
          altClassName="btn-int w-full py-[8px]"
        />
      </div>
    </div>
  );
};

export default ReportUser;
