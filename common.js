const in_range = (x, y) => {
  if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
  return false;
};

export { in_range };
