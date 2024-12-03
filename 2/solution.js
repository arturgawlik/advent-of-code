import { readFile } from "node:fs/promises";
import { join } from "node:path";

const reports = [];

const fileContent = await readFile(join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});
const fileLines = fileContent.split(`
`);
fileLines.forEach((line) => {
  const levels = line.split(" ").map((v) => Number(v));
  reports.push(levels);
});

const increasing = (value, array, index) => value < array[index + 1];
const decreasing = (value, array, index) => value > array[index + 1];
const meetDifference = (value, array, index) => {
  const diff = Math.abs(value - array[index + 1]);
  const res = [1, 2, 3].includes(diff);
  return res;
};

const mainCheck = (checkFn, levels, canSkipOne = false) => {
  const check = (array, toCheck) => {
    return array.every((value, index) => {
      const isLast = array.length === index + 1;
      if (isLast) {
        return true;
      }
      return toCheck(value, array, index);
    });
  };
  let result = check(levels, checkFn) && check(levels, meetDifference);
  let spliced = null;
  if (!result && canSkipOne) {
    levels.forEach((_, index) => {
      if (!result) {
        spliced = levels.toSpliced(index, 1);
        result = check(spliced, checkFn) && check(spliced, meetDifference);
      }
    });
  }
  return result;
};

/**
 * PART 1
 */
let validReportsCount = 0;

reports.forEach((report) => {
  if (mainCheck(increasing, report) || mainCheck(decreasing, report)) {
    validReportsCount++;
  }
});

console.log("[PART_1] answer: ", validReportsCount);

/**
 * PART 2
 */
let validReportsWithOneBadSignalCount = 0;

reports.forEach((report) => {
  if (
    mainCheck(increasing, report, true) ||
    mainCheck(decreasing, report, true)
  ) {
    validReportsWithOneBadSignalCount++;
  }
});

console.log("[PART_2] answer: ", validReportsWithOneBadSignalCount);
