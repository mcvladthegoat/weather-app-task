import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./panel.module.scss";

const Panel = ({ className, children }) => (
  <div className={cs(styles.panel, className)}>{children}</div>
);

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Panel.defaultProps = {
  className: "",
  children: null,
};

export default Panel;
