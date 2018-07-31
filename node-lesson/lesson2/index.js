var express = require('express')
var util = require('utility')
var app = express()
app.get('/', (req, res) => {
  let q = req.query.q
  let md5Value = q && util.md5(q)
  let sha1Value = q && util.sha1(q)
  res.send(`md5:${md5Value},sha1:${sha1Value}`)
})
app.listen(3000)