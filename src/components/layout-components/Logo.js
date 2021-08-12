import React, { useContext } from 'react'
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from 'constants/ThemeConstant';
import { APP_NAME } from 'configs/AppConfig';
import { connect } from "react-redux";
import utils from 'utils';
import { Grid } from 'antd';
import { MainContext } from 'App';

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  console.log(props,'gettLogwidt from llogo')
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  if(isMobile && !props.mobileLogo) {
    return 0
  }
  if(isNavTop) {
    return 'auto'
  }
  if(navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`
  } else {
    return `${SIDE_NAV_WIDTH}px`
  }
}

const getLogo = (props) => {
  const { navCollapsed, logoType } = props;
  if(logoType === 'light') {
    if(navCollapsed) {
      return '/img/logo-sm-white.png'
    }
    return '/img/logo-white.png'
  }

  if (navCollapsed) {
    return '/img/logo-sm.png'
  }
  return '/img/logo.png'
}

const getLogoDisplay = (isMobile, mobileLogo) => {
  if(isMobile && !mobileLogo) {
    return 'd-none'
  } else {
    return 'logo'
  }
}

export const Logo = (props) => {
  const [state, dispatch] = useContext(MainContext);
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  return (
    <div
      className={getLogoDisplay(isMobile, state.mobileLogo)} 
      style={{width: `${getLogoWidthGutter(state, isMobile)}`}}>
      <img src={getLogo(state)} alt={`${APP_NAME} logo`}/>
    </div>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } =  theme;
  return { navCollapsed, navType }
};

export default connect(mapStateToProps)(Logo);
