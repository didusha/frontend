import { useEffect, useState } from "react"
import { stayService } from "../services/stay/index"
import { loadStays } from '../store/actions/stay.actions'
import { useSelector, useDispatch } from "react-redux"
import { SET_FILTER_BY } from "../store/reducers/stay.reducer"
import { useNavigate } from "react-router"

export function Listing() {
  const stays = useSelector(storeState => storeState.stayModule.stays)
  const user = useSelector(storeState => storeState.userModule.user)
  const [sortBy, setSortBy] = useState({ type: null, dir: 1 })
  const [originalStays, setOriginalStays] = useState([])
  const navigate = useNavigate()
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) return;
    dispatch({ type: SET_FILTER_BY, filterBy: { hostId: user._id } })
    loadStays()
    setOriginalStays(stays)

    return (() => {
      dispatch({ type: SET_FILTER_BY, filterBy: { hostId: null } })
    })
  }, [user, sortBy])

  function onSetSorting(type) {
    const newDir = sortBy.type === type ? -sortBy.dir : 1
    const newSort = { type, dir: newDir }

    setSortBy(newSort)
    dispatch({ type: SET_FILTER_BY, filterBy: newSort})
  }


  function renderSortArrows(type) {
    const isActive = sortBy.type === type
    const upActive = isActive && sortBy.dir === 'asc'
    const downActive = isActive && sortBy.dir === 'desc'
    return (
      <span className="sort-arrows">
        <span className={`arrow up ${upActive ? 'active' : ''}`}>▲</span>
        <span className={`arrow down ${downActive ? 'active' : ''}`}>▼</span>
      </span>
    )
  }

  if (isLoading) return <div>Loading... </div>
  return (
    <>
      <h1 className="listings-title">My Listings</h1>
      {!stays.length && <p>No listings yet.</p>}
      <h2 className="listings-length">{stays.length} {stays.length === 1 ? 'Listing' : 'Listings'}</h2>
      <section className="listings">
        <div className="listings-headers">
          <span className="listing-destination-header">Listing</span>
          <span></span>
          <span className="listing-todo-header">Todo</span>
          <span className="listing-guests-header" onClick={() => onSetSorting('capacity')}>
            Capacity {renderSortArrows('capacity')}
          </span>
          <span className="listing-bed-header" onClick={() => onSetSorting('bedrooms')}>
            Bedrooms {renderSortArrows('bedrooms')}
          </span>
          <span className="listing-bath-header" onClick={() => onSetSorting('bathrooms')}>
            Bathrooms {renderSortArrows('bathrooms')}
          </span>
          <span className="listing-price-header" onClick={() => onSetSorting('price')}>
            Price {renderSortArrows('price')}
          </span>
          <span className="listing-loc-header">Location</span>
        </div>

        <ul className="listings-container">
          {stays.map(stay => (
            <li type={stay._id} className="listing">
              <img className="listing-img" src={stay.imgUrls[0]} alt="listing-img" />
              <h3 className="listing-name">{stay.name}</h3>
              <span className="listing-todo">
                <button className="listing-update" onClick={() => navigate(`/stay/edit/${stay._id}`)}>Update</button>
                </span>
              <span className="listing-guests">{stay.capacity} Guests</span>
              <span className="listing-bed">{stay.bedrooms} Bedrooms</span>
              <span className="listing-bath">{stay.bathrooms} Bathrooms</span>
              <span className="listing-price">${stay.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              <span className="listing-loc">{stay.loc?.city}, {stay.loc?.country}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
