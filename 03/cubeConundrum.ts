import { readFileSync } from "fs";

const LIMITATION = { red: 12, green: 13, blue: 14 };

type Color = keyof typeof LIMITATION;

function cubeConundrum() {
  const input = readFileSync("input.txt", "utf-8");
  let sum = 0;

  const gameRecords = input
    .split("\n")
    .map((str) => parseGameRecordFromString(str));

  gameRecords.forEach((gameRecord) => {
    let isValid = true;

    for (let i = 0; i < gameRecord.records.length; i++) {
      const record = gameRecord.records[i];
      const entries = Object.entries(record);

      for (let j = 0; j < entries.length; j++) {
        const [key, value] = entries[j];

        if (
          isColor(key) &&
          (LIMITATION[key] === undefined || LIMITATION[key] < value)
        ) {
          isValid = false;
          break;
        }
      }

      if (!isValid) break;
    }

    if (isValid) {
      sum += gameRecord.id;
    }
  });

  return sum;
}

type GameRecord = {
  id: number;
  records: Array<{
    red?: number;
    green?: number;
    blue?: number;
  }>;
};

function parseGameRecordFromString(str: string): GameRecord {
  const [gameMetaData, recordData] = str.split(":");
  const gameRecord: GameRecord = {
    id: getGameId(gameMetaData),
    records: [],
  };

  recordData.split(";").forEach((record) => {
    const ballCounts: { [key: string]: number } = {};

    record.split(",").forEach((ballInfo) => {
      const [quantityStr, color] = ballInfo.trim().split(" ");
      const quantity = parseInt(quantityStr, 10);
      ballCounts[color] = quantity;
    });

    gameRecord.records.push(ballCounts);
  });

  return gameRecord;
}

function getGameId(str: string): number {
  const digits = str.match(/\d+/)!;
  return parseInt(digits[0]);
}

function isColor(key: string): key is Color {
  return key === "red" || key === "green" || key === "blue";
}

const ans = cubeConundrum();
console.log(ans);
