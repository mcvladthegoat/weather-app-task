import React, { Component } from 'react';
import cs from 'classnames';
import styles from './btn.module.scss';

const Btn = props => {
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

export default Btn;
