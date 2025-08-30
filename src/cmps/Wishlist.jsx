import { useEffect } from "react"
import { loadStays } from '../store/actions/stay.actions'
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { formatDateRange, getRandomIntInclusive } from "../services/util.service"

export function Wishlist() {
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    return (
        <>
            <h1 className="wishlists-title">Wishlist</h1>
            {!stays.length && <p>No stays yet.</p>}
            <h2 className="wishlists-length">{stays.length} {stays.length === 1 ? 'Stay' : 'Stays'}</h2>
            <ul className="wishlists-container">
                {stays.map(stay => (
                    <li key={stay._id} className="wishlist">
                        <img className="wishlist-img" src={stay.imgUrls[0]} alt="wishlist-img" />
                        <div className="preview-info">
                            <div className="preview-name">{stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase()}</div>
                            {stay.reviews && <span className="preview-rate">
                                <span><FontAwesomeIcon icon={faStar} /></span>
                                {stay.rating} ({stay.reviews?.length})
                            </span>}

                            <div className="preview-stay-with grey">Stay with {stay.host.fullname} • Host for {getRandomIntInclusive(1, 10)} years</div>
                            {/* <div className="preview-dates grey">{formatDateRange(randStartDate, randEndDate)}</div> */}
                            <div className="preview-price">
                                <span className="underline">${stay.price}</span><span className="grey"> night</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
