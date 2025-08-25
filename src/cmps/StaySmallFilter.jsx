



export function StaySmallFilter({openFocusComponent}) {
    return (
        <section className="small-filter" onClick={openFocusComponent}>
            <section>Anywhere</section>
            <section>Anytime</section>
            <section>Add guests</section>
            <button className="btn-clear">Search</button>
        </section>
    )
}