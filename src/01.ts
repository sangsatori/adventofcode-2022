import { resolve, dirname, fromFileUrl } from "https://deno.land/std@0.167.0/path/mod.ts";
import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

async function pt1(lines: AsyncIterable<string>) {
    let greatest = 0;
    let sum = 0;

    for await(const line of lines) {
        if (line.length === 0) {
            greatest = Math.max(greatest, sum);
            sum = 0; // reset
        } else {
            sum += Number.parseInt(line, 10);
        }
    }

    return greatest;
}

async function pt2(lines: AsyncIterable<string>) {
    const sums: number[] = [];
    let sum = 0;

    for await(const line of lines) {
        if (line.length === 0) {
            sums.push(sum);
            sum = 0; // reset
        } else {
            sum += Number.parseInt(line, 10);
        }
    }

    return sums
        .sort((a, b) =>
            a > b
            ? -1
            : a < b
            ? 1
            : 0
        )
        .slice(0, 3)
        .reduce((a, b) => a + b);
}

Deno.test("day 1", async (t) => {
    const filename = resolve(__dirname, "../input/01.txt");

    await t.step("part 1", async () => {
        const file = await Deno.open(filename);
        assertEquals(
            await pt1(readLines(file)),
            74394
        );
        file.close();
    });

    await t.step("part 2", async () => {
        const file = await Deno.open(filename);
        assertEquals(
            await pt2(readLines(file)),
            212836
        );
        file.close();
    });
});
