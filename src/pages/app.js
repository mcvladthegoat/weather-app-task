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

import "../styles/index.scss";

i18nextInit();
moment.locale("en");

const App = (props) => {
  useEffect(() => {
    const weather = localStorage.getItem("weather");
    const notes = localStorage.getItem("notes");
    if (!weather) {
      props.setInitialData();
    } else {
      props.restoreLocalStorage({ weather, notes });
    }
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
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(App);
