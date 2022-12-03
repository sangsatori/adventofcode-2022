import { Solver } from './utils.ts';

type shape = 0 | 1 | 2;
type move = "X" | "Y" | "Z";

enum Rewards {
    Win = 6,
    Loss = 0,
    Draw = 3,
}

const rules: Record<move, (n: shape) => number> = {
    X: n =>
        Rewards.Loss
        + [2, 0, 1][n] + 1,
    Y: n =>
        Rewards.Draw
        + n + 1,
    Z: n =>
        Rewards.Win
        + [1, 2, 0][n] + 1
};

const computePt1 = (a: shape, b: shape) => {
    switch (b - a) {
        case 0:
            return Rewards.Draw;
        case 1:
        case -2:
            return Rewards.Win;
        default:
            return Rewards.Loss
    }
}

const fn: Solver<number> = async (lines) => {
    let res1 = 0;
    let res2 = 0;
    for await (const line of lines) {
        const a = (line.charCodeAt(0) - 65) as shape;
        const b = (line.charCodeAt(2) - 88) as shape;
        res1 += computePt1(a, b) + b + 1;
        res2 += rules[line[2] as move](line.charCodeAt(0) - 65 as shape)
    }
    return [res1, res2];
}

export default fn;
