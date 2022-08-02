import fs from "fs";

function mkdir(dirPath) {
  const isExists = fs.existsSync(dirPath);
  if (!isExists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function init(path) {
  mkdir(`${path}/.mit/objects`);
  mkdir(`${path}/.mit/index`);
}

init("test2");
