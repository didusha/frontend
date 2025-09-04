import { Outlet, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

import { userService } from '../services/user'
import { login, signup } from '../store/actions/user.actions'
import { ImgUploader } from '../cmps/ImgUploader'
import { showErrorMsg } from '../services/event-bus.service'

import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from '../services/firebase'
import { uploadService } from '../services/upload.service'
import { uploadGoogleService } from '../services/uploadGoogle.service'

export function LoginSignup() {
  const isLogin = location.pathname === '/auth/login'
  return (
    <div className='login-page'>
      <div className='page-title flex justify-center bold'>
        {isLogin ? 'Log in' : 'Sign up'}
      </div>
      <Outlet />
    </div>
  )
}

export function Login() {
  const isLogin = location.pathname === '/auth/login'
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
      }
    })
    return () => unsubscribe()
  }, [])

  async function onLogin(ev) {
    ev.preventDefault()
    if (!credentials.username) return

    try {
      await login(credentials)
      if (isLogin) navigate('/')
    } catch (err) {
      console.log(err)
      showErrorMsg("Can't login")
    }
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onDemoLogin() {
    const demoUser = { username: 'Barbara', password: 'Barbara' }
    setCredentials({ ...credentials, ...demoUser })
  }

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      const imgUrl = await uploadGoogleService.uploadGoogleImg(
        firebaseUser.photoURL
      )

      const credentials = {
        username: firebaseUser.email,
        password: firebaseUser.uid,
        fullname: firebaseUser.displayName,
        imgUrl,
      }

      let user
      try {
        user = await login(credentials)
      } catch (err) {
        user = await signup(credentials)
      }

      if (isLogin) navigate('/')
    } catch (err) {
      console.error('Google login error:', err)
      showErrorMsg('Google login failed')
    }
  }

  async function loginWithFacebook() {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      const firebaseUser = result.user

      const imgUrl = await uploadGoogleService.uploadGoogleImg(
        firebaseUser.photoURL
      )
      const credentials = {
        username: firebaseUser.email,
        password: firebaseUser.uid,
        fullname: firebaseUser.displayName,
        imgUrl,
      }

      let user
      try {
        user = await login(credentials)
      } catch (err) {
        user = await signup(credentials)
      }

      if (user) {
        navigate('/')
      }
    } catch (err) {
      console.error('Facebook login error:', err)
      showErrorMsg('Facebook login failed')
    }
  }

  return (
    <form className='login-Sign-form' onSubmit={onLogin}>
      <div className='login-Sign-row'>
        <label htmlFor='username'>
          <span>*</span> Username
        </label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className='login-Sign-row'>
        <label htmlFor='password'>
          <span>*</span> Password
        </label>
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className='log-btn bold'>Log in</button>

      <div className='or-container'>
        <span> or login with </span>
      </div>

      <button type='button' onClick={loginWithGoogle} className='google-btn'>
        <i className='fab fa-google'></i> Login with Google
      </button>

      <button
        type='button'
        onClick={loginWithFacebook}
        className='facebook-btn'
      >
        <i className='fab fa-facebook-f'></i> Login with Facebook
      </button>

      <div className='or-container'>
        <span> or </span>
      </div>

      <button onClick={onDemoLogin} className='demo-btn btn'>
        Demo login
      </button>

      <button
        type='button'
        onClick={() => navigate('/auth/signup')}
        className='btn'
      >
        Signup
      </button>
    </form>
  )
}

export function Signup() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const navigate = useNavigate()
  const isSignup = location.pathname === '/auth/signup'

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
  }

  function handleChange(ev) {
    const type = ev.target.type
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onSignup(ev) {
    ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return

    try {
      await signup(credentials)
      clearState()
      navigate('/')
    } catch (err) {
      showErrorMsg("Can't sign up")
    }
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <form className='login-Sign-form' onSubmit={onSignup}>
      <div className='login-Sign-row'>
        <label htmlFor='fullname'>
          <span>*</span> Fullname
        </label>
        <input
          type='text'
          name='fullname'
          value={credentials.fullname}
          onChange={handleChange}
          required
        />
      </div>
      <div className='login-Sign-row'>
        <label htmlFor='username'>
          <span>*</span> Username
        </label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className='login-Sign-row'>
        <label htmlFor='password'>
          <span>*</span> Password
        </label>
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='img'>
        <ImgUploader onUploaded={onUploaded} />
      </div>
      <button className='log-btn'>Sign up</button>
      <div className='or-container'>
        <span> or </span>
      </div>
      <button
        type='button'
        onClick={() => navigate('/auth/login')}
        className='btn'
      >
        Login
      </button>
    </form>
  )
}
