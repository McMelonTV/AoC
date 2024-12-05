const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

const dirs = [
  [
    [-1, -1],
    [1, 1],
  ],
  [
    [1, -1],
    [-1, 1],
  ],
];

function find(input: string) {
  const matrix = input.split("\n").map((line) => line.split(""));

  let sum = 0;

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[x][y] !== "A") continue;

      let s = 0;
      dirs.forEach((dirT) => {
        let word = "";
        try {
          const first = matrix[x + dirT[0][0]][y + dirT[0][1]];
          const last = matrix[x + dirT[1][0]][y + dirT[1][1]];
          word += first + "A" + last;
        } catch (_e) {
          /*trying to get chars outside matrix, can ignore*/
        }

        if (word === "MAS" || word === "SAM") s++;
      });

      if (s === 2) sum++;
    }
  }

  return sum;
}

console.log(find(input));
