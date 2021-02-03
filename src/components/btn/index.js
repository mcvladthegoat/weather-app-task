import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./btn.module.scss";

const Btn = ({ className, colorScheme, size, onClick, children }) => (
  <button
    className={cs(styles.btn, styles[colorScheme], styles[size], className)}
    onClick={onClick}
  >
    {children}
  </button>
);

Btn.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(["", "blue", "red", "white"]),
  size: PropTypes.oneOf(["sm", "md"]),
  onClick: PropTypes.func,
};

Btn.defaultProps = {
  children: null,
  className: "",
  colorScheme: "",
  size: "md",
  onClick: () => {},
};

export default Btn;
