class Path {
  #root;
  #dir;
  #base;
  #ext;
  #name;
  #lastDirectory;
  #components = [];
  #absoluteString;

  #OS;
  constructor(path) {
    if (path.includes("/")) {
      this.#OS = "Unix";
      // root, 전체 dir, last directory, name, ext
      const regex = /(\/)(([a-zA-Z0-9]+\/)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)?/;
      const result = path.match(regex);
      this.#root = result[1];
      this.#dir = result[2].split("/");
      this.#dir = this.#dir.slice(0, this.#dir.length - 1);
      this.#lastDirectory = result[3].split("/")[0];
      this.#name = result[4];
      if (result[5]) {
        this.#ext = result[5];
      } else {
        this.#ext = "";
      }
      this.#base = this.#name + this.#ext;

      this.#components.push(this.#root);
      this.#components.concat(this.#dir);
      this.#components.push(this.#base);
    } else if (path.includes("\\")) {
      this.#OS = "Windows";
      const regex = /([A-Z]:\\)?(([a-zA-Z0-9]+\\)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)?/;
      const result = path.match(regex);
      this.#root = result[1];
      this.#dir = result[2].split("\\");
      this.#dir = this.#dir.slice(0, this.#dir.length - 1);
      this.#lastDirectory = result[3].split("\\")[0];
      this.#name = result[4];
      if (result[5]) {
        this.#ext = result[5];
      } else {
        this.#ext = "";
      }

      this.#base = this.#name + this.#ext;

      this.#components.push(this.#root);
      this.#components.concat(this.#dir);
      this.#components.push(this.#base);
    }
  }

  get OS() {
    return this.#OS;
  }

  get root() {
    return this.#root;
  }
  get dir() {
    return this.#dir;
  }

  get base() {
    return this.#base;
  }

  get name() {
    return this.#name;
  }
  get ext() {
    return this.#ext;
  }

  get lastDirectory() {
    return this.#lastDirectory;
  }

  get components() {
    this.#components = [this.root];
    this.#components = this.#components.concat(this.dir);
    this.#components.push(this.base);
    return this.#components;
  }
  get absoluteString() {
    if (this.OS === "Unix") {
      this.#absoluteString = this.#root + this.#dir.join("/") + "/";
    } else if (this.OS === "Windows") {
      this.#absoluteString = this.#root + this.#dir.join("\\") + "\\";
    }
    return this.#absoluteString + this.#base;
  }

  appendComponent(new_path) {
    this.#dir.push(new_path);
  }

  deleteLastComponent() {
    this.#dir.pop();
  }

  relative(to) {
    let to_OS = "";
    let result = "";
    let cnt = 1;
    let dir = this.dir;
    if (to.includes("/")) {
      to_OS = "Unix";
    } else if (to.includes("\\")) {
      to_OS = "Windows";
    } else {
      throw Error("Unix, Windows 이외 다른 OS는 비교할 수 없습니다.");
    }

    // to의 os 를 확인하고, 계산
    if (this.OS === to_OS) {
      if (to_OS === "Unix") {
        const regex = /(\/)(([a-zA-Z0-9]+\/)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)?/;
        let to_result = to.match(regex);
        let to_base;
        if (result[5]) {
          to_base = to_result[4] + to_result[5];
        } else {
          to_base = to_result[4];
        }
        let to_dir = to_result[2].split("/");

        to_dir = to_dir.slice(0, to_dir.length - 1);
        // console.log(to_dir);

        // 현재 path와 이동할 path의 directory를 일치할 때 까지 탐색
        for (let i = to_dir.length - 1; i > 0; i--) {
          cnt = 1;
          for (let j = dir.length - 1; j > 0; j--) {
            if (to_dir[i] === dir[j]) {
              return (
                "../".repeat(cnt) + to_dir.slice(j).join("/") + "/" + to_base
              );
            }
            cnt++;
          }
        }

        return (
          "../".repeat(dir.length + 1) +
          to_dir.slice(0).join("/") +
          "/" +
          to_base
        );
      } else {
        const regex = /([A-Z]:\\)?(([a-zA-Z0-9]+\\)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)?/;
        let to_result = to.match(regex);
        let to_base;
        if (result[5]) {
          to_base = to_result[4] + to_result[5];
        } else {
          to_base = to_result[4];
        }
        let to_dir = to_result[2].split("\\");

        to_dir = to_dir.slice(0, to_dir.length - 1);
        // console.log(to_dir);

        for (let i = to_dir.length - 1; i > 0; i--) {
          cnt = 1;
          for (let j = dir.length - 1; j > 0; j--) {
            if (to_dir[i] === dir[j]) {
              return (
                "..\\".repeat(j) + to_dir.slice(j).join("\\") + "\\" + to_base
              );
            }
            cnt++;
          }
        }
        return "..\\".repeat(dir.length + 1) + to_dir.slice(0) + "\\" + to_base;
      }
    } else {
      throw Error("서로 다른 OS style의 파일 경로는 비교할 수 없습니다.");
    }
  }

  // path object 생성
  stringify() {
    const result = {};
    result.root = this.root;
    result.base = this.base;
    result.ext = this.ext;
    result.name = this.name;
    result.lastDirectory = this.lastDirectory;
    result.components = this.components;
    result.absoluteString = this.absoluteString;
    return result;
  }
}

export { Path };
