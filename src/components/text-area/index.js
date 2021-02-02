import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./text-area.module.scss";

const TextArea = (props) => {
  const { defaultValue, placeholder, onChange, className, error } = props;
  const [value, setValue] = useState(defaultValue);

  const handleChange = ({ target: { value } }) =>
    onChange(value) || setValue(value);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={cs(styles.wrapper, className)}>
      <textarea
        className={cs(styles.textArea)}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
};

TextArea.defaultProps = {
  className: "",
  placeholder: "",
  onChange: () => {},
  defaultValue: "",
  error: "",
};

export default TextArea;
