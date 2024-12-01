import { readFile } from "node:fs/promises";
import { join } from "node:path";

const left = [];
const right = [];

const fileContent = await readFile(join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});
const fileLines = fileContent.split(`
`);
fileLines.forEach((line) => {
  const [leftNumber, rightNumber] = line.split("   ");
  left.push(Number(leftNumber));
  right.push(Number(rightNumber));
});

/**
 * PART 1
 */
const leftSorted = left.sort();
const rightSorted = right.sort();

const pairsLeftRight = [];
leftSorted.forEach((v, index) => {
  pairsLeftRight.push([v, rightSorted[index]]);
});

const wholeDistance = pairsLeftRight.reduce(
  (prev, curr) => prev + Math.abs(curr[0] - curr[1]),
  0
);
console.log("[PART_1] answer: ", wholeDistance);

/**
 * PART 2
 */
let similarityScore = 0;
left.forEach((leftNumber) => {
  const rightHitCount = right.reduce(
    (hitCounter, rightNumber) =>
      rightNumber === leftNumber ? ++hitCounter : hitCounter,
    0
  );
  similarityScore += leftNumber * rightHitCount;
});
console.log("[PART_2] answer: ", similarityScore);
