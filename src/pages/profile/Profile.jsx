import './profile.scss'

import React, { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useParams } from 'react-router'

const Profile = () => {
  const [user, setUser] = useState({})
  const username = useParams().username

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `users?username=${username}`
      )
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar />
      <div className='profileContainer'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={
                  user.coverPicture
                    ? process.env.REACT_APP_ASSETS_URL + user.coverPicture
                    : process.env.REACT_APP_ASSETS_URL + 'person/noCover.png'
                }
                alt=''
              />
              <img
                className='profileUserImg'
                src={
                  user.profilePicture
                    ? process.env.REACT_APP_ASSETS_URL + user.profilePicture
                    : process.env.REACT_APP_ASSETS_URL + 'person/noProfile.png'
                }
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user?.username}</h4>
              <span className='profileInfoDesc'>{user?.desc}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar user={user} profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
