import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { i18nextInit } from "../translation";
import Routes from "../routes";
import HomePage from "./home";
import DetailsPage from "./details";
import ErrorPage from "./error";
import { fetchCurrentWeather } from "../api";
import { setInitialData, restoreLocalStorage } from "../store/actions";

import "../styles/index.scss";

i18nextInit();

const App = (props) => {
  useEffect(() => {
    const weather = localStorage.getItem("weather");
    const notes = localStorage.getItem("notes");
    if (!weather) {
      props.setInitialData();
    } else {
      props.restoreLocalStorage({ weather, notes });
    }
  }, []);

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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCurrentWeather,
      setInitialData,
      restoreLocalStorage,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(App);
