import React, { useState, useEffect } from "react";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams, useHistory } from "react-router-dom";
import { Btn, Loader, LocationIcon, Panel } from "../../components";
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
          <Results
            locationId={id}
            userLocationId={props.userLocationId}
            history={history}
            data={data}
            notes={notes}
            addNote={props.addNote}
            editNote={props.editNote}
            removeNote={props.removeNote}
            setFavoriteCity={props.setFavoriteCity}
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
