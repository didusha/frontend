import { NavLink, Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from '../cmps/StayFilter'
import { useState, useEffect } from 'react'
import { StaySmallFilter } from './StaySmallFilter'
import { throttle } from 'lodash'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const location = useLocation()
	const isHomePage = location.pathname === '/'

	const [isFocus, setIsFocus] = useState(isHomePage ? true : false)
	const [forceOpen, setForceOpen] = useState(false)

	const openFocusComponent = () => {
		setForceOpen(true)
		setIsFocus(true)
	}

	useEffect(() => {
		if (!isHomePage) return

		const handleScroll = throttle(() => {
			const currentScrollY = window.scrollY

			if (forceOpen) {
				if (currentScrollY === 0) setForceOpen(false)
				return
			}

			setIsFocus(currentScrollY === 0)
		}, 100)

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [forceOpen, isHomePage])

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
		<header className={`app-header full ${isHomePage ? 'sticky' : ''}`}>
			<nav>
				<section className="logo" onClick={() => navigate('/')}>
					<img className="logo-img" src="../../public/img/rarebnb.webp" alt="logo" />
					<span>rarebnb</span>
				</section>

				{(!isHomePage || (isHomePage && !isFocus)) && (
					<StaySmallFilter openFocusComponent={openFocusComponent} />
				)}

				{isHomePage && isFocus && (
					<section className="navigation-links">
						<section className="homes-section">
							<img className="homes-imgs" src="../../public/img/homes.png" alt="homes" />
							<a>Homes</a>
						</section>
						<section className="experiences-section">
							<img className="experiences-imgs" src="../../public/img/experiences.png" alt="experiences" />
							<a>Experiences</a>
						</section>
						<section>
							<img className="services-imgs" src="../../public/img/services.png" alt="services" />
							<a>Services</a>
						</section>
					</section>
				)}

				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}


				{!user && <NavLink to="auth/login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{user.imgUrl && <img src={user.imgUrl} />}
							{user.fullname}
						</Link>
						
						<button onClick={onLogout}>logout</button>
					</div>
				)}
			</nav>
				{/* <button className="hamburger-menu">
					<img className="hamburger" src="../../public/img/Hamburger.png" alt="menu" />
				</button> */}

			{isHomePage && isFocus && <StayFilter />}
		</header>
	)
}
