const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("day3input.txt");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});
const lineCounter = 0;
const matrix = [];
rl.on("line", (line) => {
  // readline
  matrix.push(line.split(""));
});

rl.on("close", () => {
  console.log("Finished reading the file.");
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    sum += sumValidNumber(matrix, i, 0, "", false, 0);
  }
  console.log(sum);
});

const sumValidNumber = (matrix, x, y, tempNumber, validNumber, sum) => {
  //console.log(x, y, tempNumber, validNumber, sum);
  if (isInMatrix(matrix, x, y + 1)) {
    if (matrix[x][y] >= "0" && matrix[x][y] <= "9") {
      return sumValidNumber(
        matrix,
        x,
        y + 1,
        tempNumber.concat(matrix[x][y]),
        validNumber || isValidNumber(matrix, x, y),
        sum
      );
    } else {
      return sumValidNumber(
        matrix,
        x,
        y + 1,
        "",
        false,
        sum + parseInt(tempNumber != "" && validNumber ? tempNumber : 0)
      );
    }
  }

  return (
    sum +
    parseInt(
      tempNumber != "" && validNumber ? tempNumber.concat(matrix[x][y]) : 0
    )
  );
};

const isInMatrix = (matrix, x, y) => {
  return x >= 0 && x < matrix.length && y >= 0 && y < matrix[x].length;
};

const isValidNumber = (matrix, x, y) => {
  for (let xi = -1; xi <= 1; xi++) {
    for (let yi = -1; yi <= 1; yi++) {
      if (
        isInMatrix(matrix, x + xi, y + yi) &&
        !(matrix[x + xi][y + yi] >= "0" && matrix[x + xi][y + yi] <= "9") &&
        matrix[x + xi][y + yi] != "."
      ) {
        return true;
      }
    }
  }
  return false;
};
