



export function StaySmallFilter({setIsFocus}) {
    return (
        <section className="small-filter" onClick={() => setIsFocus(true)}>
            <section>Anywhere</section>
            <section>Anytime</section>
            <section>Add guests</section>
            <button className="btn-clear">Search</button>
        </section>
    )
}