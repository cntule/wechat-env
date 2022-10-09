'use strict';

const debug = require('debug')('parse-argv');
const program = require('commander');
let argv = null;

module.exports = cmd => {
    debug('cmd:', cmd);
    if (!argv) {
        argv = program
            .option('-b, --beforeSuffix [.wxss]', `将要改的文件名后缀`)
            .option('-a, --afterSuffix [.scss]', `改变后的文件名后缀`)
    }

    const argvList = process.argv.slice();
    argv.parse(argvList);

    if (!argv.rawConfig) {
        argv.rawConfig = {
            beforeSuffix: null,
            afterSuffix: null
        };
    }

    Object.assign(argv.rawConfig, argv._optionValues);

    return argv;
};
