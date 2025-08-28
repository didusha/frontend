import { Outlet, useNavigate, useOutletContext} from 'react-router'
import { useState } from 'react'

import { userService } from '../services/user'
import { login, signup } from '../store/actions/user.actions'
import { ImgUploader } from '../cmps/ImgUploader'

export function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false)
  	const isLogin = location.pathname === '/auth/login'
   
  function onSetIsSignup() {
    setIsSignup(!isSignup)
  }
  return (
    <div className='login-page'>
      <div className='page-title flex justify-center bold'>
        {isLogin ? 'Log in' : 'Sign up'}
      </div>
      <Outlet context={{ onSetIsSignup }} />
    </div>
  )
}

export function Login() {
  const { onSetIsSignup } = useOutletContext()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })



  async function onLogin(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    await login(credentials)
    navigate('/')
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onNavigate() {
    onSetIsSignup()
    navigate('/auth/signup')
  }

function onDemoLogin(){
    const demoUser={username:'admin', password:'admin'}
    setCredentials({ ...credentials, ...demoUser})
}

  return (
    <form className='login-Sign-form' onSubmit={onLogin}>
      <div className='login-Sign-row'>
        <label htmlFor='username'> <span>*</span> Username</label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className='login-Sign-row'>
        <label htmlFor='password'><span>*</span> Password</label>
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
        <span> or </span>
      </div>
      <button onClick={onDemoLogin} className='demo-btn btn'>Demo login</button>
      <button onClick={onNavigate} className='btn'>Signup</button>
    </form>
  )
}

export function Signup() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const { onSetIsSignup } = useOutletContext()
  const navigate = useNavigate()

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
  }

  function handleChange(ev) {
    const type = ev.target.type

    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onSignup(ev = null) {
    if (ev) ev.preventDefault()

    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    await signup(credentials)
    clearState()
    navigate('/')
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  function onNavigate() {
    onSetIsSignup()
    navigate('/auth/login')
  }

  return (
    <form className='login-Sign-form' onSubmit={onSignup}>
      <div className='login-Sign-row'>
        <label htmlFor='fullname'><span>*</span> Fullname</label>
        <input
          type='text'
          name='fullname'
          value={credentials.fullname}
          onChange={handleChange}
          required
        />
      </div>
      <div className='login-Sign-row'>
        <label htmlFor='username'><span>*</span> Username</label>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className='login-Sign-row'>
        <label htmlFor='password'><span>*</span> Password</label>
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
      <button onClick={onNavigate}  className='btn'>Login</button>
    </form>
  )
}
