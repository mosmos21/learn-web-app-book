import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { SignInPage } from "~/pages/auth/signIn";
import { SignUpPage } from "~/pages/auth/signUp";
import { CategoriesPage } from "~/pages/categories";
import { TopPage } from "~/pages/top";
import { SettingsPage } from "~/pages/settings";

type RouteDef = {
  path: string;
  Component: React.ComponentType;
};

const routes: RouteDef[] = [
  {
    path: "/",
    Component: TopPage,
  },
  {
    path: "/auth/sign_in",
    Component: SignInPage,
  },
  {
    path: "/auth/sign_up",
    Component: SignUpPage,
  },
  {
    path: "/categories",
    Component: CategoriesPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
];

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} exact>
          <Component />
        </Route>
      ))}
    </Switch>
  </BrowserRouter>
);
