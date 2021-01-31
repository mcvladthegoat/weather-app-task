import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./btn.module.scss";

const Btn = ({ className, colorScheme, title, onClick }) => (
  <button
    className={cs(styles.btn, styles[colorScheme], className)}
    onClick={onClick}
  >
    {title}
  </button>
);

Btn.propTypes = {
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(["blue", "red", "white"]),
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Btn.defaultProps = {
  className: "",
  colorScheme: "",
  title: "",
  onClick: () => {},
};

export default Btn;
