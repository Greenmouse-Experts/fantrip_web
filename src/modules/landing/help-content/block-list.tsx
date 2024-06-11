import { useNavigate } from "react-router-dom";

const BlockList = () => {
  const navigate = useNavigate();
  const list = [
    {
      name: "How Fantrip works",
      route: "",
    },
    {
      name: "Accomodation booking pricing",
      route: "",
    },
    {
      name: "Cancellation policy and refunds",
      route: "",
    },
    {
      name: "Privacy Policy",
      route: "/privacy",
    },
    {
      name: "Data Policy",
      route: "",
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map((item) => (
              <div
                className="h-[146px] lg:px-4 2xl:px-10 bg-white place-center help-shade text-center"
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
