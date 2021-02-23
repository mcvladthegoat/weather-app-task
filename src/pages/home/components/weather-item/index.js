import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { FavoriteBtn } from "../../../../components";

import styles from "./weather-item.module.scss";

const WeatherItem = ({
  isEditable,
  onClickItem,
  onSetFavorite,
  onRemoveItem,
  data,
}) => {
  const handleItemClick = () => {
    if (isEditable) {
      onRemoveItem(data.id);
    } else {
      onClickItem(data.id);
    }
  };

  const handleFavoriteBtnClick = (e) => {
    e.stopPropagation();
    onSetFavorite(data.id, !data.favorite);
  };

  return (
    <div className={cs(styles.item)} onClick={handleItemClick}>
      <div className={styles.left}>
        <FavoriteBtn
          className={styles.favoriteBtn}
          favorite={data.favorite}
          onClick={handleFavoriteBtnClick}
        />
        <span className={styles.name}>{data.location.name}</span>
      </div>
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
  onClickItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onSetFavorite: PropTypes.func,
};

WeatherItem.defaultProps = {
  data: {},
  onClickItem: () => {},
  onRemoveItem: () => {},
  onSetFavorite: () => {},
};

export default WeatherItem;
