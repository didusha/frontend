import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_WHERE_MODAL, OPEN_DATE_MODAL } from '../store/reducers/system.reducer'

export function WhereModal({ handleWhereChange, setSelectedSection, isSmallModal, handleChange }) {
    const isWhereModalOpen = useSelector(storeState => storeState.systemModule.isWhereModalOpen)
    const dispatch = useDispatch()

    const destinations = [
        {
            imgUrl: "🏙️",
            title: "Tel Aviv, Israel",
            subtitle: "Because your wishlist has stays in Tel Aviv-Yafo",
        },
        {
            imgUrl: "⛩️",
            title: "Bangkok, Thailand",
            subtitle: "For sights like Grand Palace",
        },
        {
            imgUrl: "🏖️",
            title: "Rio de Janeiro, Brazil",
            subtitle: "Popular beach destination",
        },
        {
            imgUrl: "🏛️",
            title: "Porto, Portugal",
            subtitle: "For sights like Museo Nacional de Bellas Artes",
        },
        {
            imgUrl: "🏯",
            title: "New York, United State",
            subtitle: "For its stunning architecture",
        },
        {
            imgUrl: "🏛️",
            title: "Barcelona, Spain",
            subtitle: "For its top-notch dining",
        },
        {
            imgUrl: "⛪",
            title: "Istanbul, Turkey",
            subtitle: "For sights like Church of the Holy Sepulchre",
        },
        {
            imgUrl: "🏝️",
            title: "Sydney, Australia",
            subtitle: "Popular beach destination",
        },
        {
            imgUrl: "🗼",
            title: "Paris, France",
            subtitle: "For its bustling nightlife",
        },
    ]

    return (
        <>
            {isWhereModalOpen && (
                <>
                    <div
                        className={`where-modal-overlay ${isSmallModal ? "small-where-modal" : ""}`}
                        onClick={() => {
                            dispatch({ type: CLOSE_WHERE_MODAL })
                            setSelectedSection(null)
                        }}
                    />
                    <div
                        className={`where-modal-content ${isSmallModal ? "small-where-modal" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSmallModal && <h1 className="where">Where?</h1>}
                        {isSmallModal &&
                            <input
                                className="where-small-filter"
                                type="text"
                                name="txt"
                                onChange={handleChange}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="Search destinations"
                            />

                        }
                        <h3 className="where-modal-title">Suggested destinations</h3>
                        <ul className="dest-list">
                            {destinations.map((d, idx) => {
                                const [city, country] = d.title.split(', ')
                                const loc = { city, country }
                                return (
                                    <li key={idx} className="dest-item"
                                        onClick={() => {
                                            handleWhereChange(loc)
                                            setSelectedSection("checkIn")
                                            dispatch({ type: OPEN_DATE_MODAL })
                                        }}>
                                        <span className="dest-img">{d.imgUrl}</span>
                                        <div className="dest-text">
                                            <div className="dest-title">
                                                <span className="dest-city">{city}</span>
                                                {country && (
                                                    <span className="dest-country">, {country}</span>
                                                )}
                                            </div>
                                            <div className="dest-subtitle">{d.subtitle}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}
