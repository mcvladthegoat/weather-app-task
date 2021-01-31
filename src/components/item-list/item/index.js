import React from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import ItemTypes from "./types";
import styles from "./item.module.scss";

const Item = ({ id, name, temperature, type, isEditable }) => {
  // const handleClick = () => props.onClick && !isEditable && props.onClick();

  return (
    <div className={cs(styles.item)}>
      <div className={styles.left}>{name}</div>
      <div className={styles.right}></div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  temperature: PropTypes.string,
  type: PropTypes.oneOf([ItemTypes.Default, ItemTypes.Favorites]),
  isEditable: PropTypes.bool,
};

Item.defaultProps = {
  name: "",
  temperature: "-",
  type: ItemTypes.Default,
  isEditable: false,
};

export default Item;
