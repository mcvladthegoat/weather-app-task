import React from "react";
import i18n from "i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import Panel from "../../components/panel";
import Btn from "../../components/btn";
import SearchPanel from "../../components/search-panel";
import ItemList from "../../components/item-list";
import WeatherItem from "./components/weather-item";

import {
  clearError,
  removeDefaultCity,
  removeFavoriteCity,
} from "../../store/actions";
import { fetchCurrentWeather } from "../../api";
import Routes from "../../routes";
import { convertCoordsToId } from "../../utils";

import styles from "./home.module.scss";

const HomePage = (props) => {
  const history = useHistory();
  const goToDetailsPage = (id) => history.push(Routes.detailsByIdPage(id));

  const handleSubmit = (value) => {
    props.fetchCurrentWeather(value).then((coords) => {
      if (coords) {
        goToDetailsPage(convertCoordsToId(coords));
      }
    });
  };

  const handleItemClick = (id) => {
    props.clearError();
    goToDetailsPage(id);
  };
  const handleDeleteDefaultItemClick = (id) => props.removeDefaultCity(id);
  const handleDeleteFavoriteItemClick = (id) => props.removeFavoriteCity(id);

  return (
    <>
      <Panel className={styles.wrapper} styleScheme="white">
        <Panel>
          <SearchPanel
            disabled={props.loading}
            onSubmit={handleSubmit}
            error={props.error}
          />
        </Panel>
        <Panel>
          <ItemList
            title={i18n.t("pages.home.favorites.title")}
            items={props.favorites}
            noItemsText={i18n.t("pages.home.favorites.no-items")}
            itemTemplate={<WeatherItem />}
            onItemClick={handleItemClick}
            onClickEditMode={handleDeleteFavoriteItemClick}
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
          />
        </Panel>
      </Panel>
    </>
  );
};

const mapStateToProps = ({ root }) => ({
  loading: root.loading,
  error: root.error,
  favorites: Object.values(root.weather).filter((item) => item.favorite),
  defaults: Object.values(root.weather).filter((item) => item.default),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchCurrentWeather, removeDefaultCity, removeFavoriteCity, clearError },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
