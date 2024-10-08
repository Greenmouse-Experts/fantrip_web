import { useNavigate } from "react-router-dom";

const BlockList = () => {
  const navigate = useNavigate();
  const list = [
    {
      name: "How fantrip works",
      route: "",
    },
    {
      name: "Accomodation booking pricing",
      route: "/booking-pricing",
    },
    {
      name: "Cancellation policy and refunds",
      route: "/refund-policy",
    },
    {
      name: "Privacy Policy",
      route: "/privacy",
    },
    {
      name: "FAQs",
      route: "/faqs",
    },
    {
      name: "Community Guidelines",
      route: "/community-guidelines",
    },
    {
      name: "Cookie Policy",
      route: "/cookie",
    },
  ];
  return (
    <div>
      <div className="section bg-[#EDEDFF]">
        <div className="box">
          <div className="grid grid-cols-2 justify-center lg:grid-cols-4 gap-6">
            {list.map((item) => (
              <div
                className="h-[146px] lg:px-4 cursor-pointer 2xl:px-10 bg-white dark:bg-darkColorLight place-center help-shade text-center"
                onClick={() => item.route && navigate(`${item.route}`)}
              >
                <p className="fw-600 syne lg:text-lg">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockList;
