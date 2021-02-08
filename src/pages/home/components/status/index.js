import React from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { LocationIcon } from "../../../../components";

import styles from "./status.module.scss";

const Status = ({ loading, userLocationRequested }) => (
  <>
    {!userLocationRequested ? (
      <LocationIcon fading withLabel />
    ) : (
      loading && (
        <span className={styles.loading}>{i18n.t("pages.home.loading")}</span>
      )
    )}
  </>
);

Status.propTypes = {
  loading: PropTypes.bool,
  userLocationRequested: PropTypes.bool,
};

Status.defaultProps = {
  loading: false,
  userLocationRequested: false,
};

export default Status;
