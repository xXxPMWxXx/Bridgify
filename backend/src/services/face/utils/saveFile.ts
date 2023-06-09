const fs = require("fs");
const path = require("path");

const baseDir = path.resolve(__dirname, "../../../../out");

export function saveFile(fileName : string, buf : Buffer) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}