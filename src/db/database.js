const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, '/db.json');

class Adapter {
  constructor(file) {
    this.file = file;
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.file, 'utf-8');
      return JSON.parse(data);
    } catch {
      console.error('error occured while reading file');
      return null;
    }
  }

  async write(obj) {
    if (obj) {
      const jsonObj = JSON.stringify(obj);
      await fs.promises.writeFile(this.file, jsonObj, 'utf-8');
    }
  }
}

class DB {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async read() {
    const data = await this.adapter.read();
    this.data = data;
    console.log(this.data);
  }

  async write() {
    this.adapter.write(this.data);
  }
}

const adapter = new Adapter(file);
const db = new DB(adapter);

module.exports = db;
