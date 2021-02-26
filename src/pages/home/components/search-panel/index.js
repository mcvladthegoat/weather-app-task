import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import Perimeter from "react-outside-click-handler";
import { debounce } from "lodash";
import { Btn, TextInput } from "../../../../components";
import SuggestionList from "./suggestion-list";

import styles from "./search-panel.module.scss";

const DEBOUNCE_DELAY = 400;

const SearchPanel = ({
  className,
  onSubmit,
  onSearchChange,
  onSearchClear,
  disabled,
  suggestions,
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
  const handleSuggestionItemClick = (id) => () => {
    if (!disabled) {
      const value = suggestions.find((suggestion) => suggestion.id === id).name;
      onSubmit(value);
    }
  };

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);

  return (
    <Perimeter onOutsideClick={handleBlur} display="contents">
      <div className={cs(styles.wrapper, className)} onFocus={handleFocus}>
        <TextInput
          disabled={disabled}
          placeholder={i18n.t("pages.home.search.placeholder")}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Btn className={styles.btn} theme="blue" onClick={handleSubmit}>
          {i18n.t("pages.home.search.btn")}
        </Btn>
        <SuggestionList
          data={suggestions}
          onClickItem={handleSuggestionItemClick}
          disabled={!isFocused}
        />
      </div>
    </Perimeter>
  );
};

SearchPanel.propTypes = {
  className: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchClear: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  suggestions: PropTypes.array,
};

SearchPanel.defaultProps = {
  className: "",
  onSearchChange: () => {},
  onSearchClear: () => {},
  onSubmit: () => {},
  disabled: false,
  suggestions: [],
};

export default SearchPanel;
