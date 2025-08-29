import { useEffect, useState } from "react"
import { formatDateCalendar } from "../services/util.service"

export function Trips() {
  const [trips, setTrips] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [originalTrips, setOriginalTrips] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("order"))
    if (data && Array.isArray(data)) {
      setTrips(data)
      setOriginalTrips(data)
    }
  }, [])

  function handleSort(key) {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null
    }
    setSortConfig({ key, direction })

    if (direction === null) {
      setTrips(originalTrips)
      return
    }

    const sorted = [...trips].sort((a, b) => {
      let aVal, bVal
      if (key === 'checkIn') {
        aVal = new Date(a.startDate).getTime()
        bVal = new Date(b.startDate).getTime()
      } else if (key === 'checkOut') {
        aVal = new Date(a.endDate).getTime()
        bVal = new Date(b.endDate).getTime()
      } else if (key === 'guests') {
        aVal = (a.guests?.adults || 0) + (a.guests?.children || 0) + (a.guests?.infants || 0)
        bVal = (b.guests?.adults || 0) + (b.guests?.children || 0) + (b.guests?.infants || 0)
      } else if (key === 'price') {
        aVal = a.totalPrice || a.stay?.price
        bVal = b.totalPrice || b.stay?.price
      } else if (key === 'status') {
        aVal = a.status
        bVal = b.status
      }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
    setTrips(sorted)
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

  return (
    <>
      <h1 className="trips-title">My Trips</h1>
      {!trips.length && <p>No trips booked yet.</p>}
      <h2 className="trips-length">{trips.length} {trips.length === 1 ? 'Trip' : 'Trips'}</h2>
      <section className="trips">

        <div className="trips-headers">
          <span className="destination-header">Destination</span>
          <span></span>
          <span className="host-header">Host</span>
          <span className="check-in-header" onClick={() => handleSort('checkIn')}>
            Check-in {renderSortArrows('checkIn')}
          </span>
          <span className="check-out-header" onClick={() => handleSort('checkOut')}>
            Check-out {renderSortArrows('checkOut')}
          </span>
          <span className="guests-header" onClick={() => handleSort('guests')}>
            Guests {renderSortArrows('guests')}
          </span>
          <span className="price-header" onClick={() => handleSort('price')}>
            Price {renderSortArrows('price')}
          </span>
          <span className="status-header" onClick={() => handleSort('status')}>
            Status {renderSortArrows('status')}
          </span>
        </div>

        <ul className="trips-container">
          {trips.map(trip => (
            <li key={trip._id} className="trip">
              <img className="trip-img" src={trip.stay.imgUrls[0]} alt="stay-img" />
              <h3 className="trip-name">{trip.stay?.name}</h3>
              <span className="trip-host">{trip.host?.fullname}</span>
              <span className="trip-checkIn">{formatDateCalendar(trip.startDate) || "Not set"}</span>
              <span className="trip-checkOut">{formatDateCalendar(trip.endDate) || "Not set"}</span>
              <span className="trip-guests">{(trip.guests?.adults || 0) + (trip.guests?.children || 0) + (trip.guests?.infants || 0)} Guests</span>
              <span className="trip-price">${(trip.totalPrice || trip.stay?.price).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              <span className="trip-status">{trip.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
