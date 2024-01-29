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
const defaultOutDelimiter = progname.slice(-3) === "tsv" ? "\t" : ",";

const options = program
    .version(JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../package.json"))).version)
    .usage("[options] [file]")
    .option("-o, --out <file>", "output file name; defaults to “-” for stdout", "-")
    .option("-w, --output-delimiter <character>", "output delimiter character", defaultOutDelimiter)
    .option("-n, --newline-delimited", "accept newline-delimited JSON")
    .option("--input-encoding <encoding>", "input character encoding; defaults to “utf8”", "utf8")
    .option("--output-encoding <encoding>", "output character encoding; defaults to “utf8”", "utf8")
    .parse(process.argv)
    .opts();

const outFormat = dsvFormat(options.outputDelimiter);

rw.dash.readFile(program.args[0] || "-", (error, text) => {
  if (error) throw error;
  text = iconv.decode(text, options.inputEncoding);
  rw.dash.writeFile(options.out, iconv.encode(outFormat.format(options.newlineDelimited
      ? text.trim().split(/\r?\n/g).map((line) => JSON.parse(line))
      : JSON.parse(text)) + EOL, options.outputEncoding), (error) => {
    if (error) throw error;
  });
});
