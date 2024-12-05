const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

function main(input: string) {
  const instructionRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const instructions = input
    .split("do()")
    .map((part) => part.split("don't()")[0])
    .map((string) => [...string.matchAll(instructionRegex)])
    .flatMap((regexecarray) => regexecarray);
  // props to u/AtomicScience - https://www.reddit.com/r/adventofcode/comments/1h5frsp/comment/m05qlb3/

  let sum = 0;
  instructions.forEach((instructionA) => {
    const [_instruction, num1, num2] = instructionA;
    sum += Number(num1) * Number(num2);
  });

  return sum;
}

console.log(main(input));
