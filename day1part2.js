const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("day1part2input.txt");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});
const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
let sum = 0;

rl.on("line", (line) => {
  sum = sum + parseInt(firstDigit(line).concat(lastDigit(line)));
});

rl.on("close", () => {
  console.log("Finished reading the file.");
  console.log(sum);
});

const firstDigit = (line) => {
  let substr = "";
  for (let i = 0; i <= line.length - 1; i++) {
    if (line[i] >= "0" && line[i] <= "9") {
      return line[i];
    } else {
      substr = substr.concat(line[i]);
      let r = "";
      digits.forEach((x) => {
        if (substr.includes(x)) {
          r = x;
        }
      });
      if (r) {
        return (digits.indexOf(r) + 1).toString();
      }
    }
  }
  return 0;
};

const lastDigit = (line) => {
  let substr = "";
  for (let i = line.length - 1; i >= 0; i--) {
    if (line[i] >= "0" && line[i] <= "9") {
      return line[i];
    } else {
      substr = line[i].concat(substr);
      let r = "";
      digits.forEach((x) => {
        if (substr.includes(x)) {
          r = x;
        }
      });
      if (r) {
        return (digits.indexOf(r) + 1).toString();
      }
    }
  }
  return 0;
};
