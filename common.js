import { rank, file } from "./enum.js";

const in_range = (x, y) => {
  if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
  return false;
};

const possible_piece = (board, color, type, row, col) => {
  // 비어 있지 않은 경우 (이미 다른 말이 있는 경우)
  if (board[row][col] !== ".") {
    return false;
  }
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

const is_max_piece = (type, count) => {
  if (type === "pawn") {
    if (count >= 8) {
      return true;
    }
  } else if (type === "knight") {
    if (count >= 2) {
      return true;
    }
  } else if (type === "bishop") {
    if (count >= 2) {
      return true;
    }
  } else if (type === "rook") {
    if (count >= 2) {
      return true;
    }
  } else if (type === "queen") {
    if (count >= 2) {
      return true;
    }
  }
  return false;
};

const move_possible = (board, color, type, possiblePos) => {
  let result = [];

  if (type === "pawn") {
    for (let i = 0; i < possiblePos.length; i++) {
      let row = rank[possiblePos[i][1]];
      let col = file[possiblePos[i][0]];

      if (board[row][col] === ".") result.push(possiblePos[i]);
      else if (board[row][col].color === color) break;
      else if (board[row][col].color !== color) {
        result.push(possiblePos[i]);
        break;
      }
    }
  } else if (type === "knight") {
    for (let i = 0; i < possiblePos.length; i++) {
      // 전진 할 때 위치
      let front_row = rank[possiblePos[i][0][1]];
      let front_col = file[possiblePos[i][0][0]];

      // 도착 할 위치
      let row = rank[possiblePos[i][1][1]];
      let col = file[possiblePos[i][1][0]];

      if (board[front_row][front_col] === "." && board[row][col] === ".")
        // 전진위치가 뚫려있고, 도착위치가 비어있다면,
        result.push(possiblePos[i][1]);
      else if (
        // 전진 위치가 뚫려있고, 색이 다르다면 어택하므로 가능
        board[front_row][front_col] === "." &&
        board[row][col].color !== color
      ) {
        result.push(possiblePos[i][1]);
      } else if (
        // 전진 위치가 뚫려있지만, 같은 색이라면 아군이라 이동 불가
        board[front_row][front_col] === "." &&
        board[row][col].color === color
      )
        break;
    }
  } else if (type === "bishop") {
    for (let i = 0; i < possiblePos.length; i++) {
      // 4방향 모두 살펴보기
      for (let j = 0; j < possiblePos[i].length; j++) {
        let row = rank[possiblePos[i][j][1]];
        let col = file[possiblePos[i][j][0]];

        if (board[row][col] === ".") result.push(possiblePos[i][j]);
        else if (board[row][col].color === color) {
          // 직선에 같은 아군이 있다면 break 더 이상 이 방향으로 이동 불가
          break;
        } else if (board[row][col].color !== color) {
          // 적군이 있는경우 그 위치로 공격하고 더 이상 못감
          result.push(possiblePos[i][j]);
          break;
        }
      }
    }
  } else if (type === "rook") {
    for (let i = 0; i < possiblePos.length; i++) {
      // 4방향 모두 살펴보기
      for (let j = 0; j < possiblePos[i].length; j++) {
        let row = rank[possiblePos[i][j][1]];
        let col = file[possiblePos[i][j][0]];

        if (board[row][col] === ".") result.push(possiblePos[i][j]);
        else if (board[row][col].color === color) {
          // 직선에 같은 아군이 있다면 break 더 이상 이 방향으로 이동 불가
          break;
        } else if (board[row][col].color !== color) {
          // 적군이 있는경우 그 위치로 공격하고 더 이상 못감
          result.push(possiblePos[i][j]);
          break;
        }
      }
    }
  } else if (type === "queen") {
    for (let i = 0; i < possiblePos.length; i++) {
      // 8방향 모두 살펴보기
      for (let j = 0; j < possiblePos[i].length; j++) {
        let row = rank[possiblePos[i][j][1]];
        let col = file[possiblePos[i][j][0]];

        if (board[row][col] === ".") result.push(possiblePos[i][j]);
        else if (board[row][col].color === color) {
          // 직선에 같은 아군이 있다면 break 더 이상 이 방향으로 이동 불가
          break;
        } else if (board[row][col].color !== color) {
          // 적군이 있는경우 그 위치로 공격하고 더 이상 못감
          result.push(possiblePos[i][j]);
          break;
        }
      }
    }
  }
  return result;
};
export { in_range, possible_piece, is_max_piece, move_possible };
