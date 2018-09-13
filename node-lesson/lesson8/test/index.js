const expross = require('../')
const app = expross()
console.log(app)

app.get('/', function (req, res) {
  res.send('get hello world')
})

// app.post('/',(req,res)=>{
//   res.send('put hello world')
// })
app.listen(3000, function (req,res) {
  console.log('Example app listening on port 3000!')
})
