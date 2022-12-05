import { Solver } from "./utils.ts";

type Stack = string[][]

const initStack = (length: number): Stack =>
    Array(Math.ceil(length / 4))
        .fill(null)
        .map(() => [])

const fn: Solver<string> = async (lines) => {
    let buildPhase = true;
    let a: Stack | undefined,
        b: Stack | undefined;
    for await (const l of lines) {
        a = a ?? initStack(l.length);
        b = b ?? initStack(l.length);
        if (buildPhase && l.match(/\[/)) {
            (l.match(/.{1,4}/g) as string[])
                .forEach((str, i) => {
                    const char = str.match(/[A-Z]/)?.[0];
                    if (char) for (const s of [a, b]) {
                        s?.[i].unshift(char);
                    }
                })
        } else if (l.startsWith('move')) {
            let [count, from, to] = l.match(/\d+/g)?.map(s => Number.parseInt(s)) as number[];
            from--, to--;
            for (let i = 0; i < count; i++) {
                a[to].push(a[from].pop() as string);
            }
            b[to].push(...b[from].splice(-count));
        } else buildPhase = false;
    }
    return [a, b].map(s => (s as Stack)
        .map(stack => stack[stack.length - 1])
        .join('')
    ) as [string, string];
}

export default fn;