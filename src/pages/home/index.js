import React, { useEffect } from "react";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { LocationIcon, Panel, ItemList } from "../../components";
import { SearchPanel, WeatherItem } from "./components";

import {
  clearError,
  removeDefaultCity,
  removeFavoriteCity,
  requestUserLocation,
  setUserLocationId,
} from "../../store/actions";
import { fetchCurrentWeather } from "../../api";
import Routes from "../../routes";
import { convertCoordsToId, sortLocationList } from "../../utils";

import styles from "./home.module.scss";

const HomePage = (props) => {
  const history = useHistory();
  const goToDetailsPage = (id) => history.push(Routes.detailsByIdPage(id));

  const handleLocationSearch = (rawCoords, cb) => {
    props.fetchCurrentWeather(rawCoords).then((newCoords) => {
      if (newCoords) {
        const coords = convertCoordsToId(newCoords);
        cb(coords);
        goToDetailsPage(coords);
      }
    });
  };

  useEffect(() => {
    if (navigator.geolocation && !props.userLocation.requested) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lon } }) => {
          props.requestUserLocation();
          handleLocationSearch(
            convertCoordsToId({ lat, lon }),
            props.setUserLocationId
          );
        },
        () => props.requestUserLocation()
      );
    }
  }, [props.userLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (value) => {
    if (value.trim().length > 0) {
      props.fetchCurrentWeather(value).then((coords) => {
        if (coords) {
          goToDetailsPage(convertCoordsToId(coords));
        }
      });
    }
  };

  const handleItemClick = (id) => {
    if (!props.loading && props.userLocation.requested) {
      props.clearError();
      goToDetailsPage(id);
    }
  };
  const handleDeleteDefaultItemClick = (id) => props.removeDefaultCity(id);
  const handleDeleteFavoriteItemClick = (id) => props.removeFavoriteCity(id);

  return (
    <>
      <Helmet>
        <title>{i18n.t("pages.home.title")}</title>
      </Helmet>
      <Panel className={styles.wrapper} styleScheme="white">
        <Panel className={styles.searchWrapper}>
          <SearchPanel
            disabled={props.loading}
            onSubmit={handleSubmit}
            error={props.error}
          />
          {!props.userLocation.requested && <LocationIcon fading withLabel />}
        </Panel>
        <Panel>
          <ItemList
            title={i18n.t("pages.home.favorites.title")}
            items={props.favorites}
            noItemsText={i18n.t("pages.home.favorites.no-items")}
            itemTemplate={<WeatherItem />}
            onItemClick={handleItemClick}
            onClickEditMode={handleDeleteFavoriteItemClick}
            keyPrefix="favorites"
          />
        </Panel>
        <Panel>
          <ItemList
            title={i18n.t("pages.home.defaults.title")}
            items={props.defaults}
            noItemsText={i18n.t("pages.home.defaults.no-items")}
            itemTemplate={<WeatherItem />}
            onItemClick={handleItemClick}
            onClickEditMode={handleDeleteDefaultItemClick}
            keyPrefix="defaults"
          />
        </Panel>
      </Panel>
    </>
  );
};

const mapStateToProps = ({ root }) => ({
  loading: root.loading,
  error: root.error,
  favorites: sortLocationList(root.weather).filter((item) => item.favorite),
  defaults: sortLocationList(root.weather).filter((item) => item.default),
  userLocation: root.userLocation,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCurrentWeather,
      removeDefaultCity,
      removeFavoriteCity,
      clearError,
      requestUserLocation,
      setUserLocationId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
