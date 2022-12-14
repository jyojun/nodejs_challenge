import { file, rank } from "./enum.js";

class Piece {
  constructor(type, position, color) {
    this.type = type;
    this.position = {
      row: rank[position[1]],
      col: file[position[0]],
    };
    this.color = color;
  }
}

export default Piece;
