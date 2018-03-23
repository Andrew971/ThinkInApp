const bookshelf = require('./PostgresSql')
const Labs = require('./Labs')

const Forum = bookshelf.Model.extend({
  tableName: 'forums',
  hasTimestamps: true,

  users: function() {
      return this.belongsTo(User)
  },
  labs: function() {
    return this.hasMany(Labs)
}
})



module.exports= Forum
