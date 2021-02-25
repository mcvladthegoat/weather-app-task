import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { debounce } from "lodash";
import { Btn, TextInput } from "../../../../components";
import SuggestionList from "./suggestion-list";

import styles from "./search-panel.module.scss";

const DEBOUNCE_DELAY = 500;

const SearchPanel = ({
  className,
  error,
  onSubmit,
  onSearchChange,
  onSearchClear,
  disabled,
  suggestions,
}) => {
  const [value, setValue] = useState("");
  const debouncedChange = useCallback(
    debounce((value) => onSearchChange(value), DEBOUNCE_DELAY),
    []
  );

  const handleChange = (value) => {
    setValue(value);
    if (value.trim().length > 0) {
      debouncedChange(value);
    } else {
      onSearchClear();
    }
  };
  const handleSubmit = () => !disabled && onSubmit(value);
  const handleSearchClear = () => onSearchClear();

  return (
    <div className={cs(styles.wrapper, className)}>
      <TextInput
        disabled={disabled}
        placeholder={i18n.t("pages.home.search.placeholder")}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
      <Btn className={styles.btn} theme="blue" onClick={handleSubmit}>
        {i18n.t("pages.home.search.btn")}
      </Btn>
      {/* <SuggestionList data={suggestions} onBlur={handleSearchClear} /> */}
    </div>
  );
};

SearchPanel.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchClear: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  suggestions: PropTypes.array,
};

SearchPanel.defaultProps = {
  className: "",
  error: "",
  onSearchChange: () => {},
  onSearchClear: () => {},
  onSubmit: () => {},
  disabled: false,
  suggestions: [],
};

export default SearchPanel;
