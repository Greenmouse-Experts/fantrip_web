import useDialog from "@/hooks/useDialog";
import { IoAddCircle } from "react-icons/io5";
import AddHostAccount from "./components/add-account";
import AccountList from "./components/account-list";
import SecureText from "./components/secure-text";
import { viewProfile } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import ReusableModal from "@/components/ReusableModal";
import { deleteBankAccount } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";

const HostAccountsIndex = () => {
  const { isLoading, data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });

  const { Dialog, setShowModal } = useDialog();
  const { Dialog: Reject, setShowModal: ShowDelete } = useDialog();
  const [editState, setEditState] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();


  const bank =
    profile && profile.bankAccounts.length ? profile.bankAccounts[0] : null;

  const kyc = profile && profile.kycInfo.length ? profile.kycInfo[0] : null;


  const deleteAccount = async () => {
    setIsBusy(true);
    await deleteBankAccount()
      .then((data) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        refetch()
        ShowDelete(false);
      })
      .catch((error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };



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
          {profile && profile.bankAccounts && profile.bankAccounts.length > 0 ?
            <div className="flex gap-x-2 items-center">
              <button
                className="flex gap-x-2 btn-primary items-center border rounded-lg px-2 lg:px-4 py-1 lg:py-2"
                onClick={() => [setShowModal(true), setEditState(true)]}
              >
                Edit Account
              </button>
              <button
                className="flex gap-x-2 items-center border rounded-lg px-2 lg:px-4 py-1 lg:py-2"
                onClick={() => ShowDelete(true)}
              >
                Delete Account
              </button>
            </div>
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
        <Dialog title={editState ? 'Edit Account' : 'Add A New Account'} size="lg">
          <AddHostAccount editAccount={editState} bankDetails={bank} kycDetails={kyc} close={() => {
            setShowModal(false);
            refetch();
          }} />
        </Dialog>

        <Reject title="" size="md">
          <ReusableModal
            type="warning"
            title="Are you sure you want to delete this account"
            actionTitle="Delete"
            action={deleteAccount}
            cancelTitle="Close"
            closeModal={() => ShowDelete(false)}
            isBusy={isBusy}
          />
        </Reject>
      </div>
    );
  }
};

export default HostAccountsIndex;
