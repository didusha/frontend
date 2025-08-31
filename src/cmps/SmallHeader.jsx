import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import homes from '../assets/images/png/homes.png'
import experiences from '../assets/images/png/experiences.png'
import services from '../assets/images/png/services.png'
import { SmallMqFilter } from './SmallMqFilter'
import { useState } from 'react'


export function SmallHeader() {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <header className="small-header">
            <div className="start-search" onClick={() => setIsFilterOpen(true)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Start your search</span>
            </div>
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
            {isFilterOpen && <SmallMqFilter/>}
        </header>
    )
}