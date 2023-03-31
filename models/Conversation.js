const mongoose = require('mongoose')

const ConversationSChema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Conversation', ConversationSChema)
