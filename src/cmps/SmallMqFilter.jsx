import { CLOSE_DATE_MODAL, CLOSE_GUESTS_MODAL, CLOSE_WHERE_MODAL, OPEN_DATE_MODAL, OPEN_GUESTS_MODAL, OPEN_WHERE_MODAL } from '../store/reducers/system.reducer'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { GuestsModal } from './GuestsModal'
import { WhereModal } from './WhereModal'

import homes from '../assets/images/png/homes.png'
import experiences from '../assets/images/png/experiences.png'
import services from '../assets/images/png/services.png'


export function SmallMqFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isDateModalOpen = useSelector(storeState => storeState.systemModule.isDateModalOpen)
    const isGuestsModalOpen = useSelector(storeState => storeState.systemModule.isGuestsModalOpen)
    const isWhereModalOpen = useSelector(storeState => storeState.systemModule.isWhereModalOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [showWhereModal, setShowWhereModal] = useState(false)
    // const [showWhenModal, setShowWhenModal] = useState(false)
    // const [showWhoModal, setShowWhoModal] = useState(false)
    const [localFilter, setLocalFilter] = useState(filterBy)
    const [selectedSection, setSelectedSection] = useState("search")
    const [searchParams, setSearchParams] = useSearchParams()
    const wrapperRef = useRef(null)

    const isSmallModal = true

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSelectedSection(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [wrapperRef])

    function handleChange(ev) {
        const { type, name, value } = ev.target
        const val = (type === 'number') ? +value : value
        setLocalFilter(prev => ({ ...prev, [name]: val }))
    }

    function handleGuestChange(val) {
        setLocalFilter(prev => ({ ...prev, capacity: val }))
    }

    function handleCheckInChange(val) {
        setLocalFilter(prev => ({ ...prev, checkIn: val }))
    }

    function handleCheckOutChange(val) {
        setLocalFilter(prev => ({ ...prev, checkOut: val }))
    }

    function handleWhereChange(val) {
        const txt = val.city
        setLocalFilter(prev => ({ ...prev, txt: txt }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        setParams()
        dispatch(setFilterBy(localFilter))
        closeModals()
        setSelectedSection(null)
        navigate('/')
    }

    function setParams() {
        const params = {
            checkIn: localFilter.checkIn,
            checkOut: localFilter.checkOut,
            where: localFilter.txt,
            adults: localFilter.capacity.adults,
            children: localFilter.capacity.children,
            infants: localFilter.capacity.infants,
            pets: localFilter.capacity.pets,
        }
        setSearchParams(params)
    }

    function formatDate(date) {
        if (!date) return 'Add dates'
        const d = new Date(date)
        if (isNaN(d.getTime())) return 'Add dates'
        const options = { day: 'numeric', month: 'short' }
        return d.toLocaleDateString('en-US', options)
    }

    function getGuestsLabel(capacity) {
        const { adults, children, infants, pets } = capacity
        let parts = []

        if (adults > 0) parts.push(`${adults} ${adults === 1 ? 'adult' : 'adults'}`)
        if (children > 0) parts.push(`${children} ${children === 1 ? 'child' : 'children'}`)
        if (infants > 0) parts.push(`${infants} ${infants === 1 ? 'infant' : 'infants'}`)
        if (pets > 0) parts.push(`${pets} ${pets === 1 ? 'pet' : 'pets'}`)
        if (parts.length === 0) return 'Add guests'
        return parts.join(', ')
    }

    function getSectionClass(sectionName) {
        if (selectedSection === null) return ""
        return selectedSection === sectionName ? "small-selected" : "small-not-selected"
    }

    function closeModals() {
        if (isDateModalOpen) dispatch({ type: CLOSE_DATE_MODAL })
        if (isGuestsModalOpen) dispatch({ type: CLOSE_GUESTS_MODAL })
        if (isWhereModalOpen) dispatch({ type: CLOSE_WHERE_MODAL })
    }

    return (
        <section className="small-mq-filter" ref={wrapperRef}>
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

            <form
                onSubmit={onSubmit}
                className={selectedSection ? "form-active" : ""}
            >
                {selectedSection === "search" &&
                    <section
                        className={`small-search ${getSectionClass("search")}`}
                        onClick={() => {
                            dispatch({ type: OPEN_WHERE_MODAL })
                            setSelectedSection(selectedSection === "search" ? null : "search")
                            closeModals()
                        }}
                    >
                        <h4>Where</h4>
                        <input
                            className="where-small-filter"
                            type="text"
                            name="txt"
                            value={localFilter.txt}
                            onChange={handleChange}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Search destinations"
                        />
                    </section>
                }
                {selectedSection !== "search" &&
                    <WhereModal
                        isSmallModal={isSmallModal}
                        setSelectedSection={setSelectedSection}
                        handleWhereChange={handleWhereChange}
                    />
                }
                {selectedSection !== "checkIn" &&
                    <section
                        className={`when ${getSectionClass("checkIn")}`}
                        onClick={() => {
                            dispatch({ type: OPEN_DATE_MODAL })
                            setSelectedSection(selectedSection === "checkIn" ? null : "checkIn")
                            closeModals()
                        }}
                    >
                        <h4>When</h4>
                        <span className="check-in-small-filter">{localFilter.checkIn ? formatDate(localFilter.checkIn) : 'Add dates'}</span>
                    </section>
                }

                {selectedSection === "checkIn" &&
                    <DateModal
                        isSmallModal={isSmallModal}
                        setSelectedSection={setSelectedSection}
                        handleCheckOutChange={handleCheckOutChange}
                        handleCheckInChange={handleCheckInChange}
                    />
                }
                {selectedSection !== "guests" &&
                    <section className={`small-guests ${getSectionClass("guests")}`}
                        onClick={() => {
                            dispatch({ type: OPEN_GUESTS_MODAL })
                            setSelectedSection(selectedSection === "guests" ? null : "guests")
                            closeModals()
                        }}
                    >
                        <h4>Who</h4>
                        <span className="guests-small-filter">{getGuestsLabel(localFilter.capacity)}</span>
                    </section>
                }
                {selectedSection === "guests" &&
                    <GuestsModal
                        isSmallModal={isSmallModal}
                        setSelectedSection={setSelectedSection}
                        handleGuestChange={handleGuestChange}
                    />
                }
                <button className={!selectedSection ? "small-btn-search" : "small-btn-search-selected"} type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                    <span className="small-search-span">search</span>
                </button>
            </form >
        </section >
    )
}
