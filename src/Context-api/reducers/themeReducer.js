import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
  DIR_LTR,
} from "../../constants/ThemeConstant";
import {
  TOGGLE_COLLAPSED_NAV,
  CHANGE_LOCALE,
  SIDE_NAV_STYLE_CHANGE,
  NAV_TYPE_CHANGE,
  TOP_NAV_COLOR_CHANGE,
  HEADER_NAV_COLOR_CHANGE,
  TOGGLE_MOBILE_NAV,
  SWITCH_THEME,
  DIRECTION_CHANGE,
} from "../actionsType/ThemeActionType";

export const initialThemeState = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  locale: "en",
  navType: NAV_TYPE_SIDE,
  topNavColor: "#3e82f7",
  headerNavColor: "",
  mobileNav: false,
  currentTheme: "light",
  direction: DIR_LTR,
};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.payload,
      };
    case SIDE_NAV_STYLE_CHANGE:
      console.log(action.payload,'from sideNavStyleChange reducer');
      return {
        ...state,
        sideNavTheme: action.payload,
      };
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };
    case NAV_TYPE_CHANGE:
      return {
        ...state,
        navType: action.navType,
      };
    case TOP_NAV_COLOR_CHANGE:
      return {
        ...state,
        topNavColor: action.topNavColor,
      };
    case HEADER_NAV_COLOR_CHANGE:
      console.log(action.payload, "from thme reducer with main context");
      return {
        ...state,
        headerNavColor: action.payload,
      };
    case TOGGLE_MOBILE_NAV:

      console.log(action.payload)
      return {
        ...state,
        mobileNav: action.payload,
      };
    case SWITCH_THEME:
      console.log(action.payload, "from thme reducer with main context");
      return {
        ...state,
        // currentTheme: action.currentTheme,
        currentTheme: action.payload,
      };
    case DIRECTION_CHANGE:
      console.log(action.payload, "from direction change with theme reducer");
      return {
        ...state,
        direction: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
