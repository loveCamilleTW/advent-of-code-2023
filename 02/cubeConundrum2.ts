import { readFileSync } from "fs";
import { parseGameRecordFromString, isColor } from "./cubeConundrum";

function cubeConundrum2() {
  const input = readFileSync("input.txt", "utf-8");
  let sum = 0;

  const gameRecords = input
    .split("\n")
    .map((str) => parseGameRecordFromString(str));

  gameRecords.forEach((gameRecord) => {
    const minCounts = {
      red: 0,
      blue: 0,
      green: 0,
    };

    gameRecord.records.forEach((record) => {
      Object.entries(record).forEach(([key, value]) => {
        if (isColor(key)) {
          minCounts[key] = minCounts[key] < value ? value : minCounts[key];
        }
      });
    });

    sum += minCounts["red"] * minCounts["blue"] * minCounts["green"];
  });

  return sum;
}

const ans = cubeConundrum2();
console.log(ans);
