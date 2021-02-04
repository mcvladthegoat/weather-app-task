import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import icon from "./icon.svg";

import styles from "./loader.module.scss";

const Loader = ({ className }) => (
  <div className={cs(styles.wrapper, className)}>
    <img className={styles.loader} src={icon} />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: "",
};

export default Loader;
