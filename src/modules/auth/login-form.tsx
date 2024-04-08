import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div>
      <form className="grid gap-4">
        <TextInput
          label="Email address"
          placeholder="email@domain.com"
          type={InputType.email}
        />
        <div className="relative">
          <TextInput
            label="Password"
            placeholder="Password"
            type={InputType.password}
          />
          <div className="absolute top-2 right-0">
            <Link to={"/auth/forget"} className="text-[#9847fe]">Forget Password?</Link>
          </div>
        </div>
        <div className="mt-9">
          <Button title={"Login"} type="int"/>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
