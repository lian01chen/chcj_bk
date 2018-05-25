# 读webpack配置笔记
- 运行打包命令
```shell
  webpack
```
- webpack.config.js <br />
该文件是webpack默认读取的配置文件，如果不写默认文件，则在引用less文件的时候就应该如下：
## 1. loader
```javascript
  require('style!css!less!./index.less')
```
这样表示分别使用style-loader,css-loader,less-loader去转换less文件内容。其中‘!’表示分割，用来分开不同的loader文件。
## 2. plugin 插件
- webpack还提供丰富的插件机制，用来实现loader不能实现的功能，最常用的插件如：
  - html-webpack-plugin 有了这个插件，原来初始化的html文件就可以不需要了，因为插件会自动生成一个html文件，并将打包的js引用
  - webpack-dev-server 基于Express框架的Node.js服务器，提供给客户端的运行环境会被注入到页面代码中执行，并通过Socket.IO与服务器通信。需要webpack version >4
## 3.entry 入口文件

````js
  moduld.exports ={
    entry:path.join(__dirname,'index')
  }
````
## 4.output 构建的输出结果描述
```javascript
  module.exports={
    output:{
      path:__dirname,
      filename:'bundle.js',
      pulicPath：''
    }
  }
```