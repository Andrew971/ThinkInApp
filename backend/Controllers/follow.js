const Forum = require('../Models/Forums')
const Lab = require('../Models/Labs')
const User = require('../Models/Users')
const FoLab = require('../Models/FoLabs')
const FoUser = require('../Models/FoUsers')
const Profile = require('../Models/Profiles')


function AddFoLab(userId, labId) {

  const newFolab = new FoLab({
    user_id: userId,
    lab_id: labId

  })
  newFolab.save()
    .then()
}

function AddFoUser(user_id, foUser_id) {

  const newFoUser = new FoUser({
    user_id: user_id,
    foUser_id: foUser_id

  })
  newFoUser.save()
    .then()
}
function deleteFoUser(user_id, foUser_id) {

  FoUser.where({ user_id: user_id,foUser_id:foUser_id })
  .destroy()
  .then(() => {
   
  }).catch(err => {
    
  })
}
function deleteFoLab(userId, labid) {

  FoLab.where({ user_id: userId,lab_id:labid })
  .destroy()
  .then(() => {
   
  }).catch(err => {
    
  })
}



function GetListFoLab(id, cb) {

  FoLab.where({ user_id: id })
    .fetchAll({ withRelated: 'labs' })
    .then(user => {
      let forumList = user.models.map(forum => forum.relations.labs)
      let labsList = forumList.map(lab => lab.attributes)
      cb({
        labs: labsList,
      })
    }).catch(err => {
      cb({
        labs: [],
      })
    })

}

function GetListFoUser(id, cb) {

  FoUser.where({ user_id: id })
    .fetchAll()
    .then(user => {

      let forumList = user.models.map(forum => forum.attributes.foUser_id)

      User.where('id', 'IN', forumList)
        .fetchAll({ withRelated: 'profile' })
        .then(elm => {
          let list = elm.models.map(forum => forum.attributes.id)

          Profile.where('user_id', 'IN', list)
          .fetchAll()
          .then(elm1 => {
            // console.log(elm1)

            let users = elm1.models.map(forum => forum.attributes)

            FoLab.where({ user_id: id })
            .fetchAll({ withRelated: 'labs' })
            .then(user => {
              let forumList = user.models.map(forum => forum.relations.labs)
              let labsList = forumList.map(lab => lab.attributes)
              cb({
                labs: labsList,
                users: users
              })
            })
          })
        })
    }).catch(err => {
      cb({
        users: [],
        labs: [],
      })
    })

}

module.exports = { AddFoLab, GetListFoLab, AddFoUser, GetListFoUser, deleteFoUser,deleteFoLab }
