'use strict';

const path = require('path');
const fs = require('fs');
const {logBlue, logRed} = require('../log');
const argv = require('./parse-argv')().rawConfig;
const cwd = process.cwd();
const pathResolve = (...p) => path.join(cwd, ...p);

console.log(argv);
console.log(cwd);

if (!argv.beforeSuffix || !argv.afterSuffix) {
    logRed('参数错误')
    logBlue('完整示例：re-suffix -b .wxss -a .scss')
    process.exit(1);
    return;
}


function changeFileName(filepath) {
    fs.stat(filepath, function (err, stats) {
        if (stats.isFile()) {
            const filename = path.basename(filepath);
            const parentDir = path.dirname(filepath);
            if (filename.endsWith(argv.beforeSuffix)) {
                const [name] = filename.split(".");
                fs.renameSync(filepath, `${parentDir}\\${name}${argv.afterSuffix}`);
            }
        } else if (stats.isDirectory()) {
            renameFilesInDir(filepath);
        } else {
            console.log("unknow type of file");
        }
    });
}

function renameFilesInDir(dir) {
    fs.readdir(dir, (error, files) => {
        for (const file of files) {
            changeFileName(`${dir}\\${file}`);
        }
    });
}

renameFilesInDir(cwd);




