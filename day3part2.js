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
  const gearLocations = getGearLocations(matrix);
  console.log(gearLocations);
  const sumOfGearRatios = gearLocations.reduce(
    (sum, gearXY) => getGearRatio(matrix, ...gearXY) + sum,
    0
  );
  console.log(sumOfGearRatios);
  console.log(matrix[6][3]);
});

const getGearRatio = (matrix, x, y) => {
  let separate = false;
  let ratios = [];
  for (let xi = -1; xi <= 1; xi++) {
    for (let yi = -1; yi <= 1; yi++) {
      if (
        isInMatrix(matrix, x + xi, y + yi) &&
        isDigit(matrix[x + xi][y + yi])
      ) {
        if (!separate) {
          ratios.push(getFullNumber(matrix, x + xi, y + yi));
          separate = true;
        }
      } else {
        separate = false;
      }
    }
    separate = false;
  }
  console.log(ratios);
  if (ratios.length == 2) {
    return ratios[0] * ratios[1];
  }
  return 0;
};

const getFullNumber = (matrix, x, y) => {
  let left = 1;
  let right = 1;
  let temp = matrix[x][y];
  while (isInMatrix(matrix, x, y - left) && isDigit(matrix[x][y - left])) {
    temp = matrix[x][y - left].concat(temp);
    left++;
  }
  while (isInMatrix(matrix, x, y + right) && isDigit(matrix[x][y + right])) {
    temp = temp.concat(matrix[x][y + right]);
    right++;
  }
  return temp;
};

const getGearLocations = (matrix) => {
  let gearLocations = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[x][y] == "*") {
        gearLocations.push([x, y]);
      }
    }
  }
  return gearLocations;
};

const isInMatrix = (matrix, x, y) => {
  return x >= 0 && x < matrix.length && y >= 0 && y < matrix[x].length;
};

const isDigit = (character) => {
  return character >= "0" && character <= "9";
};
