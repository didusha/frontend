import { NavLink, Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from '../cmps/StayFilter'
import { useState, useEffect } from 'react'
import { StaySmallFilter } from './StaySmallFilter'
import { throttle } from 'lodash'

import homes from '../assets/images/png/homes.png'
import experiences from '../assets/images/png/experiences.png'
import services from '../assets/images/png/services.png'
import Hamburger from '../assets/images/png/Hamburger.png'
import question from '../assets/images/png/circle-question.png'
import rarebnb from '../assets/images/png/rarebnb.webp'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const location = useLocation()
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
	const [selectedSection, setSelectedSection] = useState(null)

	const isHomePage = location.pathname === '/'

	const [isFocus, setIsFocus] = useState(isHomePage ? true : false)

	useEffect(() => {
		if (!isHomePage) return

		const handleScroll = throttle(() => {
			const currentScrollY = window.scrollY

			setIsFocus(currentScrollY === 0)
		}, 100)

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [ isHomePage])

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
					<img className="logo-img" src={rarebnb} alt="logo" />
					<span>rarebnb</span>
				</section>

				{(
					(isHomePage && !isFocus && !selectedSection) ||
					(!isHomePage && !selectedSection)
				) && (
						<StaySmallFilter
							setSelectedSection={setSelectedSection}
							selectedSection={selectedSection}
							isHomePage={isHomePage}
						/>
					)}

				{(
					(isHomePage && (isFocus || selectedSection)) ||
					(!isHomePage && selectedSection)
				) && (
						<section className="navigation-links">
							<section className="homes-section">
								<img className="homes-imgs" src={homes} alt="homes" />
								<a>Homes</a>
							</section>
							<section className="experiences-section">
								<img className="experiences-imgs" src={experiences} alt="experiences" />
								<a>Experiences</a>
							</section>
							<section>
								<img className="services-imgs" src={services} alt="services" />
								<a>Services</a>
							</section>
						</section>
					)}

				{/* {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}


				{!user && <NavLink to="auth/login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{user.imgUrl && <img src={user.imgUrl} />}
							{user.fullname}
						</Link>
						
						<button onClick={onLogout}>logout</button>
					</div>
				)} */}
				<section className="hamburger-menu-section">
					<button className="hamburger-menu" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
						<img className="hamburger" src={Hamburger} alt="menu" />
					</button>
					{isHamburgerOpen &&
						<div className="logged-out-hamburger">
							<section className="help-center">
								<img className="circle-question" src={question} alt="" />
								Help Center
							</section>
							<section className="become-host">
								<div>
									<span className="host-span">Become a host</span>
									<p className="become-host-p" >It's easy to start hosting and</p>
									<p className="become-host-p" >earn extra income</p>
								</div>
								<img className="homes-hamburger" src={homes} alt="" />
							</section>
							<section>
								<div className="hamburger-options">Refer a Host</div>
								<div className="hamburger-options">Find a co-host</div>
								<div className="hamburger-options">Gift cards</div>
							</section >
							<div className="log-in-link">
								<NavLink onClick={() => setIsHamburgerOpen(false)} to="stay/edit" className="login-link">Add stay</NavLink>
							</div>
							<div className="log-in-link">
								{(!user) ?
									<NavLink onClick={() => setIsHamburgerOpen(false)} to="auth/login" className="login-link">Log in or sign up</NavLink> :
									<div className="" onClick={onLogout}>Log out</div>
								}
							</div>
						</div>
					}
				</section>
			</nav>

			{(
				(isHomePage && (isFocus || selectedSection)) ||
				(!isHomePage && selectedSection)
			) && (
					<StayFilter
						selectedSection={selectedSection}
						setSelectedSection={setSelectedSection}
					/>
				)}		</header>
	)
}
