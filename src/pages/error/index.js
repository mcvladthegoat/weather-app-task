import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import i18n from "i18next";
import Routes from "../../routes";

const ErrorPage = (props) => {
  return (
    <>
      <Helmet>
        <title>{i18n.t("pages.error.title")}</title>
      </Helmet>
      <h2>{i18n.t("pages.error.header")}</h2>
      <Link to={Routes.homePage}>{i18n.t("pages.error.link")}</Link>
    </>
  );
};

export default ErrorPage;
