import './register.scss'
import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Register = () => {
  const name = useRef()
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const againPassword = useRef()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (againPassword.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match")
    } else {
      const user = {
        name: name.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post(process.env.REACT_APP_API_URL + 'auth/register', user)
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Krishil social</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleRegister}>
            <input
              placeholder='Name'
              type='text'
              className='loginInput'
              ref={name}
            />
            <input
              placeholder='Username'
              type='text'
              className='loginInput'
              ref={username}
            />
            <input
              placeholder='Email'
              type='text'
              className='loginInput'
              ref={email}
            />
            <input
              placeholder='Password'
              type='password'
              className='loginInput'
              ref={password}
              minLength='6'
            />
            <input
              placeholder='Password Again'
              type='password'
              className='loginInput'
              ref={againPassword}
            />
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <Link to='/login'>
              <button className='loginRegisterButton' type='button'>
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
