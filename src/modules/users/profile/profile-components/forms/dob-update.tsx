import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import Button from "@/components/Button";
import { BeatLoader } from "react-spinners";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getMinimumDate } from "@/lib/utils/formatHelp";

interface Props {
    close: () => void;
}
const DobUpdate: FC<Props> = ({ close }) => {
    const toast = useToast();
    const { user, saveUser } = useAuth();
    const [isBusy, setIsBusy] = useState(false);
    const minimumDate = getMinimumDate(18);
    const [dateOfBirth, setDate] = useState(user.dob ? new Date(user.dob) : null);


    const handleChange = (val: Date | [Date, Date] | null) => {
        if (val instanceof Date || val === null) {
            setDate(val);
        } else if (Array.isArray(val)) {
            setDate(val[0]);
        }
    };


    const mutation = useMutation({
        mutationFn: updateProfile,
        mutationKey: ["profileUpdate"],
    });

    const onSubmit = async () => {
        setIsBusy(true);
        const formattedDob = dateOfBirth ? dayjs(dateOfBirth).format("YYYY-MM-DD") : "";

        const payload = {
            ...user,
            dob: formattedDob,
        };
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
                    ...payload,
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
        <>
            <div className="lg:px-2">
                <div className="grid gap-4 grid-cols-1 items-end mt-3">
                    <Menu closeOnSelect={false}>
                        <MenuButton
                            borderRadius={"xl"}
                            className="!rounded-[6px] p-3 w-full lg:w-7/12 border border-gray-400"
                            transition="all 0.2s"
                        >
                            <div className="flex gap-x-4 cursor-pointer items-center">
                                <FiCalendar className="text-xl" />
                                {dateOfBirth ? (
                                    <p className="fw-500">
                                        {dayjs(dateOfBirth as unknown as string).format("DD - MM - YYYY")}
                                    </p>
                                ) : (
                                    <p className="fw-500">PLease select a date</p>
                                )}
                            </div>
                        </MenuButton>
                        <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
                            <MenuItem className="rounded-[10px]">
                                <Calendar
                                    onChange={(value) => handleChange(value as Date | [Date, Date] | null)}
                                    value={dateOfBirth}
                                    maxDate={minimumDate}
                                    defaultActiveStartDate={minimumDate}
                                />
                            </MenuItem>
                        </MenuList>
                    </Menu>

                </div>

                <div className="mt-7">
                    <Button
                        title={isBusy ? <BeatLoader size={12} color="white" /> : "Update"}
                        disabled={isBusy}
                        onClick={() => onSubmit()}
                    />
                </div>
            </div>
        </>
    );
};

export default DobUpdate;
