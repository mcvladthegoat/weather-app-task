import React, { useState } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import ItemTypes from "./item/types";
import Item from "./item";
import Btn from "../btn";
import styles from "./item-list.module.scss";

const ItemList = ({
  onItemClick,
  onRemoveBtnClick,
  onFavoritesBtnClick,
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
        <Btn
          colorScheme={isEditable ? "red" : "white"}
          onClick={handleEditBtnClick}
        >
          {isEditable ? "Finish edit" : "Edit"}
        </Btn>
      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <Item
            name={item.name}
            temperature={item.temperature}
            type={type}
            onClick={onItemClick}
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
  onRemoveBtnClick: PropTypes.func,
  onFavoritesBtnClick: PropTypes.func,
};

ItemList.defaultProps = {
  className: "",
  items: [],
  noItemsText: "",
  title: "",
  type: ItemTypes.Default,
  onItemClick: () => {},
  onRemoveBtnClick: () => {},
  onFavoritesBtnClick: () => {},
};

export default Btn;
