const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

function main(input: string) {
  const lines = input.split("\n");
  let safe = 0;

  lines.forEach((line) => {
    const levels = line.split(" ").map(Number);
    let isSafe = checkLine(levels, false);
    if (!isSafe) isSafe = checkLine(levels, true);
    if (isSafe) safe++;
  });

  return safe;
}

function checkLine(line: number[], tolerateOneError: boolean) {
  if (!tolerateOneError) {
    //if all going up/down by 1-3 then safe++
    const increasing = [...line].sort((a, b) => a - b);
    const decreasing = [...line].sort((a, b) => b - a);

    if (compArr(line, increasing) || compArr(line, decreasing)) {
      const isSafe: boolean[] = [];
      [...line].sort((a, b) => {
        if (1 <= Math.abs(a - b) && Math.abs(a - b) <= 3) isSafe.push(true);
        else isSafe.push(false);
        return 0;
      });
      if (!isSafe.includes(false)) return true;
    }
  } else {
    for (let i = 0; i < line.length; i++) {
	  const nln = [...line]
	  nln.splice(i, 1)
      if (checkLine(nln, false)) return true;
    }

	return false
  }
}

function compArr(arr1: number[], arr2: number[]): boolean {
  const eq: boolean[] = [];
  arr1.forEach((num, i) => {
    if (num == arr2[i]) eq.push(true);
    else eq.push(false);
  });

  return !eq.includes(false);
}

console.log(main(input));
