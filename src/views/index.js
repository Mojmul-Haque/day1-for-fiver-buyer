import React, { useContext } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import useBodyClass from "hooks/useBodyClass";
import { MainContext } from "App";

export const Views = () => {
  const [state] = useContext(MainContext); //from app.js
  const { locale, direction } = state;
  const location = useLocation();

  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <Route path={APP_PREFIX_PATH}>
            <AppLayout direction={direction} location={location} />
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default Views;
