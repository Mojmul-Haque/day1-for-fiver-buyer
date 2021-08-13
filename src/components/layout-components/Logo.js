import React, { useContext } from "react";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
} from "constants/ThemeConstant";
import { APP_NAME } from "configs/AppConfig";
import utils from "utils";
import { Grid } from "antd";
import { MainContext } from "App";

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

const getLogo = (props) => {
  const { navCollapsed, currentTheme } = props;
  if (currentTheme === "dark") {
    if (navCollapsed) {
      return "/img/logo-sm-white.png";
    }
    return "/img/logo-white.png";
  }

  if (navCollapsed) {
    return "/img/logo-sm.png";
  }
  return "/img/logo.png";
};

const getLogoDisplay = (isMobile, mobileLogo) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo";
  }
};

export const Logo = () => {
  const [state] = useContext(MainContext);
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, state.mobileLogo)}
      style={{ width: `${getLogoWidthGutter(state, isMobile)}` }}
    >
      <img src={getLogo(state)} alt={`${APP_NAME} logo`} />
    </div>
  );
};

export default Logo;
