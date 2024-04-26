import { useState } from "react";
import Calendar from "react-calendar";

const Availability = () => {
  const [params, setParams] = useState<any>({
    checkIn: null,
    checkOut: null,
  });
  const newDate = new Date();
const add  = 5
const test = newDate.setDate(newDate.getDate() + add)
  const handleChange = (val: any, field: string) => {
    setParams({ ...params, [field]: val });
  };
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div>
        <p className="fw-600 lg:text-lg">Availability</p>
      </div>
      <div className="mt-6 flex">
        <div className="bg-[#FFEDF2] px-3 lg:px-6 fw-500 py-3">
          Choose accurate date for fan stay booking
        </div>
      </div>
      <div className="mt-12">
        <Calendar
          onChange={(value) => handleChange(value, "checkIn")}
          value={[params.checkIn, params.checkOut]}
          className={"lg:w-[400px] overflow-hidden"}
          minDate={new Date()}
          maxDate={new Date(test)}
        />
      </div>
    </div>
  );
};

export default Availability;
