const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("day2input.txt");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let sum = 0;
const validity = { red: 12, green: 13, blue: 14 };

rl.on("line", (line) => {
  if (isGameValid(line)) {
    sum += getGameId(line);
  }
});

rl.on("close", () => {
  console.log("Finished reading the file.");
  console.log(sum);
});

function isGameValid(line) {
  const draws = line.split(":")[1].split(";");
  for (let draw of draws) {
    const values = { red: 0, green: 0, blue: 0 };
    const parts = draw.trim().split(", ");

    for (let part of parts) {
      const [count, color] = part.trim().split(" ");
      values[color] += parseInt(count);

      if (values[color] > validity[color]) {
        return false;
      }
    }
  }
  return true;
}

function getGameId(line) {
  return parseInt(line.split(":")[0].split(" ")[1]);
}
