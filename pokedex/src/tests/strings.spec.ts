import { getNumberInsideBars } from "../utils/strings";

//develop test for strings.ts
describe("getNumberInsideBar", () => {
  test("should return 1 when input is /1/", () => {
    const input = "/1/";
    const result = getNumberInsideBars(input);
    expect(result).toBe(1);
  });
});