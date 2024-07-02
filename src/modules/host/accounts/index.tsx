import useDialog from "@/hooks/useDialog";
import { IoAddCircle } from "react-icons/io5";
import AddHostAccount from "./components/add-account";
import AccountList from "./components/account-list";

const HostAccountsIndex = () => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl syne fw-600 text-white">Host Bank Accounts</p>
        <button
          className="flex gap-x-2 items-center border rounded-lg px-4 py-2"
          onClick={() => setShowModal(true)}
        >
          <IoAddCircle />
          Add A New Account
        </button>
      </div>
      <div className="mt-6">
        <AccountList/>
      </div>
      <Dialog title="Add A New Account">
        <AddHostAccount close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default HostAccountsIndex;
