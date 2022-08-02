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

function makeRandomFile(dirPath, name) {
  const isExists = fs.existsSync(`${dirPath}/${name}`);
  if (!isExists) {
    try {
      const file = `${dirPath}/${name}.txt`;
      const data = "test";
      fs.writeFile(file, data, (err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
}
init("test");
makeRandomFile("test", "testFile");
