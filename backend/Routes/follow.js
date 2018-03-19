const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const Follow = require('../Controllers/follow')


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.post('/', jsonParser, (req, res) => {
  let {user_id,foUser_id}=req.body

  Follow.AddFoUser(user_id,foUser_id)

})

router.post('/lab', jsonParser, (req, res) => {
  let {labId,userId}=req.body

  Follow.AddFoLab(userId,labId)

})

router.post('/getlist', jsonParser, (req, res) => {
  let {userId}=req.body
if(userId){
  console.log(userId)

  Follow.GetListFoUser(userId, (user)=>{
console.log(user)
        res.json({labs:user.labs, users:user.users})
      })
}    



})

module.exports = router