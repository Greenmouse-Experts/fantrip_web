import useDialog from "@/hooks/useDialog";
import { IoAddCircle } from "react-icons/io5";
import AddHostAccount from "./components/add-account";
import AccountList from "./components/account-list";
import SecureText from "./components/secure-text";
import { viewProfile } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PyramidSpin from "@/components/loaders/pyramid-spin";

const HostAccountsIndex = () => {
  const { isLoading, data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });

  const { Dialog, setShowModal } = useDialog();
  const [editState, setEditState] = useState(false);


  const bank =
    profile && profile.bankAccounts.length ? profile.bankAccounts[0] : null;

  const kyc = profile && profile.kycInfo.length ? profile.kycInfo[0] : null;

  if (isLoading) {
    return (
      <div className="py-12 lg:py-24 place-center">
        <PyramidSpin size={1.8} />
      </div>
    )
  }
  else {
    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="text-xl syne fw-600 text-white">Host Bank Accounts</p>
          {profile && profile.bankAccounts && profile.bankAccounts.length > 0  ?
            <button
              className="flex gap-x-2 items-center border rounded-lg px-2 lg:px-4 py-1 lg:py-2"
              onClick={() => [setShowModal(true), setEditState(true)]}
            >
              <IoAddCircle />
              Edit <span className="hidden lg:block"> Account</span>
            </button>
            :
            <button
              className="flex gap-x-2 items-center border rounded-lg px-2 lg:px-4 py-1 lg:py-2"
              onClick={() => setShowModal(true)}
            >
              <IoAddCircle />
              Add <span className="hidden lg:block"> Account</span>
            </button>
          }
        </div>
        <div className="mt-6">
          <div className="mb-5">
            <SecureText />
          </div>
          <AccountList />
        </div>
        <Dialog title={editState ?  'Edit Account' : 'Add A New Account'} size="lg">
          <AddHostAccount editAccount={editState} bankDetails={bank} kycDetails={kyc} close={() => setShowModal(false)} />
        </Dialog>
      </div>
    );
  }
};

export default HostAccountsIndex;
