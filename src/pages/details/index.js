import React, { useState, useEffect } from "react";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams, useHistory } from "react-router-dom";
import Panel from "../../components/panel";
import Btn from "../../components/btn";
import Loader from "../../components/loader";
import CurrentDetails from "./components/current-details";
import FavoriteBtn from "./components/favorite-btn";
import Notes from "./components/notes";

import { fetchCurrentWeather } from "../../api";
import { addNote, setFavoriteCity } from "../../store/actions";
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
    if (!props.weather[id]) {
      props.fetchCurrentWeather(id).then((coords) => {
        const newId = convertCoordsToId(coords);
        setId(newId);
      });
    }
  }, [props.weather[id]]);

  const handleAddNote = (note) => {
    props.addNote(id, note);
  };

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
          <h3>{props.error}</h3>
        ) : props.loading || !props.weather[id] ? (
          <Loader />
        ) : (
          <>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchCurrentWeather, addNote, setFavoriteCity },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
