import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_WHERE_MODAL } from '../store/reducers/system.reducer'

export function WhereModal({handleWhereChange, setSelectedSection}) {
    const isWhereModalOpen = useSelector(storeState => storeState.systemModule.isWhereModalOpen)
    const dispatch = useDispatch()

    const destinations = [
        {
            icon: "📍",
            title: "Nearby",
            subtitle: "Find what’s around you",
        },
        {
            icon: "🏙️",
            title: "Tel Aviv-Yafo, Israel",
            subtitle: "Because your wishlist has stays in Tel Aviv-Yafo",
        },
        {
            icon: "⛩️",
            title: "Bangkok, Thailand",
            subtitle: "For sights like Grand Palace",
        },
        {
            icon: "🏖️",
            title: "Rio de Janeiro, Brazil",
            subtitle: "Popular beach destination",
        },
        {
            icon: "🌊",
            title: "Ipanema Beach, Brazil",
            subtitle: "For a trip abroad",
        },
        {
            icon: "🏛️",
            title: "Santiago, Chile",
            subtitle: "For sights like Museo Nacional de Bellas Artes",
        },
        {
            icon: "🏯",
            title: "Hanoi, Vietnam",
            subtitle: "For its stunning architecture",
        },
        {
            icon: "🏛️",
            title: "Rome, Italy",
            subtitle: "For its top-notch dining",
        },
        {
            icon: "⛪",
            title: "Jerusalem, Israel",
            subtitle: "For sights like Church of the Holy Sepulchre",
        },
        {
            icon: "🏝️",
            title: "Salvador, Brazil",
            subtitle: "Popular beach destination",
        },
        {
            icon: "🗼",
            title: "Paris, France",
            subtitle: "For its bustling nightlife",
        },
        {
            icon: "🌇",
            title: "Buenos Aires, Argentina",
            subtitle: "For its stunning architecture",
        },
        {
            icon: "🏛️",
            title: "Athens, Greece",
            subtitle: "For sights like Acropolis of Athens",
        },
    ]

    return (
        <>
            {isWhereModalOpen && (
                <>
                    <div
                        className="where-modal-overlay"
                        onClick={() => {
                            dispatch({ type: CLOSE_WHERE_MODAL })
                            setSelectedSection(null)
                        }}
                    />
                    <div
                        className="where-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="where-modal-title">Suggested destinations</h3>
                        <ul className="dest-list">
                            {destinations.map((d, idx) => {
                                const [city, country] = d.title.split(', ')
                                const loc = {city, country}
                                return (
                                    <li key={idx} className="dest-item" onClick={() => handleWhereChange(loc)}>
                                        <span className="dest-icon">{d.icon}</span>
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
