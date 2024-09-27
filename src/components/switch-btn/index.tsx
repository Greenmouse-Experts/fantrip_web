import { FC } from "react";
import "./index.css"

interface Props{
    toggle: () => void
    darkMode: boolean
}
const SwitchButton:FC<Props> = ({toggle, darkMode}) => {
  return (
    <div>
      <label className="switch-box">
        <input type="checkbox" checked={darkMode} onChange={toggle} />
        <span className="slider-box"></span>
      </label>
    </div>
  );
};

export default SwitchButton;
