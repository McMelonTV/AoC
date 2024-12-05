const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

function main(input: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  input.split("\n").forEach((line) => {
    const nums = line.split("   ");

    list1.push(Number(nums[0]));
    list2.push(Number(nums[1]));
  });

  let sum = 0;

  for (let i = 0; i < list1.length; i++) {
    const num1 = list1[i];
    const numCount2 = list2.filter((val) => val == num1).length;

    sum += num1 * numCount2;
  }

  return sum;
}

console.log(main(input));