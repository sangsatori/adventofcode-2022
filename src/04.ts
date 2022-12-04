import { Solver } from "./utils.ts";

const fn: Solver<number> = async (lines) => {
    let full    = 0,
        partial = 0;
    for await (const line of lines) {
        const [short, long] = line
            .split(',')
            .map(s => {
                const items: Set<number> = new Set();
                const [from, to] = (s.match(/\d+/g) as RegExpMatchArray)
                    .map(s => Number.parseInt(s));
                for (let i = from; i <= to; i++) items.add(i);
                return items;
            })
            .sort(({ size: a }, { size: b }) => a - b);
        let isFull      = true,
            isPartial   = false;
        for (const v of short) {
            if (!isPartial && long.has(v))
                isPartial = true;
            if (isFull && !long.has(v))
                isFull = false;
        }
        if (isFull) full++;
        if (isPartial) partial++;
    }
    return [full, partial];
}

export default fn;