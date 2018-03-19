const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const Do = require('../Controllers/search')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.post('/', jsonParser, (req, res) => {
  let {word}=req.body
  
  Do.Search(word, (result)=>{
    res.json(result)
  })
  


})


module.exports = router