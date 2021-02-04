import i18n from "i18next";

const httpCodes = (rawCode) => {
  const code = +rawCode;
  if (code >= 101 && code <= 105) {
    return i18n.t("errors.api");
  } else if (code >= 601 && code <= 615) {
    return i18n.t("errors.query");
  } else {
    return i18n.t("errors.common");
  }
};

export default httpCodes;
