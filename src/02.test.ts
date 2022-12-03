import { scaffold } from './utils.ts';
import fn from './02.ts';

scaffold("day 2", fn, [
    [
        "../input/02.sample.txt",
        15,
        12
    ],
    [
        "../input/02.txt",
        13675,
        14184
    ]
]);