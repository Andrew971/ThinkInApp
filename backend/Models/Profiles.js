const bookshelf = require('./PostgresSql')
const User = require('./Users')

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
  hasTimestamps: true,

  users: function() {
      return this.belongsTo(User)
  }
})



module.exports= Profile
