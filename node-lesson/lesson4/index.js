let eventproxy = require('eventproxy')
let superagent = require('superagent')
let cheerio = require('cheerio')
let express = require('express')
let app = new express()
let url = require('url')
let cnodeUrl = 'https://cnodejs.org/'
app.get('/', (req, res) => {
  superagent.get(cnodeUrl)
    .end((err, sres) => {
      if (err) {
        throw new Error(err)
      }
      let topicUrls = []
      let $ = cheerio.load(sres.text)
      $('#topic_list .topic_title').each((idx, element) => {
        let $element = $(element)
        let href = url.resolve(cnodeUrl, $element.attr('href'))
        topicUrls.push(href)
      })
      let ep = new eventproxy()
      // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
      ep.after('topic_html', topicUrls.length, (topics) => {
        // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
        // 开始行动
        topics = topics.map(function (topicPair) {
          // 接下来都是 jquery 的用法了
          var topicUrl = topicPair[0]
          var topicHtml = topicPair[1]
          var $ = cheerio.load(topicHtml)
          // if($('.topic_full_title').text().trim() == ''){console.log(topicHtml,topicUrl)}
          // 自动发送的请求总有一部分被拦截 TODO 是否可以优化
          return ({
            href: topicUrl,
            title: $('.topic_full_title').text().trim(),
            comment1: $('.reply_content').eq(0).text().trim(),
            author:$('.user_name').text().trim(),
            score1:$('.floor').text().trim()
          })
        })
        res.send(topics)
      })
      topicUrls.forEach((topicUrl) => {
        superagent.get(topicUrl)
          .end((err, ssres) => {
            ep.emit('topic_html', [topicUrl, ssres.text])
          })
      })

    })
})

app.listen(3000)