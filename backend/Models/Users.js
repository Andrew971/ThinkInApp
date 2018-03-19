const bookshelf = require('../Init/PostgresSql')
const Forums = require('./Forums')
const Profile = require('./Profiles')

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  forums: function() {
      return this.hasMany(Forums)
  },
  profile: function() {
    return this.hasOne(Profile)
}
})



module.exports= User
