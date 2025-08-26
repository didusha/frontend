import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'
import { OPEN_DATE_MODAL, OPEN_GUESTS_MODAL, SET_CHECK_IN, SET_CHECK_OUT } from '../store/reducers/system.reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { GuestsModal } from './GuestsModal'

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const checkIn = useSelector(storeState => storeState.systemModule.checkIn)
    const checkOut = useSelector(storeState => storeState.systemModule.checkOut)
    const dispatch = useDispatch()

    useEffect(() => {
        setFilterToEdit(prev => ({
            ...prev,
            checkIn,
            checkOut
        }))
    }, [checkIn, checkOut])

    function handleChange(ev) {
        const { type, name, value } = ev.target
        let val = value
        if (type === 'number') val = +value || ''
        setFilterToEdit({ ...filterToEdit, [name]: val })
    }

    function onSubmit(ev) {
        ev.preventDefault()
        dispatch(setFilterBy(filterToEdit))
        //להכניס לקוורי
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
                        value={filterToEdit.txt}
                        onChange={handleChange}
                        placeholder="Search destinations"
                    />
                </section>

                <section className="check-in" onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>
                    <h5>Check in</h5>
                    <span>{checkIn ? formatDate(checkIn) : 'Add dates'}</span>
                </section>

                <section className="check-out" onClick={() => dispatch({ type: OPEN_DATE_MODAL })}>
                    <h5>Check out</h5>
                    <span>{checkOut ? formatDate(checkOut) : 'Add dates'}</span>
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
