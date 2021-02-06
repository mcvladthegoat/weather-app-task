import React, { useState, useEffect } from "react";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams, useHistory } from "react-router-dom";
import { Btn, Loader, LocationIcon, Panel } from "../../components";
import { CurrentDetails, FavoriteBtn, NoResults, Notes } from "./components";

import { fetchCurrentWeather } from "../../api";
import {
  addNote,
  editNote,
  removeNote,
  setFavoriteCity,
  clearError,
} from "../../store/actions";
import Routes from "../../routes";
import { convertCoordsToId } from "../../utils";

import styles from "./details.module.scss";

const DetailsPage = (props) => {
  const history = useHistory();
  let { id: _id } = useParams();
  const [id, setId] = useState(_id);
  const data = props.weather[id];
  const notes = props.notes[id];

  useEffect(() => {
    if (!props.weather[id] && props.storageLoaded) {
      props.fetchCurrentWeather(id).then((coords) => {
        const newId = convertCoordsToId(coords);
        setId(newId);
      });
    }
  }, [props.weather[id], props.storageLoaded]);

  useEffect(() => {
    return () => props.clearError();
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  const handleAddNote = (note) => {
    props.addNote(id, note);
  };

  const handleEditNote = (noteId, value) => {
    props.editNote(id, noteId, value);
  };

  const handleRemoveNote = (noteId) => {
    props.removeNote(id, noteId);
  };

  const handleGoToHomeBtn = () => history.push(Routes.homePage);

  const handleFavoriteBtnClick = () => {
    props.setFavoriteCity(id, !data.favorite);
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t("pages.details.title")}</title>
      </Helmet>
      <Panel className={styles.wrapper} styleScheme="white">
        {props.error ? (
          <NoResults error={props.error} />
        ) : props.loading || !props.weather[id] ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <Btn
              className={styles.goHome}
              onClick={handleGoToHomeBtn}
              size="sm"
              colorScheme="blue"
            >
              {i18n.t("pages.details.go-home")}
            </Btn>
            {props.userLocationId === id && (
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
        )}
      </Panel>
    </>
  );
};

const mapStateToProps = ({ root }) => ({
  loading: root.loading,
  error: root.error,
  weather: root.weather,
  notes: root.notes,
  storageLoaded: root.storageLoaded,
  userLocationId: root.userLocation.id,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCurrentWeather,
      addNote,
      editNote,
      removeNote,
      setFavoriteCity,
      clearError,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
