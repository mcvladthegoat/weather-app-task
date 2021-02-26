import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { ReactComponent as Icon } from "./icons/location.svg";

import styles from "./location-icon.module.scss";

const LocationIcon = ({ className, size, fading, label, onClick }) => (
  <div className={cs(styles.wrapper, className)} onClick={onClick}>
    <Icon
      className={cs(styles.icon, styles[size], { [styles.fading]: fading })}
      alt={i18n.t("location-icon.alt")}
    />
    <span>{label}</span>
  </div>
);

LocationIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  fading: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

LocationIcon.defaultProps = {
  className: "",
  size: "sm",
  fading: false,
  label: "",
  onClick: () => {},
};

export default LocationIcon;
