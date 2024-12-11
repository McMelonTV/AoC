const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile(import.meta.dirname + "/input.txt");
const input = decoder.decode(data);

class Rule {
  constructor(public a: number, public b: number) {}
  check(arr: number[]) {
    if (arr.indexOf(this.b) === -1) return true;
    if (arr.indexOf(this.a) === -1) return true;
    if (arr.indexOf(this.a) < arr.indexOf(this.b)) return true;
    return false;
  }
}

function correctUpdate(update: number[], rules: Rule[]) {
  return update.sort((a, b) => {
    let abidesAll = true;
    rules.forEach((rule) => {
      const abides = rule.check([a, b]);
      if (!abides) abidesAll = false;
    });
    if (abidesAll) return -1;
    else return 1;
  });
}

function main(input: string) {
  const [rulesIn, updatesIn] = input.split("\r\n\r\n"); // f*** windows

  const rules = rulesIn
    .split("\r\n")
    .map((rule) => rule.split("|").map(Number))
    .map((rule) => new Rule(rule[0], rule[1])); // Rule[]

  const updates = updatesIn
    .split("\r\n")
    .map((update) => update.split(",").map(Number))
    .map((update) => {
      let abidesAll = true;
      rules.forEach((rule) => {
        const abides = rule.check(update);
        if (!abides) abidesAll = false;
      });
      if (abidesAll) return null;
      else return update;
    })
    .filter((update) => update !== null)
    .map((update) => correctUpdate(update, rules))
    .map((update) => update[Math.floor(update.length / 2)]);
  let num = 0;

  updates.forEach((update) => {
    num += update;
  });

  return num;
}

console.time();
console.log(main(input));
console.timeEnd();
