import React from "react";
import { Helmet } from "react-helmet";
import styles from "./error.module.scss";

const ErrorPage = (props) => {
  return (
    <div className="App">
      <Helmet>
        <title>Something went wrong | Weather app</title>
      </Helmet>
      <header className="App-header">ERROR</header>
    </div>
  );
};

export default ErrorPage;
