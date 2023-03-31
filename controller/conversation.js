const Conversation = require('../models/Conversation')

const newConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  })

  try {
    const savedConversation = await newConversation.save()
    res.status(200).json(newConversation)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(error)
  }
}

const findUser = async (req, res) => {
  console.log(req.params.firstUserId)
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { newConversation, getConversation, findUser }
