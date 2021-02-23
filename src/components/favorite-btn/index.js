import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import Btn from "../btn";
import { ReactComponent as FavoriteIcon } from "./icons/favorite.svg";

import styles from "./favorite-btn.module.scss";

const FavoriteBtn = ({ className, favorite, onClick }) => (
  <Btn
    className={cs(styles.button, className)}
    onClick={onClick}
    size="sm"
    hoverTitle={i18n.t(`pages.details.favorite.${favorite}`)}
  >
    <FavoriteIcon className={cs(styles.icon, { [styles.active]: favorite })} />
  </Btn>
);

FavoriteBtn.propTypes = {
  className: PropTypes.string,
  favorite: PropTypes.bool,
  onClick: PropTypes.func,
};

FavoriteBtn.defaultProps = {
  className: "",
  favorite: false,
  onClick: () => {},
};

export default FavoriteBtn;
