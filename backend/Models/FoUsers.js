const bookshelf = require('./PostgresSql')
const User = require('./Users')

const FoUsers = bookshelf.Model.extend({
  tableName: 'FoUsers',
  hasTimestamps: true,

  users: function() {
      return this.belongsTo(User)
  },
  foUsers: function() {
    return this.belongsTo(User)
}
})



module.exports= FoUsers
