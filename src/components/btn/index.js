import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";

import styles from "./btn.module.scss";

const Btn = ({ className, children, hoverTitle, onClick, size, theme }) => (
  <button
    className={cs(styles.btn, styles[theme], styles[size], className)}
    onClick={onClick}
    title={hoverTitle}
  >
    {children}
  </button>
);

Btn.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  hoverTitle: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md"]),
  theme: PropTypes.oneOf(["", "blue", "red", "white", "link"]),
};

Btn.defaultProps = {
  children: null,
  className: "",
  hoverTitle: "",
  onClick: () => {},
  size: "md",
  theme: "",
};

export default Btn;
