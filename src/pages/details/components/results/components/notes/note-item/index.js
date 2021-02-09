import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { TextArea } from "../../../../../../../components";

import editIcon from "./icons/edit.svg";
import cancelIcon from "./icons/cancel.svg";
import submitIcon from "./icons/submit.svg";

import styles from "./note-item.module.scss";

const NoteItem = ({
  onClick,
  onSaveNewValue,
  data: { value, id },
  isEditable: isListEditable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleItemClick = () => {
    if (isListEditable) {
      onClick(id);
    }
  };
  const handleEditCancelIconClick = () => setIsEditing(!isEditing);
  const handleSubmitIconClick = () => {
    const value = newValue.trim();
    if (value.length > 0) {
      onSaveNewValue(id, value);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setIsEditing(false);
    setNewValue(value);
  }, [isListEditable, value]);

  return (
    <div className={styles.item} onClick={handleItemClick}>
      <div className={styles.left}>
        {!isEditing ? (
          value
        ) : (
          <TextArea value={newValue} onChange={setNewValue} />
        )}
      </div>
      <div className={styles.right}>
        {!isListEditable &&
          (isEditing ? (
            <>
              <img
                src={submitIcon}
                className={styles.icon}
                onClick={handleSubmitIconClick}
                alt={i18n.t("pages.details.notes.edit-btn-alt")}
              />
              <img
                src={cancelIcon}
                className={styles.icon}
                onClick={handleEditCancelIconClick}
                alt={i18n.t("pages.details.notes.edit-btn-alt")}
              />
            </>
          ) : (
            <img
              src={editIcon}
              className={styles.icon}
              onClick={handleEditCancelIconClick}
              alt={i18n.t("pages.details.notes.edit-btn-alt")}
            />
          ))}
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  data: PropTypes.any,
  onClick: PropTypes.func,
  onSaveNewItemValue: PropTypes.func,
  isEditable: PropTypes.bool,
};

NoteItem.defaultProps = {
  data: {},
  onClick: () => {},
  onSaveNewItemValue: () => {},
  isEditable: false,
};

export default NoteItem;
