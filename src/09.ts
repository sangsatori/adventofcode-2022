import { Solver } from './utils.ts';

// TODO: visualizer

enum Direction {
    Up      = "U",
    Down    = "D",
    Left    = "L",
    Right   = "R"
}

type Movement = `${Direction} ${number}`;

type Point = {
    x: number;
    y: number
}

const fn: Solver<number> = async (lines) => {
    const rope: [Point, Set<string>][] = Array(10).fill(null).map(() => [
        { x: 0, y: 0 },
        new Set()
    ]);

    for await (const l of lines) {
        if (l.length === 0) break; // EOL
        const [direction, steps] = (l as Movement).split(' ');
        const [head] = rope[0];
        for (let i = 0; i < Number.parseInt(steps); i++) { // move head
            switch (direction as Direction) {
                case Direction.Up:
                    head.y++;
                    break;
                case Direction.Down:
                    head.y--;
                    break;
                case Direction.Right:
                    head.x++
                    break;
                case Direction.Left:
                    head.x--;
                    break;
            }

            let h, t;
            for (let i = 1; i < rope.length; i++) {
                h = rope[i-1][0];
                t = rope[i][0];

                // update rope tail elements
                const dtX = h.x - t.x;
                const dtY = h.y - t.y;
                const dtXabs = Math.abs(dtX);
                const dtYabs = Math.abs(dtY);

                // chess distance
                if (Math.max(dtXabs, dtYabs) > 1) {
                    if (dtX) t.x += dtX / dtXabs;
                    if (dtY) t.y += dtY / dtYabs;
                }
                rope[i][1].add(`${t.x} ${t.y}`);
            }
        }
    }

    return [rope[1][1].size, rope[9][1].size];
}

export default fn;
