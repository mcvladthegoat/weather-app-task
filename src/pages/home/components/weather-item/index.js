import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";

import styles from "./weather-item.module.scss";

const WeatherItem = ({ onClick, data }) => {
  const handleItemClick = () => onClick(data.id);

  return (
    <div className={cs(styles.item)} onClick={handleItemClick}>
      <div className={styles.left}>{data.location.name}</div>
      <div className={styles.right}>
        <span>
          {i18n.t("weather.temperature", { value: data.current.temperature })}
        </span>
        <img
          className={styles.icon}
          alt={data.current.weather_descriptions[0]}
          src={data.current.weather_icons[0]}
        />
      </div>
    </div>
  );
};

WeatherItem.propTypes = {
  data: PropTypes.any,
  onClick: PropTypes.func,
  isEditable: PropTypes.bool,
};

WeatherItem.defaultProps = {
  data: {},
  onClick: () => {},
  isEditable: false,
};

export default WeatherItem;
