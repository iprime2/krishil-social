import './messenger.scss'

import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { io } from 'socket.io-client'

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const scrollRef = useRef()
  const socket = useRef(io('ws://krishilsocial-socket.onrender.com'))

  const { user } = useContext(AuthContext)

  useEffect(() => {
    socket.current = io('ws://krishilsocial-socket.onrender.com')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.following.filter((f) => users.some((u) => u.userId === f))
      )
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + 'conversations/' + user._id
        )
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `messages/` + currentChat?._id
        )
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = {
      text: newMessage,
      conversationId: currentChat._id,
      sender: user._id,
    }

    const receiverId = currentChat.members.find((member) => member !== user._id)

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + 'messages',
        message
      )
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input
              placeholder='Search for Friends'
              className='chatMenuInput'
              type='text'
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations
                  key={c._id}
                  conversation={c}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className='chatBoxTop'>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        owner={m?.sender === user._id ? true : false}
                      />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='Write your message'
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button type='submit' onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className='noConversationText'>Open a conversation </span>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
