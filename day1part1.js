const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("day1part1input.txt");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let sum = 0;

rl.on("line", (line) => {
  sum = sum + parseInt(firstDigit(line).concat(lastDigit(line)));
});

rl.on("close", () => {
  console.log("Finished reading the file.");
  console.log(sum);
});

const firstDigit = (line) => {
  for (let i = 0; i <= line.length - 1; i++) {
    if (line[i] >= "0" && line[i] <= "9") {
      return line[i];
    }
  }
  return 0;
};

const lastDigit = (line) => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (line[i] >= "0" && line[i] <= "9") {
      return line[i];
    }
  }
  return 0;
};
