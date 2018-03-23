const User = require('../Models/Users')
const Profile = require('../Models/Profiles')


function AddUser (first, last,username,email, hash,gender, cb){

const newUser = new User({
	Username: username,
	Email: email,
	Password: hash
})
newUser.save()
	.then(user => {

		const newProfile = new Profile({
			first_name: first,
			last_name: last,
			gender: gender,
			user_id: user.attributes.id

	})
	newProfile.save()

		cb({status:true})
	})
	.catch(err=>{
		cb({status:false, message:err.constraint})
	})
}


function GetUser (username, cb){
  User
	.where({Username: username})
	.fetch()
	.then(user => {
    cb({status:true, user: user.attributes})
	}).catch(err=>{
		cb({status:false})
	})

}

function GetInfo (id, cb){
  User.where({id: id})
	.fetch()
	.then(user => {
		cb(user.attributes)
		
	})
}


function GetProfile (username, cb){

  User.where({Username: username})
	.fetch({ withRelated: 'profile' })
	.then(user => {
		const profile = user.relations.profile.attributes
		cb(profile)
	})
	.catch(e=>{
		console.log(e)
	})
}



function UpdateProfile(id, first,last, age, bio, cb) {
	const attributesToUpdate = {
		first_name: first,
		last_name: last,
		age: age,
		bio: bio,
	}

	Profile.where({ id: id })
		.save(attributesToUpdate, { patch: true })
		.then(() => {
			Profile.where({ id: id })
				.fetch()
				.then(profile => {
					cb({
						profile: profile.attributes,
						status: true,
						success: true
					})
				})
		})

}
module.exports = {AddUser, GetUser, GetInfo,GetProfile,UpdateProfile }

