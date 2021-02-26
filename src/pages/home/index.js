import React, { useEffect } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { Btn, Panel, ItemList } from "../../components";
import { SearchPanel, Status, WeatherItem } from "./components";

import {
  clearError,
  removeDefaultCity,
  requestUserLocation,
  setFavoriteCity,
  setUserLocationId,
  setInitialData,
  resetAllData,
  clearSuggestions,
} from "../../store/actions";
import { fetchCurrentWeather, fetchSuggestions } from "../../api";
import Routes from "../../routes";
import { convertCoordsToId, sortLocationList } from "../../utils";

import styles from "./home.module.scss";

const MAX_GEOLOCATION_API_TIMEOUT = 5000;

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
        () => props.requestUserLocation(),
        {
          enableHighAccuracy: true,
          timeout: MAX_GEOLOCATION_API_TIMEOUT,
          maximumAge: 0,
        }
      );
    }
  }, [props.userLocation]);

  const handleSubmit = (value) => {
    if (value.trim().length > 0) {
      props.clearSuggestions();
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
  const handleSetFavoriteItem = (id, favorite) =>
    props.setFavoriteCity(id, favorite);

  const handleResetClick = () => {
    props.resetAllData();
    props.setInitialData();
  };

  const handleSearchChange = (value) => {
    props.fetchSuggestions(value);
  };
  const handleSearchClear = () => props.clearSuggestions();

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
            onSearchChange={handleSearchChange}
            onSearchClear={handleSearchClear}
            suggestions={props.suggestions}
            error={props.error}
          />
          <Status
            loading={props.loading}
            userLocationRequested={props.userLocation.requested}
          />
        </Panel>
        <Panel>
          <ItemList
            title={i18n.t("pages.home.favorites.title")}
            items={props.favorites}
            noItemsText={i18n.t("pages.home.favorites.no-items")}
            itemTemplate={<WeatherItem />}
            eventHandlers={{
              onClickItem: handleItemClick,
              onSetFavorite: handleSetFavoriteItem,
            }}
            showEditBtn={false}
            keyPrefix="favorites"
          />
        </Panel>
        <Panel>
          <ItemList
            title={i18n.t("pages.home.defaults.title")}
            items={props.defaults}
            noItemsText={i18n.t("pages.home.defaults.no-items")}
            itemTemplate={<WeatherItem />}
            eventHandlers={{
              onClickItem: handleItemClick,
              onRemoveItem: handleDeleteDefaultItemClick,
              onSetFavorite: handleSetFavoriteItem,
            }}
            keyPrefix="defaults"
          />
        </Panel>
        <Panel>
          <Btn theme="link" size="sm" onClick={handleResetClick}>
            {i18n.t("pages.home.reset-data-link")}
          </Btn>
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
  suggestions: root.suggestions,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCurrentWeather,
      removeDefaultCity,
      clearError,
      requestUserLocation,
      setFavoriteCity,
      setUserLocationId,
      setInitialData,
      resetAllData,
      fetchSuggestions,
      clearSuggestions,
    },
    dispatch
  );

HomePage.propTypes = {
  defaults: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  userLocation: PropTypes.shape({
    requested: PropTypes.bool,
    id: PropTypes.string,
  }).isRequired,
  error: PropTypes.any,
  loading: PropTypes.bool,
  suggestions: PropTypes.array.isRequired,
  fetchCurrentWeather: PropTypes.func.isRequired,
  removeDefaultCity: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  requestUserLocation: PropTypes.func.isRequired,
  setFavoriteCity: PropTypes.func.isRequired,
  setUserLocationId: PropTypes.func.isRequired,
  setInitialData: PropTypes.func.isRequired,
  resetAllData: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  error: null,
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
