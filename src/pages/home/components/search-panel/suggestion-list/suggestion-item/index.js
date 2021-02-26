import React, { useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";

import styles from "./suggestion-item.module.scss";

const SuggestionItem = ({ data: { name, id }, onClickItem }) => {
  return (
    <div className={cs(styles.item)} onClick={onClickItem(id)}>
      {name}
    </div>
  );
};

SuggestionItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onClickItem: PropTypes.func,
};

SuggestionItem.defaultProps = {
  data: {
    id: 0,
    name: "",
  },
  onClickItem: () => {},
};

export default SuggestionItem;
