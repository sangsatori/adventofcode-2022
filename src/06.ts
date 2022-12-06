import { Solver } from './utils.ts';

const firstUnique = (s: string, n: number) => {
    for (let i = (n - 1); i < s.length; i++) {
        const unique = new Set();
        for (let j = (n - 1); j >= 0; j--) unique.add(s[i-j]);
        if (unique.size === n) return (i + 1);
    }
}

const fn: Solver<number> = async (lines) => {
    let a, b;
    for await (const l of lines) [a, b] = [
        firstUnique(l, 4),
        firstUnique(l, 14)
    ]
    return [ a ?? 0, b ?? 0 ];
}

export default fn;
