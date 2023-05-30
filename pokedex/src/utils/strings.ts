export function getNumberInsideBars(text: string) {
  const regex = /\/(\d+)\//;
  const match = text.match(regex);
  if (match) {
    const numero = match[1];
    return Number(numero) || 0;
  }
}