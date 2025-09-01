
export function Loader({ text = 'Loading, please wait...' }) {
    return (
        <section className="loader-container">
            <div className="animation">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p>{text}</p>
        </section>
    )
}
