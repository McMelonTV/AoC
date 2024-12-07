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



// https://stackoverflow.com/a/2450976
function shuffle<T>(arr: T[]) {
  const array = [...arr];
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function correctUpdate(update: number[], rules: Rule[], i: number, t: number) {
  console.log(`bruteforcing ${i}/${t}`)

  let correctUpdate;
  // permutations(update).forEach((possiblyCorrectUpdate) => {
  //   rules.forEach((rule) => {
  //     const check = rule.check(possiblyCorrectUpdate);
  //     if (check === true) correctUpdate = possiblyCorrectUpdate;
  //   });
  // });
  while (!correctUpdate) {
    const randomized = shuffle(update);
    let correct = true;
    rules.forEach((rule) => {
      const check = rule.check(randomized);
      if (check === false) correct = false;
    });
    if (correct === true) correctUpdate = randomized;
  }
  return correctUpdate;
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
    .map((update, i, a) => correctUpdate(update, rules, i, a.length))
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
