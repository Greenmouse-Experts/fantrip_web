import Button from "@/components/Button";
import { IoSearch } from "react-icons/io5";

interface ISearch{
  setSearchInput: (input: string) => void;
}

const LocationSearchBox = ({ setSearchInput }:ISearch) => {
  return (
    <div className="box">
      <div className="w-full bg-white dark:bg-darkColorLight lg:rounded-[100px] book-tab-border px-3 py-2 lg:pl-12">
        <div className="lg:flex w-full ">
          <div className="w-full flex items-center px-2">
            <div className="border-r w-10 shrink-0 border-[#494949]">
              <IoSearch className="text-lg dark:invert" />
            </div>
            <input
              type="search"
              placeholder="Search by destination, attraction or activity"
              className="p-2 border-none w-full outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="mt-8 lg:mt-0 shrink-0">
            <Button
              title={"Search"}
              altClassName="btn-primary w-full lg:w-auto shrink-0 py-4 lg:py-5 lg:px-16 fw-600 px-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchBox;
