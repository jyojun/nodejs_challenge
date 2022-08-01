class Path {
  #root;
  #dir;
  #base;
  #ext;
  #name;
  #lastDirectory;
  #components = [];
  #absoluteString;

  #isUnix;
  constructor(path) {
    if (path.includes("/")) {
      this.#isUnix = true;
      // root, 전체 dir, last directory, name, ext
      const regex = /(\/)(([a-zA-Z0-9]+\/)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)/;
      const result = path.match(regex);
      this.#root = result[1];
      this.#dir = result[2];
      this.#lastDirectory = result[3].split("/")[0];
      this.#name = result[4];
      this.#ext = result[5];
      this.#base = this.#name + this.#ext;

      this.#components.push(this.#root);
      this.#dir.split("/").map((x, idx) => {
        if (idx !== this.#dir.split("/").length - 1) this.#components.push(x);
      });
      this.#absoluteString = this.#root + this.#components.slice(1).join("/");
    } else if (path.includes("\\")) {
      this.#isUnix = false;
      const regex = /([A-Z]:\\)?(([a-zA-Z0-9]+\\)+)([a-zA-Z0-9)]+)(.[a-zA-Z0-9.]+)/;
      const result = path.match(regex);
      this.#root = result[1];
      this.#dir = result[2];
      this.#lastDirectory = result[3].split("\\")[0];
      this.#name = result[4];
      this.#ext = result[5];
      this.#base = this.#name + this.#ext;

      this.#components.push(this.#root);
      this.#dir.split("\\").map((x, idx) => {
        if (idx !== this.#dir.split("\\").length - 1) this.#components.push(x);
      });
      this.#absoluteString = this.#root + this.#components.slice(1).join("\\");
    }
  }

  get isUnix() {
    return this.#isUnix;
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
    return this.#components;
  }
  get absoluteString() {
    return this.#absoluteString;
  }

  appendPathComponent(new_path) {
    this.#components.push(new_path);
    if (this.isUnix)
      this.#absoluteString = this.#root + this.#components.slice(1).join("/");
    else
      this.#absoluteString = this.#root + this.#components.slice(1).join("\\");
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
