import { FC, useEffect, useState } from "react";
import TextInput, { InputType } from "@/components/TextInput";
import { MdAddCircleOutline } from "react-icons/md";
import { Switch, useToast } from "@chakra-ui/react";
import { isNumber } from "@/lib/utils/formatHelp";
import dayjs from "dayjs";

interface Props {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string[]>>;
  expiresAt: string;
  setExpiresAt: React.Dispatch<React.SetStateAction<string>>;
  multiVote: boolean;
  setMultiVote: React.Dispatch<React.SetStateAction<boolean>>;
}
const PollInput: FC<Props> = ({
  options,
  setOption,
  setExpiresAt,
  multiVote,
  setMultiVote,
  question,
  setQuestion,
}) => {
  const toast = useToast();
  const [duration, setDuration] = useState<{
    days: number | null;
    hours: number | null;
    minute: number | null;
  }>({
    days: null,
    hours: null,
    minute: null,
  });

  const handleAddNewInput = () => {
    if (options.length <= 5) setOption([...options, ""]);
  };

  const handleEditOptions = (index: number, newValue: string) => {
    if (index < 0 || index >= options.length) {
      toast({
        title: "Input not available",
        isClosable: true,
        position: "top",
        status: "error",
      });
      return;
    }
    const updatedArray = [...options];

    updatedArray[index] = newValue;

    setOption(updatedArray);
  };

  const handleDuration = (key: string, value: string) => {
    const inputValue = Number(value);
    if (!isNumber(inputValue)) {
      toast({
        title: "Only accepts a set of numbers",
        isClosable: true,
        position: "top",
        status: "error",
      });
      return;
    }
    if (key === "days") {
      if (inputValue > 5 || inputValue < 0) {
        toast({
          title: "Days value is out of ",
          isClosable: true,
          position: "top",
          status: "error",
        });
        return;
      } else {
        setDuration({ ...duration, days: inputValue });
      }
    } else if (key === "hours") {
      if (inputValue > 23 || inputValue < 0) {
        toast({
          title: "Days value is out of ",
          isClosable: true,
          position: "top",
          status: "error",
        });
        return;
      } else {
        setDuration({ ...duration, hours: inputValue });
      }
    } else if (key === "minute") {
      if (inputValue > 59 || inputValue < 0) {
        toast({
          title: "Days value is out of ",
          isClosable: true,
          position: "top",
          status: "error",
        });
        return;
      } else {
        setDuration({ ...duration, minute: inputValue });
      }
    } else {
      return;
    }
  };

  const calculateTime = () => {
    const days = duration.days || 0;
    const hours = duration.hours || 0;
    const minutes = duration.minute || 0;
    const updatedDateTime = new Date();

    // Add days
    updatedDateTime.setDate(updatedDateTime.getDate() + days);

    // Add hours
    updatedDateTime.setHours(updatedDateTime.getHours() + hours);

    // Add minutes
    updatedDateTime.setMinutes(updatedDateTime.getMinutes() + minutes);

    // Update state with the new date and time
    setExpiresAt(dayjs(updatedDateTime).format("YYYY-MM-DDTHH:mm"));
  };

  useEffect(() => {
    calculateTime();
  }, [duration]);

  return (
    <div>
      <div>
        <TextInput
          type={InputType.textarea}
          placeholder="Ask a Question"
          value={question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
        />
      </div>
      <div className="mt-3">
        {options.map((item, i) => (
          <TextInput
            type={InputType.text}
            placeholder={`Option ${i + 1}`}
            value={item}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleEditOptions(i, e.target.value)
            }
            key={i}
          />
        ))}
        <div className="mt-3 flex justify-end">
          <MdAddCircleOutline
            className="text-[#FC819F] text-2xl fw-600 cursor-pointerxx"
            onClick={handleAddNewInput}
          />
        </div>
      </div>
      <div>
        <p>Poll Duraion</p>
        <div className="grid grid-cols-3 gap-x-5">
          <div>
            <TextInput
              type={InputType.number}
              placeholder={`Days`}
              value={duration.days}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDuration("days", e.target.value)
              }
            />
          </div>
          <div>
            <TextInput
              type={InputType.text}
              placeholder={`Hours`}
              value={duration.hours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDuration("hours", e.target.value)
              }
            />
          </div>
          <div>
            <TextInput
              type={InputType.text}
              placeholder={`Minutes`}
              value={duration.minute}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDuration("minute", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-4 mt-4">
        <p>Allow Multiple Votes</p>
        <Switch
          value={"multiVote"}
          isChecked={multiVote}
          colorScheme="pink"
          onChange={() => setMultiVote(!multiVote)}
          size={"lg"}
        />
      </div>
    </div>
  );
};

export default PollInput;
