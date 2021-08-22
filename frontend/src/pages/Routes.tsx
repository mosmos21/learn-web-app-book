import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { TopPage } from "~/pages/top";
import { SignInPage } from "~/pages/auth/signIn";
import { SignUpPage } from "~/pages/auth/signUp";
import { CategoriesPage } from "~/pages/categories";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <TopPage />
      </Route>
      <Route path="/auth/sign_in" exact>
        <SignInPage />
      </Route>
      <Route path="/auth/sign_up" exact>
        <SignUpPage />
      </Route>
      <Route path="/categories" exact>
        <CategoriesPage />
      </Route>
    </Switch>
  </BrowserRouter>
);
