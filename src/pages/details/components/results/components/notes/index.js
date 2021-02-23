import React, { useState } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { Btn, ItemList, Panel, TextArea } from "../../../../../../components";
import NoteItem from "./note-item";

import styles from "./notes.module.scss";

const Notes = ({ data, onAddNote, onRemoveNote, onEditNote }) => {
  const [newNoteValue, setNewNoteValue] = useState("");

  const handleSubmitNewNote = () => {
    const value = newNoteValue.trim();
    if (value.length > 0) {
      onAddNote(value);
      setNewNoteValue("");
    }
  };

  return (
    <Panel className={styles.wrapper}>
      <ItemList
        className={styles.header}
        title={i18n.t("pages.details.notes.list-title")}
        items={data}
        itemTemplate={<NoteItem />}
        eventHandlers={{
          onRemoveNote,
          onEditNote,
        }}
        noItemsText={i18n.t("pages.details.notes.no-items")}
        keyPrefix="notes"
      />
      <div className={styles.body}>
        <TextArea
          className={styles.textArea}
          placeholder={i18n.t("pages.details.notes.placeholder")}
          onChange={setNewNoteValue}
          value={newNoteValue}
        />
        <Btn
          className={styles.newNoteBtn}
          theme="blue"
          size="sm"
          onClick={handleSubmitNewNote}
        >
          {i18n.t("pages.details.notes.add-new")}
        </Btn>
      </div>
    </Panel>
  );
};

Notes.propTypes = {
  data: PropTypes.array,
  onAddNote: PropTypes.func,
  onEditNote: PropTypes.func,
  onRemoveNote: PropTypes.func,
};

Notes.defaultProps = {
  data: [],
  onAddNote: () => {},
  onEditNote: () => {},
  onRemoveNote: () => {},
};

export default Notes;
