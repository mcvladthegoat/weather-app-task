import React from "react";
import { useSelector } from "react-redux";
import ItemList, { ItemTypes } from "../../components/item-list";
import styles from "./home.module.scss";

const HomePage = (props) => {
  const storeData = useSelector((state) => state);
  const { isLoading, weather } = storeData;

  return (
    <div className="App">
      <ItemList />
    </div>
  );
};

export default HomePage;
