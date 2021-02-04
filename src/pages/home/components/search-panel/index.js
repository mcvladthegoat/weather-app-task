import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { Btn, TextInput } from "../../../../components";

import styles from "./search-panel.module.scss";

const SearchPanel = ({ className, error, onSubmit, disabled }) => {
  const [value, setValue] = useState("");

  const handleChange = (value) => setValue(value);
  const handleSubmit = () => !disabled && onSubmit(value);

  return (
    <div className={cs(styles.wrapper, className)}>
      <TextInput
        disabled={disabled}
        placeholder={i18n.t("search.placeholder")}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
      <Btn className={styles.btn} colorScheme="blue" onClick={handleSubmit}>
        {i18n.t("search.btn")}
      </Btn>
    </div>
  );
};

SearchPanel.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

SearchPanel.defaultProps = {
  className: "",
  error: "",
  onSubmit: () => {},
  disabled: false,
};

export default SearchPanel;
