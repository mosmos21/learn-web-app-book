import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { SignInPage } from "~/pages/auth/sign_in";
import { SignUpPage } from "~/pages/auth/sign_up";
import { TopPage } from "~/pages/top";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth/sign_in" exact>
        <SignInPage />
      </Route>
      <Route path="/auth/sign_up" exact>
        <SignUpPage />
      </Route>
      <Route path="/" exact>
        <TopPage />
      </Route>
    </Switch>
  </BrowserRouter>
);
