import { Solver } from "./utils.ts";

const fn: Solver<number> = async (lines) => {
    let fullOverlapCount = 0,
        partialOverlapCount = 0;
    for await (const line of lines) {
        const [a, b] = line.split(',').map(s => {
            const [from, to] = (s.match(/\d+/g) as RegExpMatchArray)
                .map(s => Number.parseInt(s, 10));
            const items = new Set();
            for (let i = from; i <= to; i++)
                items.add(i);
            return items;
        });
        const [shorter, longer] = (a.size < b.size) ? [a, b] : [b, a];
        let fullOverlap = true,
            partialOverlap = false;
        for (const v of shorter) {
            if (!partialOverlap && longer.has(v))
                partialOverlap = true;
            if (fullOverlap && !longer.has(v))
                fullOverlap = false;
        }
        if (fullOverlap)
            fullOverlapCount++;
        if (partialOverlap)
            partialOverlapCount++;
    }
    return [fullOverlapCount, partialOverlapCount];
}

export default fn;