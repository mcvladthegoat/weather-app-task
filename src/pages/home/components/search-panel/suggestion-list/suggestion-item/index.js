import React from "react";
import PropTypes from "prop-types";

import styles from "./suggestion-item.module.scss";

const SuggestionItem = ({ data: { name, id }, onClickItem }) => (
  <div className={styles.item} onClick={onClickItem(id)}>
    {name}
  </div>
);

SuggestionItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onClickItem: PropTypes.func,
};

SuggestionItem.defaultProps = {
  data: {
    id: "",
    name: "",
  },
  onClickItem: () => {},
};

export default SuggestionItem;
