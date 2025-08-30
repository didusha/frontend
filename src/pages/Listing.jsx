import { useEffect, useState } from "react"
import { stayService } from "../services/stay/index"
import { loadStays } from '../store/actions/stay.actions'
import { useSelector, useDispatch } from "react-redux"
import { SET_FILTER_BY } from "../store/reducers/stay.reducer"

export function Listing() {
  const stays = useSelector(storeState => storeState.stayModule.stays)
  const user = useSelector(storeState => storeState.userModule.user)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [originalStays, setOriginalStays] = useState([])
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) return;
    dispatch({ type: SET_FILTER_BY, filterBy: { hostId: user._id } })
    loadStays()
    console.log("🚀 ~ Listing ~ filterBy:", filterBy)
    setOriginalStays(stays)

    return (() => {
      dispatch({ type: SET_FILTER_BY, filterBy: { hostId: null } })
    })
  }, [user])

  function handleSort(key) {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null
    }
    setSortConfig({ key, direction })

    if (direction === null) {
      setStays(originalStays)
      return
    }

    const sorted = [...stays].sort((a, b) => {
      let aVal, bVal
      if (key === 'capacity') {
        aVal = a.capacity
        bVal = b.capacity
      } else if (key === 'bedrooms') {
        aVal = a.bedrooms
        bVal = b.bedrooms
      } else if (key === 'bathrooms') {
        aVal = a.bathrooms
        bVal = b.bathrooms
      } else if (key === 'price') {
        aVal = a.price
        bVal = b.price
      }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
    setStays(sorted)
  }

  function renderSortArrows(key) {
    const isActive = sortConfig.key === key
    const upActive = isActive && sortConfig.direction === 'asc'
    const downActive = isActive && sortConfig.direction === 'desc'
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
          <span className="listing-guests-header" onClick={() => handleSort('capacity')}>
            Capacity {renderSortArrows('capacity')}
          </span>
          <span className="listing-bed-header" onClick={() => handleSort('bedrooms')}>
            Bedrooms {renderSortArrows('bedrooms')}
          </span>
          <span className="listing-bath-header" onClick={() => handleSort('bathrooms')}>
            Bathrooms {renderSortArrows('bathrooms')}
          </span>
          <span className="listing-price-header" onClick={() => handleSort('price')}>
            Price {renderSortArrows('price')}
          </span>
          <span className="listing-loc-header">Location</span>
        </div>

        <ul className="listings-container">
          {stays.map(stay => (
            <li key={stay._id} className="listing">
              <img className="listing-img" src={stay.imgUrls[0]} alt="listing-img" />
              <h3 className="listing-name">{stay.name}</h3>
              <span className="listing-todo"><button className="listing-update">Update</button></span>
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
