import logo from "@/assets/logo_1.svg";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { LuKeyRound } from "react-icons/lu";
import { Link } from "react-router-dom";
const LandingHeader = () => {
    const [change, setChange] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          if (scrollY > 100) {
            setChange(true); // Change to whatever color you want
          } else {
            setChange(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <div>
      <div className="fixed z-10 left-0 top-6 w-full">
        <div className="box duration-100">
          <div className={`${change? "bg-gradient" : "bg-[#FFFFFF33]"} rounded-[50px] p-5 lg:px-12 flex justify-between items-center`}>
            <div>
              <img src={logo} alt="logo" />
            </div>
            <div>
              <ul className="flex items-center gap-x-6 lg:gap-x-10 text-white">
                <li>
                  <Link to={""}>Get the app</Link>
                </li>
                <li>
                  <Menu>
                    <MenuButton ><div className="flex gap-x-2 items-center">Actions <ChevronDownIcon className="text-xs" /></div></MenuButton>
                    <MenuList>
                      <MenuItem className="border-b !py-3">
                        <Link to={''} className="flex gap-x-3 items-center text-black">
                            <FaRegUser className="text-xl"/>
                            <p>Guest</p>
                        </Link>
                      </MenuItem>
                      <MenuItem className="!py-3">
                      <Link to={''} className="flex gap-x-3 items-center text-black">
                            <LuKeyRound className="text-xl"/>
                            <p>Host</p>
                        </Link></MenuItem>
                    </MenuList>
                  </Menu>
                </li>
                <li>
                  <Link to={""}>Find a fan stay</Link>
                </li>
                <li>
                  <Link to={""}>Host a fan</Link>
                </li>
                <li>
                  <Link to={""}>FAQs</Link>
                </li>
                <li>
                  <Link to={""}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
