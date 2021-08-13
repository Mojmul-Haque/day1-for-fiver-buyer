import React, { useContext } from "react";
import { Layout } from "antd";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_DARK,
  NAV_TYPE_SIDE,
} from "constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "./MenuContent";
import { MainContext } from "App";

const { Sider } = Layout;

export const SideNav = () => {
  const [state] = useContext(MainContext);
  state.localization = true;
  state.hideGroupTitle = "";
  return (
    <Sider
      className={`side-nav ${
        state.sideNavTheme === SIDE_NAV_DARK ? "side-nav-dark" : ""
      }`}
      width={SIDE_NAV_WIDTH}
      collapsed={state.navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent type={NAV_TYPE_SIDE} {...state} />
      </Scrollbars>
    </Sider>
  );
};

export default SideNav;
