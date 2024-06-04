import Button from "@/components/Button";
import { StayItemUpdate } from "@/lib/contracts/stay";
import { updateStay } from "@/services/api/stay-api";
import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

interface Props {
  id: string;
  from: string;
  to: string;
  refetch: () => void;
  close: () => void;
}
const EditAvailability: FC<Props> = ({ id, from, to, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      availableFrom: from || "",
      availableTo: to || "",
    },
  });
  const onSubmit = async (datas: StayItemUpdate) => {
    setIsBusy(true);
    const payload = {
      availableFrom: dayjs(datas.availableFrom).format('YYYY-MM-DD'),
      availableTo: dayjs(datas.availableTo).format('YYYY-MM-DD'),
    };
    await updateStay(id, payload)
      .then((res) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        refetch();
        close();
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center gap-4"
      >
        <Controller
          name="availableFrom"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter required date",
            },
          }}
          render={({ field }) => (
            <div>
              <p className="text-black fw-600 lg:text-lg block mb-3">
                Available From
              </p>
              <input
                {...field}
                type="date"
                min={dayjs().format('YYYY-MM-DD')}
                className=" p-3 relative z-[4000] lg:p-4 w-full border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              />
            </div>
          )}
        />
         <Controller
          name="availableTo"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter required date",
            },
          }}
          render={({ field }) => (
            <div>
              <p className="text-black fw-600 lg:text-lg block mb-3">
                Available To
              </p>
              <input
                {...field}
                type="date"
                min={watch('availableFrom')}
                className=" p-3 relative z-[4000] lg:p-4 w-full border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              />
            </div>
          )}
        />
        <div className="flex justify-end">
          <div className="lg:w-6/12">
            <Button
              title={
                isBusy ? (
                  <BeatLoader size={12} color="white" />
                ) : (
                  "Update Stay Info"
                )
              }
              type="int"
              disabled={!isValid || isBusy}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAvailability;
