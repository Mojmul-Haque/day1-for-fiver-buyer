import React, { useContext } from "react";
import { connect } from "react-redux";
import { NAV_TYPE_TOP } from "constants/ThemeConstant";
import utils from "utils";
import MenuContent from "./MenuContent";
import { MainContext } from "App";

export const TopNav = ({ topNavColor, localization = true }) => {
  const [state] = useContext(MainContext);
  // const  { topNavColor, localization } =state
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

const mapStateToProps = ({ theme }) => {
  const { topNavColor } = theme;
  return { topNavColor };
};

export default connect(mapStateToProps)(TopNav);
