const colorSet = {
  "#DF4141": ["A", "B", "C", "D"],
  "#61CE5E": ["E", "F", "G", "H"],
  "#6073E2": ["I", "J", "K", "L"],
  "#F89825": ["M", "N", "O", "P"],
  "#2EB5C0": ["Q", "R", "S", "T"],
  "#BB58D0": ["U", "V", "W", "X"],
  "#00A5FF": ["Y", "Z"],
};

export const generateColorFromString = (str: string): string => {
  const firstChar = str[0] || "";
  const normalizedFirstChar = firstChar.toUpperCase();

  let color = "inherit";
  for (const [hex, chars] of Object.entries(colorSet)) {
    if (chars.includes(normalizedFirstChar)) {
      color = hex;
      break;
    }
  }

  return color;
};

export default generateColorFromString;
