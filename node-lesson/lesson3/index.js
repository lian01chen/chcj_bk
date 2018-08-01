var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')

var app = express()
app.get('/', (req, res, next) => {
  superagent.get('https://cnodejs.org/')
    .end((err, sres) => {
      if (err) {
        return next(err)
      }
      var $ = cheerio.load(sres.text)
      var items = []
      var userList = $('.cell .user_avatar img')
      $('#topic_list .topic_title').each((index,item)=>{
        let $ele = $(item)
        let name = $(userList[index]).attr('title')
        items.push({
          title:$ele.attr('title'),
          href:$ele.attr('href'),
          author :name
        })
      })
      res.send(items)
    })
})
app.listen(3000,()=>{
  console.log('server is start at port 3000')
})