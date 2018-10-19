const fs = require('fs-extra');
const chalk = require('chalk');
const {basename, join} = require('path');
const readline = require('readline');
const download = require('download-git-repo');
const ora = require('ora');
const vfs = require('vinyl-fs'); // 提供简介的文件描写
const map = require('map-stream');

const common = require('./common');
const {message, write} = common;

const template = 'stmu1320/Jsm-boilerplate';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const boilerplatePath = join(__dirname, '../boilerplate'); // TODO样板文件？为什么要这个目录？

console.log(boilerplatePath)

/**
 * 新建项目时，打印生成项目的路径？ TODO 待确认
 * @param {*} file 
 * @param {*} cb 
 */
function copyLog(file, cb) {
  message.success(file.path);
  cb(null, file);
}

/**
 * 工程创建完成之后的打印
 * @param {*} app 
 */
function initComplete(app) {
  message.success(`Success! Created ${app} project complete!`);
  message.light(`begin by typing:
    cd ${app}
    npm start
    
    `)
  process.exit();
}

/**
 * 创建项目
 * @param {*} dest 
 */
function createProject(dest) {
  const spinner = ora('downloading template') // 开始下载模版
  spinner.start()
  if (fs.existsSync(boilerplatePath)) fs.emptyDirSync(boilerplatePath) // 确认模版路径是否存在
  download(template, boilerplatePath, function (err) { // 这个template到底是什么？为什么可以直接下载嗯？TODO telplate应该是一个git地址
    spinner.stop()
    if (err) {
      console.log(err)
      process.exit()
    }

    fs
      .ensureDir(dest)
      .then(() => {
        vfs
          .src(['**/*', '!node_modules/**/*'], {
            cwd: boilerplatePath,
            cwdbase: true,
            dot: true,
          })
          .pipe(map(copyLog))
          .pipe(vfs.dest(dest)) // dest 用户输入的创建的项目
          .on('end', function() {
            const app = basename(dest);
            const configPath = `${dest}/config.json`;
            const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            configFile.dist = `../build/${app}`;
            configFile.title = app;
            configFile.description = `${app}-project`;
            write(configPath, JSON.stringify(configFile, null, 2));
            message.info('run install packages');
            require('./install')({
              success: initComplete.bind(null, app),
              cwd: dest,
            });
          })
          .resume(); // TODO 这个是什么？
      })
      .catch(err => {
        console.log(err);
        process.exit();
      });
})
}

/**
 * 生成一个新的项目
 * @param {*} param0 
 */
function init({app}) {
  const dest = process.cwd(); //  TODO 获取路径
  const appDir = join(dest, `./${app}`); //path模块的join方法，拼接路径。这里生成项目目录！！！
  if (fs.existsSync(appDir)) { // existsSync exists的同步版本，如果路径存在就返回true，否则返回false，但是fs.exists已经废弃
    rl.question(
      chalk.blue(`${app} dir exist! Do you want clear this dir? (Y/N)`),
      str => {
        const answer = str && str.trim().toUpperCase();
        if (answer === 'Y') {
          const spinner = ora(`remove ${app} dir`).start();
          fs
            .emptyDir(appDir)
            .then(() => {
              spinner.stop();
              createProject(appDir);
            })
            .catch(err => {
              console.error(err);
            });
        } else if (answer === 'N') {
          process.exit();
        }
      }
    );
  } else {
    createProject(appDir);
  }
}

module.exports = init;