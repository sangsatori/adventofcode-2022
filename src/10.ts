import { Solver } from './utils.ts';

// TODO: update Solver to accept mixed types, so to test rendered text

async function* cycles(xs: AsyncIterable<string>) {
    let x = 1;
    let cycle = 0;
    for await (const l of xs) {
        const [cmd, v] = l.split(' ');
        switch (cmd) {
            case 'addx':
                cycle += 1;
                yield [cycle, x];
                cycle += 1;
                yield [cycle, x];
                x += Number.parseInt(v);
                break;
            case 'noop':
                cycle += 1;
                yield [cycle, x];
                break;
            default:
                break;
        }
    }
}

const fn: Solver<number> = async (lines) => {
    const samples = [20, 60, 100, 140, 180, 220];
    let sampleIndex = 0;
    let acc = 0;
    let render = '';
    for await (const [cycle, v] of cycles(lines)) {
        if (cycle === samples[sampleIndex]) {
            acc += cycle * v;
            sampleIndex++;
        }

        if ((cycle-1) % 40 === 0) render += '\n';
        render +=
            (new Set([v, v-1, v+1])).has((cycle-1) % 40)
            ? '#'
            : '.';
    }
    console.log(render);
    return [acc, 0];
}

export default fn;
