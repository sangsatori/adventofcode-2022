import { Solver } from './utils.ts';

const fn: Solver<number> = async (lines) => {
    const sums: number[] = [];
    for await (const sum of async function* (lines) {
        let sum = 0;
        for await (const line of lines) {
            if (line.length === 0) {
                yield sum;
                sum = 0;
            } else {
                sum += Number.parseInt(line, 10);
            }
        }
        yield sum; // last before EOF
    }(lines)) sums.push(sum);

    sums.sort((a, b) =>
        a > b
        ? -1
        : a < b
        ? 1
        : 0
    );

    return [
        sums[0],
        sums
            .slice(0, 3)
            .reduce((a, b) => a + b)
    ];
}

export default fn;
