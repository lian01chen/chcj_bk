var express = require('express')
var hbs = require('express-handlebars').create({
  defaultLayout:'main',
  extname:'.hbs'
})
var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')
var async = require('async')


const cnode = 'https://cnodejs.org/'

var app = express()
app.set('port',process.env.PORT || 3000)
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')

// 使用static中间件定制public目录为静态资源目录，其中资源不会经过任何处理
app.use(express.static(__dirname + '/public'))

app.get('/home',(req,res)=>{
  res.render('home',{
    title :'Home page'
  })
})
app.get('/about',(req,res)=>{
  superagent. get(cnode)
    .end((err,sres)=>{
      if(err){
        throw new Error(err)
      }
      let $ = cheerio.load(sres.text) // cnode 社区主题列表
      let topicUrls = []
      $('#topic_list .topic_title').each((idx, element) => {
        let $ele = $(element)
        let href = url.resolve(cnode, $ele.attr('href'))
        topicUrls.push(href)
      })
      // 根据获得的url并发控制去发送请求
      async.mapLimit(topicUrls, 3, function (url, callback) {
        fetchUrl(url, callback)
      }, function (err, result) {
        result = result.map(function (topicPair) {
          // TODO 这个topicPair为什么是一个数组？
          // 接下来都是 jquery 的用法了
          var topicUrl = topicPair[0].url
          var topicHtml = topicPair[0].html
          var $ = cheerio.load(topicHtml)
          // if($('.topic_full_title').text().trim() == ''){console.log(topicHtml,topicUrl)}
          // 自动发送的请求总有一部分被拦截 TODO 是否可以优化
          return ({
            href: topicUrl,
            title: $('.topic_full_title').text().trim(),
            comment1: $('.reply_content').eq(0).text().trim(),
            author: $('.user_name').text().trim(),
            score1: $('.floor').text().trim()
          })
        })
        console.log(result)
        res.render('about',{
          title :'About page',
          test:123132,
          posts:result
        })
      })

    })
  // 定义并发发送请求
  var fetchUrl = function (url, aa) {
    let topics = []
    superagent.get(url)
      .end((err, ssres) => {
        topics.push({
          url: url,
          html: ssres.text
        })
        aa(null, topics)
      })
  }

})


// 监听服务
app.listen(app.get('port'),function () {
  console.log('server is start at port '+app.get('port'))
})