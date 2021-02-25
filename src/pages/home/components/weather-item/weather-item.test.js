import React from "react";
import enzyme from "../../../../../config/enzyme";
import i18n from "i18next";
import WeatherItem from ".";

describe("<WeatherItem />", () => {
  const mockData = {
    id: "12.34",
    location: {
      name: "City name",
    },
    current: {
      temperature: 20,
      weather_descriptions: ["desc"],
      weather_icons: ["img_url"],
    },
  };
  const mockCallBack = jest.fn();
  const result = enzyme.shallow(
    <WeatherItem data={mockData} onClickItem={mockCallBack} />
  );

  it(`WeatherItem renders location name`, () => {
    expect(result.find(".name").text()).toBe(mockData.location.name);
  });

  it(`WeatherItem renders temperature`, () => {
    expect(result.find(".right span").text()).toBe(
      i18n.t("weather.temperature", { value: mockData.current.temperature })
    );
  });

  it(`WeatherItem renders img with correct src attr`, () => {
    expect(result.find("img.icon").prop("src")).toBe(
      mockData.current.weather_icons[0]
    );
  });

  it(`WeatherItem renders img with correct alt attr`, () => {
    expect(result.find("img.icon").prop("alt")).toBe(
      mockData.current.weather_descriptions[0]
    );
  });

  it(`WeatherItem click event`, () => {
    result.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
