import { file, rank } from "./enum.js";

class Queen {
  constructor(type, position, color) {
    this.type = type;
    this.position = {
      row: rank[position[1]],
      col: file[position[0]],
    };
    this.color = color;
  }
  possiblePosition() {}
}
