const Forum = require('../Models/Forums')
const User = require('../Models/Users')
const Lab = require('../Models/Labs')
const FoLab = require('../Models/FoLabs')
const Comment = require('../Models/Comments')
const Profile = require('../Models/Profiles')

function AddForum(userId, name, subject, description, cb) {

	const newForum = new Forum({
		Name: name,
		Subject: subject,
		Description: description,
		user_id: userId
	})
	newForum.save()
		.then(forum => {
			cb({
				forumName: forum.attributes.Name
			})
		})
}

function RemoveForum(forumId, cb) {
	Forum.where({ id: forumId })
		.fetch({ withRelated: 'labs' })
		.then(labs => {
			let test = labs.related('labs')
			let labIds = test.models.map(lab => lab.attributes.id)
			labIds.forEach(del => {
				FoLab.where({ lab_id: del }).destroy()
				Comment.where({ lab_id: del }).destroy()
			})
			labs.related('labs').invokeThen('destroy')
				.then(() => {
					labs.destroy()
						.then(() => {
							cb({
								status: true
							})
						})
				})
		})

}

function UpdateForum(forumId, name, subject, description, cb) {
	const attributesToUpdate = {
		Name: name,
		Subject: subject,
		Description: description
	}

	Forum.where({ id: forumId })
		.save(attributesToUpdate, { patch: true })
		.then(() => {
			Forum.where({ id: forumId })
				.fetch()
				.then(forum => {
					cb({
						forums: forum.attributes,
						status: true,
						success: true
					})
				})
		})

}

function GetForum(user_id, cb) {
	User.where({ id: user_id })
		.fetch({ withRelated: 'forums' })
		.then(user => {
			const forums = user.related('forums')
			let forumList = forums.models.map(forum => forum.attributes)
			cb({
				forums: forumList
			})
		})
}

function GetOneForum(name, cb) {
	
	Forum.where({ Name: name })
		.fetch()
		.then(forum => {
			Profile.where({ user_id: forum.attributes.user_id })
			.fetch()
			.then(profile => {
				cb({
					profile: profile.attributes,
					forum: forum.attributes
				})
			})
		})
}
module.exports = { AddForum, RemoveForum, UpdateForum, GetForum, GetOneForum }
