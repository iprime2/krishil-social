import './share.scss'
import React, { useContext, useRef, useState } from 'react'
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
const Share = () => {
  const { user } = useContext(AuthContext)
  const desc = useRef()
  const [file, setFile] = useState()
  const handlePost = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.img = fileName
      console.log(data)

      try {
        await axios.post(process.env.REACT_APP_API_URL + 'upload', data)
      } catch (error) {
        console.log(error)
      }
    }

    try {
      await axios.post(process.env.REACT_APP_API_URL + 'posts', newPost)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              user.profilePicture
                ? process.env.REACT_APP_ASSETS_URL + user.profilePicture
                : process.env.REACT_APP_ASSETS_URL + 'person/noAvatar.png'
            }
            alt=''
          />
          <input
            type='text'
            placeholder='share your posts here'
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
            <Cancel className='shareCancelImg' onClick={() => setFile()} />
          </div>
        )}
        <form className='shareBottom' onSubmit={handlePost}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span>Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type='file'
                id='file'
                accept='.png,.jepg,.jpg'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span>Location</span>
            </div>
            <div htmlColor='goldenrod' className='shareOption'>
              <EmojiEmotions className='shareIcon' />
              <span>Feelings</span>
            </div>
          </div>
          <button className='shareBtn'>Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
