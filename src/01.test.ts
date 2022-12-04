import { scaffold } from "./utils.ts";
import fn from "./01.ts";

scaffold("day 1", fn, [
  [
    "../input/01.sample.txt",
    24000,
    45000,
  ],
  [
    "../input/01.txt",
    74394,
    212836,
  ],
]);
