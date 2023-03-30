import './conversations.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)

    const getUser = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `users/?userId=${friendId}`
        )
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [currentUser, conversation])

  return (
    <div className='conversations'>
      <img
        className='conversationsImg'
        src={
          user?.profilePicture
            ? process.env.REACT_APP_ASSETS_URL + user?.profilePicture
            : process.env.REACT_APP_ASSETS_URL + 'person/noAvatar.png'
        }
        alt=''
      />
      <span className='conversationsName'>{user?.username}</span>
    </div>
  )
}

export default Conversations
