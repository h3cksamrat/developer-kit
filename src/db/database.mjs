import path from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

console.log(file);

export default db;
