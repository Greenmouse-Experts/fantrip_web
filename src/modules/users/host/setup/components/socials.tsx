import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import useAuth from "@/hooks/authUser";
import { ChangeEvent, FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  next: () => void;
  prev: () => void;
}
const SetupSocials: FC<Props> = ({ next, prev }) => {
  const { kyc, saveKyc } = useAuth();
  const [socials, setSocials] = useState({
    facebookUrl: kyc.facebookUrl || "",
    twitterUrl: kyc.twitterUrl || "",
    linkedinUrl: kyc.linkedinUrl || "",
    instagramUrl: kyc.instagramUrl || ""
  })
  const handleNext = () => {
    saveKyc({
      ...kyc,
      facebookUrl: socials.facebookUrl,
      twitterUrl: socials.twitterUrl,
      linkedinUrl: socials.linkedinUrl,
      instagramUrl: socials.instagramUrl
    })
    next()
  }
  return (
    <div>
      <p className="text-xl lg:text-4xl">Link Social Media</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm relative top-[4px]" />
        <p className="fs-400">
          Your social media is only visible to Fantrip for verification
          purposes.
        </p>
      </div>
      <div className="mt-5">
        <p className="fw-500 fs-500">Social Media Accounts</p>
        <div className="mt-4 grid gap-4 lg:w-8/12">
          <TextInput
            type={InputType.text}
            label="Facebook"
            labelClassName="text-[#9F9F9F]"
            value={socials.facebookUrl}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setSocials({...socials, facebookUrl: e.target.value})}
          />
          <TextInput
            type={InputType.text}
            label="Twitter"
            labelClassName="text-[#9F9F9F]"
            value={socials.twitterUrl}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setSocials({...socials, twitterUrl: e.target.value})}
          />
          <TextInput
            type={InputType.text}
            label="Instagram"
            labelClassName="text-[#9F9F9F]"
            value={socials.instagramUrl}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setSocials({...socials, instagramUrl: e.target.value})}
          />
          <TextInput
            type={InputType.text}
            label="Linkedin"
            labelClassName="text-[#9F9F9F]"
            value={socials.instagramUrl}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setSocials({...socials, instagramUrl: e.target.value})}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={prev}>
          <BtnContent name="Prev" reverse />
        </div>
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={() => handleNext()}>
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default SetupSocials;
