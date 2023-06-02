export function getNumberInsideBars(text: string) {
  const regex = /\/(\d+)\//;
  const match = text.match(regex);
  if (match) {
    const numero = match[1];
    return Number(numero) || 0;
  }
  return Number(text) || 0;
}

export function translateBaseStat(baseStat: string) {
  switch (baseStat) {
    case "hp":
      return "HP";
    case "attack":
      return "Ataque";
    case "defense":
      return "Defesa";
    case "special-attack":
      return "Ataque Especial";
    case "special-defense":
      return "Defesa Especial";
    case "speed":
      return "Velocidade";
    default:
      return baseStat;
  }
}