const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const lab = require('../Controllers/lab')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/getlist', jsonParser, (req, res) => {
	let {forumId} = req.body
	lab.GetLab(forumId,(lab)=>{
		res.json(lab.labs)
	})
})

router.post('/getone', jsonParser, (req, res) => {
	let {id} = req.body
if(id){
	lab.GetOneLab(id,(lab)=>{
		res.json(lab)
	})
}	
})


router.post('/', jsonParser, (req, res, body) => {
  let {forumId, title, subject, blog, forumName, owner} = req.body	

  lab.AddLab(forumId, title, subject, blog,forumName, owner,(result)=>{
		res.json({redirect:true, LabId:result.LabId})
	})
})

router.post('/:labId', jsonParser, (req, res, body) => {
	let { labId } = req.params


	lab.RemoveLab(Number(labId),(lab)=>{
		res.json(lab.status)
	})

})

router.post('/comment/:labId', jsonParser, (req, res, body) => {
	let {comment, owner} = req.body
	let { labId } = req.params


	lab.AddComment(owner, labId, comment, (com)=>{
		res.json(com.coms)
	})

})
router.post('/comment/get/:labId', jsonParser, (req, res, body) => {
	let { labId } = req.params


	lab.GetComment(labId,(com)=>{
		res.json(com.coms)
	})

})


router.post('/update/:labId', jsonParser, (req, res, body) => {
	let { labId } = req.params
	let {title,subject, blog} = req.body

lab.UpdateLab(Number(labId),title,subject,blog,(lab)=>{
		res.json(lab)
	})
})


module.exports = router