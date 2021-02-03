import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import Btn from "../../../../components/btn";

const FavoriteBtn = ({ className, favorite, onClick }) => (
  <Btn
    className={className}
    colorScheme={favorite ? "red" : "blue"}
    size="sm"
    onClick={onClick}
  >
    {favorite ? "Unfavorite" : "Favorite"}
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
