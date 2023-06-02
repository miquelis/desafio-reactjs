import { getNumberInsideBars } from "../utils/strings";
import { translateBaseStat } from "../utils/strings";

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

describe("translateBaseStat", () => {
  test("should return HP when input is hp", () => {
    const input = "hp";
    const result = translateBaseStat(input);
    expect(result).toBe("HP");
  }
  );
  test("should return Ataque when input is attack", () => {
    const input = "attack";
    const result = translateBaseStat(input);
    expect(result).toBe("Ataque");
  }
  );
  test("should return Defesa when input is defense", () => {
    const input = "defense";
    const result = translateBaseStat(input);
    expect(result).toBe("Defesa");
  }
  );
  test("should return Ataque Especial when input is special-attack", () => {
    const input = "special-attack";
    const result = translateBaseStat(input);
    expect(result).toBe("Ataque Especial");
  }
  );
  test("should return Defesa Especial when input is special-defense", () => {
    const input = "special-defense";
    const result = translateBaseStat(input);
    expect(result).toBe("Defesa Especial");
  }
  );
  test("should return Velocidade when input is speed", () => {
    const input = "speed";
    const result = translateBaseStat(input);
    expect(result).toBe("Velocidade");
  }
  );
  test("should return baseStat when input is baseStat", () => {
    const input = "baseStat";
    const result = translateBaseStat(input);
    expect(result).toBe("baseStat");
  }
  );
});

