import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'
import { OPEN_DATE_MODAL, OPEN_GUESTS_MODAL } from '../store/reducers/system.reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { GuestsModal } from './GuestsModal'

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        setFilterBy(prev => ({
            ...prev,
            checkIn: filterBy.checkIn,
            checkOut: filterBy.checkOut
        }))
    }, [filterBy.checkIn, filterBy.checkOut])

    function handleChange(ev) {
        const { type, name, value } = ev.target
        let val = value
        if (type === 'number') val = +value || ''
        setFilterBy({ ...filterBy, [name]: val })
    }

    function onSubmit(ev) {
        ev.preventDefault()
        setParams()
        dispatch(setFilterBy(filterBy))
    }

    function setParams() {
        const params = new URLSearchParams({
            checkIn: filterBy.checkIn,
            checkOut: filterBy.checkOut,
            where: filterBy.txt,
            adults: filterBy.capacity.adults,
            children: filterBy.capacity.children,
            infants: filterBy.capacity.infants,
            pets: filterBy.capacity.pets,
        })
        window.history.replaceState(null, '', `?${params.toString()}`)
    }

    function formatDate(date) {
        if (!date) return 'Add dates'
        const d = new Date(date)
        if (isNaN(d.getTime())) return 'Add dates'
        const options = { day: 'numeric', month: 'short' }
        return d.toLocaleDateString('en-US', options)
    }

    return (
        <section className="stay-filter">
            <form onSubmit={onSubmit}>
                <section className="search">
                    <h5>Where</h5>
                    <input
                        type="text"
                        name="txt"
                        value={filterBy.txt}
                        onChange={handleChange}
                        placeholder="Search destinations"
                    />
                </section>

                <section className="check-in" onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>
                    <h5>Check in</h5>
                    <span>{filterBy.checkIn ? formatDate(filterBy.checkIn) : 'Add dates'}</span>
                </section>

                <section className="check-out" onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>
                    <h5>Check out</h5>
                    <span>{filterBy.checkOut ? formatDate(filterBy.checkOut) : 'Add dates'}</span>
                </section>

                <section className="guests">
                    <div className="guests-text" onClick={() => dispatch({ type: OPEN_GUESTS_MODAL })}>
                        <h5>Who</h5>
                        <span>
                            Add guests
                        </span>
                    </div>
                    <button className="btn-clear">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} />
                    </button>
                </section>
            </form>
            <DateModal />
            <GuestsModal />
        </section>
    )
}
