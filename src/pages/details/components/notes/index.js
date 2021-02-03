import React, { useState } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import ItemList from "../../../../components/item-list";
import Btn from "../../../../components/btn";
import Panel from "../../../../components/panel";
import TextArea from "../../../../components/text-area";
import NoteItem from "./note-item";

import styles from "./notes.module.scss";

const Notes = ({ data, onAddNote }) => {
  const [newNoteValue, setNewNoteValue] = useState("");
  // const []
  const handleSubmitNewNote = () => {
    const value = newNoteValue.trim();
    if (value.length > 0) {
      onAddNote(value);
      setNewNoteValue("");
    }
  };

  return (
    <Panel className={styles.wrapper}>
      <div className={styles.header}>
        <TextArea
          placeholder={i18n.t("pages.details.notes.placeholder")}
          onChange={setNewNoteValue}
          value={newNoteValue}
        />
        <Btn colorScheme="blue" onClick={handleSubmitNewNote}>
          {i18n.t("pages.details.notes.add-new")}
        </Btn>
      </div>
      <ItemList
        className={styles.list}
        title={i18n.t("pages.details.notes.list-title")}
        items={data}
        itemTemplate={<NoteItem />}
        keyTemplate="notes"
      />
    </Panel>
  );
};

Notes.propTypes = {
  data: PropTypes.array,
  onAddNote: PropTypes.func,
};

Notes.defaultProps = {
  data: [],
  onAddNote: () => {},
};

export default Notes;
