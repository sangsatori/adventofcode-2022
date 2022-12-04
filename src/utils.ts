import {
  dirname,
  fromFileUrl,
  resolve
} from "https://deno.land/std@0.167.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
import { zip } from "https://deno.land/std@0.167.0/collections/zip.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

export interface Solver<T> {
  (input: AsyncIterable<string>): Promise<[T, T]>;
}

export const scaffold = <T>(
  name: string,
  fn: Solver<T>,
  definitions: [string, T, T][],
) => {
  Deno.test(name, async () => {
    for await (const [inputPath, ...answers] of definitions) {
      const f = await Deno.open(resolve(__dirname, inputPath));
      for (const [actual, expected] of zip(await fn(readLines(f)), answers))
        assertEquals(actual, expected);
      f.close();
    }
  });
};
