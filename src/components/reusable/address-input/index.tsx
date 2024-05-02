import axios from "axios";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const AutoCompleteAddressInput = () => {
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState([]);
  const debounced = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 1000);
  const handleSearch = async (item: string) => {
    setInputVal(item)
    await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json
    ?input=${item}`)
    .then((res:any) => {
        setResult(res.predictions)
    })
  };
  console.log(result);
  
  return (
    <div>
      <div>
        <input
          type="text"
          value={inputVal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debounced(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default AutoCompleteAddressInput;
