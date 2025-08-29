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
import hamburger from '../assets/images/svg/hamburger.svg'
import translate from '../assets/images/svg/translate.svg'
import question from '../assets/images/png/circle-question.png'
import rarebnb from '../assets/images/png/rarebnb.webp'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const location = useLocation()
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
	const [selectedSection, setSelectedSection] = useState(null)

	const isHomePage = location.pathname === '/'
	const isDetailsPage = location.pathname.startsWith('/stay/')

	const [isFocus, setIsFocus] = useState(isHomePage ? true : false)

	useEffect(() => {
		if (!isHomePage) return

		const handleScroll = throttle(() => {
			const currentScrollY = window.scrollY

			setIsFocus(currentScrollY === 0)
		}, 100)

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isHomePage])

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	function linkTo(link) {
		setIsHamburgerOpen(false)
		navigate(`/${link}`)
	}

	return (
		<header className={`app-header full ${isHomePage ? 'sticky' : ''} ${isDetailsPage ? 'small-layout' : ''}`}>
			<nav>
				<section className="logo" onClick={() => {
					navigate('/')
					setIsHamburgerOpen(false)
				}}>
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
					{!user ?
						<button className="btn-translate">
							<img className="translate" src={translate} alt="translate" />
						</button>
						:
						<button className="btn-user">
							<img className="user-img" src={user.imgUrl} alt="" />
						</button>
					}
					<button className="hamburger-menu" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
						<img className="hamburger" src={hamburger} alt="menu" />
					</button>
					{isHamburgerOpen &&
						<>
							<div className="hamburger-overlay" onClick={() => setIsHamburgerOpen(false)}></div>
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
								{user &&
									<div>
										<section className="trips-link" onClick={() => linkTo('trips')}>My trips</section>
										<section className="add-stay-link" onClick={() => linkTo('stay/edit')}>Add stay</section>
										<section className="dashboard-link" onClick={() => linkTo('dashboard')}>Dashboard</section>
										<section className="log-out-link" onClick={onLogout}>Log out</section>
									</div>
								}
								{!user &&
									<section className="log-in-link">
										<NavLink onClick={() => setIsHamburgerOpen(false)} to="auth/login" className="login-link">Log in or sign up</NavLink>
									</section>
								}
							</div>
						</>
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
				)}
		</header>
	)
}
