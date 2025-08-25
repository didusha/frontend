import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from '../cmps/StayFilter'
import { useState, useEffect, useRef } from 'react'
import { StaySmallFilter } from './StaySmallFilter'
import { throttle } from 'lodash'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const [isFocus, setIsFocus] = useState(true)
	const [forceOpen, setForceOpen] = useState(false)
	const prevScrollY = useRef(0)

	const SCROLL_THRESHOLD = 10

	const openFocusComponent = () => {
		setForceOpen(true) 
		setIsFocus(true)
	}

	useEffect(() => {
		const handleScroll = throttle(() => {
			const currentScrollY = window.scrollY

			if (forceOpen) {
				if (currentScrollY === 0) {
					setForceOpen(false)
				}
				return
			}

			if (currentScrollY === 0) {
				setIsFocus(true)
			} else {
				setIsFocus(false)
			}
		}, 100) // 100ms delay

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [forceOpen])

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
				{!isFocus && <StaySmallFilter openFocusComponent={openFocusComponent} />}
				{isFocus &&
					<section className="navigation-links">
						<section>
							<img className="homes-imgs" src="../../public/img/homes.png" alt="homes" />
							<a>Homes</a>
						</section>
						<section>
							<img className="experiences-imgs" src="../../public/img/experiences.png" alt="experiences" />
							<a>Experiences</a>
						</section>
						<section>
							<img className="services-imgs" src="../../public/img/services.png" alt="services" />
							<a>Services</a>
						</section>
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
