import React, { Component } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./btn.module.scss";

const Btn = (props) => {
  const handleClick = () => props.onClick && props.onClick();
  const colorScheme = styles[props.colorScheme];

  return (
    <button
      className={cs(styles.btn, colorScheme, props.className)}
      onClick={handleClick}
    >
      {props.title}
    </button>
  );
};

Btn.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  colorScheme: PropTypes.string,
  onClick: PropTypes.func,
};

Btn.defaultProps = {
  title: "",
  className: "",
  colorScheme: "",
  onClick: () => {},
};

export default Btn;
