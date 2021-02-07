import React from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import Btn from "../../../../../../components/btn";

const FavoriteBtn = ({ className, favorite, onClick }) => (
  <Btn
    className={className}
    colorScheme={favorite ? "red" : "blue"}
    size="sm"
    onClick={onClick}
  >
    {i18n.t(`pages.details.favorite.${favorite}`)}
  </Btn>
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
