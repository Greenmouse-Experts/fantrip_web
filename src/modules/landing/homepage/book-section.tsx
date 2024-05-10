import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";
import MeetComponent from "../extra/meet-comp";

const BookSection = () => {
  const data = [
    {
      intro:
        "Hey there, I’m Chris! Been a die-hard Liverpool fan since ‘02, it’s more than a passion, it’s family heritage.",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711979997/fantrip/Rectangle_20107_afabg0.png",
      room_img:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711980003/fantrip/Rectangle_20108_ycmk5u.png",
      perks: [
        "2 Twin Beds ",
        "Game Day Décor",
        "Sporty Suite",
        "Short Walk to Arena",
      ],
    },
    {
      intro:
        "Hey there, I’m Elena, representing the La Albiceleste with pride. My love for football is intertwined with my Argentinian roots.",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711979997/fantrip/Rectangle_20107_1_qy0z9z.png",
      room_img:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711980000/fantrip/Rectangle_20108_1_uuqyhw.png",
      perks: ["Soccer Star Stay", "Modern Condo", "I Double Bed"],
    },
    {
      intro:
        "Hey there, I’m Greg!Die-hard Blue Jays enthusiast. True to the blue and white. Always cheering for the Toronto ball club.",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711979996/fantrip/Rectangle_20107_2_tahwx2.png",
      room_img:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711980002/fantrip/Rectangle_20108_2_otb6sq.png",
      perks: ["Medium sized Bed", "Wall 2 Wall Insp...", "15 Min to Arena"],
    },
  ];
  return (
    <div className="section pt-4">
      <div className="box">
        <div>
          <p className="lg:w-8/12 fw-500 mx-auto text-center syne text-2xl">
            Swap those cookie-cutter hotel vibes and anonymous hosts for a home
            where the sports spirit lives! 😉 See your fan host in their proud
            team colours
          </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {data.map((item, i) => (
            <MeetComponent item={item} i={i} />
          ))}
        </div>
        <div className="mt-12 lg:mt-24 flex justify-center">
            <Link to={'/find-stay'} className="btn-primary py-5 px-16">
                <BtnContent name="Book a stay with a fan"/>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
