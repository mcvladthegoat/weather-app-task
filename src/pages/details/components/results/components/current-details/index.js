import React from "react";
import PropTypes from "prop-types";
import i18n from "i18next";

import styles from "./current-details.module.scss";

export const detailsKeyList = [
  "feelslike",
  "humidity",
  "pressure",
  "precip",
  "cloudcover",
  "uv_index",
  "wind_speed",
  "wind_degree",
  "wind_dir",
];

const CurrentDetails = ({ data }) => (
  <div className={styles.wrapper}>
    {detailsKeyList.map((detailKey) => {
      return (
        data.hasOwnProperty(detailKey) && (
          <p key={`details-${detailKey}`}>
            {i18n.t(`weather.${detailKey}`, { value: data[detailKey] })}
          </p>
        )
      );
    })}
  </div>
);

CurrentDetails.propTypes = {
  data: PropTypes.object,
};

CurrentDetails.defaultProps = {
  data: {},
};

export default CurrentDetails;
