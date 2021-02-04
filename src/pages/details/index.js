import React, { useState, useEffect } from "react";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { Btn, Loader, Panel } from "../../components";
import { CurrentDetails, FavoriteBtn, NoResults, Notes } from "./components";

import { fetchCurrentWeather } from "../../api";
import { addNote, setFavoriteCity, clearError } from "../../store/actions";
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
    return () => {
      props.clearError();
    };
  }, [props.weather[id], props.storageLoaded]);

  const handleAddNote = (note) => {
    props.addNote(id, note);
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
              <Notes data={notes} onAddNote={handleAddNote} />
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchCurrentWeather, addNote, setFavoriteCity, clearError },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
