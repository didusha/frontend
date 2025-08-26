import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'
import { OPEN_DATE_MODAL, OPEN_GUESTS_MODAL } from '../store/reducers/system.reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { GuestsModal } from './GuestsModal'
import { useSearchParams } from 'react-router-dom'

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const dispatch = useDispatch()

    const [localFilter, setLocalFilter] = useState(filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    function handleChange(ev) {
        const { type, name, value } = ev.target
        let val = value
        if (type === 'number') val = +value || ''
        setLocalFilter(prev => ({ ...prev, [name]: val }))
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
        // window.history.replaceState(null, '', `?${params.toString()}`)
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


    return (
        <section className="stay-filter">
            <form onSubmit={onSubmit}>
                <section className="search">
                    <h5>Where</h5>
                    <input
                        type="text"
                        name="txt"
                        value={localFilter.txt}
                        onChange={handleChange}
                        placeholder="Search destinations"
                    />
                </section>

                <section className="check-in" onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>
                    <h5>Check in</h5>
                    <span>{localFilter.checkIn ? formatDate(localFilter.checkIn) : 'Add dates'}</span>
                </section>

                <section className="check-out" onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>
                    <h5>Check out</h5>
                    <span>{localFilter.checkOut ? formatDate(localFilter.checkOut) : 'Add dates'}</span>
                </section>

                <section className="guests">
                    <div className="guests-text" onClick={() => dispatch({ type: OPEN_GUESTS_MODAL })}>
                        <h5>Who</h5>
                        <span>
                            {getGuestsLabel(localFilter.capacity)}
                        </span>
                    </div>
                    <button className="btn-clear" type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                    </button>
                </section>
            </form>
            <DateModal />
            <GuestsModal />
        </section>
    )
}
