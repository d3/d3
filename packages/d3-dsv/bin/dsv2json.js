#!/usr/bin/env node

import {EOL} from "os";
import {basename, dirname, resolve} from "path";
import {readFileSync} from "fs";
import {fileURLToPath} from "url";
import rw from "rw";
import {program} from "commander";
import iconv from "iconv-lite";
import {dsvFormat} from "../src/index.js";

const progname = basename(process.argv[1]);
const defaultInDelimiter = progname.slice(0, 3) === "tsv" ? "\t" : ",";

const options = program
    .version(JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../package.json"))).version)
    .usage("[options] [file]")
    .option("-o, --out <file>", "output file name; defaults to “-” for stdout", "-")
    .option("-r, --input-delimiter <character>", "input delimiter character", defaultInDelimiter)
    .option("-a, --auto-type", "parse rows with type inference (see d3.autoType)")
    .option("-n, --newline-delimited", "output newline-delimited JSON")
    .option("--input-encoding <encoding>", "input character encoding; defaults to “utf8”", "utf8")
    .option("--output-encoding <encoding>", "output character encoding; defaults to “utf8”", "utf8")
    .parse(process.argv)
    .opts();

const inFormat = dsvFormat(options.inputDelimiter);

rw.dash.readFile(program.args[0] || "-", (error, text) => {
  if (error) throw error;
  const rowConverter = options.autoType ? dsv.autoType : null
  const rows = inFormat.parse(iconv.decode(text, options.inputEncoding), rowConverter);
  rw.dash.writeFile(options.out, iconv.encode(options.newlineDelimited
      ? rows.map((row) => JSON.stringify(row)).join("\n") + "\n"
      : JSON.stringify(rows) + EOL, options.outputEncoding), (error) => {
    if (error) throw error;
  });
});
