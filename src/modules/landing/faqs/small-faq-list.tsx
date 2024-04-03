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
      question: "What is Fantrip all about?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Can I contribute to the Area Guide?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How do I connect with a host?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "How does Fantrip comply with GDPR?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  return (
    <div>
      <Accordion allowToggle>
        {faqList.map((item, i) => (
          <AccordionItem key={i} className="!border-none rounded-md overflow-hidden mb-3">
            {({ isExpanded }) => (
              <>
                <h2 className={`bg-white px-5 py-4 ${isExpanded? "" : "rounded-xl"}`}>
                  <AccordionButton className="flex justify-between hover:!bg-white">
                    <p className="fw-500">{item.question}</p>
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
