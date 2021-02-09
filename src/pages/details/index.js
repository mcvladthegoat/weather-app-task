import React, { useState, useEffect } from "react";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams, useHistory } from "react-router-dom";
import { Loader, Panel } from "../../components";
import { Results, NoResults } from "./components";

import { fetchCurrentWeather } from "../../api";
import {
  addNote,
  editNote,
  removeNote,
  setFavoriteCity,
  clearError,
} from "../../store/actions";
import { convertCoordsToId } from "../../utils";

import styles from "./details.module.scss";

const DetailsPage = ({
  weather,
  notes,
  storageLoaded,
  userLocationId,
  loading,
  error,
  addNote,
  editNote,
  removeNote,
  setFavoriteCity,
  fetchCurrentWeather,
  clearError,
}) => {
  const history = useHistory();
  let { id: _id } = useParams();
  const [id, setId] = useState(_id);
  const data = weather[id];

  useEffect(() => {
    if (!weather[id] && storageLoaded && !error) {
      fetchCurrentWeather(id).then((coords) => {
        const newId = convertCoordsToId(coords);
        setId(newId);
      });
    }
  }, [weather[id], storageLoaded, fetchCurrentWeather, error]);

  useEffect(() => {
    return () => clearError();
  }, []);

  return (
    <>
      <Helmet>
        <title>{i18n.t("pages.details.title")}</title>
      </Helmet>
      <Panel className={styles.wrapper} styleScheme="white">
        {error ? (
          <NoResults error={error} />
        ) : loading || !weather[id] ? (
          <Loader className={styles.loader} />
        ) : (
          <Results
            locationId={id}
            userLocationId={userLocationId}
            history={history}
            data={data}
            notes={notes[id]}
            addNote={addNote}
            editNote={editNote}
            removeNote={removeNote}
            setFavoriteCity={setFavoriteCity}
          />
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
