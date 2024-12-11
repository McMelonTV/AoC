const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

function main(input: string) {
  let matrix = input.split("\n").map((line) => line.split(""));

  let safe = true;
  while (safe) {
    [matrix, safe] = go(matrix);
  }

  return matrix
    .map((line) => line.join(""))
    .join("")
    .split("")
    .filter((char) => char === "X").length;

  // return matrix.map((line) => line.join("")).join("\n");
}

function getGuardPos(matrix: string[][]): [number, number] {
  const guard_regex = /\^|\>|\<|v/g;

  const line = matrix.findIndex((line) => (line.join().match(guard_regex) !== null ? true : false));
  const char = matrix[line].findIndex((char) => (char.match(guard_regex) !== null ? true : false));

  return [line, char];
}

function isGuardInside(matrix: string[][], guardPos: [number, number]) {
  return guardPos[0] < matrix.length && guardPos[1] < matrix[0].length && guardPos[0] >= 0 && guardPos[1] >= 0;
}

function go(matrix: string[][]): [string[][], boolean] {
  const guardPos = getGuardPos(matrix);
  const guard = matrix[guardPos[0]][guardPos[1]] as Guard;
  const direction = getDirection(guard);

  let newGuardPos = guardPos;
  while (true) {
    matrix[newGuardPos[0]][newGuardPos[1]] = "X";
    const potentialNewPos = getNewGuardPos(newGuardPos, direction);
    if (isSafeGuardPos(matrix, potentialNewPos)) {
      newGuardPos = potentialNewPos;
    } else {
      break;
    }
  }

  if (!isGuardInside(matrix, getNewGuardPos(newGuardPos, direction))) return [matrix, false];

  matrix[newGuardPos[0]][newGuardPos[1]] = rotateGuard(guard);

  return [matrix, true];
}

function getNewGuardPos(guardPos: [number, number], direction: [number, number]): [number, number] {
  return [guardPos[0] + direction[0], guardPos[1] + direction[1]];
}

function isSafeGuardPos(matrix: string[][], guardPos: [number, number]) {
  if (guardPos[0] >= matrix.length || guardPos[1] >= matrix[0].length || guardPos[0] < 0 || guardPos[1] < 0) return false;
  if (matrix[guardPos[0]][guardPos[1]] === "#") return false;
  return true;
}

type Guard = "v" | "<" | ">" | "^";

function getDirection(guard: Guard) {
  const directions: Record<Guard, [number, number]> = {
    v: [1, 0],
    "<": [0, -1],
    ">": [0, 1],
    "^": [-1, 0],
  };

  return directions[guard];
}

function rotateGuard(guard: Guard): Guard {
  const rotations: Record<Guard, Guard> = {
    v: "<",
    "<": "^",
    ">": "v",
    "^": ">",
  };

  return rotations[guard];
}

console.log(main(input));
