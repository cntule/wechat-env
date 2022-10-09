'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const merge = require('lodash/merge');
const {logGreen, logBlue, logRed} = require('../log');
const argv = require('./parse-argv')().rawConfig;

const cwd = process.cwd();
const pathResolve = (...p) => path.join(cwd, ...p);
const readFiles = ['env.yml']


async function exec() {
    if (argv.envName !== 'env') {
        readFiles.push(`env.${argv.envName}.yml`);
    }

    const contentList = [];

    for (const name of readFiles) {
        if (!fs.existsSync(pathResolve(name))) {
            logRed(`未找到 [ ${name} ] 文件`);
            process.exit(1);
        }
        contentList.push(fs.readFileSync(pathResolve(name), 'utf-8'))
    }


    function yamlLoad() {
        const load = (content) => {
            return new Promise(resolve => {
                yaml.loadAll(content, (doc) => {
                    resolve(doc);
                })
            })
        }

        return Promise.all(contentList.map(content => load(content))).then((posts) => {
            return merge(...posts);
        })
    }

    const json = await yamlLoad();
    const savePathDir = pathResolve(argv.savePath);
    if (!fs.existsSync(savePathDir)) {
        fs.mkdirSync(savePathDir);
        logBlue(`创建 [${savePathDir}] 目录`);
        logGreen(`[${savePathDir}] 目录已创建成功`);
    }

    const savePath = pathResolve(argv.savePath, argv.saveName);
    const envContent = `export default ${JSON.stringify(json, null, 2)}`;
    logGreen(`生成 [${savePath}] 文件成功`);
    const exportList = [];
    if (argv.flat === 'y') {
        for (const [key, value] of Object.entries(json)) {
            exportList.push(`export const ${key} = ${JSON.stringify(value, null, 2)}`)
        }
    }
    fs.writeFileSync(savePath, argv.flat === 'y' ? exportList.join('\n') : envContent, 'utf-8');
}

exec();




