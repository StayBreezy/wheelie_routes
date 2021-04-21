import React from "react";
import { Switch, Route } from "react-router-dom";
import RoutePage from "./components/RoutePage";
import Profile from "./components/Profile";
import Auth from "./components/Auth";
import Upload from "./components/Upload";
import Main from "./components/Main";
import App from "./App";

export default (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/login" component={Auth} />
    <Route path="/profile/:username" component={Profile} />
    <Route path="/route/:id" component={RoutePage} />
    <Route path="/upload" component={Upload} />
  </Switch>
);
