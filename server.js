const express = require('express')
const bodyParser =require('body-parser')
const cors = require('cors')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('website'))
app.use(cors())
app.use(bodyParser.json())

let projectData={}

app.get('/weather', function (req, res) {
  res.send(projectData)
})

app.post('/weather', function (req, res) {
  projectData=req.body
  console.log(projectData)
})
 
app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})