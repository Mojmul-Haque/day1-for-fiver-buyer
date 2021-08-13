import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import utils from "utils";
import SearchInput from "./SearchInput";
import { MainContext } from "App";

export const NavSearch = (props) => {
  const { active, close } = props;
  const [state] = useContext(MainContext);
  const { headerNavColor } = state;
  const mode = utils.getColorContrast(headerNavColor);

  return (
    <div
      className={`nav-search ${active ? "nav-search-active" : ""} ${mode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className="d-flex align-items-center w-100">
        <SearchInput close={close} active={active} />
      </div>
      <div className="nav-close" onClick={close}>
        <CloseOutlined />
      </div>
    </div>
  );
};


export default (NavSearch);
