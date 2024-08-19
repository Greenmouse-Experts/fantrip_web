import Button from "@/components/Button";
// import useAuth from "@/hooks/authUser";
// import { updateProfile } from "@/services/api/authApi";
// import { useToast } from "@chakra-ui/react";
// import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { BeatLoader } from "react-spinners";

import TextInput, { InputType } from "@/components/TextInput";
import { UserItem } from "@/lib/contracts/auth";

interface Props {
  close: () => void;
  item: UserItem;
}
const UpdateSocialForm: FC<Props> = ({  item }) => {
  const [isBusy, setIsBusy] = useState(false);
  // const toast = useToast();

  const [formData, setFormData] = useState({
    facebookUrl: item.facebookUrl || "",
    twitterUrl: item.twitterUrl || "",
    linkedinUrl: item.linkedinUrl || "",
    instagramUrl: item.instagramUrl || "",
  });

  // const mutation = useMutation({
  //   mutationFn: updateProfile,
  //   mutationKey: ["updateSocials"],
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setIsBusy(true);
    // const payload = {
    //   country: datas.country,
    //   state: datas.state,
    //   city: datas.city,
    //   postalCode: datas.postal,
    //   street: datas.street,
    //   aptSuitUnit: datas.suite,
    // };
    // mutation.mutate(payload, {
    //   onSuccess: (data) => {
    //     toast({
    //       render: () => (
    //         <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
    //           {data.message}
    //         </div>
    //       ),
    //       position: "top",
    //     });
    //     setIsBusy(false);
    //     saveUser({
    //       ...user,
    //       ...payload,
    //     });
    //     close();
    //   },
    //   onError: (error: any) => {
    //     toast({
    //       title: error.response.data.message,
    //       isClosable: true,
    //       position: "top",
    //       status: "error",
    //     });
    //     setIsBusy(false);
    //   },
    // });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Form data:", formData);
  //   // Perform form submission logic here
  // };

  return (
    <div className="lg:px-2">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 grid-cols-2 mt-3">
          <TextInput
            type={InputType.text}
            name="facebook"
            label="FacebookUrl"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
            onChange={handleInputChange}
          />

          <TextInput
            type={InputType.text}
            label="Twitter"
            name="twitterUrl"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
            onChange={handleInputChange}
          />

          <TextInput
            type={InputType.text}
            label="LinkedIn"
            name="linkedinUrl"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
            onChange={handleInputChange}
          />

          <TextInput
            type={InputType.text}
            label="Instagram"
            name="instagramUrl"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-7">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Update"}
            // disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateSocialForm;
