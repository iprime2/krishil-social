import './message.scss'
import { format } from 'timeago.js'

import React from 'react'

const Message = ({ message, owner }) => {
  return (
    <div className={owner ? 'message owner' : 'message'}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={process.env.REACT_APP_ASSETS_URL + 'person/1.jpg'}
          alt=''
        />
        <p>{message?.text}</p>
      </div>
      <div className='messageBottom'>{format(message?.createdAt)}</div>
    </div>
  )
}

export default Message
