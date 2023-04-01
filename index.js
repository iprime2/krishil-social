const io = require('socket.io')(8900, {
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:3000',
  },
})

let users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

// when user is logged In
io.on('connection', (socket) => {
  console.log('a user connected')

  // when user is logged in
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    io.emit('getUsers', users)
  })

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    })
  })

  // when user is logged out
  socket.on('disconnect', () => {
    console.log('user disconnected')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
  
  socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
})


