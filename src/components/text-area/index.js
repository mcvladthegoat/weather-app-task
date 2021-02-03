import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./text-area.module.scss";

const TextArea = (props) => {
  const { value, placeholder, onChange, className, error } = props;

  const handleChange = ({ target: { value } }) => onChange(value);

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
  value: PropTypes.string,
  error: PropTypes.string,
};

TextArea.defaultProps = {
  className: "",
  placeholder: "",
  onChange: () => {},
  value: "",
  error: "",
};

export default TextArea;
