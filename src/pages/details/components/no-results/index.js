import React from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { Link } from "react-router-dom";
import Routes from "../../../../routes";

import styles from "./no-results.module.scss";

const NoResults = ({ error }) => (
  <div className={styles.wrapper}>
    <h3>{error}</h3>
    <Link to={Routes.homePage}>{i18n.t("pages.details.go-home")}</Link>
  </div>
);

NoResults.propTypes = {
  error: PropTypes.string.isRequired,
};

export default NoResults;
