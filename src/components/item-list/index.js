import React, { useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import ItemTypes from "./item/types";
import Item from "./item";
import Btn from "../btn";
import styles from "./item-list.module.scss";

const ItemList = ({
  onItemClick,
  onRightBtnClick,
  className,
  items,
  title,
  type,
  noItemsText,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditBtnClick = () => setIsEditable(!isEditable);

  return (
    <div className={cs(styles.wrapper, className)}>
      <div className={styles.heading}>
        <span>{title}</span>
        <Btn colorScheme="blue" onClick={handleEditBtnClick}>
          {isEditable ? "Finish edit" : "Edit"}
        </Btn>
      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <Item
            id={item.id}
            name={item.location.name}
            temperature={item.current.temperature}
            type={type}
            onClick={onItemClick}
            onRightBtnClick={onRightBtnClick}
          />
        ))
      ) : (
        <div className={styles.noItemsText}>{noItemsText}</div>
      )}
    </div>
  );
};

ItemList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  noItemsText: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf([ItemTypes.Default, ItemTypes.Favorites]),
  onItemClick: PropTypes.func,
  onRightBtnClick: PropTypes.func,
};

ItemList.defaultProps = {
  className: "",
  items: [],
  noItemsText: "",
  title: "",
  type: ItemTypes.Default,
  onItemClick: () => {},
  onRightBtnClick: () => {},
};

export default ItemList;
