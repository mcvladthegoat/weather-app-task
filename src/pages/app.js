import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Routes from "../routes";
import HomePage from "./home";
import DetailsPage from "./details";
import ErrorPage from "./error";
import "../styles/index.scss";

const App = () => {
  return (
    <main className="app">
      <Switch>
        <Route exact path={Routes.homePage} component={HomePage} />
        <Route path={Routes.detailsPage} component={DetailsPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </main>
  );
};

export default App;
