import { scaffold } from "./utils.ts";
import fn from "./05.ts";

scaffold("day 5", fn, [
    [
        "../input/05.sample.txt",
        'CMZ',
        'MCD',
    ],
    [
        "../input/05.txt",
        'RTGWZTHLD',
        'STHGRZZFR'
    ]
]);
