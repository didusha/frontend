import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [checkInDate, setCheckInDate] = useState('Add dates')
    const [checkOutDate, setCheckOutDate] = useState('Add dates')

    function handleChange(ev) {
        const { type, name, value } = ev.target
        let val = value
        if (type === 'number') val = +value || ''
        setFilterToEdit({ ...filterToEdit, [name]: val })
    }

    function onSubmit(ev) {
        ev.preventDefault()
        setFilterBy(filterToEdit)
    }

    const checkIn = formatDate(checkInDate)
    const checkOut = formatDate(checkOutDate)

    function formatDate(date) {
        if (!date) return 'Add dates'
        const d = new Date(date)
        if (isNaN(d.getTime())) return 'Add dates'
        const options = { day: 'numeric', month: 'short' }
        return new Date(date).toLocaleDateString('en-US', options)
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

                <section className="check-in" onClick={() => setIsModalOpen(true)}>
                    <h5>Check in</h5>
                    {!checkIn && 'Add dates'}
                    {checkIn}
                </section>

                <section className="check-out" onClick={() => setIsModalOpen(true)}>
                    <h5>Check out</h5>
                    {!checkOut && 'Add dates'}
                    {checkOut}
                </section>

                <section className="guests">
                    <div className="guests-text">
                        <h5>Who</h5>
                        Add guests
                    </div>
                    <button className="btn-clear">Search</button>
                </section>
            </form>
            <DateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
            />
        </section>
    )
}
