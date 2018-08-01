var async = require('async')
var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')

var express = require('express')

const cnode = 'https://cnodejs.org/'

let app = express()

// 获取列表页所有子标题下的topicurl
app.get('/',(req,res)=>{
  superagent.get(cnode)
    .end((err, sres) => {
      if (err) {
        throw new Error(err)
      }
      let $ = cheerio.load(sres.text)
      let topicUrls = []
      $('#topic_list .topic_title').each((idx, element) => {
        let $element = $(element)
        let href = url.resolve(cnode, $element.attr('href'))
        topicUrls.push(href)
      })
      // 根据获得的url并发控制去发送请求
      async.mapLimit(topicUrls, 3, function (url, callback) {
        fetchUrl(url, callback)
      }, function (err, result) {
        // 最后会执行的回调，这个就是aysnc function中传入的回调函数
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
        res.send(result)
      })
    })

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

app.listen(3000)
