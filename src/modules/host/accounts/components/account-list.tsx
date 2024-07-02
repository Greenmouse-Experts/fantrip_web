import useAuth from "@/hooks/authUser";

const AccountList = () => {
  const { account } = useAuth();
  return (
    <div>
      <div className="grid lg:gap-4 lg:grid-cols-2">
        {!!account.length &&
          account.map((item) => (
            <div
              className="border grid gap-3 border-gray-600 rounded-lg p-4"
              key={item.id}
            >
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" className="w-5 h-5" />
                <p className="fw-500">Active Account Info</p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Account Name:</p>
                <p className=" fw-500">{item.accountName}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Account Number:</p>
                <p className="text-lg fw-500 text-prima">
                  {item.accountNumber}
                </p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Bank Name:</p>
                <p className="fw-500">{item.bankName}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Routing Number:</p>
                <p className="fw-500 text-sec">{item.routingNumber}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Account Holder Type:</p>
                <p className="fw-500 capitalize">{item.accountHolderType}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Currency:</p>
                <p className="fw-500 text-lg text-prima">{item.currency}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="opacity-70">Country:</p>
                <p className="fw-500">{item.country}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AccountList;
