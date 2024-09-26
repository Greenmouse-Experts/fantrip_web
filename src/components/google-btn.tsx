import { FC, useState } from "react";
// import logo from "@/assets/google.png";
import { socialSignin } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import useAuth from "@/hooks/authUser";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { GoogleLogin } from "@react-oauth/google";

interface Props {
  text: string;
}
const GoogleButton: FC<Props> = ({}) => {
  const [isBusy, setIsBusy] = useState(false);
  const { saveUser, saveAccount } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSocialLogin = async (token: any) => {
    const payload = {
      token: token.credential,
      provider: "google",
    };
    await socialSignin(payload)
      .then((res) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              Login successfully
            </div>
          ),
          position: "top",
        });
        sessionStorage.setItem("fantrip_token", res.accessToken);
        saveUser({
          name: `${res.data.firstName} ${res.data.lastName}`,
          email: res.data.email,
          token: res.accessToken,
          image: res.data.picture,
          address: res.data.address,
          phone: res.data.phone,
          id: res.data.id,
          account: res.data.role,
          joined: res.data.createdDate,
          bio: res.data.bio,
          city: res.data.city,
          state: res.data.state,
          country: res.data.country,
          nickname: res.data.nickname,
          isNickname: res.data.isNickname,
          dob: res.data.dob,
          isVerified: res.data.verifiedAsHost,
          favTeam: res.data.favTeam,
          roomPicture: res.data.roomPicture,
          street: res.data.street,
          postalCode: res.data.postalCode,
          aptSuitUnit: res.data.apiSuitUnit,
          loginTimes: res.data.loginTimes,
          points: res?.data?.reward?.point || 0,
        });
        saveAccount(res.data.bankAccounts);
        if (res.data.role === "host") {
          navigate("/host");
        }
        if (res.data.role === "guest") {
          navigate("/user/profile");
        }
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => handleSocialLogin(tokenResponse),
  //   onError: () => {
  //     toast({
  //       title: "Couldn't signin with google",
  //       isClosable: true,
  //       position: "top",
  //       status: "error",
  //     });
  //     setIsBusy(false);
  //   }
  // });

  return (
    <div className="cursor-pointer  flex items-center justify-center gap-x-6 py-2 rounded-[6.7px]">
      {isBusy ? (
        <BeatLoader color="#9847fe" />
      ) : (
        <GoogleLogin
          text={"continue_with"}
          width={"100%"}
          logo_alignment={"left"}
          size="large"
          ux_mode={'popup'}
          onSuccess={async (credentialResponse) => {
            handleSocialLogin(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </div>
  );
};

export default GoogleButton;
