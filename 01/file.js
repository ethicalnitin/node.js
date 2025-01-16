const fs = require("fs");
const os = require("os");


fs.writeFileSync("./test.txt","Hey");
const result = fs.readFileSync("./test.txt","utf-8");

console.log(os.cpus().length);