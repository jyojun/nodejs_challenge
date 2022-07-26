const in_range = (x, y) => {
  if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
  return false;
};

const possible_piece = (color, type, row, col) => {
  if (type === "pawn") {
    // 폰 일 경우
    if (color === "black") {
      // 검정 말일 경우
      if (row === 1) {
        // row가 2인 경우 true
        return true;
      }
      return false;
    } else {
      // 하얀 말일 경우
      if (row === 6) {
        // row가 7인 경우 true
        return true;
      }
      return false;
    }
  } else if (type === "knight") {
    // 나이트 일 경우
    if (color === "black") {
      // 검은 말일 경우
      if ((row === 0 && col === 1) || (row === 0 && col === 6)) {
        // B1, G1 일 경우
        return true;
      }
      return false;
    } else {
      // 하얀 말인 경우
      if ((row === 7 && col === 1) || (row === 7 && col === 6)) {
        // B8, G8인 경우
        return true;
      }
      return false;
    }
  } else if (type === "bishop") {
    // 비숍 일 경우
    if (color === "black") {
      if ((row === 0 && col === 2) || (row === 0 && col === 5)) {
        // C1, F1인 경우
        return true;
      }
      return false;
    } else {
      if ((row === 7 && col === 2) || (row === 7 && col === 5)) {
        // C8, F8인 경우
        return true;
      }
      return false;
    }
  } else if (type === "rook") {
    // 룩 일 경우
    if (color === "black") {
      if ((row === 0 && col === 0) || (row === 0 && col === 7)) {
        // A1, H1인 경우
        return true;
      }
      return false;
    } else {
      if ((row === 7 && col === 0) || (row === 7 && col === 7)) {
        // A8, H8인 경우
        return true;
      }
      return false;
    }
  } else if (type === "queen") {
    // 퀸 일 경우
    if (color === "black") {
      if (row === 0 && col === 4) {
        // E1인 경우
        return true;
      }
      return false;
    } else {
      if (row === 7 && col === 4) {
        // E8인 경우
        return true;
      }
      return false;
    }
  }
};
export { in_range, possible_piece };
