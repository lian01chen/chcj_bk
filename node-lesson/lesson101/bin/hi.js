#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const common = require('./common');
const generate = require('./generate');
const init = require('./init');

const { message } = common;  // 这里引用了common中的message

// TODO 这个干嘛？ 入参有点奇怪啊
function paramsToObj (paramsArr) {
  const params = {};
  paramsArr.forEach(item => {
    const kv = item.split('=')
    const key = kv[0]
    const value = kv[1] || kv[0]
    params[key] = value
  })
  return params;
}

// 打印模块的版本号
if (process.argv.slice(2).join('') === '-v') {
  const pkg = require('../package');
  message.info('jsm-cli version ' + pkg.version);
  process.exit()
}

/**
 * commander create a new project
 */
program
  .command('new [name]')
  .alias('n')
  .description('Creates a new project')
  .action(function (name) {
    const projectName = name || 'myApp';
    init({ app: projectName }) // TODO 调用init的方法！！！
  });

/**
 * commander create a component
 */
program
  .command('create <type> [name] [otherParams...]')
  .alias('c')
  .description('Generates new code')
  .action(function (type, name, otherParams) {
    const acceptList = ['component', 'route']
    if (!acceptList.find(item => item === type)) {
      message.light('create type must one of [component | route]') // 提示命令 ？ 那里有commander help？？ 
      process.exit()
    }
    const params = paramsToObj(otherParams)
    params.name = name || 'example'
    generate({ // TODO 调用generate方法，生成一个组建或者路由
      type,
      params
    })
  });

program.parse(process.argv); // TODO 这个功能是什么？ 没看懂！！！
 
const cmd = process.argv[2];
if (!['c', 'create', 'new', 'n'].includes(cmd)) {
  program.help();
}