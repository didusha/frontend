import { useState, useEffect } from 'react'

export function StayFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    return <section className="stay-filter">
        <section className="search">
            <h5>Where</h5>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Search destinations"
            />
        </section>
        <section className="check-in"> <h5>check in</h5></section>
        <section className="check-out"> <h5>check out</h5></section>
        <section className="guests"> <h5>who</h5></section>
        <button
            className="btn-clear"
            onClick={handleChange}>search
        </button>
    </section>
}