'use strict';

const debug = require('debug')('parse-argv');
const program = require('commander');
const config = require('./config');
let argv = null;

module.exports = cmd => {
    debug('cmd:', cmd);
    if (!argv) {
        argv = program
            .option('-e, --envName [name]', `默认读取文件名：${config.envName}.yml`)
            .option('-s, --savePath [path]', `默认保存目录：${config.savePath}`)
            .option('-n, --saveName [name]', `默认保存目录：${config.saveName}`)
    }

    const argvList = process.argv.slice();
    argv.parse(argvList);

    if (!argv.rawConfig) {
        argv.rawConfig = {
            envName: config.envName,
            savePath: config.savePath,
            saveName: config.saveName,
        };
    }

    Object.assign(argv.rawConfig, argv._optionValues);

    return argv;
};
