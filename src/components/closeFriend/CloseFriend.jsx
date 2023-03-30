import './closeFriend.scss'

import React from 'react'

const CloseFriend = ({ user }) => {
  return (
    <li className='sidebarFriend'>
      <img className='sidebarFriendImg' src={user.profilePicture} alt='' />
      <span className='sidebarFriendName'>{user.username}</span>
    </li>
  )
}

export default CloseFriend
