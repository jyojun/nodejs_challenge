import { compare_rank } from "./compare_rank.js";

console.log(compare_rank([1, 5, 7, 2, 9, 13, 10], [2, 3, 9, 10, 4, 8, 11]));
console.log(compare_rank([1, 4, 1, 3, 5, 6, 10], [9, 2, 3, 1, 3, 4, 10]));
console.log(compare_rank([1, 1, 9, 4, 1, 3, 11], [2, 3, 3, 13, 12, 9, 9]));
console.log(compare_rank([1, 4, 9, 4, 1, 10, 13], [11, 13, 9, 3, 1, 9, 1]));
console.log(compare_rank([1, 3, 5, 4, 2, 10, 4], [11, 13, 11, 3, 11, 9, 1]));
console.log(compare_rank([1, 1, 4, 4, 1, 1, 9], [1, 2, 11, 3, 11, 4, 5]));
