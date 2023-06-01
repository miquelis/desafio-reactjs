import { getNumberInsideBars } from "../utils/strings";

//develop test for strings.ts
describe("getNumberInsideBar", () => {
  test("should return 1 when input is /1/", () => {
    const input = "/1/";
    const result = getNumberInsideBars(input);
    expect(result).toBe(1);
  });
  test("should return 20 when input is 20", () => {
    const input = "20";
    const result = getNumberInsideBars(input);
    expect(result).toBe(20);
  });
  test("should return TEXT when input is 0", () => {
    const input = "TEXT";
    const result = getNumberInsideBars(input);
    expect(result).toBe(0);
  });
});