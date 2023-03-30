import './login.scss'
import { CircularProgress } from '@mui/material'
import React, { useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const email = useRef()
  const password = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Krishil Social</h3>
          <span className='loginDesc'>
            Connect with Friends and the world around you on Krishilsocial
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleLogin}>
            <input
              placeholder='Email'
              type='email'
              className='loginInput'
              ref={email}
              required
              minLength='6'
            />
            <input
              placeholder='Password'
              type='password'
              className='loginInput'
              ref={password}
              required
            />
            <button className='loginButton' type='submit' disabled={isFetching}>
              {isFetching ? <CircularProgress color='inherit' /> : 'Log In'}
            </button>
            <span className='loginForgot'>Forgot Password?</span>
            <button className='loginRegisterButton'>
              {isFetching ? (
                <CircularProgress color='inherit' />
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
