import { CLOSE_DATE_MODAL, CLOSE_GUESTS_MODAL, CLOSE_WHERE_MODAL, OPEN_DATE_MODAL, OPEN_GUESTS_MODAL, OPEN_WHERE_MODAL } from '../store/reducers/system.reducer'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { GuestsModal } from './GuestsModal'
import { WhereModal } from './WhereModal'

export function StayFilter({ selectedSection, setSelectedSection }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isDateModalOpen = useSelector(storeState => storeState.systemModule.isDateModalOpen)
    const isGuestsModalOpen = useSelector(storeState => storeState.systemModule.isGuestsModalOpen)
    const isWhereModalOpen = useSelector(storeState => storeState.systemModule.isWhereModalOpen)
    const dispatch = useDispatch()

    const [localFilter, setLocalFilter] = useState(filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const wrapperRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSelectedSection(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [wrapperRef])

    // useEffect(() => {
    //     setSelectedSection(selectedSection === "checkOut" ? null : "checkOut")
    // }, [localFilter.checkIn])

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
        return selectedSection === sectionName ? "selected" : "not-selected"
    }

    function closeModals() {
        if (isDateModalOpen) dispatch({ type: CLOSE_DATE_MODAL })
        if (isGuestsModalOpen) dispatch({ type: CLOSE_GUESTS_MODAL })
        if (isWhereModalOpen) dispatch({ type: CLOSE_WHERE_MODAL })
    }

    return (
        <section className="stay-filter" ref={wrapperRef}>
            <form
                onSubmit={onSubmit}
                className={selectedSection ? "form-active" : ""}
            >
                <section
                    className={`search ${getSectionClass("search")}`}
                    onClick={() => {
                        dispatch({ type: OPEN_WHERE_MODAL })
                        setSelectedSection(selectedSection === "search" ? null : "search")
                        closeModals()
                    }}
                >
                    <h5>Where</h5>
                    <input
                        type="text"
                        name="txt"
                        value={localFilter.txt}
                        onChange={handleChange}
                        placeholder="Search destinations"
                    />
                </section>

                <section
                    className={`check-in ${getSectionClass("checkIn")}`}
                    onClick={() => {
                        dispatch({ type: OPEN_DATE_MODAL })
                        setSelectedSection(selectedSection === "checkIn" ? null : "checkIn")
                        closeModals()
                    }}
                >
                    <h5>Check in</h5>
                    <span>{localFilter.checkIn ? formatDate(localFilter.checkIn) : 'Add dates'}</span>
                </section>

                <section
                    className={`check-out ${getSectionClass("checkOut")}`}
                    onClick={() => {
                        dispatch({ type: OPEN_DATE_MODAL })
                        setSelectedSection(selectedSection === "checkOut" ? null : "checkOut")
                    }}
                >
                    <h5>Check out</h5>
                    <span>{localFilter.checkOut ? formatDate(localFilter.checkOut) : 'Add dates'}</span>
                </section>

                <section className={`guests ${getSectionClass("guests")}`}>
                    <div
                        className="guests-text"
                        onClick={() => {
                            dispatch({ type: OPEN_GUESTS_MODAL })
                            setSelectedSection(selectedSection === "guests" ? null : "guests")
                            closeModals()
                        }}
                    >
                        <h5>Who</h5>
                        <span>{getGuestsLabel(localFilter.capacity)}</span>
                    </div>
                    <button className={!selectedSection ? "btn-search" : "btn-search-selected"} type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                        <span className="search-span">search</span>
                    </button>
                </section>
            </form >
            <WhereModal
                setSelectedSection={setSelectedSection}
                handleWhereChange={handleWhereChange}
            />
            <DateModal
                setSelectedSection={setSelectedSection}
                handleCheckOutChange={handleCheckOutChange}
                handleCheckInChange={handleCheckInChange}
            />
            <GuestsModal
                setSelectedSection={setSelectedSection}
                handleGuestChange={handleGuestChange}
            />
        </section >
    )
}
