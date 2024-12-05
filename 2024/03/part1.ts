const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

function main(input: string) {
  const instructionRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
  const instructions = input.matchAll(instructionRegex);
  let sum = 0;
  instructions.forEach((instructionA) => {
    const [_instruction, num1, num2] = instructionA;
    sum += Number(num1) * Number(num2);
  });

  return sum;
}

console.log(main(input));
