import fs from "node:fs";

export default {
  watch: ["../public/data/volcano.json"],
  load([file]) {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  }
};
