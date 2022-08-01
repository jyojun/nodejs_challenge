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
      const regex = /(\/)(([a-zA-Z0-9]+\/)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)/;
      const result = path.match(regex);
      this.#root = result[1];
      this.#dir = result[2].split("/");
      this.#dir = this.#dir.slice(0, this.#dir.length - 1);
      this.#lastDirectory = result[3].split("/")[0];
      this.#name = result[4];
      this.#ext = result[5];
      this.#base = this.#name + this.#ext;

      this.#components.push(this.#root);
      this.#components.concat(this.#dir);
      this.#components.push(this.#base);
    } else if (path.includes("\\")) {
      this.#OS = "Windows";
      const regex = /([A-Z]:\\)?(([a-zA-Z0-9]+\\)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)/;
      const result = path.match(regex);
      this.#root = result[1];
      this.#dir = result[2].split("\\");
      this.#dir = this.#dir.slice(0, this.#dir.length - 1);
      this.#lastDirectory = result[3].split("\\")[0];
      this.#name = result[4];
      this.#ext = result[5];
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
