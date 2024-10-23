import { FC } from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: FC<Props> = ({ value, setValue }) => {
  return (
    <div>
      <div className=" dark:bg-darkColorLight border bg-white w-full rounded-full items-center px-2 flex">
        <CiSearch className="text-2xl shrink-0 text-gray-500" />
        <input
          type="search"
          className="w-full bg-transparent p-3 border-none outline-none rounded-r-full"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
