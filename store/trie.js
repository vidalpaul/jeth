const { keccakHash } = require('../util');

class Node {
  constructor() {
    this.value = null;
    this.childMap = {};
  }
}

class Trie {
  constructor() {
    this.head = new Node();
    this.generateRootHash();
  }

  generateRootHash() {
    this.rootHash = keccakHash(this.head);
  }
  get({ key }) {
    let node = this.head;

    for (let character of key) {
      if (!node.childMap[character]) {
        return null;
      } else {
        node = node.childMap[character];
      }
    }

    return node.value;
  }
  put({ key, value }) {
    let node = this.head;
    for (let char of key) {
      if (!node.childMap[char]) {
        node.childMap[char] = new Node();
      }
      node = node.childMap[char];
    }
    node.value = value;
    this.generateRootHash();
  }
}

module.exports = Trie;
