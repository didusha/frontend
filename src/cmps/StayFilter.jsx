import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions'
import { DateModal } from './DateModal'

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                    Add dates
                </section>

                <section className="check-out" onClick={() => setIsModalOpen(true)}>
                    <h5>Check out</h5>
                    Add dates
                </section>

                <section className="guests">
                    <div className="guests-text">
                        <h5>Who</h5>
                        Add guests
                    </div>
                </section>
                <button className="btn-clear">Search</button>
            </form>
            <DateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
