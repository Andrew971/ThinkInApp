const bookshelf = require('./PostgresSql')
const Labs = require('./Labs')
const User = require('./Users')

const FoLabs = bookshelf.Model.extend({
  tableName: 'FoLabs',
  hasTimestamps: true,

  users: function() {
      return this.belongsTo(User)
  },
  labs: function() {
    return this.belongsTo(Labs)
}
})



module.exports= FoLabs
