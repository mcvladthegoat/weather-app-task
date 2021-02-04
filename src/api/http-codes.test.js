import httpCodes from "./http-codes";
import i18n from "i18next";
import { i18nextInit } from "../translation";

describe("httpCodes()", () => {
  i18nextInit();

  test("httpCodes with no input code", () => {
    expect(httpCodes()).toBe(i18n.t("errors.common"));
  });

  test("httpCodes with input code between 101 and 105", () => {
    [101, 102, 103, 104, 105].forEach((code) =>
      expect(httpCodes(code)).toBe(i18n.t("errors.api"))
    );
  });

  test("httpCodes with input code between 601 and 615", () => {
    for (let code = 601; code <= 615; code++) {
      expect(httpCodes(code)).toBe(i18n.t("errors.query"));
    }
  });

  test("httpCodes with input code out of range", () => {
    [0, 100, 106, 500, 600, 616].forEach((code) =>
      expect(httpCodes(code)).toBe(i18n.t("errors.common"))
    );
  });
});
