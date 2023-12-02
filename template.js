const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("day1part1input.txt");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  // readline
});

rl.on("close", () => {
  console.log("Finished reading the file.");
  //give answer
});
