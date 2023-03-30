import './feed.scss'
import React, { useContext, useEffect, useState } from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
//import { Posts } from '../../data'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Feed = ({ username }) => {
  const [post, setPost] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(
            process.env.REACT_APP_API_URL + 'posts/profile/' + username
          )
        : await axios.get(
            process.env.REACT_APP_API_URL + 'posts/timeline/' + user._id
          )
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    }
    fetchPosts()
  }, [user._id, username])

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
