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
} from "Context-api/actionsType/ThemeActionType";

// swtich thme dark/light
export function onSwitchTheme2(currentTheme) {
  // dispatch({ type: SHOW_HIDE_CART });
  return {
    type: SWITCH_THEME,
    currentTheme,
  };
}

export function onHeaderNavColorChange(headerNavColor) {
  return {
    type: HEADER_NAV_COLOR_CHANGE,
    headerNavColor,
  };
}
