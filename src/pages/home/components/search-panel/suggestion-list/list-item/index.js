import React, { useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";

import styles from "./list-item.module.scss";

const ListItem = ({ data }) => {
  return <div className={cs(styles.item)}></div>;
};

ListItem.propTypes = {};

ListItem.defaultProps = {
  data: [],
  onBlur: () => {},
};

export default ListItem;
