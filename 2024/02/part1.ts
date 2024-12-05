const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

function main(input: string) {
  const lines = input.split("\n");
  let safe = 0;

  lines.forEach((line) => {
    const levels = line.split(" ").map(Number);

    //if all going up/down by 1-3 then safe++
    const increasing = [...levels].sort((a, b) => a - b);
    const decreasing = [...levels].sort((a, b) => b - a);

    if (compArr(levels, increasing) || compArr(levels, decreasing)) {
      const isSafe: boolean[] = [];
      [...levels].sort((a, b) => {
        if (1 <= Math.abs(a - b) && Math.abs(a - b) <= 3) isSafe.push(true);
        else isSafe.push(false);
        return 0;
      });
      if (!isSafe.includes(false)) safe++;
    }
  });

  return safe;
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
