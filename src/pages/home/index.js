import React from "react";
import { useSelector } from "react-redux";
import ItemList, { ItemTypes } from "../../components/item-list";
import Btn from "../../components/btn";
import styles from "./home.module.scss";

const HomePage = (props) => {
  const storeData = useSelector((state) => state);
  const { isLoading, weather } = storeData;

  return (
    <div className="App">
      <Btn colorScheme={"red"}>
        <p>HAHAHAHAHA HOORAY!</p>
      </Btn>
    </div>
  );
};

export default HomePage;
