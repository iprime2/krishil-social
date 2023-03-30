import './post.scss'
import { MoreVert } from '@mui/icons-material'
//import { Users } from '../../data'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const { user: currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `users?userId=${post.userId}`
      )
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser, post.likes])

  const likeHandler = () => {
    try {
      axios.put(process.env.REACT_APP_API_URL + 'posts/' + post._id + '/like', {
        userId: currentUser._id,
      })
    } catch (error) {
      console.log(error)
    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  return (
    <div className='postContainer'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={
                  user.profilePicture
                    ? process.env.REACT_APP_ASSETS_URL + user.profilePicture
                    : process.env.REACT_APP_ASSETS_URL + 'person/noAvatar.png'
                }
                alt=''
              />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img
            className='postImg'
            src={process.env.REACT_APP_ASSETS_URL + post.img}
            alt=''
          />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src='/assets/like.png'
              onClick={likeHandler}
              alt=''
            />
            <img
              className='likeIcon'
              src='/assets/heart.png'
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
