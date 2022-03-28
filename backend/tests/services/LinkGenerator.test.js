const config = require("../../config");
const LinkGenerator = require('../../services/LinkGenerator');

describe("Testing Service LinkGenerator", () => {
  test("Generates link correctly if UUID is valid", () => {
    const mockUserId = "2b15adb2-f644-4cf1-afb4-a670cac7461d";
    expect(LinkGenerator(mockUserId)).toBe(config.frontUrl + "/?token=2b15adb2-f644-4cf1-afb4-a670cac7461d");
  });
  test("Throws error if UUID is invalid: too long", () => {
    const mockUserId = "2b15adb2-f644-4cf1-afb4-a670cac7461dx";
    expect(() => LinkGenerator(mockUserId)).toThrowError();
  });
  test("Throws error if UUID is invalid: invalid format", () => {
    const mockUserId = "2b15adb29f64424cf1vafb4za670cac7461d";
    expect(() => LinkGenerator(mockUserId)).toThrowError();
  });
})