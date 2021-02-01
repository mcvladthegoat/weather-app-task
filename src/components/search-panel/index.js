import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import TextInput from "../text-input";
import Btn from "../btn";
import styles from "./search-panel.module.scss";

const SearchPanel = ({ className, onSubmit, disabled }) => {
  const [value, setValue] = useState("");

  const handleChange = (value) => setValue(value);
  const handleSubmit = () => !disabled && onSubmit(value);

  return (
    <div className={cs(styles.wrapper, className)}>
      <TextInput
        disabled={disabled}
        placeholder={i18n.t("search.placeholder")}
        value={value}
        onChange={handleChange}
      />
      <Btn colorScheme="blue" onClick={handleSubmit}>
        {i18n.t("search.btn")}
      </Btn>
    </div>
  );
};

SearchPanel.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

SearchPanel.defaultProps = {
  className: "",
  onSubmit: () => {},
  disabled: false,
};

export default SearchPanel;
