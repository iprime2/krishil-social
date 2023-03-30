import './chatOnline.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + 'users/friends/' + currentId
        )
        setFriends(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
  }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL +
          `conversations/find/${currentId}/${user._id}`
      )
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='ChatOnline'>
      {onlineFriends.map((friend) => (
        <>
          <div
            className='chatOnlineFriend'
            onClick={() => {
              handleClick(friend)
            }}
          >
            <div className='chatOnlineImgContainer'>
              <img
                className='chatOnlineImg'
                src={process.env.REACT_APP_ASSETS_URL + friend.profilePicture}
                alt=''
              />
              <div className='chatOnlineBadge'></div>
            </div>
            <span className='chatOnlineName'>{friend.username}</span>
          </div>
        </>
      ))}
    </div>
  )
}

export default ChatOnline
