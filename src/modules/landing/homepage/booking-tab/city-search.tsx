import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const CitySearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [lists, setLists] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  return (
    <div className="relative">
      <div className="flex gap-x-2 items-center relative top-4 lg:top-0">
        <IoSearch className="text-xl" />
        <input
          type="text"
          className="w-full lg:w-auto outline-none p-2 placeholder:text-black"
          placeholder="Enter city or region"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setShowSearch(true)}
          onBlur={() => setShowSearch(false)}
        />
      </div>
      {showSearch && (
        <div className="absolute top-12 left-4 bg-white rounded w-full p-3 form-shadow">
          <ul className="grid gap-1 ">
            {lists.map((item: any) => (
              <li
                className="bg-light"
                key={item.cityId}
                onClick={() => setLists(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
