import { Solver } from "./utils.ts";

const fn: Solver<string> = async (lines) => {
    let buildPhase = true;
    let a: string[][];
    let b: string[][] | null = null;
    for await (const l of lines) {
        if (!a || !b) {
            a = [];
            b = [];
            for (let i = 0; i < Math.ceil(l.length / 4); i++) {
                a[i] = [];
                b[i] = [];
            }
        }
        if (buildPhase && l.match(/\[/)) {
            (l.match(/.{1,4}/g) as string[])
                .map(s => s.trim())
                .forEach((crate, i) => {
                if (crate) {
                    (a as string[][])[i].unshift((crate.match(/[A-Z]/) as string[])[0]);
                    (b as string[][])[i].unshift((crate.match(/[A-Z]/) as string[])[0]);
                }
            })
        } else buildPhase = false;

        if (!buildPhase && l.startsWith('move')) {
            let [count, from, to] = (l.match(/\d+/g) as string[]).map(s => Number.parseInt(s));
            from--;
            to--;
            for (let i = 0; i < count; i++)
                a[to].push(
                    a[from].pop() as string);
            b[to].push(
                ...b[from].splice(-count));
        }

    }
    return [
        (a as string[][])
            .map(stack => stack[stack.length - 1])
            .join(''),
        (b as string[][])
            .map(stack => stack[stack.length - 1])
            .join('')
    ];
}

export default fn;