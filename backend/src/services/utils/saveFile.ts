const fs = require("fs");
const path = require("path");

export function saveFile(fileName : string, buf : Buffer, folder :String = "out") {

  const baseDir = path.resolve(__dirname, `../../../images/${folder}`);
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}