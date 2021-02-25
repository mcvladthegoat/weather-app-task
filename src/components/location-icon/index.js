import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { ReactComponent as Icon } from "./icons/location.svg";

import styles from "./location-icon.module.scss";

const LocationIcon = ({ className, size, fading, withLabel }) => (
  <span className={cs(styles.wrapper, className)}>
    <Icon
      className={cs(styles.icon, styles[size], { [styles.fading]: fading })}
      alt={i18n.t("location-icon.alt")}
    />
    {withLabel && i18n.t("location-icon.label")}
  </span>
);

LocationIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  fading: PropTypes.bool,
  withLabel: PropTypes.bool,
};

LocationIcon.defaultProps = {
  className: "",
  size: "sm",
  fading: false,
  withLabel: false,
};

export default LocationIcon;
