import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import useAuth from "@/hooks/authUser";
import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

interface Props {
  socket: any;
  userId: string;
  close: () => void;
}
const ReportUser: FC<Props> = ({ socket, userId, close }) => {
  const [textInput, setTextInput] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const { token } = useAuth();
  const toast = useToast();

  const options = [
    "This post contains rude, harmful, or inappropriate material",
    "This post shares false or unverified information",
    "This user is spamming or posting irrelevant content",
    "This user is harassing or bullying others",
    "Other (Please provide more details)",
  ];

  const handleSend = () => {
    const payload = {
      token: token,
      userId: userId,
      reason: text,
    };

    socket.emit("reportUser", payload);
    setText("");
    toast({
      render: () => (
        <Modal
          size="sm"
          blockScrollOnMount={false}
          isCentered
          motionPreset="slideInBottom"
          isOpen={true}
          onClose={() => false}
        >
          <ModalOverlay />
          <ModalContent className="dark:!bg-darkColorLight">
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              Thank you for your report. We&apos;ll review the situation, and if
              it violates our community guidelines, we&apos;ll take the
              necessary action.
            </div>
          </ModalContent>
        </Modal>
      ),
      position: "top",
    });
    close();
  };

  return (
    <div className="">
      <div>
        <p className="mb-1 fs-500">Reason for Reporting</p>
        <div className="mt-3 grid gap-3">
          {options.map((item, i) => (
            <div
              className={`border border-gray-200 flex p-2 cursor-pointer hover:bg-prima hover:text-white items-center rounded-lg gap-x-3 ${
                item === text ? "bg-prima text-white" : ""
              }`}
              key={i}
              onClick={() => {
                setText(item);
                item === "Other (Please provide more details)"
                  ? setTextInput(true)
                  : setTextInput(false);
              }}
            >
              <input type="radio" className="w-4 h-4" checked={item === text} />
              <p>{item}</p>
            </div>
          ))}
          {textInput && (
            <TextInput
              type={InputType.text}
              label=""
              placeholder="Type here"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
          )}
        </div>
      </div>
      <div className="mt-4">
        <Button
          title={"Submit"}
          onClick={handleSend}
          altClassName="btn-int w-full py-[8px]"
          disabled={!text.length}
        />
      </div>
    </div>
  );
};

export default ReportUser;
