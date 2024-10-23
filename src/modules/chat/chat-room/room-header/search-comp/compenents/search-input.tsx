import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  return (
    <div className="w-full flex items-center gap-x-2 bg-[#EFEFEF] dark:bg-darkColorLight dark:border-white dark:border rounded-full px-2 lg:px-6">
      <FiSearch className="text-xl shrink-0 dark:text-white" />
      <input
        type="search"
        placeholder="Search fantrip"
        className="border-none outline-none bg-transparent p-2 w-full rounded-r-full dark:text-white"
      />
    </div>
  );
};

export default SearchInput;
