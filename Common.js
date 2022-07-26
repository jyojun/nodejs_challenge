import { file, rank } from "./enum.js";

class Common {
  constructor(type, position, color) {
    this.position = {
      row: rank[position[1]],
      col: file[position[0]],
    };
  }
}
