import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";

const CommunityGuidelines = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Community Guideline
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box mt-16 lg:mt-8 grid gap-6 lg:gap-10 mb-16 lg:mb-24">
        <div>
          <PolicyHeader text="Introduction" />
          <p className="fw-500 mb-3 lg:mb-4">
            Welcome to fantrip&apos;s chat rooms! Our community is a place for
            fans to discuss and share their passion for sports in a respectful
            and engaging environment. Please take a moment to familiarize
            yourself with our guidelines to ensure a positive experience for
            everyone.
          </p>
        </div>
        <div>
          <PolicyHeader text="Respect and Courtesy" />
          <div className="grid gap-4">
            <PolicyList text="Treat all members with respect and courtesy." />
            <PolicyList text="Personal attacks, harassment, and bullying are strictly prohibited." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="No Hate Speech or Discrimination" />
          <div className="grid gap-4">
            <PolicyList text="We have zero tolerance for hate speech or discriminatory remarks based on race, ethnicity, gender, sexual orientation, religion, or disability." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Avoid Obscene Language and Inappropriate Content" />
          <div className="grid gap-4">
            <PolicyList text="Please refrain from using profanity, obscene language, or posting any sexually explicit content." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="No Spamming or Advertising" />
          <div className="grid gap-4">
            <PolicyList text="Spamming and unsolicited advertising are not allowed in our chat rooms." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Stay On Topic" />
          <div className="grid gap-4">
            <PolicyList text="Keep discussions relevant to the sport or game being discussed." />
          </div>
        </div>
        <div>
          <PolicyHeader text="No Misinformation or False Rumors" />
          <div>
            <PolicyList text="Do not spread misinformation or unfounded rumors." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Report Violations" />
          <div>
            <PolicyList text="If you see someone violating these guidelines, please use the report function to alert our moderators." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Enjoy the Discussion" />
          <div>
            <PolicyList text="Engage with others, share your thoughts, and most importantly, have fun!" />
          </div>
        </div>
        <div>
          <PolicyHeader text="Consequences" />
          <p className="fw-500 mb-3 lg:mb-4">
            Failure to adhere to these guidelines may result in a warning,
            temporary mute, or permanent ban from the chat rooms, depending on
            the severity of the violation.
            <br /> <br /> Thank You <br /> Thank you for being a part of our
            community and for helping to create a positive and enjoyable
            environment for all sports fans!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
