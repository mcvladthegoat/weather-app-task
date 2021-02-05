import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import icon from "./icon.svg";

import styles from "./location-icon.module.scss";

const LocationIcon = ({ className, size }) => (
  <img
    src={icon}
    className={cs(styles.icon, className, styles[size])}
    alt="your location"
  />
);

LocationIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
};

LocationIcon.defaultProps = {
  className: "",
  size: "sm",
};

export default LocationIcon;
