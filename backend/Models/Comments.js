const bookshelf = require('../Init/PostgresSql')
const Labs = require('./Labs')
const Users = require('./Users')

const Comment = bookshelf.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,

  labs: function() {
      return this.belongsTo(Labs)
  },
  users: function() {
    return this.belongsTo(Users)
},
})



module.exports= Comment
