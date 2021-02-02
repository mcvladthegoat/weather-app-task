import React from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import Panel from "../../components/panel";
import Btn from "../../components/btn";
import SearchPanel from "../../components/search-panel";
import ItemList from "../../components/item-list";
import ItemTypes from "../../components/item-list/item/types";

import { fetchCurrentWeather } from "../../api";
import Routes from "../../routes";

import styles from "./home.module.scss";

const HomePage = (props) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    props.fetchCurrentWeather(e).then((coords) => {
      if (coords) {
        history.push(Routes.detailsByIdPage(`${coords.lat},${coords.lon}`));
      }
    });
  };
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
        <ItemList items={props.favorites} noItemsText={"Not found favorites"} />
        <ItemList items={props.defaults} noItemsText={"Not found defaults"} />
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
  bindActionCreators({ fetchCurrentWeather }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
