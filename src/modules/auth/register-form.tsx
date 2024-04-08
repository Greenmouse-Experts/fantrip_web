import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";

const RegisterForm = () => {
  return (
    <div>
      <form className="grid lg:grid-cols-2 gap-4">
        <TextInput
          label="First Name"
          placeholder="Your First Name"
          type={InputType.text}
        />
        <TextInput
          label="Last Name"
          placeholder="Your Last Name"
          type={InputType.text}
        />
        <TextInput
          label="Email address"
          placeholder="email@domain.com"
          type={InputType.email}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          type={InputType.password}
        />
        <div className="mt-9 col-span-2">
          <Button title={"Register"} type="int" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
