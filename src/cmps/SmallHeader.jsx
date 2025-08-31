import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import homes from '../assets/images/png/homes.png'
import experiences from '../assets/images/png/experiences.png'
import services from '../assets/images/png/services.png'
import { SmallMqFilter } from './SmallMqFilter'
import { useState, useEffect } from 'react'
import { OPEN_WHERE_MODAL } from '../store/reducers/system.reducer'
import { useDispatch } from 'react-redux'

export function SmallHeader() {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSticky, setIsSticky] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        function handleScroll() { setIsScrolled(window.scrollY > 0) }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={`small-header ${isSticky ? "sticky" : ""}`}>
            <div className="start-search" onClick={() => {
                setIsFilterOpen(true)
                setIsSticky(false)
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
            {isFilterOpen && <SmallMqFilter setIsFilterOpen={setIsFilterOpen}/>}
        </header>
    )
}
