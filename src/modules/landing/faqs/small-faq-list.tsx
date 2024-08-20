import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";

const SmallFaqList = () => {
  const faqList = [
    {
      question: "What is fantrip all about?",
      answer:
        "Fantrip is an all-in-one platform tailored for sports fans, blending travel, community engagement, and exclusive sports content into a seamless fan experience. We offer a unique and affordable way to book accommodations with fellow sports enthusiasts, ensuring your stay is part of your fan journey. ",
    },
    {
      question: "Can I contribute to the Area Guide?",
      answer:
        "Absolutely! Navigate to “Submit a Recommendation” in your dashboard, fill in the details, and submit. Your input helps fellow fans discover the best spots for their matchday experience.",
    },
    {
      question: "How do I connect with a host?",
      answer:
        "Once you’ve picked your listing, you can directly message the host or seller. It’s like passing the ball – simple and direct!",
    },
    {
      question: "How does fantrip comply with GDPR?",
      answer:
        "We take data privacy seriously. Informed consent is obtained for location data to be processed and protected under GDPR standards. We respect your data privacy rights, including the right to know what information is held about you and to request its deletion.",
    },
  ];
  return (
    <div>
      <Accordion allowToggle>
        {faqList.map((item, i) => (
          <AccordionItem key={i} className="!border-none rounded-md overflow-hidden mb-3">
            {({ isExpanded }) => (
              <>
                <h2 className={`bg-white px-5 py-4 dark:!text-black ${isExpanded? "" : "rounded-xl"}`}>
                  <AccordionButton className="flex justify-between hover:!bg-white">
                    <p className="fw-500 dark:!text-black">{item.question}</p>
                    {isExpanded ? (
                      <FaMinus fontSize="12px" />
                    ) : (
                      <FaPlus fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="bg-white px-5">{item.answer}</AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SmallFaqList;
