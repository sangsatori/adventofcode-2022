import { resolve, dirname, fromFileUrl } from "https://deno.land/std@0.167.0/path/mod.ts";
import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

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

async function pt1(lines: AsyncIterable<string>) {
    let score = 0;
    for await (const line of lines) {
        const a = (line.charCodeAt(0) - 65) as shape;
        const b = (line.charCodeAt(2) - 88) as shape;
        score += computePt1(a, b) + b + 1;
    }
    return score;
}

async function pt2(lines: AsyncIterable<string>) {
    let score = 0;
    for await (const line of lines) {
        score += rules[line[2] as move](line.charCodeAt(0) - 65 as shape);
    }
    return score;
}

Deno.test("day 2", async (t) => {
    const filename = resolve(__dirname, "../input/02.txt");

    await t.step("part 1", async () => {
        const file = await Deno.open(filename);
        assertEquals(
            await pt1(readLines(file)),
            13675
        );
        file.close();
    });

    await t.step("part 2", async () => {
        const file = await Deno.open(filename);
        assertEquals(
            await pt2(readLines(file)),
            14184
        );
        file.close();
    }) 
})