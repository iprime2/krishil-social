import React, { useContext } from 'react'
import './topbar.scss'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Topbar = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Krishilsocial</span>
        </Link>
      </div>
      <div className='topbarCentre'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input
            type='text'
            placeholder='Search for friend, post or video'
            className='searchInput'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <div className='topbarLink'>Homepage</div>
          <div className='topbarLink'>Timeline</div>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Person />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className='topbarIconItem'>
            <Chat />
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <Notifications />
            <span className='topbarIconBadge'>3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? process.env.REACT_APP_ASSETS_URL + user.profilePicture
                : process.env.REACT_APP_ASSETS_URL + 'person/noAvatar.png'
            }
            alt=''
            className='topbarImg'
          />
        </Link>
      </div>
    </div>
  )
}

export default Topbar
