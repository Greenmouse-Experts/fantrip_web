import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { getLocation } from "@/services/api/routine";
import { Switch, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

interface LocationIP {
  city: string | undefined;
  region: string | undefined;
  country: string | undefined;
}
interface Props {
  close: () => void;
}
const UpdateProfileForm: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { user, firstName, lastName, saveUser, isHost } = useAuth();
  const [deviceLoc, setDeviceLoc] = useState<LocationIP>({
    city: "",
    region: "",
    country: "",
  });

  useEffect(() => {
    const fetchDeviceLocation = async () => {
      try {
        const loc = await getLocation();
        setDeviceLoc({
          city: loc?.city,
          region: loc?.region,
          country: loc?.country,
        });
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchDeviceLocation();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      bio: user.bio || "",
      nickname: user.nickname || "",
      isNickname: user.isNickname,
      favTeam: user.favTeam || "",
    },
  });
  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });

  const onSubmit = async (datas: any) => {
    setIsBusy(true);
    const plusLocation = {
      ...datas,
      city: deviceLoc.city || user.city,
      state: deviceLoc.region || user.state,
      country: deviceLoc.country || user.country,
    };
    const payload = isHost ? datas : plusLocation;
    mutation.mutate(payload, {
      onSuccess: (data) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        saveUser({
          ...user,
          name: `${datas.firstName} ${datas.lastName}`,
          bio: datas.bio,
          nickname: datas.nickname,
          favTeam: datas.favTeam,
          isNickname: datas.isNickname,
        });
        close();
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      },
    });
  };
  return (
    <div className="lg:px-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 items-center gap-4">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="First Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.firstName?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Last Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.lastName?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Nickname"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.nickname?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
          {!!watch("nickname").length && (
            <Controller
              name="isNickname"
              control={control}
              render={({ field }) => (
                <div className="flex gap-x-4 items-center lg:mt-4">
                  <label className="text-[#767676] fw-500 ">Use Nickname</label>
                  <div className="">
                    <Switch
                      isChecked={field.value}
                      colorScheme="pink"
                      onChange={field.onChange}
                      size={"lg"}
                    />
                  </div>
                </div>
              )}
            />
          )}
          <Controller
            name="favTeam"
            control={control}
            rules={{
              required: {
                value: false,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Favourite Team"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.favTeam?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
          <div className="lg:col-span-2">
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Profile Bio"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bio?.message}
                  type={InputType.textarea}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-7">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Update"}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
