const bookshelf = require('../Init/PostgresSql')

const Labs = bookshelf.Model.extend({
  tableName: 'labs',
  hasTimestamps: true,

  forums: function() {
      return this.belongsTo(Forum)
  },
  users: function() {
    return this.belongsTo(User)
}
})



module.exports= Labs
