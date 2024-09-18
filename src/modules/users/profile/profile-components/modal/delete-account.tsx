import Button from "@/components/Button";
import useAuth from "@/hooks/authUser";
import { deleteAccount } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

interface Props {
  close: () => void;
}
const DeleteAccount: FC<Props> = ({ close }) => {
  const [phase, setPhase] = useState<number>(1);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const toast = useToast();
  const [reason, setReason] = useState("");
  const reasons = [
    " Fantrip didn't meet my expectations",
    "I found the platform difficult to use",
    " I no longer need the service",
    "I didn't find the features useful",
    "others",
  ];
  const handleDelete = async () => {
    setIsBusy(true);
    await deleteAccount()
      .then((res) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        signOut();
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };
  return (
    <div>
      {phase === 1 && (
        <div>
          <p className="text-center fw-600 mt-3 mb-4">
            Oh no, you're leaving? 😢
          </p>
          <p className="text-center fs-500">
            Give us a chance to get this right! We did this for fans like us,
            and our goal is to keep improving your experience. We'd love to know
            why you're leaving:
          </p>
          <div className="mt-3 grid gap-3">
            {reasons.map((item, i) => (
              <div
                className={`border border-gray-200 flex p-2 cursor-pointer hover:bg-prima hover:text-white items-center rounded-lg gap-x-3 ${
                  item === reason ? "bg-prima text-white" : ""
                }`}
                key={i}
                onClick={() => setReason(item)}
              >
                <input
                  type="radio"
                  className="w-4 h-4"
                  checked={item === reason}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button
              title={"Keep my account"}
              altClassName="btn-int px-5 py-2"
              onClick={close}
            />
            <Button
              title={"Proceed"}
              altClassName="btn-int px-5 py-2 !bg-red-600"
              disabled={reason === ""}
              onClick={() => setPhase(2)}
            />
          </div>
        </div>
      )}
      {phase === 2 && (
        <div>
          <div className="flex justify-center  mt-4 mb-6">
            <div className="w-20 h-20 circle place-center bg-red-100">
              <RiDeleteBin5Fill className="text-3xl text-gray-500" />
            </div>
          </div>
          <p className="text-center fw-600 text-red-600">
            <span className="fw-600">WARNING!</span> deleting your account will
            remove all of your information from our database. This cannot be
            undone.
          </p>
          <div className="mt-7">
            <Button
              title={
                isBusy ? (
                  <BeatLoader size={12} color="white" />
                ) : (
                  "Delete Account"
                )
              }
              altClassName="btn-int w-full py-3 bg-red-600"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
