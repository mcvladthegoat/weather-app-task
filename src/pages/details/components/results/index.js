import React from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { Btn, FavoriteBtn, LocationIcon } from "../../../../components";
import { CurrentDetails, Notes } from "./components";
import Routes from "../../../../routes";

import styles from "./results.module.scss";

const Results = ({
  locationId: id,
  userLocationId,
  history,
  data,
  notes,
  addNote,
  editNote,
  removeNote,
  setFavoriteCity,
}) => {
  const handleAddNote = (note) => {
    addNote(id, note);
  };

  const handleEditNote = (noteId, value) => {
    editNote(id, noteId, value);
  };

  const handleRemoveNote = (noteId) => {
    removeNote(id, noteId);
  };

  const handleGoToHomeBtn = () => history.push(Routes.homePage);

  const handleFavoriteBtnClick = () => {
    setFavoriteCity(id, !data.favorite);
  };

  return (
    <>
      <Btn
        className={styles.goHome}
        onClick={handleGoToHomeBtn}
        size="sm"
        colorScheme="blue"
      >
        {i18n.t("pages.details.go-home")}
      </Btn>
      {userLocationId === id && (
        <LocationIcon className={styles.locationIcon} size="sm" />
      )}
      <FavoriteBtn
        className={styles.favorite}
        favorite={data.favorite}
        onClick={handleFavoriteBtnClick}
      />
      <div className={styles.header}>
        <div>
          <img
            className={styles.icon}
            src={data.current.weather_icons[0]}
            alt={data.current.weather_descriptions[0]}
          />
        </div>
        <div>
          <h3>
            {data.location.name} ({data.location.country})
          </h3>
          <h1>
            {i18n.t("weather.temperature", {
              value: data.current.temperature,
            })}
          </h1>
          <h3>{data.current.weather_descriptions[0]}</h3>
        </div>
      </div>
      <div className={styles.body}>
        <CurrentDetails data={data.current} />
        <Notes
          data={notes}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          onRemoveNote={handleRemoveNote}
        />
      </div>
    </>
  );
};

Results.propTypes = {
  locationId: PropTypes.string.isRequired,
  userLocationId: PropTypes.string,
  history: PropTypes.object,
  data: PropTypes.object.isRequired,
  notes: PropTypes.array,
  addNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  setFavoriteCity: PropTypes.func.isRequired,
};

Results.defaultProps = {
  userLocationId: "",
  notes: [],
};

export default Results;
