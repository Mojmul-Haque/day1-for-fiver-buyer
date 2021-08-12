import React, { useContext } from "react";
import { connect } from "react-redux";
import { Radio, Switch, Button, message } from "antd";
import {
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  // onSwitchTheme,
  onDirectionChange,
} from "redux/actions/Theme";
import { CopyOutlined } from "@ant-design/icons";
import ColorPicker from "components/shared-components/ColorPicker";
import CopyToClipboard from "react-copy-to-clipboard";
import NavLanguage from "./NavLanguage";
import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  SIDE_NAV_DARK,
  DIR_RTL,
  DIR_LTR,
} from "constants/ThemeConstant";
import { useThemeSwitcher } from "react-css-theme-switcher";
import utils from "utils/index";
import { MainContext } from "App";
import {
  SWITCH_THEME,
  HEADER_NAV_COLOR_CHANGE,
  DIRECTION_CHANGE,
  TOGGLE_COLLAPSED_NAV,
  SIDE_NAV_STYLE_CHANGE,
} from "Context-api/actionsType/ThemeActionType";
// import { onSwitchTheme2 } from 'Context-api/actions/ThemeAction';
// import { onSwitchTheme2 } from 'Context-api/actions/ThemeAction';

const colorOptions = ["#3e82f7", "#24a772", "#de4436", "#924aca", "#193550"];

const ListOption = ({ name, selector, disabled, vertical }) => (
  <div
    className={`my-4 ${
      vertical ? "" : "d-flex align-items-center justify-content-between"
    }`}
  >
    <div
      className={`${disabled ? "opacity-0-3" : ""} ${vertical ? "mb-3" : ""}`}
    >
      {name}
    </div>
    <div>{selector}</div>
  </div>
);

