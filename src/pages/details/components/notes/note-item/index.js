import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";

import icon from "./icon.svg";
import styles from "./note-item.module.scss";

const NoteItem = ({ onClick, data, isEditable }) => {
  const handleItemClick = () => onClick(data.created_at);

  return (
    <div className={cs(styles.item)} onClick={handleItemClick}>
      <div className={styles.left}>{data.value}</div>
      <div className={styles.right}>
        {!isEditable && (
          <img
            src={icon}
            className={styles.icon}
            alt={i18n.t("pages.details.notes.edit-btn-alt")}
          />
        )}
        {/* <span>
          {i18n.t("weather.temperature", { value: data.current.temperature })}
        </span>
        <img
          className={styles.icon}
          alt={data.current.weather_descriptions[0]}
          src={data.current.weather_icons[0]}
        /> */}
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  data: PropTypes.any,
  onClick: PropTypes.func,
  isEditable: PropTypes.bool,
};

NoteItem.defaultProps = {
  data: {},
  onClick: () => {},
  isEditable: false,
};

export default NoteItem;
