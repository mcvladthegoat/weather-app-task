import React from "react";
import icon from "./icon.svg";
import styles from "./loader.module.scss";

const Loader = () => <img className={styles.loader} src={icon} />;

export default Loader;
