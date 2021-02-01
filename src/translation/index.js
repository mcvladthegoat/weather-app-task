import i18next from "i18next";
import en from "./en.json";

export const i18nextInit = () =>
  i18next.init({
    lng: "en",
    debug: process.env.NODE_ENV === "development",
    resources: {
      en,
    },
  });
