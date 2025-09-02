import { useSelector } from "react-redux"



export function IndexLoader() {
    const items = Array.from({ length: 50 })
    return (
        <section>
            <ul className="loader-list">
                {items.map((_, idx) => (
                    <li key={idx} className="loader-item">
                        <div className="img-loader"></div>
                        <div className="first-loader"></div>
                        <div className="second-loader"></div>
                    </li>
                ))}
            </ul>
        </section>
    )
}