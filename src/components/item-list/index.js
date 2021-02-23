import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import Btn from "../btn";

import styles from "./item-list.module.scss";

const ItemList = ({
  eventHandlers,
  className,
  items,
  title,
  noItemsText,
  itemTemplate,
  keyPrefix,
  showEditBtn,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEditBtnClick = () => setIsEditable(!isEditable);

  useEffect(() => {
    if (items.length === 0) {
      setIsEditable(false);
    }
  }, [items]);

  return (
    <div className={className}>
      <div className={styles.heading}>
        <span>{isEditable ? i18n.t("item-list.editing") : title}</span>
        {showEditBtn && items.length > 0 && (
          <Btn theme="blue" size="sm" onClick={handleEditBtnClick}>
            {i18n.t(`item-list.edit-btn.${isEditable}`)}
          </Btn>
        )}
      </div>
      {items.length > 0 ? (
        items.map((item) =>
          React.cloneElement(itemTemplate, {
            key: `item-${keyPrefix}-${item.id}`,
            data: item,
            isEditable: isEditable,
            ...eventHandlers,
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
  eventHandlers: PropTypes.objectOf(PropTypes.func),
  items: PropTypes.array,
  noItemsText: PropTypes.string,
  title: PropTypes.string,
  itemTemplate: PropTypes.element.isRequired,
  keyPrefix: PropTypes.string.isRequired,
  showEditBtn: PropTypes.bool,
};

ItemList.defaultProps = {
  className: "",
  eventHandlers: [],
  items: [],
  noItemsText: "",
  title: "",
  showEditBtn: true,
};

export default ItemList;
