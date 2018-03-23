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

router.post('/undo', jsonParser, (req, res) => {
  let {user_id,foUser_id}=req.body

  Follow.deleteFoUser(user_id,foUser_id)

})
router.post('/lab/undo', jsonParser, (req, res) => {
  let {user_id,foUser_id}=req.body

  console.log('undo')

  Follow.deleteFoLab(user_id,foUser_id)

})

router.post('/lab', jsonParser, (req, res) => {
  // let {labId}= req.params
  // let {userId}=req.body

  console.log(req.body)
res.json('ok')
  // Follow.AddFoLab(userId,labId)

})

router.post('/getlisto', jsonParser, (req, res) => {
  let {userId}=req.body
if(userId){
  Follow.GetListFoUser(userId, (user)=>{
        res.json({labs:user.labs, users:user.users})
      })
}    



})

module.exports = router