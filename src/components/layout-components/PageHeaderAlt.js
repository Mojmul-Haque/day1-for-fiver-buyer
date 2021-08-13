import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { NAV_TYPE_TOP } from "constants/ThemeConstant";
import { MainContext } from "App";

export const PageHeaderAlt = ({ children, background, className, overlap }) => {
  const [state] = useContext(MainContext);
  const { navType } = state;
  const [widthOffset, setWidthOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (navType === NAV_TYPE_TOP) {
      const windowSize = window.innerWidth;
      const pageHeaderSize = ref.current.offsetWidth;
      setWidthOffset((windowSize - pageHeaderSize) / 2);
    }
  }, [navType]);

  const getStyle = () => {
    let style = { backgroundImage: background ? `url(${background})` : "none" };
    if (navType === NAV_TYPE_TOP) {
      style.marginRight = -widthOffset;
      style.marginLeft = -widthOffset;
      style.paddingLeft = 0;
      style.paddingRight = 0;
    }
    return style;
  };

  return (
    <div
      ref={ref}
      className={`page-header-alt ${className ? className : ""} ${
        overlap && "overlap"
      }`}
      style={getStyle()}
    >
      {navType === NAV_TYPE_TOP ? (
        <div className="container">{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

PageHeaderAlt.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  className: PropTypes.string,
  overlap: PropTypes.bool,
};

export default PageHeaderAlt;
