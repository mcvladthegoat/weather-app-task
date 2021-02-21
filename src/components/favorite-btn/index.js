import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import { ReactComponent as FavoriteIcon } from "./icons/favorite.svg";

import styles from "./favorite-btn.module.scss";

const FavoriteBtn = ({ className, favorite, onClick }) => (
  <button
    className={styles.button}
    onClick={onClick}
    title={i18n.t(`pages.details.favorite.${favorite}`)}
  >
    <FavoriteIcon
      className={cs(className, styles.icon, { [styles.active]: favorite })}
    />
  </button>
);

FavoriteBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  favorite: PropTypes.bool,
};

FavoriteBtn.defaultProps = {
  className: "",
  onClick: () => {},
  favorite: false,
};

export default FavoriteBtn;
