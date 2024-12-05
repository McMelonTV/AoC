const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

const dirs = [
	[-1, -1],	[0, -1],	[1, -1],
	[-1, 0],				[1, 0],
	[-1, 1],	[0, 1],		[1, 1]
]

function find(input: string) {
  const matrix = input.split("\n").map((line) => line.split(""));

  let sum = 0;

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[x][y] !== "X") continue;

      let s = 0;
      dirs.forEach((dir) => {
        let word = "X";
        for (let c = 1; c <= 3; c++) {
          try {
            const char = matrix[x + dir[0] * c][y + dir[1] * c];
            word += char;
          } catch (_e) {
            /*trying to get chars outside matrix, can ignore*/
          }
        }

        if (word === "XMAS") s++;
      });

      sum += s;
    }
  }

  return sum;
}

console.log(find(input));
