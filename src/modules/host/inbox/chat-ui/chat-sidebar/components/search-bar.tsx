import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div>
      <div className="bg-[#1A1A1A] w-full rounded-full items-center px-2 flex">
        <CiSearch className="text-2xl shrink-0 text-gray-500" />
        <input
          type="search"
          className="w-full bg-transparent p-3 border-none outline-none"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
