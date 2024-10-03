import GradientListBox from "@/components/text-format/gradient-list-box";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import { PiMinusLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const FaqList = () => {
  const faqList = [
    {
      question: "What is fantrip all about?",
      answer:
        "Fantrip is an all-in-one platform tailored for sports fans, blending travel, community engagement, and exclusive sports content into a seamless fan experience. We offer a unique and affordable way to book accommodations with fellow sports enthusiasts, ensuring your stay is part of your fan journey. Our community features, including chat rooms and quizzes, create a lively space for fans to connect and share their passion. The area guide, crafted with contributions from fans, provides insider tips on local eateries, pubs, and parking, making game day navigation a breeze. Fantrip is your go-to app for an enriched, comprehensive fan experience.",
    },
    {
      question: "What is fantrip's approach to fan accommodations?",
      answer:
        "Fantrip is about connecting fans with fellow enthusiasts for accommodations. Hosts set affordable fees, encouraging fan-friendly stays. It’s about joining a fellow fan's home, sharing experiences, and the passion for the game. Fantrip holds payments and disburses them once the fan arrives, ensuring a smooth transaction. A small service fee of €5 applies if a host offers free accommodation.",
    },
    {
      question: "What type of accommodation can I book?",
      answer:
        "From couches and sofas to beds, choose what suits your fan journey. We highly recommend that hosts be present during the stay to share and enhance the fan experience. Automated communications, reminders about bookings, and reviews are sent to ensure a hassle-free experience. We advise booking in advance for major games as match information becomes available.",
    },
    {
      question: "How does fantrip ensure fair pricing for accommodations?",
      answer: (
        <p>
          At fantrip, we encourage our hosts to set competitive and fair prices.
          This approach nurtures a community-driven spirit, prioritizing the fan
          experience over profit. Hosts can view what others are charging,
          enabling them to set reasonable and attractive prices. To ensure guest
          satisfaction, payment is released to hosts only after the fan's
          arrival. For more details, please visit our{" "}
          <Link to={"/get-help"} className="text-prima underline">
            help page on pricing
          </Link>
          .
        </p>
      ),
    },
    {
      question: "How do I know I can trust my fellow fans’ listings?",
      answer:
        "Our community thrives on trust and sportsmanship. Fantrip ensures the trustworthiness of listings through a robust verification process. We verify all hosts and encourage transparency with user reviews and ratings. Hosts verify their listings using the built-in camera feature, adding an authentic touch. Additionally, we comply with GDPR data protection standards and offer hosts an option to verify their identity via government ID, earning a verification badge. This comprehensive approach ensures that you can trust and rely on the listings provided by fellow fans.",
    },
    {
      question: "How are host and guest reviews managed?",
      answer:
        "Both hosts and guests have 10 days to submit their reviews. The reviews will be published after both parties have submitted their reviews. Reviews can't be modified, ensuring authenticity and trust.",
    },
    {
      question: "What makes staying with a fellow sports fan special?",
      answer:
        "It’s all about sharing the passion! It’s like a game day with a friend! Staying with a fellow sports fan is more than finding a place to crash; it's about sharing high-fives and cheers, diving into match-day banter, and soaking up the electric atmosphere together. It's a shared journey of excitement and fun where every match feels like a home game, no matter where you are!",
    },
    {
      question: "What if my game plan changes, and I need to cancel my stay?",
      answer:
        "No sweat! Each fan host has their cancellation playbook, so just check their policy before you book, and you'll know exactly what to expect.",
    },
    {
      question: "How do I connect with a host?",
      answer:
        "Once you’ve picked your listing, you can directly message the host or seller. It’s like passing the ball – simple and direct!",
    },
    {
      question: "I’ve got an extra spare room. How do I list them?",
      answer:
        "Yes, if you're a sports fan with a spare room, you can list them on our platform. Join the team! Just follow our easy steps to list your tickets or fan space. Help make someone’s game day unforgettable!",
    },
    {
      question: "What if there’s a foul play during my stay?",
      answer:
        "Flag it immediately! Our support team is here to run interference and get things back on track.",
    },
    {
      question: "How does the platform help with area guide recommendations??",
      answer:
        "We've got your back! Think of us as your game-day assistant. Fans are always looking for authentic recommendations on where to eat, dine, find the best sports bars, or explore sightseeing spots, especially when traveling for away games. So we thought, why not have these recommendations come directly from fans like you? Yup! We hook you up with top fan-approved spots for eating and celebrating and also tackle one of the trickiest parts of game day – parking! Say goodbye to the endless circling for a spot. Our platform offers recommendations for the best parking spots close to the stadium, all suggested by local fans. Whether it's the hottest post-game hangout or the closest parking space, we've got the insider info to make your match day smooth and fun.",
    },
    {
      question: "Can I contribute to the Area Guide?",
      answer:
        "Absolutely! Navigate to “Submit a Recommendation,” fill in the details, and submit. Your input helps fellow fans discover the best spots for their matchday experience.",
    },
    {
      question: "What are fantrip's Chat Room and Game Quiz features?",
      answer:
        "Our integrated chat room is a hub for fans to discuss games, share opinions, and participate in quizzes. The chat room allows for dynamic engagement, offering a virtual tailgate party experience. Quizzes provide a fun way to test your sports knowledge with real-time results and a community leaderboard.",
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
          <div
            className="bg-faq-gradient p-[1.5px] rounded-[17px]  mb-3 lg:mb-5"
            key={i}
          >
            <AccordionItem className="!border-none bg-white rounded-[17px] xl:px-2 overflow-hidden">
              {({ isExpanded }) => (
                <>
                  <h2
                    className={`bg-white px-5 py-4 ${
                      isExpanded ? "" : "rounded-xl"
                    }`}
                  >
                    <AccordionButton className="flex !px-0 justify-between hover:!bg-white">
                      <p className="fw-500 syne text-left lg:text-xl dark:!text-black">
                        {item.question}
                      </p>
                      {isExpanded ? (
                        <PiMinusLight fontSize="24px" className="text-black" />
                      ) : (
                        <BsPlusLg fontSize="22px" className="text-black" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className="bg-white !px-5">
                    <div className="flex gap-x-2">
                      <div className="w-[12px] shrink-0 relative top-[5px]">
                        <GradientListBox />
                      </div>
                      <p className="dark:!text-black">{item.answer}</p>
                    </div>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqList;
