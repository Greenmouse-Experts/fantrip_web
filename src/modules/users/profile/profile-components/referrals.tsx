import useAuth from "@/hooks/authUser";
import { getCappedPercentage, isValidEmail } from "@/lib/utils/formatHelp";
import { sendInvite, viewProfile } from "@/services/api/authApi";
import { SITE_URL } from "@/services/constant";
import {
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoGiftOutline, IoSend } from "react-icons/io5";
import { LuFileSignature } from "react-icons/lu";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

const UserReferrals = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { firstName } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });
  const toast = useToast();

  const handleSend = async () => {
    if (!isValidEmail(emailInput)) {
      toast({
        title: "Invalid email",
        position: "top",
        status: "error",
      });
      return;
    }
    setIsBusy(true);
    const payload = {
      email: emailInput,
    };
    await sendInvite(payload)
      .then((res) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        setEmailInput("");
        setIsBusy(false);
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };


  const textToCopy = `Hey Champ,

Your friend, ${firstName} just gave you the golden ticket to join fantrip – the future of sports travel.

Fan-to-fan stays without the extra costs. No cleaning fees. No anonymous hosts. Just real fans ready to welcome you before the big game.

Download the app on the https://www.appstore.com/store/fantrip or https://www.play.google.com/store/fantrip and use this code ${profile?.referralCode} on sign up to help your friend earn points. You’ll start earning, too, when you refer others!

See you on the field,
Team fantrip 🏆

`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
            Text copied
          </div>
        ),
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <div className="mt-3 lg:mt-0">
      <p className="hidden lg:block fw-600 text-lg">My Referrals</p>
      {/* <p className="text-sm text-gray-500">Invite your friends to fantrip. If they sign up you will get amazing bonuses</p> */}
      <div className="bg-layout-gradient bg-[url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1726760733/fantrip/bg-wallet_xkbvyo.jpg)] bg-cover p-5 rounded-lg mb-5 mt-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-center">
            <p className="fw-400 text-2xl md:text-4xl">
              {profile?.reward?.point}
            </p>
            <p className="text-white font-[300] fs-300">Point balance</p>
          </div>
          <div>
            <div className="flex justify-center">
              <CircularProgress
                value={
                  profile ? getCappedPercentage(profile?.reward?.point, 50) : 0
                }
                color="orange.300"
              >
                <CircularProgressLabel color={"orange.300"} className="fw-600">
                  {profile && getCappedPercentage(profile?.reward?.point, 50)}%
                </CircularProgressLabel>
              </CircularProgress>
            </div>
            <p className="text-white font-[300] fs-300 mt-1">
              {profile?.reward?.referees} invite(s)
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="fs-300 text-gray-200">
            Earn points for every three friends who sign up using your referral
            link. Accumulate 50 points and redeem them for a €5 discount at
            checkout on your next Fanstay booking. The more you share, the more
            you earn!
          </p>
        </div>
      </div>
      <div className="border border-[#E8EAED] rounded-[16px] p-4">
        <div className="mt-6 grid lg:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto circle place-center bg-[#FFEDF2]">
              <MdOutlineMarkUnreadChatAlt className="text-2xl text-[#9847fe]" />
            </div>
            <div className="mt-2">
              <p className="fw-500">Spread the Word!</p>
              <p className="fs-300 text-gray-600 px-4">
                Let your friends know how awesome fantrip is, and join the fan
                movement!
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto circle place-center bg-[#FFEDF2]">
              <LuFileSignature className="text-2xl text-[#9847fe]" />
            </div>
            <div>
              <p className="fw-500">Get friends to sign up</p>
              <p className="fs-300 text-gray-600 px-4">
                Encourage your friends to register using your referral link.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto circle place-center bg-[#FFEDF2]">
              <IoGiftOutline className="text-2xl text-[#9847fe]" />
            </div>
            <div>
              <p className="fw-500">Earn points</p>
              <p className="fs-300 text-gray-600 px-4">
                For every three friends who sign up, you earn 5 points! Once you
                hit 50 points, you can redeem them for a €5 discount at checkout
                on your next Fanstay booking.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-12 lg:px-3">
          <p className="fw-600">Invite your friends</p>
          <p className="text-sm text-gray-500">
            Enter your friend&apos;s email to send them an invitation, or copy
            your referral link to share directly via text, WhatsApp, or any
            platform you choose! The more you share, the more points you earn!
          </p>
          <div className="mt-3">
            <div className="border border-gray-400 rounded-[50px] flex gap-x-2 py-2 pr-2 pl-5 w-full">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="outline-none bg-transparent py-1 px-2 w-full"
              />
              <div
                className="w-12 h-12 shrink-0 circle place-center bg-[#9847fe] cursor-pointer"
                onClick={handleSend}
              >
                {!isBusy && (
                  <IoSend className="text-[#fff] text-2xl shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-12 lg:px-3 pb-5">
          <p className="fw-600">Share the referral link</p>
          <p className="text-sm text-gray-500">
            Copy your referral link and share it on your socials!
          </p>
          <div className="mt-3">
            <div className="bg-[#FFEDF2] dark:bg-darkColor border border-gray-400 rounded-[50px] flex gap-x-2 py-2 px-5 items-center w-full">
              <input
                type="text"
                className="bg-[#FFEDF2] outline-none py-1 px-2 w-full"
                value={`${SITE_URL}/auth/register?referralCode=${profile?.referralCode}`}
                disabled
              />
              <p
                className="cursor-pointer text-[#9847fe] fw-600 fs-500 whitespace-nowrap"
                onClick={() => handleCopy()}
              >
                Copy Link
              </p>
            </div>
          </div>
        </div>
        {/* <div className="mt-5 lg:mt-8 lg:px-3 pb-5">
          <p className="fw-600">How Referral Works</p>
          <p className="text-sm text-gray-500">
            Earn points for every three friends who sign up using your referral
            link. Accumulate 50 points and redeem the for a €5 discount at
            checkout on your next Fanstay booking. The more you share, the more
            you earn!
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default UserReferrals;
