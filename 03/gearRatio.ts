import { readFileSync } from "fs";

type DirectionType = "LEFT" | "RIGHT" | "MID";
type Direction = [number, number];
type DirectionSet = { [key: string]: Direction };
type Directions = { [key in DirectionType]: DirectionSet };

const DIRECTIONS: Directions = {
  LEFT: {
    LEFT: [-1, 0],
    LEFT_TOP: [-1, -1],
    LEFT_BOTTOM: [-1, 1],
  },
  RIGHT: {
    RIGHT: [1, 0],
    RIGHT_TOP: [1, -1],
    RIGHT_BOTTOM: [1, 1],
  },
  MID: {
    TOP: [0, -1],
    BOTTOM: [0, 1],
  },
};

function gearRatio() {
  const input = readFileSync("input.txt", "utf-8");
  const engineSchematic = input.split("\n");
  let sum = 0;

  engineSchematic.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (!isDigit(row[c])) {
        continue;
      }

      let isAdjacent = isAdjacentToSymbol(engineSchematic, r, c, "LEFT");
      let curNum = 0;

      while (isValidIndex(r, c, engineSchematic) && isDigit(row[c])) {
        curNum *= 10;
        curNum += parseInt(row[c]);

        isAdjacent ||= isAdjacentToSymbol(engineSchematic, r, c, "MID");
        c++;
      }
      c--;

      isAdjacent ||= isAdjacentToSymbol(engineSchematic, r, c, "RIGHT");

      if (isAdjacent) {
        sum += curNum;
      }
    }
  });

  return sum;
}

function isDigit(char: string): boolean {
  return /\d/.test(char);
}

function isAdjacentToSymbol(
  grid: string[],
  row: number,
  col: number,
  directionType: DirectionType,
): boolean {
  for (const direction in DIRECTIONS[directionType]) {
    const [dx, dy] = DIRECTIONS[directionType][direction];

    const newRow = row + dy;
    const newCol = col + dx;

    if (
      isValidIndex(newRow, newCol, grid) &&
      !isDigit(grid[newRow][newCol]) &&
      grid[newRow][newCol] !== "."
    ) {
      return true;
    }
  }

  return false;
}

function isValidIndex(row: number, col: number, grid: string[]) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

const ans = gearRatio();
console.log(ans);
