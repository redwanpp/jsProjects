const fs = require('fs');
const path = require('path');
const dbPath = path.resolve('data', './data/db.json');

exports.readFile = async () => {
    const data = await fs.readFile(dbPath);
    return JSON.parse(data);
};

exports.writeFile = async () => {
    await fs.writeFile(dbPath, JSON.stringify(data));

};