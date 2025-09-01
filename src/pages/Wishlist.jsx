import { useEffect } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../store/actions/user.actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { getRandomIntInclusive } from "../services/util.service"

export function Wishlist() {
  const stays = useSelector(storeState => storeState.stayModule.stays)
  const user = useSelector(storeState => storeState.userModule.user)

  const likedStays = stays.filter(stay => user?.wishlist?.includes(stay._id))

  async function onRemoveFromWishlist(stayId) {
    try {
      await updateUser(user, stayId) 
    } catch (err) {
      console.error('Cannot remove stay from wishlist', err)
    }
  }

  if (!likedStays.length) return <p>No stays yet in your wishlist.</p>

  return (
    <>
      <h1 className="wishlists-title">Wishlist</h1>
      <h2 className="wishlists-length">{likedStays.length} {likedStays.length === 1 ? 'Stay' : 'Stays'}</h2>
      <ul className="wishlists-container">
        {likedStays.map(stay => (
          <li key={stay._id} className="wishlist">
            <img className="wishlist-img" src={stay.imgUrls[0]} alt="wishlist-img" />
            <button
              className="heart-btn"
              onClick={() => onRemoveFromWishlist(stay._id)}
              aria-label="Remove from wishlist"
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="2"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
                  fill="#fe385c"
                  stroke="white"
                />
              </svg>
            </button>

            <div className="preview-info">
              <div className="preview-name">{stay.name.charAt(0).toUpperCase() + stay.name.slice(1).toLowerCase()}</div>
              {stay.reviews && (
                <span className="preview-rate">
                  <span><FontAwesomeIcon icon={faStar} /></span>
                  {stay.rating} ({stay.reviews?.length})
                </span>
              )}
              <div className="preview-stay-with grey">
                Stay with {stay.host.fullname} • Host for {getRandomIntInclusive(1, 10)} years
              </div>
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
