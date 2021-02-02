import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./text-input.module.scss";

const TextInput = (props) => {
  const {
    type,
    defaultValue,
    placeholder,
    onChange,
    className,
    error,
    disabled,
  } = props;
  const [value, setValue] = useState(defaultValue);

  const handleChange = ({ target: { value } }) =>
    onChange(value) || setValue(value);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={cs(styles.wrapper, className)}>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  className: "",
  placeholder: "",
  onChange: () => {},
  defaultValue: "",
  error: "",
  type: "text",
  disabled: false,
};

export default TextInput;
