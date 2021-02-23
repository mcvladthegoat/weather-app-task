import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { Btn, TextArea } from "../../../../../../../components";

import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as CancelIcon } from "./icons/cancel.svg";
import { ReactComponent as SubmitIcon } from "./icons/submit.svg";

import styles from "./note-item.module.scss";

const NoteItem = ({
  onRemoveNote,
  onEditNote,
  data: { value, id },
  isEditable: isListEditable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleItemClick = () => {
    if (isListEditable) {
      onRemoveNote(id);
    }
  };
  const handleEditCancelIconClick = () => setIsEditing(!isEditing);
  const handleSubmitIconClick = () => {
    const value = newValue.trim();
    if (value.length > 0) {
      onEditNote(id, value);
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
          <TextArea
            className={styles.textArea}
            value={newValue}
            onChange={setNewValue}
          />
        )}
      </div>
      <div className={styles.right}>
        {!isListEditable &&
          (isEditing ? (
            <>
              <Btn
                className={styles.btn}
                onClick={handleSubmitIconClick}
                hoverTitle={i18n.t("pages.details.notes.edit-btn-alt")}
                size="sm"
              >
                <SubmitIcon className={styles.icon} />
              </Btn>
              <Btn
                className={styles.btn}
                onClick={handleEditCancelIconClick}
                hoverTitle={i18n.t("pages.details.notes.edit-btn-alt")}
                size="sm"
              >
                <CancelIcon className={styles.icon} />
              </Btn>
            </>
          ) : (
            <Btn
              className={styles.btn}
              onClick={handleEditCancelIconClick}
              hoverTitle={i18n.t("pages.details.notes.edit-btn-alt")}
              size="sm"
            >
              <EditIcon className={styles.icon} />
            </Btn>
          ))}
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  data: PropTypes.any,
  onRemoveNote: PropTypes.func,
  onEditNote: PropTypes.func,
  isEditable: PropTypes.bool,
};

NoteItem.defaultProps = {
  data: {},
  onRemoveNote: () => {},
  onEditNote: () => {},
  isEditable: false,
};

export default NoteItem;
