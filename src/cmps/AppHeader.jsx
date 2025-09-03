import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { StayFilter } from '../cmps/StayFilter'
import { StaySmallFilter } from './StaySmallFilter'
import { useState, useEffect } from 'react'
import { throttle } from 'lodash'

import homes from '../assets/images/png/homes.png'
import experiences from '../assets/images/png/experiences.png'
import services from '../assets/images/png/services.png'
import hamburger from '../assets/images/svg/hamburger.svg'
import translate from '../assets/images/svg/translate.svg'
import question from '../assets/images/png/circle-question.png'
import rarebnb from '../assets/images/png/rarebnb.webp'
import { useScrollToTop } from '../customHooks/useScrollToTop'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const location = useLocation()
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
	const [selectedSection, setSelectedSection] = useState(null)

	const isHomePage = location.pathname === '/'
	const isDetailsPage = location.pathname.startsWith('/stay/')

	const [isFocus, setIsFocus] = useState(isHomePage)
	useScrollToTop()

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
			<nav className="big-header">
				<section className="logo" onClick={() => {
					navigate('/')
					setIsHamburgerOpen(false)
				}}>
					<img className="logo-img" src={rarebnb} alt="logo" />
					<span className="logo-span">rarebnb</span>
				</section>

				<div className={(isHomePage && !isFocus && !selectedSection) || (!isHomePage && !selectedSection) ? '' : 'filter-hide'}>
					<StaySmallFilter
						setSelectedSection={setSelectedSection}
						selectedSection={selectedSection}
						isHomePage={isHomePage}
					/>
				</div>


				<section className={`navigation-links ${(isHomePage && (isFocus || selectedSection)) || (!isHomePage && selectedSection) ? '' : 'filter-hide'}`}>
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

				<section className="hamburger-menu-section">
					{user ?
						<button className="btn-user">
							<img className="user-img" src={user.imgUrl} alt="" />
						</button>
						:
						<button className="btn-translate">
							<img className="translate" src={translate} alt="translate" />
						</button>
					}
					<button className="hamburger-menu" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
						<img className="hamburger" src={hamburger} alt="menu" />
					</button>
					{isHamburgerOpen &&
						<>
							<div className="hamburger-overlay" onClick={() => setIsHamburgerOpen(false)}></div>
							<div className={`logged-out-hamburger ${isDetailsPage ? "right-hamburger" : ""}`}>
								<section className="help-center">
									<img className="circle-question" src={question} alt="" />
									Help Center
								</section>
								<section className="become-host">
									<div>
										<span className="host-span">Become a host</span>
										<p className="become-host-p">It's easy to start hosting and</p>
										<p className="become-host-p">earn extra income</p>
									</div>
									<img className="homes-hamburger" src={homes} alt="" />
								</section>
								{user &&
									<div>
										<section className="wishlist-link" onClick={() => linkTo('wishlist')}>Wishlist</section>
										<section className="trips-link" onClick={() => linkTo('trips')}>My trips</section>
										{user.isHost && <section className="listing-link" onClick={() => linkTo('listing')}>Listings</section>}
										<section className="add-stay-link" onClick={() => linkTo('stay/edit')}>Add stay</section>
										{user.isHost && <section className="dashboard-link" onClick={() => linkTo('dashboard')}>Dashboard</section>}
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

			<div className={(isHomePage && (isFocus || selectedSection)) || (!isHomePage && selectedSection) ? '' : 'filter-hide'}>
				<StayFilter
					selectedSection={selectedSection}
					setSelectedSection={setSelectedSection}
				/>
			</div>

		</header>
	)
}
