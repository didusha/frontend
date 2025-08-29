import { useEffect, useState } from "react"
import { formatDateCalendar } from "../services/util.service"

export function Trips() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("order"))
    if (data && Array.isArray(data)) {
      setTrips(data)
    }
  }, [])

  return (
    <>
      <h1 className="trips-title">My Trips</h1>
      {!trips.length && <p>No trips booked yet.</p>}
      <h2 className="trips-length">{trips.length} {trips.length === 1 ? 'Trip' : 'Trips'}</h2>
      <section className="trips">

        <div className="trips-headers">
          <span className="destination-header">destination</span>
          <span></span>
          <span className="host-header">Host</span>
          <span className="check-in-header">Check-in</span>
          <span className="check-out-header">Check-out</span>
          <span className="guests-header">Guests</span>
          <span className="price-header">Price</span>
          <span className="status-header">Status</span>
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
              <span className="trip-price">${trip.totalPrice || trip.stay?.price}</span>
              <span className="trip-status">{trip.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
