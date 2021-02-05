import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import i18n from "i18next";
import Btn from "../btn";

import styles from "./item-list.module.scss";

const ItemList = ({
  onItemClick,
  onClickEditMode,
  className,
  items,
  title,
  noItemsText,
  itemTemplate,
  keyPrefix,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEditBtnClick = () => setIsEditable(!isEditable);
  const handleItemClick = (id) => {
    isEditable ? onClickEditMode(id) : onItemClick(id);
  };

  useEffect(() => {
    if (items.length === 0) {
      setIsEditable(false);
    }
  }, [items]);

  return (
    <div className={cs(styles.wrapper, className)}>
      <div className={styles.heading}>
        <span>{isEditable ? i18n.t("item-list.editing") : title}</span>
        {items.length > 0 && (
          <Btn colorScheme="blue" size="sm" onClick={handleEditBtnClick}>
            {i18n.t(`item-list.edit-btn.${isEditable}`)}
          </Btn>
        )}
      </div>
      {items.length > 0 ? (
        items.map((item) =>
          React.cloneElement(itemTemplate, {
            key: `item-${keyPrefix}-${item.id}`,
            onClick: handleItemClick,
            data: item,
            isEditable: isEditable,
          })
        )
      ) : (
        <span className={styles.noItemsText}>{noItemsText}</span>
      )}
    </div>
  );
};

ItemList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  noItemsText: PropTypes.string,
  title: PropTypes.string,
  onItemClick: PropTypes.func,
  onClickEditMode: PropTypes.func,
  itemTemplate: PropTypes.element.isRequired,
  keyPrefix: PropTypes.string.isRequired,
};

ItemList.defaultProps = {
  className: "",
  items: [],
  noItemsText: "",
  title: "",
  onItemClick: () => {},
  onClickEditMode: () => {},
};

export default ItemList;
