import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { i18nextInit } from "../translation";
import HomePage from "./home";
import DetailsPage from "./details";
import ErrorPage from "./error";
import Routes from "../routes";
import { fetchCurrentWeather } from "../api";
import { setInitialData, restoreLocalStorage } from "../store/actions";
import { perlocateWeatherData } from "../store/routines";

import "../styles/index.scss";

i18nextInit();
moment.locale("en");

const PERLOCATE_TIMER_INTERVAL = 1000 * 60 * 5; // every 5 minutes;

const App = (props) => {
  useEffect(() => {
    const weather = localStorage.getItem("weather");
    const notes = localStorage.getItem("notes");
    if (!weather) {
      props.setInitialData();
    } else {
      props.restoreLocalStorage({ weather, notes });
    }
    const perlocateTimer = setInterval(
      () => props.perlocateWeatherData(),
      PERLOCATE_TIMER_INTERVAL
    );

    return () => clearInterval(perlocateTimer);
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  return (
    <main className="app">
      <Switch>
        <Route exact path={Routes.homePage} component={HomePage} />
        <Route path={`${Routes.detailsPage}/:id`} component={DetailsPage} />
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
      perlocateWeatherData,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(App);
