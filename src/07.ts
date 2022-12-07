import { Solver } from './utils.ts';
import { join } from 'https://deno.land/std@0.167.0/path/mod.ts';

type FileNode = {
    parent: symbol;
    size: number;
}
type DirNode = {
    parent: symbol | null;
    children: Set<symbol>;
}

const fn: Solver<number> = async (lines) => {
    const nodes: Record<symbol, FileNode | DirNode> = {};
    const root = Symbol.for('/');
    nodes[root] = {
        parent: null,
        children: new Set()
    };
    let cwd = '/';
    for await (const l of lines) {
        if (l.startsWith('$')) { // is a command
            const [, command, arg] = l.split(' ');
            switch (command) {
                case 'cd': {
                    const nextDir = join(cwd, arg);
                    nodes[Symbol.for(nextDir)] ??= {
                        parent: Symbol.for(cwd),
                        children: new Set()
                    }
                    cwd = nextDir;
                    console.log(cwd);
                    break;
                }
                default:
                    break;
            }
        } else if (l.length !== 0) { // is output but not empty
            const [meta, name] = l.split(' ');
            const id = Symbol.for(join(cwd, name));
            const parent = Symbol.for(cwd);

            nodes[id] ??= meta === 'dir'
                ? { parent, children: new Set()}
                : { parent, size: Number.parseInt(meta) };

            (nodes[parent] as DirNode).children.add(id);
        }
    }

    const dirSizes: number[] = [];
    const processSizes = (k: symbol) => {
        let sum = 0;
        for (const child_k of (nodes[k] as DirNode).children)
            sum += 'size' in nodes[child_k]
                ? (nodes[child_k] as FileNode).size // is file
                : processSizes(child_k); // is dir
        dirSizes.push(sum);
        return sum;
    }

    processSizes(root);

    const totalSpace = 70000000,
          freeSpaceTarget = 30000000;
    const limit = freeSpaceTarget - (totalSpace - Math.max(...dirSizes));
    
    return [
        dirSizes
            .filter(v => v <= 100000)
            .reduce((a, b) => a + b),
        dirSizes
            .sort((a, b) => a - b)
            .find(x => x >= limit) ?? 0
    ];
}

export default fn;
