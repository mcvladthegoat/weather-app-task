import React from "react";
import PropTypes from "prop-types";
import i18n from "i18next";

import styles from "./current-details.module.scss";

const detailsKeyList = [
  "feelslike",
  "humidity",
  "uv_index",
  "pressure",
  "precip",
  "wind_speed",
  "cloudcover",
  "wind_degree",
  "wind_dir",
];

const CurrentDetails = ({ data }) => (
  <div>
    {detailsKeyList.map((detailKey) => {
      return data.hasOwnProperty(detailKey) ? (
        <p key={`details-${detailKey}`}>
          {i18n.t(`weather.${detailKey}`, { value: data[detailKey] })}
        </p>
      ) : (
        ""
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
