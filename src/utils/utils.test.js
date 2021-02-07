import { convertCoordsToId, sortLocationList } from ".";

describe("utils functions", () => {
  test("convertCoordsToId() with no empty coords obj", () => {
    expect(convertCoordsToId({})).toBe("0,0");
  });

  test("convertCoordsToId() with input coords", () => {
    expect(
      convertCoordsToId({
        lat: 12.345,
        lon: 67.89,
      })
    ).toBe("12.345,67.89");
  });

  test("sortLocationList() sorts location obj correclty", () => {
    const mockObj = {
      1: {
        location: {
          name: "DDD",
        },
      },
      2: {
        location: {
          name: "BBB",
        },
      },
      3: {
        location: {
          name: "AAA",
        },
      },
      4: {
        location: {
          name: "CCC",
        },
      },
    };

    const expectedArray = [
      {
        location: {
          name: "AAA",
        },
      },
      {
        location: {
          name: "BBB",
        },
      },
      {
        location: {
          name: "CCC",
        },
      },
      {
        location: {
          name: "DDD",
        },
      },
    ];

    expect(sortLocationList(mockObj)).toStrictEqual(expectedArray);
  });
});
