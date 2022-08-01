class Path {
  #root;
  #dir;
  #base;
  #ext;
  #lastDirectory;
  #components;
  #absoluteString;
  constructor(path) {
    const regex = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

    const result = path.match(regex);
    this.#root = result[1];
    this.#dir = result[2];
    this.#base = result[3];
    this.#ext = result[4];
  }

  get root() {
    return this.#root;
  }
  get dir() {
    return this.#dir;
  }

  get base() {
    return this.#dir.split("/");
  }

  get ext() {
    return this.#ext;
  }
}

export { Path };
