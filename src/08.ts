import { Solver } from './utils.ts';

// sampling a 2D matrix 

const sample = (mt: number[][], x: number, y: number) => {
    const row = mt[x];
    const col = row.map((_, i) => mt[i][y]);
    return [
        row.slice(0, y).reverse(), // left
        row.slice(y + 1), // right 
        col.slice(0, x).reverse(), // up
        col.slice(x + 1) // down
    ];
}

const fn: Solver<number> = async (lines) => {
    const mt: number[][] = []; // naw, just load all in memory
    for await (const l of lines)
        mt.push(l.split('').map(s => Number.parseInt(s)));
    return [
        mt.flatMap((row, y) =>
                row.map((_, x) =>
                    sample(mt, x, y)
                        .map(s => s.every(n => n < mt[x][y]))
                        .some(Boolean)))
            .reduce((acc, v) => acc += Number(v), 0),
        Math.max(...mt.flatMap((row, y) =>
            row.map((_, x) =>
                sample(mt, x, y)
                    .map(s => {
                        const i = s.findIndex(v => v >= mt[x][y]);
                        return i !== -1
                            ? i + 1
                            : s.length;
                    })
                    .reduce((a, b) => a * b, 1)
            )))];
}

export default fn;
