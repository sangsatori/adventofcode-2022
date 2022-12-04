import { scaffold } from "./utils.ts";
import fn from "./04.ts";

scaffold("day 4", fn, [
    [
        "../input/04.sample.txt",
        2,
        4,
    ],
    [
        "../input/04.txt",
        515,
        883
    ]
]);
