import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from '../cmps/StayFilter'
import { useState, useEffect } from 'react'
import { StaySmallFilter } from './StaySmallFilter'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const [isFocus, setIsFocus] = useState(true)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsFocus(true)
			} else {
				setIsFocus(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])


	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<nav>
				<section className="logo">
					<img className="logo-img" src="../../public/img/logo.png" alt="logo" />
					<span>rarebnb</span>
				</section>
				{!isFocus && <StaySmallFilter setIsFocus={setIsFocus} />}
				{isFocus &&
					<section className="navigation-links">
						<a>Homes</a>
						<a>Experiences</a>
						<a>Services</a>
					</section>
				}
				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				{!user && <NavLink to="auth/login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{user.imgUrl && <img src={user.imgUrl} />}
							{user.fullname}
						</Link>
						<span className="score">{user.score?.toLocaleString()}</span>
						<button onClick={onLogout}>logout</button>
					</div>
				)}

			</nav>
			{isFocus && <StayFilter />}
		</header>
	)
}
