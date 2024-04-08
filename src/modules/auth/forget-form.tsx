import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";

const ForgetForm = () => {
    return (
        <div>
          <form className="grid gap-4">
            <TextInput
              label="Email address"
              placeholder="email@domain.com"
              type={InputType.email}
            />
            <div className="mt-9">
              <Button title={"Continue"} type="int"/>
            </div>
          </form>
        </div>
      );
}

export default ForgetForm