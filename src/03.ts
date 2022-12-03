export default async function main(lines: AsyncIterable<string>) {
    const values = new Map([
        [97, 1], // a to z
        [65, 27] // A to Z
    ].flatMap(([kOffset, vOffset]) =>
        Array.from(new Array(26), (_, i): [string, number] => [
            String.fromCharCode(kOffset + i),
            vOffset + i
        ])
    ));

    let res1 = 0,
        res2 = 0,
        group = [],
        counter = 0;

    for await (const line of lines) {
        { // pt1
            const half = line.length / 2;
            const [a, b] = [
                [0, half],
                [half, line.length]
            ].map(([from, to]) => new Set(line.substring(from, to)));

            for (const v of a) {
                if (b.has(v)) {
                    res1 += values.get(v) as number;
                    break;
                }
            }
        }

        { // pt2
            counter++;
            group.push(new Set(line));
            if (counter === 3) {
                const [a, b, c] = group;
                for (const k of a) {
                    if (b.has(k) && c.has(k)) {
                        res2 += values.get(k) as number;
                        break;
                    }
                }
                group = [];
                counter = 0;
            }
        }
    }

    return [res1, res2];
}