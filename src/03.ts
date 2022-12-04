import { Solver } from "./utils.ts";

const fn: Solver<number> = async (lines) => {
  const values = new Map([
    [97, 1], // a to z
    [65, 27], // A to Z
  ].flatMap(([kOffset, vOffset]) =>
    Array.from(new Array(26), (_, i): [string, number] => [
      String.fromCharCode(kOffset + i),
      vOffset + i,
    ])
  ));

  let overlapSum = 0,
      badgeSum = 0,
      badgeGroup = [],
      badgeGroupCounter = 0;

  for await (const line of lines) {
    const half = line.length / 2;
    const [a, b] = [
      [0, half],
      [half, line.length],
    ].map(([from, to]) => new Set(line.substring(from, to)));

    for (const v of a) if (b.has(v)) {
      overlapSum += (values.get(v) as number);
      break;
    }

    badgeGroupCounter++;
    badgeGroup.push(new Set(line));

    if (badgeGroupCounter === 3) {
      const [a, b, c] = badgeGroup;
      for (const k of a) if (b.has(k) && c.has(k)) {
        badgeSum += values.get(k) as number;
        break;
      }
      badgeGroup = [];
      badgeGroupCounter = 0;
    }
  }
  return [overlapSum, badgeSum];
};

export default fn;
