import React from "react";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Panel from "../../components/panel";
import Btn from "../../components/btn";
import SearchPanel from "../../components/search-panel";

import { fetchCurrentWeather } from "../../api";
import styles from "./details.module.scss";

const DetailsPage = (props) => {
  return (
    <>
      <Helmet>
        <title>{i18next.t("pages.details.title")}</title>
      </Helmet>
    </>
  );
};

const mapStateToProps = ({ root }) => ({
  loading: root.loading,
  error: root.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCurrentWeather }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
