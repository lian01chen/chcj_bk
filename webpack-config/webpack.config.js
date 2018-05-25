var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:path.join(__dirname,'index.js'),
  output:{
    path:__dirname,
    filename:'bundle.js'
  },
  module:{
    loaders:[
      {
        test:/\.css$|\.less$/,
        loaders:['style','css','less']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'use plugin',
      filename:'index.html'
    })
  ]
}