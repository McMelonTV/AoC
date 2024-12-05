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

  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();

  const diff: number[] = [];

  for (let i = 0; i < list1.length; i++) {
    const num1 = sortedList1[i];
    const num2 = sortedList2[i];

    diff[i] = Math.abs(num1 - num2);
  }

  let sum = 0;
  diff.forEach((num) => {
    sum += num;
  });

  return sum;
}

console.log(main(input));