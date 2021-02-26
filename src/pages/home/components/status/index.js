import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { LocationIcon } from "../../../../components";

import styles from "./status.module.scss";

const Status = ({ error, loading, userLocation, onUserLocationLinkClick }) => {
  const locationIconProps = {
    fading: !userLocation.requested,
    label: !userLocation.requested
      ? i18n.t("pages.home.location-icon.finding-label")
      : i18n.t("pages.home.location-icon.open-page-label"),
  };
  const hasUserDeniedLocationRequest =
    userLocation.requested && !userLocation.id;

  return (
    <div className={styles.wrapper}>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <div className={styles.loading}>{i18n.t("pages.home.loading")}</div>
      ) : (
        !hasUserDeniedLocationRequest && (
          <LocationIcon
            className={cs({ [styles.locationIconActive]: !!userLocation.id })}
            {...locationIconProps}
            onClick={onUserLocationLinkClick}
          />
        )
      )}
    </div>
  );
};

Status.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  userLocation: PropTypes.shape({
    requested: PropTypes.bool,
    id: PropTypes.string,
  }).isRequired,
  onUserLocationLinkClick: PropTypes.func,
};

Status.defaultProps = {
  error: "",
  loading: false,
  onUserLocationLinkClick: () => {},
};

export default Status;
