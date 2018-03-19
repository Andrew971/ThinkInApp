const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../Controllers/user')
//bcrypt code 
const saltRounds = 10
let secretkey = "secretKey"


router.use(bodyParser.json())

router.post('/signup', (req, res, err) => {
  const { first, last, username, email, password, gender } = req.body

  bcrypt.hash(password, saltRounds).then
    ((hash) => {
      user.AddUser( first, last,username, email, hash,gender, (result) => {
        if (result.status) {
          res.json({ success: true, message: '' })
        } else {
          res.json({ success: false, message: result.message })
        }
      })

    })
})


router.post('/login', (req, res) => {
  const { username, password } = req.body


  user.GetUser(username, (info) => {

    if (info.status) {
      let { Password } = info.user
      bcrypt.compare(password, Password).then((result) => {
        if (result) {
          let {id} = info.user
          //If we have a valid user, create jwt token with
          //the secret key
          let token = jwt.sign({
            id
          }, secretkey)
          //send the token back to the user
          res.json({ status: true,token: token, username: username, message: '' })
        }
        //if the result is false, send back a null token
        else res.json({status: false, token: null, message: 'Username/Password Incorrect' })
      })
      //If we didn't find the user, send back a null token
    } else {
      res.json({status: false, token: null, message: 'Username/Password Incorrect' })
    }
  })


})

router.post('/signout', (req, res) => {
  const { token } = req.headers.authorization


  res.json({ token: null })
})


router.post('/profile', (req, res) => {
const {username} = req.body
if(username){
  user.GetProfile(username, (info) => {
    res.json(info)
  })
}


})


router.post('/', (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {

      res.json({ status: false, message: 'Failed to authenticate token.' });
    } else {
      user.GetInfo(decoded.id, (userInfo) => {
        res.json({ status: true, user: userInfo, token:token  })
      })
    }

  })
})


router.get('/', (req, res) => {
  res.send("i am running")
})

module.exports = router

