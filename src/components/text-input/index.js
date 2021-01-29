import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./text-input.module.scss";

const TextInput = (props) => {
  const { type, defaultValue, placeholder, onChange, className, error } = props;
  const [value, setValue] = useState(defaultValue);

  const handleChange = ({ target: { value } }) =>
    onChange(value) || setValue(value);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.wrapper}>
      <input
        className={cs(styles.textInput, className)}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
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
};

TextInput.defaultProps = {
  className: "",
  placeholder: "",
  onChange: () => {},
  defaultValue: "",
  error: "",
  type: "text",
};

export default TextInput;
