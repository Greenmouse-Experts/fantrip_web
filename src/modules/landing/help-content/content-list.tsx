import GradientListBox from "@/components/text-format/gradient-list-box";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";
import { Link } from "react-router-dom";

const ContentList = () => {
  return (
    <div className="section">
      <div className="box">
        <div className="grid gap-8">
          <div>
            <PolicyHeader text="Login issues" />
            <div>
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  How do I reset my password? <br /> <br />
                  Understand how to reset your account password on desktop,
                  mobile web, and apps.
                </p>
              </div>
            </div>
          </div>
          <div>
            <PolicyHeader text="What Are Cookies?" />
            <div>
              <PolicyList text="Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit our platform. They collect information about your device and your interactions with Fantrip, helping to improve your user experience, understand how our platform is used, and tailor our interactions with you." />
            </div>
          </div>
          <div className="">
            <PolicyHeader text="Desktop or mobile web" />
            <p className="fw-500 mb-3 lg:mb-4">
              If you want to reset your password before logging in:
            </p>
            <div className="grid gap-4">
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  <Link
                    to={"/auth/forget"}
                    className="text-prima fw-500 underline"
                  >
                    Click here
                  </Link>{" "}
                  to redirect to reset/forogot password page
                </p>
              </div>
              <PolicyList text="Enter the email used to register your profile" />
              <PolicyList text="An email with your profile's credentials will be sent to the address associated with your account. Once you receive the email, click on Reset Password and you will be redirected to a new login page." />
            </div>
            <p className="fw-500 mt-6 mb-3 lg:mb-4">
              If you want to reset your password after logging in:
            </p>
            <div className="grid gap-4">
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  <Link
                    to={"/user/profile"}
                    className="text-prima fw-500 underline"
                  >
                    Click here
                  </Link>{" "}
                  to redirect to change password page
                </p>
              </div>
              <PolicyList text="Navigate to change password tab" />
              <PolicyList text="Enter your existing password, new password, then confirm new password; and save." />
            </div>
          </div>
          <div>
            <PolicyHeader text="iOS and Android" />
            <div className="grid gap-5">
              <PolicyList text="Tap on the three horizontal pink lines [☰] in the top-left corner;" />
              <PolicyList text="Then on Settings;" />
              <PolicyList text="Then Account Information;" />
              <PolicyList text="Then  Password;" />
              <PolicyList text="Enter your existing password, new password, then confirm new password; and" />
              <PolicyList text="Select Change Password." />
              <PolicyList text="Once you have updated your new password, click LOG IN and enter your username and newly created password." />
            </div>
          </div>
          <div>
            <PolicyHeader text="What do I do if my account is locked?" />
            <div>
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  Understand what causes locked accounts and the steps required
                  to successfully login again. <br /> <br />
                  Note that after consecutively submitting incorrect login
                  information five (5) times, accounts are automatically locked
                  for 15 minutes.
                  <br /> <br />
                  To log in, you need to input your your profile name (nickname)
                  or email address. If locked out, please wait 15 minutes and
                  try again with the correct login details. <br /> <br /> If
                  you’d like to access your account immediately, please reset
                  your password. Passwords must consist of only letters, digits,
                  and symbols (no spaces).
                </p>
              </div>
            </div>
          </div>
          <div>
            <PolicyHeader text="How can I share my Fantrip adventures and feedback?" />
            <div>
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  Your voice is our cheer and your feedback, our winning
                  strategy! We're all ears for your epic tips on how we can up
                  our game. Got a suggestion, a high-five moment, or even a
                  'could-be-better' thought? Don't hold back! <br /> <br />
                  Send us an email to support@Fantrip.app. Spill all the
                  details, suggestions, and game-changing ideas you've got.
                  Together, let's make Fantrip the ultimate fan journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
