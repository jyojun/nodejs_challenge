import fs from "fs";
import sha256 from "sha256";
import zlib from "zlib";

export function mkdir(dirPath) {
  const isExists = fs.existsSync(dirPath);
  if (!isExists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function init(path) {
  mkdir(`${path}/.mit/objects`);
  mkdir(`${path}/.mit/index`);
}

export function ls(path) {
  return fs.readdirSync(path);
}

export function makeFile(dirPath, name, data) {
  const isExists = fs.existsSync(`${dirPath}/${name}`);
  if (!isExists) {
    try {
      const file = `${dirPath}/${name}`;
      const content = data;
      fs.writeFile(file, content, (err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
}

export function commit(dirPath) {
  let fileList = [];

  // dirPath에 있는 파일리스트
  fileList = fs.readdirSync(dirPath);
  // console.log(makeBlob("testtest").substr(0, 8));
  // console.log(makeBlob("testtest").substr(8));

  let treeContent = "";
  // 파일 리스트를 읽어들임.
  fileList.map((file) => {
    // 파일만 읽어들임.
    if (!fs.statSync(dirPath + "/" + file).isDirectory()) {
      fs.readFile(dirPath + "/" + file, "utf-8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // blob object 생성
          // blob 내용으로 sha256 해시값 앞 8자리 objects 하위 디렉토리 생성
          // 나머지 부분을 파일명으로 지정.
          let blob_hash = sha256(data);
          let dirName = blob_hash.substr(0, 8);
          let fileName = blob_hash.substr(8);
          mkdir(dirPath + "/.mit/objects/" + dirName);
          makeFile(dirPath + "/.mit/objects/" + dirName, fileName, data);

          let gzip = zlib.createGzip();
          let inp = fs.createReadStream(
            dirPath + "/.mit/objects/" + dirName + "/" + fileName
          );
          let out = fs.createWriteStream(
            dirPath + "/.mit/objects/" + dirName + "/" + fileName + ".gz"
          );
          // zlib 압축
          inp.pipe(gzip).pipe(out);

          const fileSize = fs.statSync(
            dirPath + "/.mit/objects/" + dirName + "/" + fileName + ".gz"
          ).size;
          // tree
          treeContent += `${blob_hash} ${fileSize} ${file}`;
          console.log(treeContent);
        }
      });
    }
    console.log(treeContent);
  });

  // tree object 생성
  // blob 파일의 기록을 담음 (blob 해시값, 압축 후 파일크기, 파일명)
  // tree object 내용으로 해시값으로 blob과 동일하게 파일명 지정

  // commit object 생성
}