export const ThemeConfigurator = ({
  navType,
  sideNavTheme,
  navCollapsed,
  topNavColor,
  headerNavColor,
  locale,
  currentTheme,
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  // onSwitchTheme,
  direction,
  onDirectionChange,
}) => {
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  const isCollapse = navCollapsed;

  //by mojmul
  // for testing purpose with react context api with reducer hooks
  const [state, dispatch] = useContext(MainContext);

  const isNavTop2 = state.navType === NAV_TYPE_TOP ? true : false;
  const isCollapse2 = state.navCollapsed;

  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    // 	onHeaderNavColorChange('')
    // 	const changedTheme = isChecked ? 'dark' : 'light'
    // 	console.log(changedTheme,'from redux')
    // 	onSwitchTheme(changedTheme)
    // switcher({ theme: themes[changedTheme] });
    console.log(isChecked, "from main context");
  };

  //handle darkmode/ligth mode by mojmul
  const toggleTheme2 = (isChecked) => {
    dispatch({ type: HEADER_NAV_COLOR_CHANGE, payload: "" });
    const changedTheme = isChecked ? "dark" : "light";
    console.log(changedTheme, "from context api");
    dispatch({ type: SWITCH_THEME, payload: changedTheme });
    switcher({ theme: themes[changedTheme] });
  };

  // change direction ltr/rtl by mojmul
  const handleDirection = (e) => {
    dispatch({ type: DIRECTION_CHANGE, payload: e.target.value });
  };

  // handle Side Nav Collapse by mojmul
  const handleSideNavCollapse = () => {
    dispatch({ type: TOGGLE_COLLAPSED_NAV, payload: !state.navCollapsed });
  };

  const ontopNavColorClick = (value) => {
    onHeaderNavColorChange("");
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    onTopNavColorChange(hex);
  };
  const onHeaderNavColorClick = (value) => {
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    onHeaderNavColorChange(hex);
  };

  const onNavTypeClick = (value) => {
    onHeaderNavColorChange("");
    if (value === NAV_TYPE_TOP) {
      onTopNavColorChange(colorOptions[0]);
      toggleCollapsedNav(false);
    }
    onNavTypeChange(value);
  };

  const genCopySettingJson = (configState) =>
    JSON.stringify(configState, null, 2);

  return (
    <>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">Navigation</h4>
        {isNavTop ? (
          <ListOption
            name="Top Nav Color:"
            vertical
            selector={
              <ColorPicker
                color={topNavColor}
                colorChange={ontopNavColorClick}
              />
            }
          />
        ) : (
          <ListOption
            name="Header Nav Color:"
            vertical
            selector={
              <ColorPicker
                color={headerNavColor}
                colorChange={onHeaderNavColorClick}
              />
            }
          />
        )}

        <ListOption
          name="Navigation Type:"
          selector={
            <Radio.Group
              size="small"
              onChange={(e) => onNavTypeClick(e.target.value)}
              value={navType}
            >
              <Radio.Button value={NAV_TYPE_SIDE}>Side</Radio.Button>
              <Radio.Button value={NAV_TYPE_TOP}>Top</Radio.Button>
            </Radio.Group>
          }
        />
        <ListOption
          name="Side Nav Color:"
          selector={
            <Radio.Group
              disabled={isNavTop}
              size="small"
              onChange={(e) => onNavStyleChange(e.target.value)}
              value={sideNavTheme}
            >
              <Radio.Button value={SIDE_NAV_LIGHT}>Light</Radio.Button>
              <Radio.Button value={SIDE_NAV_DARK}>Dark</Radio.Button>
            </Radio.Group>
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Side Nav Color test:"
          selector={
            <Radio.Group
              disabled={isNavTop}
              size="small"
              onChange={(e) =>
                dispatch({
                  type: SIDE_NAV_STYLE_CHANGE,
                  payload: e.target.value,
                })
              }
              value={state.sideNavTheme}
            >
              <Radio.Button value={SIDE_NAV_LIGHT}>Light</Radio.Button>
              <Radio.Button value={SIDE_NAV_DARK}>Dark</Radio.Button>
            </Radio.Group>
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Side Nav Collapse:"
          selector={
            <Switch
              disabled={isNavTop}
              checked={isCollapse}
              onChange={() => toggleCollapsedNav(!navCollapsed)}
            />
          }
          disabled={isNavTop}
        />
        {/* //with react context api */}
        <ListOption
          name="Nav Collapse2 by Mojmul :"
          selector={
            <Switch
              disabled={isNavTop2}
              checked={isCollapse2}
              onChange={handleSideNavCollapse}
            />
          }
          disabled={isNavTop2}
        />
        <ListOption
          name="Dark Theme:"
          selector={
            <Switch checked={currentTheme === "dark"} onChange={toggleTheme} />
          }
        />
        <ListOption
          name="Test Theme:"
          selector={
            <Switch
              checked={state.currentTheme === "dark"}
              onChange={toggleTheme2}
            />
          }
        />
        <ListOption
          name="Direction:"
          selector={
            <Radio.Group
              size="small"
              onChange={(e) => onDirectionChange(e.target.value)}
              value={direction}
            >
              <Radio.Button value={DIR_LTR}>LTR</Radio.Button>
              <Radio.Button value={DIR_RTL}>RTL</Radio.Button>
            </Radio.Group>
          }
        />
        <ListOption
          name="Direction test:"
          selector={
            <Radio.Group
              size="small"
              onChange={handleDirection}
              value={state.direction}
            >
              <Radio.Button value={DIR_LTR}>LEFT</Radio.Button>
              <Radio.Button value={DIR_RTL}>RIGHT</Radio.Button>
            </Radio.Group>
          }
        />
      </div>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">Locale</h4>
        <ListOption name="Language:" selector={<NavLanguage configDisplay />} />
      </div>
      <div>
        <CopyToClipboard
          text={genCopySettingJson({
            navType,
            sideNavTheme,
            navCollapsed,
            topNavColor,
            headerNavColor,
            locale,
            currentTheme,
            direction,
          })}
          onCopy={() =>
            message.success(
              "Copy Success, please paste it to src/configs/AppConfig.js THEME_CONFIG variable."
            )
          }
        >
          <Button icon={<CopyOutlined />} block>
            <span>Copy Setting</span>
          </Button>
        </CopyToClipboard>
      </div>
    </>
  );
};

const mapStateToProps = ({ theme }) => {
  const {
    navType,
    sideNavTheme,
    navCollapsed,
    topNavColor,
    headerNavColor,
    locale,
    currentTheme,
    direction,
  } = theme;
  return {
    navType,
    sideNavTheme,
    navCollapsed,
    topNavColor,
    headerNavColor,
    locale,
    currentTheme,
    direction,
  };
};

const mapDispatchToProps = {
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  // onSwitchTheme,
  onDirectionChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeConfigurator);
