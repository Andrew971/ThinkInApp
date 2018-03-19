const Forum = require('../Models/Forums')
const Lab = require('../Models/Labs')
const User = require('../Models/Users')
const Profile = require('../Models/Profiles')

function Search(word, cb) {
 word = word.replace(/[\W_]/g, "").toLowerCase()
  Forum.fetchAll().then(forums => {
    let forumList = forums.models.map(forum => forum.attributes)
    let forumFilter = forumList.filter(elm => elm.Name.toLowerCase().includes(word.toLowerCase()))

    Lab.fetchAll().then(labs => {
      let labList = labs.models.map(lab => lab.attributes)
      let LabFilter = labList.filter(elm => elm.Title.toLowerCase().includes(word))

      Profile.fetchAll().then(Profiles => {
        let ProfileList = Profiles.models.map(profile => profile.attributes)
        let ProfileFilter = ProfileList.filter(elm => 
          (elm.first_name + elm.last_name).toLowerCase().includes(word))

        cb({ forumFilter, LabFilter, ProfileFilter })
      })
    })

  })


}

module.exports = { Search }
