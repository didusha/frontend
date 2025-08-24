import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions'

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

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

                <section className="check-in"> <h5>Check in</h5>Add dates</section>
                <section className="check-out"> <h5>Check out</h5>Add dates</section>
                <section className="guests"> <h5>Who</h5>Add guests</section>

                <button className="btn-clear">Search</button>
            </form>
        </section>
    )
}
