import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./btn.module.scss";

const Btn = ({ className, colorScheme, onClick, children }) => (
  <button
    className={cs(styles.btn, styles[colorScheme], className)}
    onClick={onClick}
  >
    {children}
  </button>
);

Btn.propTypes = {
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(["", "blue", "red", "white"]),
  onClick: PropTypes.func,
};

Btn.defaultProps = {
  className: "",
  colorScheme: "",
  onClick: () => {},
};

export default Btn;
