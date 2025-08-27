
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_WHERE_MODAL } from '../store/reducers/system.reducer'

export function WhereModal() {
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
    ]

    return (
        <>
            {isWhereModalOpen && (
                <>
                    <div className="where-modal-overlay" onClick={() => {() => dispatch({ type: CLOSE_WHERE_MODAL })}}>
                    </div>
                    <div
                        className="where-modal-content"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h3 className="where-modal-title">Suggested destinations</h3>
                        <ul className="dest-list">
                            {destinations.map((d, idx) => (
                                <li key={idx} className="dest-item">
                                    <span className="dest-icon">{d.icon}</span>
                                    <div className="dest-text">
                                        <div className="dest-title">{d.title}</div>
                                        <div className="dest-subtitle">{d.subtitle}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}