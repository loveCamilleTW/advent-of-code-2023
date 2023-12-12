import { readFileSync } from "fs";

function trebuchet(str: string): number {
  const digits = str.match(/\d/g);
  if (!digits) return 0;

  const first = digits[0];
  const last = digits[digits?.length - 1];

  return Number(`${first}${last}`);
}

const input = readFileSync("input.txt", "utf-8");

const ans = input
  .split("\n")
  .map((str) => trebuchet(str))
  .reduce((acc, cur) => acc + cur);

console.log(ans);
