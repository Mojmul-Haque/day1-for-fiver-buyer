import React, { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import NavPanel from "./NavPanel";
import NavSearch from "./NavSearch";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";
import { MainContext } from "App";
import {
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_MOBILE_NAV,
} from "Context-api/actionsType/ThemeActionType";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Header } = Layout;

export const HeaderNav = () => {
  const [state, dispatch] = useContext(MainContext);
  const { direction, currentTheme, headerNavColor } = state;
  const [searchActive, setSearchActive] = useState(false);
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const onSearchClose = () => {
    setSearchActive(false);
  };
  const onToggle = () => {
    if (!isMobile) {
      dispatch({ type: TOGGLE_COLLAPSED_NAV, payload: !state.navCollapsed });
    } else {
      dispatch({ type: TOGGLE_MOBILE_NAV, payload: !state.mobileNav });
    }
  };

  const isNavTop = state.navType === NAV_TYPE_TOP ? true : false;
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (state.navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };
  useEffect(() => {
    if (!isMobile) {
      onSearchClose();
    }
  });

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
        <Logo logoType={navMode} />
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              {isNavTop && !isMobile ? null : (
                <li
                  className="ant-menu-item ant-menu-item-only-child"
                  onClick={() => {
                    onToggle();
                  }}
                >
                  {state.navCollapsed || isMobile ? (
                    <MenuUnfoldOutlined className="nav-icon" />
                  ) : (
                    <MenuFoldOutlined className="nav-icon" />
                  )}
                </li>
              )}
            </ul>
          </div>
          <div className="nav-right">
            <NavPanel direction={direction} />
          </div>
          <NavSearch active={searchActive} close={onSearchClose} />
        </div>
      </div>
    </Header>
  );
};
export default HeaderNav;
