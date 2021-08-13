import React, { useContext } from "react";
import { NAV_TYPE_TOP } from "constants/ThemeConstant";
import utils from "utils";
import MenuContent from "./MenuContent";
import { MainContext } from "App";

export const TopNav = () => {
  const [state] = useContext(MainContext);
  return (
    <div
      className={`top-nav ${utils.getColorContrast(state.topNavColor)}`}
      style={{ backgroundColor: state.topNavColor }}
    >
      <div className="top-nav-wrapper">
        <MenuContent type={NAV_TYPE_TOP} {...state} />
      </div>
    </div>
  );
};

export default TopNav;
