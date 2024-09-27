import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { Switch } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import { FaCloudMoon } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import SwitchButton from "../switch-btn";

interface Props {
  header?: boolean;
}
const ThemeSwitch: FC<Props> = ({ header }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDaskMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, setIsDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }
  return (
    <div className="cursor-pointer">
      {/* {!isDarkMode ? <FiSun className="text-xl"/> : <FaCloudMoon className="text-xl text-white"/>} */}
      {header ? (
        <><SwitchButton darkMode={isDarkMode} toggle={toggleDarkMode}/></>
      ) : (
        <>
          {" "}
          {isDarkMode ? (
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <FiSun className="text-2xl" /> Light theme
              </div>
              <Switch
                checked={isDarkMode}
                size={"lg"}
                onChange={toggleDarkMode}
              />
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <FaCloudMoon className="text-2xl" /> Dark theme
              </div>
              <Switch
                checked={isDarkMode}
                size={"lg"}
                onChange={toggleDarkMode}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ThemeSwitch;
