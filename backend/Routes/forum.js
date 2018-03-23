const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const forum = require('../Controllers/forum')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/getlist', jsonParser, (req, res) => {
	let data = req.body
	let { userId } = req.body
	if (userId) {
		forum.GetForum(userId, (forum) => {
			res.json(forum.forums)
		})
	}
})

router.post('/getone', jsonParser, (req, res) => {
	let { name } = req.body
	if (name.forumName) {
		forum.GetOneForum(name.forumName, (data) => {
			res.json(data)
		})
	}

})


router.post('/', jsonParser, (req, res, body) => {
	let { userId, name, subject, description } = req.body

	forum.AddForum(userId, name, subject, description, (result) => {
		res.json({ redirect: true, forumName: result.forumName })
	})
})

router.post('/:forumId', jsonParser, (req, res, body) => {
	let { forumId } = req.params


	forum.RemoveForum(Number(forumId), (forum) => {
		res.json(forum.status)
	})

})



router.post('/update/:forumId', jsonParser, (req, res, body) => {
	let { forumId } = req.params
	let { name, subject, description } = req.body
	if(forumId){
		forum.UpdateForum(Number(forumId), name, subject, description, (forum) => {
			res.json(forum)
		})
	}

})


module.exports = router