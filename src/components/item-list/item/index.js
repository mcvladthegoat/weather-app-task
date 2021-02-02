import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import ItemTypes from "./types";
import Btn from "../../btn";
import styles from "./item.module.scss";

const Item = ({
  id,
  name,
  temperature,
  type,
  isEditable,
  onItemClick,
  onRightBtnClick,
}) => {
  const handleItemClick = () => onItemClick(id);
  const handleRightBtnClick = (e) => e.stopPropagation() && onRightBtnClick(id);

  return (
    <div className={cs(styles.item)} onClick={handleItemClick}>
      <div className={styles.left}>{name}</div>
      <div className={styles.right}>
        <span>{temperature}</span>
        {isEditable && (
          <Btn onClick={handleRightBtnClick} colorScheme="red">
            Delete
          </Btn>
        )}
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  temperature: PropTypes.string,
  type: PropTypes.oneOf([ItemTypes.Default, ItemTypes.Favorites]),
  isEditable: PropTypes.bool,
  onItemClick: PropTypes.func,
  onRightBtnClick: PropTypes.func,
};

Item.defaultProps = {
  name: "",
  temperature: "-",
  type: ItemTypes.Default,
  isEditable: false,
  onItemClick: () => {},
  onRightBtnClick: () => {},
};

export default Item;
