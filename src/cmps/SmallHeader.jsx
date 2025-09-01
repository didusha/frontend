import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import homes from '../assets/images/png/homes.png'
import experiences from '../assets/images/png/experiences.png'
import services from '../assets/images/png/services.png'
import { SmallMqFilter } from './SmallMqFilter'
import { useState, useEffect } from 'react'
import { OPEN_WHERE_MODAL } from '../store/reducers/system.reducer'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

export function SmallHeader() {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        function handleScroll() { setIsScrolled(window.scrollY > 0) }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        isHomePage && (
            <header className="small-header sticky">
                <div className="start-search" onClick={() => {
                    setIsFilterOpen(true)
                    dispatch({ type: OPEN_WHERE_MODAL })
                }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span>Start your search</span>
                </div>
                <section className="navigation-links">
                    <section className="homes-section">
                        <img className={`homes-imgs ${isScrolled ? "scrolled" : ""}`} src={homes} alt="homes" />
                        <a>Homes</a>
                    </section>
                    <section className="experiences-section">
                        <img className={`experiences-imgs ${isScrolled ? "scrolled" : ""}`} src={experiences} alt="experiences" />
                        <a>Experiences</a>
                    </section>
                    <section>
                        <img className={`services-imgs ${isScrolled ? "scrolled" : ""}`} src={services} alt="services" />
                        <a>Services</a>
                    </section>
                </section>
                {isFilterOpen && <SmallMqFilter setIsFilterOpen={setIsFilterOpen} />}
            </header>
        )
    )
}
