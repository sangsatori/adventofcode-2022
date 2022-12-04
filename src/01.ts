import { Solver } from "./utils.ts";

const fn: Solver<number> = async (lines) => {
  const results: number[] = [];
  for await (const result of async function* (lines) {
    let sum = 0;
    for await (const line of lines) if (line.length === 0) {
      yield sum;
      sum = 0;
    } else sum += Number.parseInt(line);
    yield sum; // last before EOF
  }(lines)) results.push(result);

  results.sort((a, b) => b - a);

  return [
    results[0],
    results
      .slice(0, 3)
      .reduce((a, b) => a + b),
  ];
};

export default fn;
