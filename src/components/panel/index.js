import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./panel.module.scss";

const Panel = ({ className, children, styleScheme }) => (
  <div className={cs(styles.panel, styles[styleScheme], className)}>
    {children}
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  styleScheme: PropTypes.oneOf(["gray", "white"]),
};

Panel.defaultProps = {
  className: "",
  children: null,
  styleScheme: "gray",
};

export default Panel;
