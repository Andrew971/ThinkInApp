const Forum = require('../Models/Forums')
const Lab = require('../Models/Labs')
const FoLab = require('../Models/FoLabs')
const Comment = require('../Models/Comments')

function AddLab(forumId, title, subject, blog, forumName, owner, cb) {

	const newlab = new Lab({
		Title: title,
		Subject: subject,
		Blog: blog,
		Path: `/${forumName}/labs/`,
		user_id: owner,
		forum_id: forumId

	})
	newlab.save()
		.then(lab => {
			cb({
				LabId: lab.attributes.id
			})
		})
}

function RemoveLab(labId, cb) {
	Lab.where({ id: labId })
		.fetch()
		.then(labs => {
			FoLab.where({ lab_id: labId })
				.destroy()
				.then(() => {
					Comment.where({ lab_id: labId })
						.destroy()
						.then(() => {
							labs.destroy()
								.then(() => {
									cb({
										status: true
									})
								})
						})
				})
		})
}

function UpdateLab(labId, title, subject, blog, cb) {
	const attributesToUpdate = {
		Title: title,
		Subject: subject,
		Blog: blog
	}

	Lab.where({ id: labId })
		.save(attributesToUpdate, { patch: true })
		.then(() => {
			Lab.where({ id: labId })
				.fetch()
				.then(lab => {
					cb({
						labs: lab.attributes,
						status: true,
						success: true
					})
				})
		})
}

function GetLab(forumId, cb) {
	Forum.where({ id: forumId })
		.fetch({ withRelated: 'labs' })
		.then(forum => {
			const labs = forum.related('labs')
			let labList = labs.models.map(lab => lab.attributes)
			cb({
				labs: labList
			})
		})
}
function GetComment(labId, cb) {
	Comment.where({ lab_id: labId })
		.orderBy('created_at', 'DESC')
		.fetchAll()
		.then(Coms => {
			let ComList = Coms.models.map(com => com.attributes)
			cb({
				coms: ComList
			})
		})
}

function GetOneLab(id, cb) {
	Lab.where({ id: id })
		.fetch()
		.then(lab => {
			cb(lab.attributes)
		})
}


function AddComment(owner, labId, comment, cb) {

	const newComment = new Comment({
		user_id: owner,
		lab_id: labId,
		Comment: comment,

	})
	newComment.save()
		.then(() => {
			Comment.where({ lab_id: labId })
			.orderBy('created_at', 'DESC')
				.fetchAll()
				.then(Coms => {
					let ComList = Coms.models.map(com => com.attributes)
					cb({
						coms: ComList
					})
				})
		})
}


module.exports = { AddLab, RemoveLab, UpdateLab, GetLab, GetOneLab, AddComment, GetComment }
