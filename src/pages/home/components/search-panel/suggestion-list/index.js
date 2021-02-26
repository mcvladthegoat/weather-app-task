import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import { ItemList } from "../../../../../components";
import SuggestionItem from "./suggestion-item";

import styles from "./suggestion-list.module.scss";

const SuggestionList = ({ data, disabled, onClickItem }) => {
  return (
    <>
      {data.length > 0 && !disabled && (
        <div className={cs(styles.wrapper)}>
          <ItemList
            className={styles.list}
            items={data}
            itemTemplate={<SuggestionItem />}
            eventHandlers={{
              onClickItem,
            }}
            showEditBtn={false}
            keyPrefix="suggestions"
          />
        </div>
      )}
    </>
  );
};

SuggestionList.propTypes = {
  data: PropTypes.array,
  disabled: PropTypes.bool,
  onClickItem: PropTypes.func,
};

SuggestionList.defaultProps = {
  data: [],
  disabled: true,
  onClickItem: () => {},
};

export default SuggestionList;
