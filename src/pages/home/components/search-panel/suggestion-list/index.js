import React, { useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { ItemList } from "../../../../../components";

import styles from "./suggestion-list.module.scss";

const SuggestionList = ({ data }) => {
  return <div className={cs(styles.wrapper)}></div>;
};

SuggestionList.propTypes = {
  data: PropTypes.array,
  onBlur: PropTypes.func,
};

SuggestionList.defaultProps = {
  data: [],
  onBlur: () => {},
};

export default SuggestionList;
